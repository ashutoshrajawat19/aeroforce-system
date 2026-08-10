/**
 * AEROFORCE SYSTEMS — Main Application Script
 * Three.js 3D Hero | GSAP Animations | SQL Product Database | Radar Simulator
 */

'use strict';

/* ═══════════════════════════════════════════
   SQL PRODUCT DATABASE (Structured JSON Tables)
   Mimics: products, categories, specs tables
══════════════════════════════════════════════ */
const DB = {
  categories: [
    { id: 1, slug: 'drone',    label: 'Tactical Drone',   color: '#FFD700' },
    { id: 2, slug: 'counter',  label: 'Counter-Drone',    color: '#ff6b6b' },
    { id: 3, slug: 'robotics', label: 'Robotics',         color: '#00ff88' },
  ],

  products: [
    {
      id: 1, category: 'drone', name: 'SPECTRE-X STEALTH VTOL',
      icon: '✈', tag: 'TACTICAL UAV',
      desc: 'Long-range autonomous reconnaissance UAV with thermal optical pod and ultra-low RCS radar-absorbing composite airframe. GPS-denied AI inertial navigation.',
      keyMetric: 'ENDURANCE: 12.5 HRS',
      range: '450 KM', aiLevel: 'STANAG L5', status: 'ACTIVE',
      specs: {
        'Flight Endurance': '12.5 hours', 'Op. Radius': '450 km',
        'Max Altitude': '6,000 m MSL', 'Payload': '18 kg (SAR/Optical)',
        'RCS Signature': '< 0.005 m²', 'Navigation': 'Optical Inertial AI',
        'Propulsion': 'Electric VTOL', 'Max Speed': '240 km/h',
        'Comm. Link': 'Encrypted L-Band', 'Weight': '34 kg MTOW',
      }
    },
    {
      id: 2, category: 'counter', name: 'HELIOS-100 LASER TURRET',
      icon: '⚡', tag: 'C-UAS LASER',
      desc: '100kW vehicle-mounted fiber diode laser for instant hard-kill thermal neutralization of rogue Class 1–3 drones at speed-of-light engagement.',
      keyMetric: 'POWER: 100 kW',
      range: '5.5 KM', aiLevel: 'AUTO-TRACK', status: 'ACTIVE',
      specs: {
        'Laser Power': '100 kW Diode Fibre', 'Engagement Range': 'up to 5.5 km',
        'Acquisition Lock': '0.12 seconds', 'Cost Per Shot': '< $1.00 electric',
        'Effect': 'Thermal melt/destroy', 'Tracking': 'EO/IR Auto-Track',
        'Cooldown': '< 3 seconds', 'Platform': 'Vehicle-mounted',
        'Beam Divergence': '< 0.3 mrad', 'Power Source': '450V DC Link',
      }
    },
    {
      id: 3, category: 'drone', name: 'HYDRA-9 SWARM MATRIX',
      icon: '⬡', tag: 'SWARM UNIT',
      desc: 'Coordinated 128-unit autonomous swarm architecture on encrypted mesh network for electronic warfare decoy, search-and-rescue, and distributed triangulation.',
      keyMetric: 'SWARM: 128 NODES',
      range: '120 KM', aiLevel: 'AUTONOMOUS', status: 'ACTIVE',
      specs: {
        'Max Swarm Size': '128 synchronized units', 'Comm. Mesh': 'Encrypted L-Band COFDM',
        'Max Speed': '160 km/h per node', 'Redundancy': 'Self-healing mesh',
        'Autonomy': 'STANAG 4586 Level 5', 'Endurance': '4.5 hours',
        'Payload': '1.2 kg per node', 'Coordination': 'AI swarm logic',
        'Encryption': 'AES-256', 'Latency': '< 2ms inter-node',
      }
    },
    {
      id: 4, category: 'counter', name: 'CYBER-GUN V2 RF RIFLE',
      icon: '📡', tag: 'RF JAMMER',
      desc: 'Handheld directional RF and GNSS jamming rifle severing 433MHz–5.8GHz drone video, telemetry, and GPS signals forcing immediate RTH or landing.',
      keyMetric: 'RADIUS: 3,000 M',
      range: '3 KM', aiLevel: 'MANUAL/AUTO', status: 'ACTIVE',
      specs: {
        'Jamming Frequencies': '400 MHz – 6.0 GHz', 'Effective Radius': '3,000 meters',
        'Battery Runtime': '120 mins continuous', 'Target Action': 'Force RTH / Land',
        'Total Weight': '4.2 kg carbon composite', 'RF Bands': '6 simultaneous',
        'Lock Time': '< 0.8 seconds', 'GNSS Jam': 'GPS, GLONASS, BeiDou',
        'Range (Video)': '5 km max', 'Interface': 'HMD + trigger',
      }
    },
    {
      id: 5, category: 'drone', name: 'GHOST RECON MICRO UAV',
      icon: '👁', tag: 'MICRO UAV',
      desc: 'Ultra-compact 220g indoor/outdoor reconnaissance micro-drone with whisper-quiet ducted fan propulsion and encrypted 4K live feed streaming.',
      keyMetric: 'WEIGHT: 220 G',
      range: '5 KM', aiLevel: 'AUTONOMOUS', status: 'ACTIVE',
      specs: {
        'Total Weight': '220 grams', 'Flight Time': '22 minutes',
        'Camera': '4K 60fps wide-FOV', 'Propulsion': 'Ducted fan (quiet)',
        'Max Range': '5 km encrypted', 'Wind Resistance': 'Beaufort 5',
        'Operating Temp': '-20°C to +55°C', 'IP Rating': 'IP64 splash-proof',
        'Autonomy': 'AI follow-mode', 'Control': 'Glove HMI or tablet',
      }
    },
    {
      id: 6, category: 'counter', name: 'EAGLE-EYE RADAR ARRAY',
      icon: '📻', tag: 'RADAR SYSTEM',
      desc: 'Active phased-array pulse-Doppler radar providing 360° azimuth coverage, classifying targets from micro-drones (< 0.001 m² RCS) to full UAV swarms.',
      keyMetric: 'DETECT: 30 KM',
      range: '30 KM', aiLevel: 'AI-CLASSIFY', status: 'CLASSIFIED',
      specs: {
        'Detection Range': '30 km', 'Min RCS': '0.001 m²',
        'Azimuth Coverage': '360°', 'Elevation': '-10° to +80°',
        'Update Rate': '20 Hz', 'Target Capacity': '200 simultaneous',
        'Classification': 'AI neural ID (50k+ profiles)', 'False Alarm Rate': '0.002%',
        'Power': '5 kW average', 'Platform': 'Mobile / fixed',
      }
    },
    {
      id: 7, category: 'robotics', name: 'TITAN-6 GROUND ROBOT',
      icon: '🤖', tag: 'GROUND UGV',
      desc: 'Six-legged all-terrain autonomous ground robot with modular payload bays, 360° LIDAR mapping, and CBRN-grade protection for denied environment operations.',
      keyMetric: 'PAYLOAD: 50 KG',
      range: '35 KM', aiLevel: 'STANAG L5', status: 'ACTIVE',
      specs: {
        'Locomotion': '6-DOF hexapod legs', 'Payload Capacity': '50 kg modular',
        'Max Speed': '18 km/h (terrain)', 'Endurance': '8 hours',
        'Sensors': '360° LIDAR + Thermal', 'Armor': 'Ballistic Grade III',
        'AI Navigation': 'SLAM + obstacle avoid', 'Comms': '10 km encrypted RF',
        'CBRN Rating': 'COLPRO Level 3', 'Weight': '180 kg empty',
      }
    },
    {
      id: 8, category: 'robotics', name: 'AEGIS EOD MANIPULATOR',
      icon: '🦾', tag: 'EOD ROBOT',
      desc: 'Remote explosive ordnance disposal robot with 7-DOF dexterous arm, haptic force-feedback teleoperation, and onboard X-ray / CT scanning system.',
      keyMetric: 'ARM REACH: 1.8 M',
      range: '0.5 KM', aiLevel: 'TELEOPERATE', status: 'ACTIVE',
      specs: {
        'Arm DOF': '7 degrees of freedom', 'Arm Reach': '1.8 meters',
        'Lift Force': '30 kg max grip', 'Control Range': '500 m tether-free',
        'Imaging': 'X-ray + CT scanner', 'Feedback': 'Haptic force-reflect',
        'Drive': '4WD electric tracks', 'Speed': '6 km/h max',
        'Battery': '6 hours operation', 'Weight': '320 kg with arm',
      }
    },
    {
      id: 9, category: 'robotics', name: 'HYDRA-USV PATROL BOAT',
      icon: '⚓', tag: 'MARITIME USV',
      desc: 'Autonomous unmanned surface vessel for coastal and maritime counter-drone operations, naval surveillance, and sonar payload deployment at 45-knot sprint speed.',
      keyMetric: 'SPEED: 45 KNOTS',
      range: '800 KM', aiLevel: 'AUTONOMOUS', status: 'ACTIVE',
      specs: {
        'Hull': 'Carbon fibre SWATH', 'Max Speed': '45 knots sprint',
        'Cruise Speed': '28 knots', 'Range': '800 km on fuel cell',
        'Payload': '200 kg modular bay', 'Sensors': 'Radar + EO/IR + Sonar',
        'Autonomy': 'AI maritime nav', 'C2 Link': 'Satellite + VHF encrypted',
        'Sea State': 'SS5 operational', 'Draft': '0.6 m',
      }
    },
  ],

  /* SQL-style query engine */
  query(sql) {
    const { table, where, search } = sql;
    let results = [...this[table]];
    if (where && where.category !== 'all') {
      results = results.filter(r => r.category === where.category);
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.desc.toLowerCase().includes(q) ||
        r.tag.toLowerCase().includes(q)
      );
    }
    return results;
  }
};


/* ═══════════════════════════════════════════
   THREE.JS — HERO 3D UNIVERSE SCENE
   Earth · Moon · Stars · Nebula · Asteroids · Satellites · Drone
══════════════════════════════════════════════ */
class HeroScene {
  constructor() {
    this.canvas = document.getElementById('heroCanvas');
    if (!this.canvas || typeof THREE === 'undefined') return;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.set(0, 2, 14);

    this.mouse = { x: 0, y: 0 };
    this.clock = new THREE.Clock();

    // Background Mode Groups
    this.groupSpace = new THREE.Group();
    this.groupTactical = new THREE.Group();
    this.groupCyber = new THREE.Group();
    this.groupMatrix = new THREE.Group();

    this.scene.add(this.groupSpace);
    this.scene.add(this.groupTactical);
    this.scene.add(this.groupCyber);
    this.scene.add(this.groupMatrix);

    this._buildLights();
    this._buildStarField();
    this._buildShootingStars();

    // 1. Build Space Scene
    this._buildNebula();
    this._buildEarth();
    this._buildMoon();
    this._buildAsteroids();
    this._buildSatellites();
    this._buildDrone();

    // 2. Build Tactical Grid Scene (Old Classic Tactical Background)
    this._buildTacticalMode();

    // 3. Build Cyber Grid Scene
    this._buildCyberMode();

    // 4. Build Matrix Mode Scene
    this._buildMatrixMode();

    this._animate();
    this._events();

    // Initial Mode setup
    const savedMode = localStorage.getItem('aeroforce_hero_bg_mode') || 'space';
    this.setMode(savedMode);
    window.heroScene = this;
  }

  setMode(modeKey) {
    this.currentMode = modeKey || 'space';
    this.groupSpace.visible = (this.currentMode === 'space');
    this.groupTactical.visible = (this.currentMode === 'tactical');
    this.groupCyber.visible = (this.currentMode === 'cyber');
    this.groupMatrix.visible = (this.currentMode === 'matrix');

    try {
      localStorage.setItem('aeroforce_hero_bg_mode', this.currentMode);
    } catch(e) {}

    document.querySelectorAll('.bg-mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === this.currentMode);
    });
  }

  /* ── LIGHTS ── */
  _buildLights() {
    const sun = new THREE.DirectionalLight(0xfff5e0, 2.8);
    sun.position.set(12, 8, 6);
    sun.castShadow = true;
    this.scene.add(sun);

    const fill = new THREE.DirectionalLight(0x1a3a6a, 0.6);
    fill.position.set(-8, -4, -6);
    this.scene.add(fill);

    this.scene.add(new THREE.AmbientLight(0x050510, 1.2));

    const atmLight = new THREE.PointLight(0x1a6aff, 0.4, 30);
    atmLight.position.set(-6, 0, 2);
    this.scene.add(atmLight);
  }

  /* ── STAR FIELD ── */
  _buildStarField() {
    const COUNT = 8000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const sz  = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const r = 180 + Math.random() * 300;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i*3+2] = r * Math.cos(phi);

      const t = Math.random();
      if (t < 0.6) { col[i*3]=1; col[i*3+1]=1; col[i*3+2]=1; }
      else if (t < 0.75) { col[i*3]=0.7; col[i*3+1]=0.8; col[i*3+2]=1; }
      else if (t < 0.9)  { col[i*3]=1; col[i*3+1]=0.9; col[i*3+2]=0.5; }
      else { col[i*3]=1; col[i*3+1]=0.6; col[i*3+2]=0.3; }

      sz[i] = Math.random() * 1.5 + 0.3;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sz, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.35, vertexColors: true,
      transparent: true, opacity: 0.9,
      sizeAttenuation: true,
    });
    this._stars = new THREE.Points(geo, mat);
    this._starSizes = sz;
    this.scene.add(this._stars);
  }

  /* ── NEBULA CLOUDS ── */
  _buildNebula() {
    const clouds = [
      { color: 0x1a0a4a, x: -30, y: 20,  z: -80, s: 45 },
      { color: 0x0a1a40, x:  40, y: -15, z: -60, s: 35 },
      { color: 0x2a0a2a, x: -20, y: -30, z: -90, s: 55 },
      { color: 0x0a2a30, x:  60, y:  25, z:-100, s: 60 },
    ];
    clouds.forEach(c => {
      const COUNT = 600;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(COUNT * 3);
      for (let i = 0; i < COUNT; i++) {
        pos[i*3]   = c.x + (Math.random()-0.5)*c.s;
        pos[i*3+1] = c.y + (Math.random()-0.5)*c.s*0.5;
        pos[i*3+2] = c.z + (Math.random()-0.5)*c.s*0.4;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        color: c.color, size: 4, transparent: true, opacity: 0.18, sizeAttenuation: true,
      });
      this.groupSpace.add(new THREE.Points(geo, mat));
    });
  }

  /* ── EARTH ── */
  _buildEarth() {
    const R = 3.5;
    const geo = new THREE.SphereGeometry(R, 64, 64);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x1a6030,
      emissive: 0x001a10,
      specular: 0x336699,
      shininess: 60,
    });

    const col = new Float32Array(geo.attributes.position.count * 3);
    const posArr = geo.attributes.position.array;
    for (let i = 0; i < geo.attributes.position.count; i++) {
      const x = posArr[i*3], y = posArr[i*3+1], z = posArr[i*3+2];
      const lat = Math.asin(y / R);
      const lon = Math.atan2(z, x);
      const n = Math.sin(lat*6 + 1.2) * Math.cos(lon*5 + 0.8) +
                Math.sin(lat*3 + 2.1) * Math.cos(lon*8 + 1.4) * 0.5;

      if (lat < -1.2) { col[i*3]=0.92; col[i*3+1]=0.95; col[i*3+2]=1.0; }
      else if (lat > 1.1) { col[i*3]=0.88; col[i*3+1]=0.92; col[i*3+2]=0.98; }
      else if (n > 0.3) {
        const lushness = 0.4 + Math.random()*0.3;
        col[i*3]=0.1; col[i*3+1]=lushness; col[i*3+2]=0.15;
      } else {
        const depth = 0.5 + n * 0.3;
        col[i*3]=0.04*depth; col[i*3+1]=0.18*depth; col[i*3+2]=0.55*depth;
      }
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    mat.vertexColors = true;

    this._earth = new THREE.Mesh(geo, mat);
    this._earth.position.set(-1.5, 0, 0);
    this._earth.castShadow = true;
    this.groupSpace.add(this._earth);

    const atmGeo = new THREE.SphereGeometry(R * 1.04, 32, 32);
    const atmMat = new THREE.MeshPhongMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.12,
      side: THREE.FrontSide,
    });
    this._atmosphere = new THREE.Mesh(atmGeo, atmMat);
    this._atmosphere.position.copy(this._earth.position);
    this.groupSpace.add(this._atmosphere);

    const cloudGeo = new THREE.SphereGeometry(R * 1.02, 48, 48);
    const cloudMat = new THREE.MeshPhongMaterial({
      color: 0xffffff, transparent: true, opacity: 0.08,
      depthWrite: false,
    });
    this._clouds = new THREE.Mesh(cloudGeo, cloudMat);
    this._clouds.position.copy(this._earth.position);
    this.groupSpace.add(this._clouds);
  }

  /* ── MOON ── */
  _buildMoon() {
    const geo = new THREE.SphereGeometry(0.9, 32, 32);
    const col = new Float32Array(geo.attributes.position.count * 3);
    const pa = geo.attributes.position.array;
    for (let i = 0; i < geo.attributes.position.count; i++) {
      const n = Math.sin(pa[i*3]*8)*Math.cos(pa[i*3+1]*7)*0.15 + 0.65 + Math.random()*0.06;
      col[i*3]=n; col[i*3+1]=n; col[i*3+2]=n*1.05;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 5, specular: 0x111111 });
    this._moon = new THREE.Mesh(geo, mat);
    this._moon.castShadow = true;
    this._moonOrbitRadius = 7.5;
    this._moonOrbitSpeed  = 0.08;
    this.groupSpace.add(this._moon);
  }

  /* ── ASTEROID BELT ── */
  _buildAsteroids() {
    this._asteroids = [];
    for (let i = 0; i < 220; i++) {
      const angle  = (i / 220) * Math.PI * 2 + Math.random() * 0.4;
      const radius = 10 + Math.random() * 4;
      const size   = 0.03 + Math.random() * 0.12;
      const geo    = new THREE.DodecahedronGeometry(size, 0);
      const grey   = 0.3 + Math.random() * 0.4;
      const mat    = new THREE.MeshPhongMaterial({ color: new THREE.Color(grey, grey*0.95, grey*0.9), shininess: 10 });
      const mesh   = new THREE.Mesh(geo, mat);
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 1.2,
        Math.sin(angle) * radius
      );
      mesh._angle  = angle;
      mesh._radius = radius;
      mesh._speed  = 0.004 + Math.random() * 0.006;
      mesh._rotX   = (Math.random()-0.5)*0.04;
      mesh._rotY   = (Math.random()-0.5)*0.06;
      mesh.position.x -= 1.5;
      this.groupSpace.add(mesh);
      this._asteroids.push(mesh);
    }
  }

  /* ── SATELLITES ── */
  _buildSatellites() {
    this._satellites = [];
    const configs = [
      { orbit: 5.8, speed: 0.15, tilt: 0.6,  startAngle: 0 },
      { orbit: 6.8, speed: 0.09, tilt: -0.4, startAngle: Math.PI },
    ];
    configs.forEach(cfg => {
      const g = new THREE.Group();

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.14, 0.14),
        new THREE.MeshPhongMaterial({ color: 0x888899, shininess: 80, specular: 0xaaaacc })
      );
      g.add(body);

      [-1, 1].forEach(side => {
        const panel = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.02, 0.28),
          new THREE.MeshPhongMaterial({ color: 0x1144aa, shininess: 120, specular: 0x4488ff, emissive: 0x001133 })
        );
        panel.position.x = side * 0.36;
        g.add(panel);
      });

      const ant = new THREE.Mesh(
        new THREE.CylinderGeometry(0.01, 0.01, 0.18, 6),
        new THREE.MeshPhongMaterial({ color: 0xcccccc })
      );
      ant.position.y = 0.14;
      g.add(ant);

      const dish = new THREE.Mesh(
        new THREE.ConeGeometry(0.06, 0.08, 10, 1, true),
        new THREE.MeshPhongMaterial({ color: 0xdddddd, side: THREE.DoubleSide })
      );
      dish.rotation.x = Math.PI;
      dish.position.y = 0.22;
      g.add(dish);

      g._orbit  = cfg.orbit;
      g._speed  = cfg.speed;
      g._tilt   = cfg.tilt;
      g._angle  = cfg.startAngle;
      this.groupSpace.add(g);
      this._satellites.push(g);
    });
  }

  /* ── TACTICAL DRONE ── */
  _buildDrone() {
    const g = new THREE.Group();
    const mat = new THREE.MeshPhongMaterial({ color: 0x222228, shininess: 90, specular: 0x444455 });
    const matY = new THREE.MeshPhongMaterial({ color: 0xFFD700, emissive: 0xFFD700, emissiveIntensity: 0.5, shininess: 120 });
    const matGlow = new THREE.MeshPhongMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.8 });

    g.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.15, 0.4), mat)));
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.03, 0.42), matY);
    stripe.position.y = 0.08;
    g.add(stripe);

    [[0.5,0.5],[-.5,0.5],[0.5,-.5],[-.5,-.5]].forEach(([dx,dz]) => {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.04, 0.06), mat);
      arm.position.set(dx*0.6, 0, dz*0.6);
      arm.rotation.y = Math.atan2(dz, dx);
      g.add(arm);

      const rotor = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.02, 16), matY);
      rotor.position.set(dx*0.9, 0.05, dz*0.9);
      rotor._isRotor = true;
      rotor._speed = (Math.random()*3+4) * (dx>0?1:-1);
      g.add(rotor);

      const glow = new THREE.PointLight(0xFFD700, 0.3, 1);
      glow.position.set(dx*0.9, 0.1, dz*0.9);
      g.add(glow);
    });

    const pod = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), matGlow);
    pod.position.set(0.2, -0.1, 0);
    g.add(pod);

    g.position.set(5, 1.5, 4);
    g.scale.setScalar(0.7);
    this._drone = g;
    this._droneAngle = 0;
    this.scene.add(g);
  }

  /* ── SHOOTING STARS ── */
  _buildShootingStars() {
    this._shooters = [];
    for (let i = 0; i < 5; i++) {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0,0,0), new THREE.Vector3(-3, 0.4, 0)
      ]);
      const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
      const line = new THREE.Line(geo, mat);
      line._life = Math.random() * 6;
      line._lifetime = 5 + Math.random() * 5;
      line._speed = 0.3 + Math.random() * 0.5;
      this._resetShooter(line);
      this.scene.add(line);
      this._shooters.push(line);
    }
  }

  _resetShooter(s) {
    s.position.set(
      (Math.random()-0.5) * 60,
      (Math.random()-0.5) * 30,
      -40 - Math.random() * 40
    );
    s.rotation.z = (Math.random()-0.5) * 0.4;
    s.material.opacity = 0;
    s._life = 0;
    s._lifetime = 4 + Math.random() * 6;
  }

  /* ── TACTICAL RADAR GRID MODE (OLD CLASSIC DEFENSE CANVAS) ── */
  _buildTacticalMode() {
    const ringRadii = [2.5, 5.0, 7.5, 10.0, 12.5, 15.0];
    ringRadii.forEach((r, idx) => {
      const ringGeo = new THREE.RingGeometry(r - 0.03, r + 0.03, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xFFD700,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: idx % 2 === 0 ? 0.35 : 0.15
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(0, -3.5, -2);
      this.groupTactical.add(ring);
    });

    const sweepGeo = new THREE.RingGeometry(0.1, 15.2, 32, 1, 0, Math.PI * 0.45);
    const sweepMat = new THREE.MeshBasicMaterial({
      color: 0xFFD700,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.12
    });
    this._tacticalSweep = new THREE.Mesh(sweepGeo, sweepMat);
    this._tacticalSweep.rotation.x = Math.PI / 2;
    this._tacticalSweep.position.set(0, -3.48, -2);
    this.groupTactical.add(this._tacticalSweep);

    const grid = new THREE.GridHelper(32, 24, 0xFFD700, 0x443500);
    grid.position.set(0, -3.52, -2);
    this.groupTactical.add(grid);

    this._targetNodes = [];
    const targetLocs = [
      { x: -4, z: 2, y: 0.5 },
      { x: 5, z: -3, y: 1.2 },
      { x: -2, z: -6, y: -0.8 },
      { x: 3.5, z: 4, y: 0.2 }
    ];
    targetLocs.forEach((loc, i) => {
      const g = new THREE.Group();
      const nodeGeo = new THREE.OctahedronGeometry(0.35, 0);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xFFD700, wireframe: true });
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      g.add(mesh);

      const rRing = new THREE.RingGeometry(0.65, 0.7, 16);
      const rMat = new THREE.MeshBasicMaterial({ color: 0x00FF66, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
      const ring = new THREE.Mesh(rRing, rMat);
      g.add(ring);

      g.position.set(loc.x, loc.y, loc.z);
      g._baseY = loc.y;
      g._speed = 0.02 + i * 0.005;
      this.groupTactical.add(g);
      this._targetNodes.push(g);
    });
  }

  /* ── CYBER MESH MODE ── */
  _buildCyberMode() {
    const gridGeo = new THREE.PlaneGeometry(80, 80, 40, 40);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x00F3FF,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    this._cyberGrid = new THREE.Mesh(gridGeo, gridMat);
    this._cyberGrid.rotation.x = -Math.PI / 2.3;
    this._cyberGrid.position.set(0, -4, -10);
    this.groupCyber.add(this._cyberGrid);

    const sunRing = new THREE.Mesh(
      new THREE.RingGeometry(6, 6.3, 32),
      new THREE.MeshBasicMaterial({ color: 0xFF2A5F, side: THREE.DoubleSide })
    );
    sunRing.position.set(0, 1, -25);
    this.groupCyber.add(sunRing);
  }

  /* ── QUANTUM MATRIX MODE ── */
  _buildMatrixMode() {
    const COUNT = 220;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 35;
      pos[i*3+1] = (Math.random() - 0.5) * 20;
      pos[i*3+2] = (Math.random() - 0.5) * 20;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0x00FF66, size: 0.45, transparent: true, opacity: 0.8 });
    this._matrixPoints = new THREE.Points(geo, mat);
    this.groupMatrix.add(this._matrixPoints);
  }

  /* ── ANIMATION ── */
  _animate() {
    requestAnimationFrame(() => this._animate());
    const t = this.clock.getElapsedTime();

    if (this.currentMode === 'space') {
      if (this._earth)       this._earth.rotation.y      = t * 0.06;
      if (this._clouds)      this._clouds.rotation.y     = t * 0.065;
      if (this._atmosphere)  this._atmosphere.rotation.y = t * 0.04;

      if (this._moon) {
        const ma = t * this._moonOrbitSpeed;
        this._moon.position.set(
          this._earth.position.x + Math.cos(ma) * this._moonOrbitRadius,
          Math.sin(ma * 0.3) * 0.8,
          Math.sin(ma) * this._moonOrbitRadius
        );
        this._moon.rotation.y = t * 0.02;
      }

      if (this._asteroids) {
        this._asteroids.forEach(a => {
          a._angle += a._speed;
          a.position.x = this._earth.position.x + Math.cos(a._angle) * a._radius;
          a.position.z = Math.sin(a._angle) * a._radius;
          a.rotation.x += a._rotX;
          a.rotation.y += a._rotY;
        });
      }

      if (this._satellites) {
        this._satellites.forEach(s => {
          s._angle += s._speed * 0.016;
          s.position.set(
            this._earth.position.x + Math.cos(s._angle) * s._orbit,
            Math.sin(s._angle + s._tilt) * s._orbit * 0.4,
            Math.sin(s._angle) * s._orbit
          );
          s.lookAt(this._earth.position);
          s.rotation.z += 0.01;
        });
      }
    }

    if (this.currentMode === 'tactical') {
      if (this._tacticalSweep) {
        this._tacticalSweep.rotation.z = -t * 0.9;
      }
      if (this._targetNodes) {
        this._targetNodes.forEach((node, i) => {
          node.position.y = node._baseY + Math.sin(t * 2 + i) * 0.3;
          node.rotation.y += node._speed;
          node.rotation.z += 0.01;
        });
      }
    }

    if (this.currentMode === 'cyber') {
      if (this._cyberGrid) {
        this._cyberGrid.position.z = -10 + (t * 2.5 % 4);
      }
    }

    if (this.currentMode === 'matrix') {
      if (this._matrixPoints) {
        this._matrixPoints.rotation.y = t * 0.08;
        this._matrixPoints.rotation.x = Math.sin(t * 0.05) * 0.1;
      }
    }

    /* 3D Drone Orbital Space Flight Animation */
    if (this._drone) {
      this._droneAngle += 0.008;
      const da = this._droneAngle;
      this._drone.position.set(
        Math.cos(da * 1.2) * 7.5 - 1.0,
        Math.sin(da * 0.8) * 2.2 + 0.5,
        Math.sin(da) * 5.5 + 1.0
      );
      this._drone.rotation.y = -da + Math.PI * 0.5;
      this._drone.rotation.z = Math.sin(da * 1.2) * 0.25;
      this._drone.children.forEach(c => {
        if (c._isRotor) c.rotation.y += c._speed * 0.15;
      });
    }

    if (this._stars && this._starSizes) {
      const sizes = this._stars.geometry.attributes.size.array;
      for (let i = 0; i < sizes.length; i += 12) {
        sizes[i] = this._starSizes[i] * (0.7 + 0.3 * Math.sin(t * 2 + i));
      }
      this._stars.geometry.attributes.size.needsUpdate = true;
      this._stars.rotation.y = t * 0.003;
    }

    if (this._shooters) {
      this._shooters.forEach(s => {
        s._life += 0.016;
        const prog = s._life / s._lifetime;
        if (prog < 0.2)       s.material.opacity = prog / 0.2 * 0.9;
        else if (prog < 0.8)  s.material.opacity = 0.9;
        else if (prog < 1.0)  s.material.opacity = (1 - (prog-0.8)/0.2) * 0.9;
        else { this._resetShooter(s); return; }
        s.position.x -= s._speed;
        s.position.y -= s._speed * 0.15;
      });
    }

    this.camera.position.x += (this.mouse.x * 1.2 - this.camera.position.x) * 0.025;
    this.camera.position.y += (-this.mouse.y * 0.8 - this.camera.position.y + 2) * 0.025;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer.render(this.scene, this.camera);
  }

  _events() {
    window.addEventListener('mousemove', e => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}

/* ═══════════════════════════════════════════
   THREE.JS — ROBOTICS 3D CANVAS
══════════════════════════════════════════════ */
class RobotScene {
  constructor() {
    this.canvas = document.getElementById('robotCanvas');
    if (!this.canvas || typeof THREE === 'undefined') return;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const w = this.canvas.offsetWidth, h = 280;
    this.renderer.setSize(w, h);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    this.camera.position.set(3, 2, 5);
    this.camera.lookAt(0, 0, 0);

    // Ambient + directional light
    this.scene.add(new THREE.AmbientLight(0x222222, 1));
    const dl = new THREE.DirectionalLight(0xFFD700, 2);
    dl.position.set(3, 5, 3);
    this.scene.add(dl);
    const dl2 = new THREE.DirectionalLight(0xffffff, 0.5);
    dl2.position.set(-3, 2, -2);
    this.scene.add(dl2);

    this._buildHexapod();
    this._animate();

    window.addEventListener('resize', () => {
      const w2 = this.canvas.offsetWidth;
      this.renderer.setSize(w2, 280);
      this.camera.aspect = w2 / 280;
      this.camera.updateProjectionMatrix();
    });
  }

  _buildHexapod() {
    const mat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.7, metalness: 0.8 });
    const matYellow = new THREE.MeshStandardMaterial({ color: 0xFFD700, roughness: 0.3, metalness: 0.9, emissive: 0xFFD700, emissiveIntensity: 0.15 });
    const matGlow = new THREE.MeshStandardMaterial({ color: 0xFFD700, emissive: 0xFFD700, emissiveIntensity: 0.6, roughness: 0.1, metalness: 1 });

    const g = new THREE.Group();

    // Body
    const bodyGeo = new THREE.BoxGeometry(1.8, 0.35, 1.0);
    const body = new THREE.Mesh(bodyGeo, mat);
    body.position.y = 0.6;
    g.add(body);

    // Yellow trim stripe on body
    const trimGeo = new THREE.BoxGeometry(1.82, 0.05, 1.02);
    const trim = new THREE.Mesh(trimGeo, matYellow);
    trim.position.y = 0.78;
    g.add(trim);

    // Head / sensor dome
    const headGeo = new THREE.SphereGeometry(0.25, 16, 12);
    const head = new THREE.Mesh(headGeo, mat);
    head.position.set(0.7, 0.85, 0);
    g.add(head);

    // Eye sensor
    const eyeGeo = new THREE.SphereGeometry(0.08, 10, 8);
    const eye = new THREE.Mesh(eyeGeo, matGlow);
    eye.position.set(0.95, 0.88, 0);
    g.add(eye);
    this._eye = eye;

    // Legs — 6 legs (3 per side)
    const legPositions = [
      [-0.6, 1], [0, 1], [0.6, 1],
      [-0.6, -1], [0, -1], [0.6, -1],
    ];
    this._legs = [];
    legPositions.forEach(([x, zSide], i) => {
      const legGroup = new THREE.Group();
      legGroup.position.set(x, 0.6, 0);

      // Upper leg
      const ul = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.08), mat);
      ul.position.set(zSide * 0.4, -0.18, 0);
      ul.rotation.z = zSide * 0.4;
      legGroup.add(ul);

      // Lower leg
      const ll = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.06), mat);
      ll.position.set(zSide * 0.78, -0.52, 0);
      ll.rotation.z = -zSide * 0.2;
      legGroup.add(ll);

      // Foot (yellow tip)
      const foot = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), matYellow);
      foot.position.set(zSide * 0.9, -0.75, 0);
      legGroup.add(foot);

      g.add(legGroup);
      this._legs.push({ group: legGroup, phase: (i / 6) * Math.PI * 2, zSide });
    });

    // LIDAR sensor on top
    const lidarBase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.12, 16), mat);
    lidarBase.position.set(-0.2, 0.97, 0);
    g.add(lidarBase);
    const lidarHead = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.08, 16), matYellow);
    lidarHead.position.set(-0.2, 1.05, 0);
    g.add(lidarHead);
    this._lidarHead = lidarHead;

    // Laser beam from eye
    const beamGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0), new THREE.Vector3(2, 0, 0)
    ]);
    this._beam = new THREE.Line(beamGeo, new THREE.LineBasicMaterial({ color: 0xFFD700, transparent: true, opacity: 0.5 }));
    this._beam.position.copy(eye.position);
    g.add(this._beam);

    // Ground grid
    const gridH = new THREE.GridHelper(8, 12, 0xFFD700, 0x111100);
    gridH.material.transparent = true;
    gridH.material.opacity = 0.1;
    this.scene.add(gridH);

    g.position.y = -0.5;
    this.scene.add(g);
    this._robotGroup = g;

    this._clock = new THREE.Clock();
  }

  _animate() {
    requestAnimationFrame(() => this._animate());
    const t = this._clock.getElapsedTime();

    // Rotate whole robot slowly
    if (this._robotGroup) {
      this._robotGroup.rotation.y = t * 0.4;
      this._robotGroup.position.y = -0.5 + Math.sin(t * 0.9) * 0.05;
    }

    // Animate legs
    if (this._legs) {
      this._legs.forEach(leg => {
        leg.group.children[0].rotation.z = leg.zSide * 0.4 + Math.sin(t * 2 + leg.phase) * 0.2;
        leg.group.children[1].rotation.z = -leg.zSide * 0.2 + Math.sin(t * 2 + leg.phase + 0.5) * 0.2;
      });
    }

    // LIDAR spin
    if (this._lidarHead) this._lidarHead.rotation.y = t * 5;

    // Eye blink
    if (this._eye) {
      this._eye.material.emissiveIntensity = 0.4 + Math.sin(t * 3) * 0.3;
    }

    // Beam pulse
    if (this._beam) {
      this._beam.material.opacity = 0.3 + Math.sin(t * 8) * 0.2;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

/* ═══════════════════════════════════════════
   MINI RADAR HUD CANVAS
══════════════════════════════════════════════ */
class MiniRadar {
  constructor() {
    this.canvas = document.getElementById('miniRadarCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.cx = this.w / 2;
    this.cy = this.h / 2;
    this.r = this.cx - 4;
    this.angle = 0;
    this.blips = [
      { a: 0.4, d: 0.6, t: 0 }, { a: 1.2, d: 0.4, t: 0 },
      { a: 2.3, d: 0.75, t: 0 }, { a: 4.1, d: 0.3, t: 0 },
    ];
    this._loop();
  }

  _loop() {
    requestAnimationFrame(() => this._loop());
    this.angle += 0.04;
    this._draw();
  }

  _draw() {
    const { ctx, cx, cy, r } = this;
    ctx.clearRect(0, 0, this.w, this.h);

    // Background
    ctx.fillStyle = '#050505';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Rings
    [0.3, 0.6, 1].forEach(f => {
      ctx.beginPath();
      ctx.arc(cx, cy, r * f, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,215,0,0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Cross
    ctx.strokeStyle = 'rgba(255,215,0,0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r); ctx.stroke();

    // Sweep
    const grad = ctx.createConicalGradient
      ? ctx.createConicalGradient(cx, cy, this.angle)
      : null;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.angle);
    const sweep = ctx.createLinearGradient(0, 0, r, 0);
    sweep.addColorStop(0, 'rgba(255,215,0,0.7)');
    sweep.addColorStop(1, 'rgba(255,215,0,0)');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r, -0.4, 0);
    ctx.fillStyle = sweep;
    ctx.fill();
    ctx.restore();

    // Sweep line
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = 'rgba(255,215,0,0.8)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(this.angle) * r, Math.sin(this.angle) * r);
    ctx.stroke();
    ctx.restore();

    // Blips
    this.blips.forEach(b => {
      const da = Math.abs(((b.a - this.angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2));
      if (da < 0.8) b.t = 1;
      b.t = Math.max(0, b.t - 0.008);
      if (b.t > 0) {
        const bx = cx + Math.cos(b.a) * r * b.d;
        const by = cy + Math.sin(b.a) * r * b.d;
        ctx.beginPath();
        ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,215,0,${b.t})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(bx, by, 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,215,0,${b.t * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Border
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,215,0,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

/* ═══════════════════════════════════════════
   RADAR SIMULATOR CANVAS (Full section)
══════════════════════════════════════════════ */
class RadarSimulator {
  constructor() {
    this.canvas = document.getElementById('radarCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.angle = 0;
    this.targets = [];
    this.blips = [];
    this.aiActive = false;
    this.aiMode = 'balanced';
    this.logFeed = document.getElementById('logFeed');
    this.threatEl = document.getElementById('threatLevelVal');
    this.aiLabelEl = document.getElementById('aiToggleLabel');

    this._bindControls();
    this._loop();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    const size = this.canvas.parentElement
      ? Math.min(this.canvas.parentElement.offsetWidth, 560)
      : 560;
    this.canvas.width = size;
    this.canvas.height = size;
    this.cx = size / 2;
    this.cy = size / 2;
    this.r = size / 2 - 10;
  }

  _log(msg, type = 'info') {
    if (!this.logFeed) return;
    const el = document.createElement('div');
    el.className = `log-${type}`;
    const ts = new Date().toLocaleTimeString('en', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    el.textContent = `[${ts}] ${msg}`;
    this.logFeed.prepend(el);
    while (this.logFeed.children.length > 40) {
      this.logFeed.removeChild(this.logFeed.lastChild);
    }
  }

  _spawnTarget(type) {
    const types = {
      spawn_recon:   { label: 'RECON UAV',    color: '#ffcc00', speed: 0.8, rcs: 0.5, size: 4 },
      spawn_swarm:   { label: 'SWARM UNIT',   color: '#ff8800', speed: 1.3, rcs: 0.2, size: 3 },
      spawn_stealth: { label: 'STEALTH',      color: '#aa88ff', speed: 1.0, rcs: 0.1, size: 3 },
      spawn_kamikaze:{ label: 'KAMIKAZE',     color: '#ff4444', speed: 2.0, rcs: 0.8, size: 5 },
    };
    const def = types[type] || types.spawn_recon;
    const angle = Math.random() * Math.PI * 2;
    const dist = this.r * (0.5 + Math.random() * 0.45);
    const tx = this.cx + Math.cos(angle) * dist;
    const ty = this.cy + Math.sin(angle) * dist;
    const targetAngle = Math.atan2(this.cy - ty, this.cx - tx) + (Math.random() - 0.5) * 0.8;

    this.targets.push({
      id: Date.now(),
      ...def,
      x: tx, y: ty,
      vx: Math.cos(targetAngle) * def.speed,
      vy: Math.sin(targetAngle) * def.speed,
      alive: true,
      trail: [],
    });
    this._log(`SPAWN: ${def.label} — detected on radar`, 'warn');
    this._updateThreatLevel();
  }

  _deployCountermeasure(type) {
    const living = this.targets.filter(t => t.alive);
    if (living.length === 0) { this._log('No active targets in range', 'info'); return; }

    const labels = {
      deploy_rf:    ['RF JAMMER', 'Initiating multi-band RF jamming...', 'warn'],
      deploy_laser: ['LASER', 'Firing directed energy laser...', 'err'],
      deploy_net:   ['NET DRONE', 'Deploying kinetic net interceptor...', 'ok'],
    };
    const [name, logMsg, logType] = labels[type] || ['COUNTERMEASURE', 'Deploying...', 'ok'];
    this._log(`${name}: ${logMsg}`, logType);

    // Pick the nearest target and destroy
    const target = living.reduce((a, b) => {
      const da = Math.hypot(a.x - this.cx, a.y - this.cy);
      const db = Math.hypot(b.x - this.cx, b.y - this.cy);
      return da < db ? a : b;
    });

    // Show laser beam effect
    this.blips.push({
      type: 'beam',
      x1: this.cx, y1: this.cy,
      x2: target.x, y2: target.y,
      life: 1.0,
      color: type === 'deploy_laser' ? '#ff4444' : '#FFD700',
    });

    // Explosion
    this.blips.push({
      type: 'explosion',
      x: target.x, y: target.y,
      life: 1.0, maxR: 20,
    });

    target.alive = false;
    this._log(`NEUTRALIZED: ${target.label} destroyed by ${name}`, 'ok');
    this._updateThreatLevel();
  }

  _clearAll() {
    this.targets = [];
    this.blips = [];
    this._log('CLEAR: All targets removed from radar', 'info');
    this._updateThreatLevel();
  }

  _updateThreatLevel() {
    const alive = this.targets.filter(t => t.alive).length;
    let level, color;
    if (alive === 0) { level = 'LOW'; color = '#00ff88'; }
    else if (alive <= 2) { level = 'MODERATE'; color = '#FFD700'; }
    else if (alive <= 4) { level = 'HIGH'; color = '#ff8800'; }
    else { level = 'CRITICAL'; color = '#ff4444'; }
    if (this.threatEl) { this.threatEl.textContent = level; this.threatEl.style.color = color; }
  }

  _bindControls() {
    document.querySelectorAll('.rctrl-btn[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const a = btn.dataset.action;
        if (a.startsWith('spawn_')) this._spawnTarget(a);
        else if (a.startsWith('deploy_')) this._deployCountermeasure(a);
        else if (a === 'clear_all') this._clearAll();
      });
    });

    const toggle = document.getElementById('aiSentinelToggle');
    if (toggle) {
      toggle.addEventListener('change', () => {
        this.aiActive = toggle.checked;
        if (this.aiLabelEl) {
          this.aiLabelEl.textContent = this.aiActive ? 'AI SENTINEL ACTIVE' : 'MANUAL MODE';
        }
        this._log(this.aiActive ? 'AI SENTINEL: Autonomous defense engaged' : 'AI SENTINEL: Deactivated — manual mode', this.aiActive ? 'ok' : 'warn');
      });
    }

    // AI auto-engage timer
    setInterval(() => {
      if (this.aiActive && this.targets.some(t => t.alive)) {
        this._deployCountermeasure('deploy_laser');
      }
    }, 2000);
  }

  _loop() {
    requestAnimationFrame(() => this._loop());
    this.angle += 0.025;
    this._update();
    this._draw();
  }

  _update() {
    this.targets.forEach(t => {
      if (!t.alive) return;
      t.x += t.vx;
      t.y += t.vy;
      t.trail.push({ x: t.x, y: t.y });
      if (t.trail.length > 20) t.trail.shift();

      // Bounce off circle boundary
      const dx = t.x - this.cx, dy = t.y - this.cy;
      const dist = Math.hypot(dx, dy);
      if (dist > this.r - 12) {
        const angle = Math.atan2(dy, dx);
        t.vx = -Math.cos(angle) * t.speed;
        t.vy = -Math.sin(angle) * t.speed;
      }
    });

    this.blips = this.blips.filter(b => b.life > 0);
    this.blips.forEach(b => { b.life -= 0.04; });
  }

  _draw() {
    const { ctx, cx, cy, r } = this;
    if (!ctx || !r) return;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Background
    const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    bgGrad.addColorStop(0, '#060a06');
    bgGrad.addColorStop(1, '#010301');
    ctx.fillStyle = bgGrad;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();

    // Concentric rings
    [0.25, 0.5, 0.75, 1].forEach((f, i) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r * f, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,215,0,${0.06 + i * 0.02})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Cross hairs
    ctx.strokeStyle = 'rgba(255,215,0,0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      ctx.stroke();
    }

    // Sweep glow
    ctx.save();
    ctx.translate(cx, cy);
    const trail = ctx.createConicalGradient
      ? ctx.createConicalGradient(0, 0, this.angle)
      : null;
    const sweepGrad = ctx.createLinearGradient(0, 0, r, 0);
    sweepGrad.addColorStop(0, 'rgba(0,255,80,0.35)');
    sweepGrad.addColorStop(0.7, 'rgba(0,255,80,0.08)');
    sweepGrad.addColorStop(1, 'rgba(0,255,80,0)');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r, -0.6, 0.1);
    ctx.rotate(this.angle);
    ctx.fillStyle = sweepGrad;
    ctx.fill();
    ctx.restore();

    // Sweep line
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = 'rgba(0,255,80,0.9)';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00ff50';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(this.angle) * r, Math.sin(this.angle) * r);
    ctx.stroke();
    ctx.restore();

    // Targets
    this.targets.forEach(t => {
      if (!t.alive) return;
      // Trail
      for (let i = 0; i < t.trail.length; i++) {
        const op = (i / t.trail.length) * 0.4;
        const tr = t.trail[i];
        ctx.beginPath();
        ctx.arc(tr.x, tr.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,215,0,${op})`;
        ctx.fill();
      }
      // Target blip
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
      ctx.fillStyle = t.color;
      ctx.shadowColor = t.color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Label
      ctx.fillStyle = 'rgba(255,215,0,0.9)';
      ctx.font = '9px "Share Tech Mono", monospace';
      ctx.fillText(t.label, t.x + 8, t.y - 4);
    });

    // Special effects
    this.blips.forEach(b => {
      if (b.type === 'beam') {
        ctx.save();
        ctx.globalAlpha = b.life;
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(b.x1, b.y1);
        ctx.lineTo(b.x2, b.y2);
        ctx.stroke();
        ctx.restore();
      } else if (b.type === 'explosion') {
        const pr = b.maxR * (1 - b.life);
        ctx.save();
        ctx.globalAlpha = b.life * 0.7;
        ctx.beginPath();
        ctx.arc(b.x, b.y, pr, 0, Math.PI * 2);
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.restore();
      }
    });

    // Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Border
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,255,80,0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}


/* ═══════════════════════════════════════════
   PRODUCT GRID ENGINE (SQL-driven)
══════════════════════════════════════════════ */
class ProductEngine {
  constructor() {
    this.grid = document.getElementById('productGrid');
    this.noResults = document.getElementById('noResults');
    this.sqlDisplay = document.getElementById('sqlCategoryDisplay');
    this.sqlMeta = document.getElementById('sqlMeta');
    this.activeFilter = 'all';
    this.searchQuery = '';
    this._bind();
    this.render();
  }

  _bind() {
    // Filter buttons
    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.dataset.filter;
        this._updateSQL();
        this.render();
      });
    });

    // Search
    const searchEl = document.getElementById('productSearch');
    if (searchEl) {
      searchEl.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this._updateSQL();
        this.render();
      });
    }
  }

  _updateSQL() {
    const cat = this.activeFilter === 'all' ? "'ALL'" : `'${this.activeFilter.toUpperCase()}'`;
    if (this.sqlDisplay) this.sqlDisplay.textContent = cat;
  }

  render() {
    const start = performance.now();
    const results = DB.query({
      table: 'products',
      where: { category: this.activeFilter },
      search: this.searchQuery,
    });
    const elapsed = ((performance.now() - start) / 1000).toFixed(4);

    if (this.sqlMeta) {
      this.sqlMeta.textContent = `Returning ${results.length} rows · ${elapsed}s`;
    }

    if (!this.grid) return;

    if (results.length === 0) {
      this.grid.innerHTML = '';
      this.noResults.classList.remove('hidden');
      return;
    }
    this.noResults.classList.add('hidden');

    this.grid.innerHTML = results.map(p => this._renderCard(p)).join('');

    // Animate cards in
    const cards = this.grid.querySelectorAll('.product-card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 60);
    });

    // Bind detail buttons
    this.grid.querySelectorAll('.btn-product[data-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = DB.products.find(p => p.id == btn.dataset.id);
        if (p) ProductModal.open(p);
      });
    });
  }

  _renderCard(p) {
    const tagClass = p.category === 'counter' ? 'tag-counter' : p.category === 'robotics' ? 'tag-robotics' : '';
    const metricColor = p.category === 'counter' ? 'red' : p.category === 'robotics' ? 'green' : '';
    return `
      <div class="product-card" data-category="${p.category}">
        <div class="product-card-visual">
          <span style="font-size:3.5rem;position:relative;z-index:1">${p.icon}</span>
          <span class="product-tag ${tagClass}">${p.tag}</span>
        </div>
        <div class="product-body">
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.desc}</p>
          <div class="product-footer">
            <span class="product-metric ${metricColor}">${p.keyMetric}</span>
            <button class="btn-product" data-id="${p.id}">SPECS &amp; QUOTE</button>
          </div>
        </div>
      </div>
    `;
  }
}

/* ═══════════════════════════════════════════
   SPECIFICATIONS TABLE ENGINE
══════════════════════════════════════════════ */
class SpecsTable {
  constructor() {
    this.tbody = document.getElementById('specTableBody');
    if (!this.tbody) return;
    this.expandedId = null;
    this.render();
  }

  render() {
    this.tbody.innerHTML = DB.products.map(p => this._renderRow(p)).join('');
    this.tbody.querySelectorAll('tr[data-id]').forEach(row => {
      row.addEventListener('click', () => {
        const id = parseInt(row.dataset.id);
        this._toggleExpand(id);
      });
    });
  }

  _renderRow(p) {
    const catBadge = `<span class="spec-badge badge-${p.category}">${p.category.toUpperCase()}</span>`;
    const status = `<span class="spec-badge badge-${p.status === 'ACTIVE' ? 'active' : 'classified'}">${p.status}</span>`;
    return `
      <tr data-id="${p.id}">
        <td class="td-product">${p.icon} ${p.name}</td>
        <td>${catBadge}</td>
        <td>${p.keyMetric}</td>
        <td>${p.range}</td>
        <td style="font-family:var(--mono);font-size:0.72rem;color:var(--yellow)">${p.aiLevel}</td>
        <td>${status}</td>
        <td><span class="expand-btn">+</span></td>
      </tr>
    `;
  }

  _toggleExpand(id) {
    // Remove existing expanded
    const existing = this.tbody.querySelector('.spec-expand-row');
    if (existing) existing.remove();
    if (this.tbody.querySelectorAll('.expand-btn')) {
      this.tbody.querySelectorAll('.expand-btn').forEach(b => b.textContent = '+');
    }

    if (this.expandedId === id) {
      this.expandedId = null;
      return;
    }
    this.expandedId = id;

    const p = DB.products.find(x => x.id === id);
    if (!p) return;

    const row = this.tbody.querySelector(`tr[data-id="${id}"]`);
    row.querySelector('.expand-btn').textContent = '−';

    const expandRow = document.createElement('tr');
    expandRow.className = 'spec-expand-row';
    expandRow.innerHTML = `
      <td colspan="7">
        <div class="spec-expand-grid">
          ${Object.entries(p.specs).map(([k, v]) => `
            <div class="spec-expand-item">
              <span class="spec-expand-key">${k.toUpperCase()}</span>
              <span class="spec-expand-val">${v}</span>
            </div>
          `).join('')}
        </div>
      </td>
    `;
    row.insertAdjacentElement('afterend', expandRow);
  }
}

/* ═══════════════════════════════════════════
   PRODUCT MODAL
══════════════════════════════════════════════ */
const ProductModal = {
  overlay: null,
  content: null,

  init() {
    this.overlay = document.getElementById('productModal');
    this.content = document.getElementById('modalContent');
    const closeBtn = document.getElementById('modalCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.close();
      });
    }
    // Nav CTA
    const navCta = document.getElementById('navCtaBtn');
    if (navCta) navCta.addEventListener('click', () => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  },

  open(p) {
    if (!this.overlay || !this.content) return;
    this.content.innerHTML = `
      <div class="modal-title">${p.icon} ${p.name}</div>
      <div class="modal-subtitle">${p.tag} // ${p.category.toUpperCase()}</div>
      <p class="modal-desc">${p.desc}</p>
      <div class="modal-specs-grid">
        ${Object.entries(p.specs).map(([k, v]) => `
          <div class="mspec">
            <div class="mspec-key">${k.toUpperCase()}</div>
            <div class="mspec-val">${v}</div>
          </div>
        `).join('')}
      </div>
      <button class="btn-form-submit" style="margin-top:24px" onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'});ProductModal.close()">
        <span>REQUEST CLASSIFIED BRIEFING</span><span>➤</span>
      </button>
    `;
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  close() {
    if (this.overlay) this.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};
window.ProductModal = ProductModal;

/* ═══════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════════ */
class CursorManager {
  constructor() {
    this.outer = document.getElementById('cursorOuter');
    this.inner = document.getElementById('cursorInner');
    
    this.defaults = {
      enabled: true,
      style: 'crosshair',
      color: '#FFD700',
      size: 32,
      speed: 0.15,
      ripple: true
    };
    
    this.settings = this.loadSettings();
    this.mx = window.innerWidth / 2;
    this.my = window.innerHeight / 2;
    this.ox = this.mx;
    this.oy = this.my;
    this.isHovering = false;
    
    this._initDOM();
    this._bindEvents();
    this.applySettings();
    this._loop();
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem('aeroforce_cursor_settings');
      return saved ? { ...this.defaults, ...JSON.parse(saved) } : { ...this.defaults };
    } catch(e) {
      return { ...this.defaults };
    }
  }

  saveSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    try {
      localStorage.setItem('aeroforce_cursor_settings', JSON.stringify(this.settings));
    } catch(e) {}
    this.applySettings();
  }

  resetDefaults() {
    this.saveSettings({ ...this.defaults });
  }

  applySettings() {
    const s = this.settings;
    const isFinePointer = window.matchMedia('(pointer:fine)').matches;
    
    if (s.enabled && isFinePointer) {
      document.body.classList.add('custom-cursor-enabled');
      document.body.classList.remove('custom-cursor-disabled');
      if (this.outer) this.outer.style.display = 'block';
      if (this.inner) this.inner.style.display = 'block';
    } else {
      document.body.classList.remove('custom-cursor-enabled');
      document.body.classList.add('custom-cursor-disabled');
      if (this.outer) this.outer.style.display = 'none';
      if (this.inner) this.inner.style.display = 'none';
    }

    document.documentElement.style.setProperty('--cursor-color', s.color);
    document.documentElement.style.setProperty('--cursor-size', s.size + 'px');

    if (this.outer) {
      this.outer.className = `cursor-outer preset-${s.style}`;
      this.outer.style.borderColor = s.color;
      this.outer.style.width = (this.isHovering ? s.size * 1.4 : s.size) + 'px';
      this.outer.style.height = (this.isHovering ? s.size * 1.4 : s.size) + 'px';
    }
    if (this.inner) {
      this.inner.style.background = s.color;
      this.inner.style.boxShadow = `0 0 10px ${s.color}`;
    }
  }

  _initDOM() {
    if (!this.outer) {
      this.outer = document.createElement('div');
      this.outer.className = 'cursor-outer';
      this.outer.id = 'cursorOuter';
      document.body.appendChild(this.outer);
    }
    if (!this.inner) {
      this.inner = document.createElement('div');
      this.inner.className = 'cursor-inner';
      this.inner.id = 'cursorInner';
      document.body.appendChild(this.inner);
    }
  }

  _bindEvents() {
    document.addEventListener('mousemove', e => {
      this.mx = e.clientX;
      this.my = e.clientY;
      if (this.inner && this.settings.enabled) {
        this.inner.style.left = e.clientX + 'px';
        this.inner.style.top = e.clientY + 'px';
      }
    });

    document.addEventListener('mouseover', e => {
      const target = e.target.closest('a, button, input, select, textarea, .product-card, .tech-feature-card, .robotics-card, .gallery-item, .preset-btn, .color-btn, [role="button"]');
      if (target) {
        this.isHovering = true;
        if (this.outer && this.settings.enabled) {
          const hoverSize = this.settings.size * 1.4;
          this.outer.style.width = hoverSize + 'px';
          this.outer.style.height = hoverSize + 'px';
        }
      }
    });

    document.addEventListener('mouseout', e => {
      const target = e.target.closest('a, button, input, select, textarea, .product-card, .tech-feature-card, .robotics-card, .gallery-item, .preset-btn, .color-btn, [role="button"]');
      if (target) {
        this.isHovering = false;
        if (this.outer && this.settings.enabled) {
          this.outer.style.width = this.settings.size + 'px';
          this.outer.style.height = this.settings.size + 'px';
        }
      }
    });

    document.addEventListener('click', e => {
      if (!this.settings.enabled || !this.settings.ripple) return;
      this.createRipple(e.clientX, e.clientY);
    });
  }

  createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'cursor-click-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.borderColor = this.settings.color;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  }

  _loop() {
    if (this.settings.enabled && this.outer) {
      const speed = parseFloat(this.settings.speed) || 0.15;
      this.ox += (this.mx - this.ox) * speed;
      this.oy += (this.my - this.oy) * speed;
      this.outer.style.left = this.ox + 'px';
      this.outer.style.top = this.oy + 'px';
    }
    requestAnimationFrame(() => this._loop());
  }
}



/* ═══════════════════════════════════════════
   NAVBAR SCROLL BEHAVIOR
══════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  // Active link highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
}

/* ═══════════════════════════════════════════
   TECHNOLOGY TABS
══════════════════════════════════════════════ */
function initTechTabs() {
  const tabs = document.querySelectorAll('.tech-tab[data-tech]');
  const panels = { drones: 'panelDrones', counter: 'panelCounter', ai: 'panelAI' };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      Object.values(panels).forEach(id => {
        const p = document.getElementById(id);
        if (p) p.classList.remove('active');
      });
      const panel = document.getElementById(panels[tab.dataset.tech]);
      if (panel) panel.classList.add('active');
    });
  });
}

/* ═══════════════════════════════════════════
   GSAP SCROLL ANIMATIONS
══════════════════════════════════════════════ */
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  // Hero title animation
  const heroLines = document.querySelectorAll('.hero-line');
  if (heroLines.length) {
    gsap.from(heroLines, {
      y: 80, opacity: 0, duration: 1.0, stagger: 0.15, ease: 'power4.out', delay: 0.3
    });
  }
  gsap.from('#heroDesc', { 
    y: 35, 
    opacity: 0, 
    scale: 0.98,
    duration: 1.1, 
    ease: 'power3.out', 
    delay: 0.75 
  });
  gsap.from('#heroDesc .desc-highlight', {
    opacity: 0,
    y: 10,
    duration: 0.7,
    stagger: 0.2,
    ease: 'power2.out',
    delay: 1.2
  });

  // Interactive pulse & tactical glow effect on hover
  const heroDescEl = document.getElementById('heroDesc');
  if (heroDescEl) {
    heroDescEl.addEventListener('mouseenter', () => {
      gsap.to('#heroDesc .desc-highlight', {
        textShadow: '0 0 22px rgba(255, 215, 0, 0.9)',
        scale: 1.03,
        duration: 0.25,
        stagger: 0.05,
        yoyo: true,
        repeat: 1
      });
    });
  }
  gsap.from('#heroCtaGroup', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.0 });
  gsap.from('#heroStats', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.2 });
  gsap.from('.hero-badge', { y: -20, opacity: 0, duration: 0.7, ease: 'power2.out', delay: 0.1 });
  gsap.from('.hud-element', { opacity: 0, scale: 0.95, duration: 0.8, stagger: 0.2, ease: 'power2.out', delay: 1.5 });

  // Section headers
  document.querySelectorAll('.section-header').forEach(el => {
    gsap.from(el.children, {
      scrollTrigger: { trigger: el, start: 'top 80%' },
      y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out'
    });
  });

  // Tech feature cards
  document.querySelectorAll('.tech-feature-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', delay: (i % 4) * 0.1
    });
  });

  // Robotics cards
  document.querySelectorAll('.robotics-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%' },
      y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1
    });
  });

  // Counter stats
  document.querySelectorAll('.hstat-num').forEach(el => {
    const target = parseFloat(el.dataset.target);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        let start = 0;
        const duration = 1800;
        const startTime = performance.now();
        const step = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const val = start + (target - start) * easeOutQuart(progress);
          el.textContent = target % 1 !== 0 ? val.toFixed(1) : Math.round(val);
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      once: true
    });
  });

  function easeOutQuart(x) { return 1 - Math.pow(1 - x, 4); }

  // Specs table
  gsap.from('#specTable', {
    scrollTrigger: { trigger: '#specTable', start: 'top 80%' },
    y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
  });
}

/* ═══════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-form-submit');
    const origText = btn.querySelector('span').textContent;
    btn.querySelector('span').textContent = 'TRANSMITTING...';
    btn.disabled = true;
    setTimeout(() => {
      btn.querySelector('span').textContent = '✓ INQUIRY RECEIVED — SECURE ACKNOWLEDGMENT SENT';
      btn.style.background = '#00ff88';
      setTimeout(() => {
        btn.querySelector('span').textContent = origText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3500);
    }, 1400);
  });
}

/* ═══════════════════════════════════════════
   TICKER DUPLICATE (for seamless loop)
══════════════════════════════════════════════ */
function initTicker() {
  const track = document.querySelector('.ticker-track');
  if (!track) return;
  const content = track.querySelector('.ticker-content');
  if (content && !track.querySelector('.ticker-content:nth-child(2)')) {
    const clone = content.cloneNode(true);
    track.appendChild(clone);
  }
}

/* ═══════════════════════════════════════════
   HAMBURGER MENU
══════════════════════════════════════════════ */
function initHamburger() {
  const btn = document.getElementById('hamburgerBtn');
  const links = document.getElementById('navLinks');
  let backdrop = document.getElementById('navBackdrop');

  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    backdrop.id = 'navBackdrop';
    document.body.appendChild(backdrop);
  }

  if (!btn || !links) return;

  function closeMenu() {
    links.classList.remove('mobile-open');
    btn.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openMenu() {
    links.classList.add('mobile-open');
    btn.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (links.classList.contains('mobile-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && links.classList.contains('mobile-open')) {
      closeMenu();
    }
  });
}

/* ═══════════════════════════════════════════
   BOOT SEQUENCE
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c🚁 AEROFORCE SYSTEMS // BOOT SEQUENCE INITIATED', 'color:#FFD700;font-family:monospace;font-size:14px;font-weight:bold');
  console.log('%c📡 Three.js | GSAP | SQL Engine | Radar Simulator LOADED', 'color:#00ff88;font-family:monospace;font-size:11px');

  // Three.js 3D scenes
  new HeroScene();
  new RobotScene();

  // Mini radar HUD
  new MiniRadar();

  // Radar simulator
  new RadarSimulator();

  // SQL-powered product grid
  new ProductEngine();

  // Specs table
  new SpecsTable();

  // UI
  initNavbar();
  initTechTabs();
  initGSAP();
  initContactForm();
  initTicker();
  initHamburger();

  // Modal
  ProductModal.init();

  // Custom cursor
  const cursorManager = new CursorManager();

  // Background Converter Button Handler
  document.addEventListener('click', e => {
    const btn = e.target.closest('.bg-mode-btn');
    if (btn && btn.dataset.mode && window.heroScene) {
      window.heroScene.setMode(btn.dataset.mode);
    }
  });

  console.log('%c✅ AEROFORCE SYSTEMS FULLY OPERATIONAL', 'color:#FFD700;font-family:monospace;font-size:14px;font-weight:bold');
});

/* ═══════════════════════════════════════════
   GALLERY FILTER
══════════════════════════════════════════════ */
(function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const photoItems = document.querySelectorAll('#galleryGrid .gallery-item');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Photo grid items
      photoItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || filter === cat) {
          item.classList.remove('gallery-hidden');
        } else {
          item.classList.add('gallery-hidden');
        }
      });
    });
  });
})();

/* ═══════════════════════════════════════════
   GRID MATRIX LAYOUT CONTROLLER
══════════════════════════════════════════════ */
(function initGridMatrixController() {
  const container = document.getElementById('demoGridContainer');
  const presetBtns = document.querySelectorAll('.grid-preset-btn');
  const statusText = document.getElementById('viewportStatusText');

  if (!container || !presetBtns.length) return;

  // Viewport breakpoint status update
  function updateViewportStatus() {
    if (!statusText) return;
    const width = window.innerWidth;
    let mode = 'LAPTOP / DESKTOP (WIDE)';
    if (width < 768) {
      mode = `MOBILE (${width}px < 768px)`;
    } else if (width <= 1024) {
      mode = `TABLET (${width}px: 768px–1024px)`;
    } else {
      mode = `LAPTOP / DESKTOP (${width}px > 1024px)`;
    }
    statusText.textContent = `SCREEN: ${mode}`;
  }

  updateViewportStatus();
  window.addEventListener('resize', updateViewportStatus);

  // Preset buttons handler
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const preset = btn.getAttribute('data-grid-preset');

      // Reset classes
      container.className = 'af-grid gap-md';

      if (preset === 'responsive') {
        container.classList.add('grid-responsive-1-2-4');
      } else if (preset === '12-col') {
        container.classList.add('grid-12');
      } else if (preset === 'auto-fit') {
        container.classList.add('grid-auto-fit');
      }
    });
  });
})();

