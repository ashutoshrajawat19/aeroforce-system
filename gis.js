/**
 * AEROFORCE GIS — Tactical Map Engine
 * Live canvas-rendered geospatial map with terrain, threats, routes & swarm layers
 */
(function initGISMap() {
  'use strict';

  const canvas = document.getElementById('gisMapCanvas');
  if (!canvas) return;

  const wrap = canvas.parentElement;
  const coordEl = document.getElementById('gisCoordOverlay');
  let activeLayer = 'terrain';
  let animFrame;
  let sweepAngle = 0;
  let tick = 0;

  /* ── RESIZE ── */
  function resize() {
    canvas.width  = wrap.offsetWidth;
    canvas.height = wrap.offsetHeight;
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(wrap);

  /* ── SEEDED RANDOM (deterministic map) ── */
  function mulberry32(seed) {
    return function() {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  const rand = mulberry32(42);

  /* ── TERRAIN heightmap (once) ── */
  const COLS = 60, ROWS = 45;
  const terrain = [];
  for (let r = 0; r < ROWS; r++) {
    terrain[r] = [];
    for (let c = 0; c < COLS; c++) {
      terrain[r][c] = rand();
    }
  }
  // Smooth 2 passes
  for (let pass = 0; pass < 2; pass++) {
    for (let r = 1; r < ROWS - 1; r++) {
      for (let c = 1; c < COLS - 1; c++) {
        terrain[r][c] = (
          terrain[r-1][c] + terrain[r+1][c] +
          terrain[r][c-1] + terrain[r][c+1] +
          terrain[r][c] * 2
        ) / 6;
      }
    }
  }

  /* ── STATIC DATA ── */
  // Threat zones [cx%, cy%, r%]
  const threats = [
    { cx: 0.22, cy: 0.28, r: 0.09, label: 'AA-SITE' },
    { cx: 0.71, cy: 0.55, r: 0.07, label: 'EW-ZONE' },
    { cx: 0.48, cy: 0.72, r: 0.11, label: 'JMZ-3'  },
  ];

  // Waypoints [x%, y%, label]
  const waypoints = [
    { x: 0.10, y: 0.12, l: 'WP-1' },
    { x: 0.30, y: 0.35, l: 'WP-2' },
    { x: 0.55, y: 0.20, l: 'WP-3' },
    { x: 0.78, y: 0.38, l: 'WP-4' },
    { x: 0.85, y: 0.78, l: 'WP-5' },
    { x: 0.60, y: 0.88, l: 'WP-6' },
    { x: 0.18, y: 0.80, l: 'WP-7' },
  ];

  // Safe corridors (pairs of waypoint indices)
  const corridors = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0],[1,3]];

  // Swarm nodes (animated)
  const swarmNodes = Array.from({ length: 18 }, (_, i) => ({
    x: 0.15 + rand() * 0.7,
    y: 0.15 + rand() * 0.7,
    vx: (rand() - 0.5) * 0.0006,
    vy: (rand() - 0.5) * 0.0006,
  }));

  /* ── TERRAIN COLOR ── */
  function terrainColor(h) {
    if (h < 0.2) return `hsl(210,60%,${12 + h * 30}%)`; // water/lowland
    if (h < 0.45) return `hsl(${105 - h * 60},45%,${18 + h * 20}%)`; // plains
    if (h < 0.7)  return `hsl(${80 - h * 40},35%,${20 + h * 15}%)`;  // hills
    return `hsl(${30 - h * 10},25%,${25 + h * 20}%)`;                 // mountains
  }

  /* ── DRAW ── */
  function draw() {
    const W = canvas.width, H = canvas.height;
    const ctx = canvas.getContext('2d');
    const cw = W / COLS, ch = H / ROWS;
    ctx.clearRect(0, 0, W, H);

    /* TERRAIN layer */
    if (activeLayer === 'terrain' || activeLayer === 'all') {
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          ctx.fillStyle = terrainColor(terrain[r][c]);
          ctx.fillRect(c * cw, r * ch, cw + 0.5, ch + 0.5);
        }
      }
    } else {
      // Dark base for other layers
      ctx.fillStyle = '#050a05';
      ctx.fillRect(0, 0, W, H);
    }

    /* Grid overlay */
    ctx.strokeStyle = 'rgba(0,255,136,0.07)';
    ctx.lineWidth = 0.5;
    const gridStep = W / 10;
    for (let x = 0; x <= W; x += gridStep) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    const gridStepY = H / 8;
    for (let y = 0; y <= H; y += gridStepY) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    /* THREAT ZONES layer */
    if (activeLayer === 'threats' || activeLayer === 'all') {
      threats.forEach(t => {
        const cx = t.cx * W, cy = t.cy * H, r = t.r * Math.min(W, H);
        // Pulsing outer ring
        const pulse = 0.5 + 0.5 * Math.sin(tick * 0.04);
        const rPulse = r * (1 + pulse * 0.15);
        ctx.beginPath();
        ctx.arc(cx, cy, rPulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,68,68,${0.06 + pulse * 0.04})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255,68,68,${0.5 + pulse * 0.3})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        // Label
        ctx.fillStyle = '#ff6666';
        ctx.font = `bold ${Math.floor(W * 0.013)}px "Share Tech Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(t.label, cx, cy - r - 6);
        // Center cross
        ctx.strokeStyle = 'rgba(255,100,100,0.7)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(cx - 8, cy); ctx.lineTo(cx + 8, cy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy - 8); ctx.lineTo(cx, cy + 8); ctx.stroke();
      });
    }

    /* ROUTE CORRIDORS layer */
    if (activeLayer === 'routes' || activeLayer === 'all') {
      // Draw corridors
      corridors.forEach(([a, b]) => {
        const wa = waypoints[a], wb = waypoints[b];
        const ax = wa.x * W, ay = wa.y * H;
        const bx = wb.x * W, by = wb.y * H;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = 'rgba(0,255,136,0.4)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated dot along route
        const progress = (tick * 0.008) % 1;
        const dx = ax + (bx - ax) * progress;
        const dy = ay + (by - ay) * progress;
        ctx.beginPath();
        ctx.arc(dx, dy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00ff88';
        ctx.fill();
      });

      // Waypoint markers
      waypoints.forEach(wp => {
        const x = wp.x * W, y = wp.y * H;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD700';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,215,0,0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();
        // Label
        ctx.fillStyle = '#FFD700';
        ctx.font = `${Math.floor(W * 0.012)}px "Share Tech Mono", monospace`;
        ctx.textAlign = 'left';
        ctx.fillText(wp.l, x + 8, y + 4);
      });
    }

    /* SWARM NODES */
    if (activeLayer === 'all') {
      swarmNodes.forEach((n, i) => {
        // Update positions
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0.05 || n.x > 0.95) n.vx *= -1;
        if (n.y < 0.05 || n.y > 0.95) n.vy *= -1;
        const nx = n.x * W, ny = n.y * H;
        // Draw connections between close nodes
        swarmNodes.forEach((m, j) => {
          if (j <= i) return;
          const dist = Math.hypot((n.x - m.x) * W, (n.y - m.y) * H);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(nx, ny);
            ctx.lineTo(m.x * W, m.y * H);
            ctx.strokeStyle = `rgba(0,229,255,${0.15 * (1 - dist/80)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.arc(nx, ny, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00e5ff';
        ctx.fill();
      });
    }

    /* RADAR SWEEP overlay */
    if (activeLayer === 'threats' || activeLayer === 'all') {
      const cx = 0.5 * W, cy = 0.5 * H;
      const sweepR = Math.min(W, H) * 0.48;
      sweepAngle = (sweepAngle + 0.012) % (Math.PI * 2);
      const grad = ctx.createConicalGradient
        ? null  // not widely supported
        : null;
      // Fake conical gradient using arc
      for (let i = 0; i < 30; i++) {
        const a = sweepAngle - (i * 0.04);
        const alpha = (30 - i) / 30 * 0.18;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, sweepR, a, a + 0.04);
        ctx.closePath();
        ctx.fillStyle = `rgba(0,255,136,${alpha})`;
        ctx.fill();
      }
      // Sweep line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepAngle) * sweepR, cy + Math.sin(sweepAngle) * sweepR);
      ctx.strokeStyle = 'rgba(0,255,136,0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    tick++;
    animFrame = requestAnimationFrame(draw);
  }

  /* ── MOUSE COORD READOUT ── */
  canvas.addEventListener('mousemove', e => {
    if (!coordEl) return;
    const rect = canvas.getBoundingClientRect();
    const fx = (e.clientX - rect.left) / rect.width;
    const fy = (e.clientY - rect.top)  / rect.height;
    const lat = (34.0 + (0.5 - fy) * 4).toFixed(4);
    const lon = (72.0 + (fx - 0.5)  * 6).toFixed(4);
    coordEl.textContent = `LAT ${lat}°N / LON ${lon}°E`;
  });

  /* ── LAYER SWITCHER ── */
  window.gisSetLayer = function(layer) {
    activeLayer = layer;
    document.querySelectorAll('.gis-ctrl-btn').forEach(b => b.classList.remove('active'));
    const map = { terrain:'gisLayerTerrain', threats:'gisLayerThreats', routes:'gisLayerRoutes', all:'gisLayerAll' };
    const el = document.getElementById(map[layer]);
    if (el) el.classList.add('active');
  };

  /* ── LIVE STAT TICKER ── */
  let droneBase = 128, threatBase = 7, coverageBase = 94;
  setInterval(() => {
    const drones = droneBase + Math.floor((Math.random() - 0.5) * 6);
    const threats = threatBase + Math.floor((Math.random() - 0.5) * 2);
    const coverage = coverageBase + Math.floor((Math.random() - 0.5) * 3);
    const d = document.getElementById('gisStatDrones');
    const t = document.getElementById('gisStatThreats');
    const c = document.getElementById('gisStatCoverage');
    if (d) d.textContent = drones;
    if (t) t.textContent = threats;
    if (c) c.textContent = coverage + '%';
  }, 2200);

  /* ── START ── */
  draw();

  /* Stop animation when section not visible (performance) */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) { cancelAnimationFrame(animFrame); }
      else { animFrame = requestAnimationFrame(draw); }
    });
  }, { threshold: 0.1 });
  observer.observe(canvas);

})();
