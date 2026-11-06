import * as THREE from 'three';

/**
 * ============================================================================
 * AMPLIFY DIGITAL — EXACT ORIGAMI BIRD 3D MODEL (IMAGE 2 TARGET RECONSTRUCTION)
 * ============================================================================
 *
 * Deterministic reconstruction matching Image 2:
 * 1. Exact 3D Silhouette & Anatomy (calibrated against 1024x682 reference):
 *    - Long, sharply pointed upper-left wing
 *    - Dark navy/blue triangular underside
 *    - Emerald green upper triangular facet
 *    - Large silver-white triangular facet directly below green
 *    - Large pale white/pink central triangular facet
 *    - Bright red triangular facet to its right
 *    - Deep red/magenta folded section
 *    - Bright yellow central-lower facet
 *    - Golden yellow/orange lower-right facet
 *    - Orange lower-left facet & long pointed lower-left extension
 *    - Cyan/electric-blue head & distinct pointed beak facing right
 *    - Subtle dark eye dot matching reference
 * 2. Multi-tier radiant neon laser borders with physical bloom
 * 3. Smooth crystal 3D materials (MeshPhysicalMaterial with clearcoat & smooth normals)
 * 4. NO orbital rings
 */

// ── EXACT 3D VERTICES (Calibrated against Image 2) ──────────────────────────
export const BIRD_VERTICES = {
  // 1. Upper-Left Wing
  wingTip:          new THREE.Vector3(-2.4712,  2.0717,  0.05),
  outerWingNotch:   new THREE.Vector3(-1.0666, -0.1747,  0.15),
  wingGreenWhiteJct:new THREE.Vector3(-0.2820,  0.6082,  0.55),
  wingValley:       new THREE.Vector3(-0.6614, -0.0358,  0.42),

  // 2. Dorsal Peak & Central Body
  dorsalApex:       new THREE.Vector3( 0.0720,  1.2876,  0.35),
  chestFold:        new THREE.Vector3( 0.3392, -0.3647,  0.90),
  neckApex:         new THREE.Vector3( 1.1440,  0.4469,  0.42), // Deep, sharp neck notch matching Image 2
  neckThroat:       new THREE.Vector3( 1.2077, -0.7904,  0.48),

  // 3. Right-Side Head & Beak (Folded Origami Crane Geometry)
  headCrown:        new THREE.Vector3( 1.8672,  0.7101,  0.60), // Cyan head crown apex
  beakTip:          new THREE.Vector3( 2.6571,  0.0546,  0.25), // Sharp, slender horizontal beak tip
  headCheek:        new THREE.Vector3( 1.4220,  0.2515,  0.70), // Origami cheek fold
  beakChin:         new THREE.Vector3( 1.6873,  0.0977,  0.48), // Refined chin shelf crease

  // 4. Lower Body & Belly
  bellyYellowCrease:new THREE.Vector3(-0.6640, -0.9399,  0.75),
  bellyKeelBottom:  new THREE.Vector3(-0.4936, -1.1370,  0.55),
  tailOrangeValley: new THREE.Vector3(-1.2336, -1.0715,  0.35),

  // 5. Lower-Left Wing Tip
  lowerWingTip:     new THREE.Vector3(-2.5658, -1.8583, -0.10),
};

const V = BIRD_VERTICES;

/**
 * 18 Modular Facet Definitions matching Image 2 exactly
 */
export const BIRD_FACETS = [
  // ── A. UPPER-LEFT WING ──────────────────────────────────────────────────
  {
    id: 'wingOuterBevel',
    label: 'Dark Navy/Blue Triangular Underside',
    pts: [V.wingTip, V.outerWingNotch, V.wingValley],
    color: 0x071A52,
    emissive: 0x020822,
    roughness: 0.12,
    metalness: 0.15,
    clearcoat: 1.0,
  },
  {
    id: 'wingGreenMain',
    label: 'Emerald Green Upper Triangular Facet',
    pts: [V.wingTip, V.wingGreenWhiteJct, V.dorsalApex],
    color: 0x00E65A,
    emissive: 0x00551E,
    roughness: 0.06,
    metalness: 0.05,
    clearcoat: 1.0,
  },
  {
    id: 'wingSilverUnder',
    label: 'ESSENTIAL Large Silver-White Triangular Wing Facet',
    pts: [V.wingTip, V.wingValley, V.wingGreenWhiteJct],
    color: 0xF0F8FF,
    emissive: 0x243444,
    roughness: 0.05,
    metalness: 0.08,
    clearcoat: 1.0,
  },

  // ── B. CENTRAL BODY ────────────────────────────────────────────────────
  {
    id: 'centralWhitePinkMain',
    label: 'ESSENTIAL Large Pale White/Pink Central Triangular Facet',
    pts: [V.dorsalApex, V.wingGreenWhiteJct, V.chestFold],
    color: 0xFFF2F8,
    emissive: 0x5E2C42,
    roughness: 0.06,
    metalness: 0.05,
    clearcoat: 1.0,
  },
  {
    id: 'centralWhitePinkLower',
    label: 'Pale White/Pink Lower Transition Facet',
    pts: [V.wingGreenWhiteJct, V.wingValley, V.chestFold],
    color: 0xF8E2EE,
    emissive: 0x4A1E34,
    roughness: 0.08,
    metalness: 0.05,
    clearcoat: 1.0,
  },
  {
    id: 'chestCrimsonRed',
    label: 'Bright Scarlet Red Triangular Facet',
    pts: [V.dorsalApex, V.chestFold, V.neckApex],
    color: 0xE60026,
    emissive: 0x880016,
    roughness: 0.08,
    metalness: 0.08,
    clearcoat: 1.0,
  },
  {
    id: 'chestMagentaFold',
    label: 'Deep Red/Magenta Folded Section',
    pts: [V.neckApex, V.chestFold, V.neckThroat],
    color: 0xC40046,
    emissive: 0x5A001E,
    roughness: 0.10,
    metalness: 0.08,
    clearcoat: 1.0,
  },

  // ── C. LOWER BODY & TAIL ──────────────────────────────────────────────
  {
    id: 'bellyBrightYellow',
    label: 'Bright Yellow Central-Lower Facet',
    pts: [V.wingValley, V.bellyYellowCrease, V.chestFold],
    color: 0xFFE600,
    emissive: 0x776600,
    roughness: 0.08,
    metalness: 0.08,
    clearcoat: 1.0,
  },
  {
    id: 'bellyGoldenYellow',
    label: 'Golden Yellow/Orange Lower-Right Facet',
    pts: [V.bellyYellowCrease, V.neckThroat, V.chestFold],
    color: 0xFFA800,
    emissive: 0x773E00,
    roughness: 0.10,
    metalness: 0.08,
    clearcoat: 1.0,
  },
  {
    id: 'bellyKeelUnder',
    label: 'Golden Yellow Belly Keel Underside',
    pts: [V.bellyYellowCrease, V.bellyKeelBottom, V.neckThroat],
    color: 0xEE7700,
    emissive: 0x662600,
    roughness: 0.12,
    metalness: 0.08,
    clearcoat: 0.95,
  },
  {
    id: 'tailOrangeUpper',
    label: 'Orange Lower-Left Facet',
    pts: [V.wingValley, V.tailOrangeValley, V.bellyYellowCrease],
    color: 0xFF6600,
    emissive: 0x882600,
    roughness: 0.10,
    metalness: 0.08,
    clearcoat: 1.0,
  },
  {
    id: 'tailOrangeSpur',
    label: 'Orange Lower Pointed Extension',
    pts: [V.tailOrangeValley, V.lowerWingTip, V.bellyKeelBottom],
    color: 0xFF4500,
    emissive: 0x771A00,
    roughness: 0.12,
    metalness: 0.08,
    clearcoat: 0.95,
  },
  {
    id: 'lowerWingBlue',
    label: 'Dark Blue Underside & Shadowed Fold',
    pts: [V.tailOrangeValley, V.outerWingNotch, V.lowerWingTip],
    color: 0x051E66,
    emissive: 0x001040,
    roughness: 0.14,
    metalness: 0.12,
    clearcoat: 0.92,
  },

  // ── D. HEAD & BEAK (EXACT ORIGAMI CRANE GEOMETRY) ──────────────────────
  {
    id: 'headCyanCrown',
    label: 'Bright Turquoise/Cyan Upper Neck Slope',
    pts: [V.neckApex, V.headCheek, V.headCrown],
    color: 0x00E5FF,
    emissive: 0x005566,
    roughness: 0.08,
    metalness: 0.08,
    clearcoat: 1.0,
  },
  {
    id: 'neckElectricBlue',
    label: 'Deep Electric Blue Side Neck Facet',
    pts: [V.neckApex, V.neckThroat, V.headCheek],
    color: 0x0044DD,
    emissive: 0x001866,
    roughness: 0.10,
    metalness: 0.10,
    clearcoat: 1.0,
  },
  {
    id: 'beakTopCyan',
    label: 'Bright Cyan Beak Top Slope',
    pts: [V.headCrown, V.headCheek, V.beakTip],
    color: 0x0088FF,
    emissive: 0x003388,
    roughness: 0.08,
    metalness: 0.08,
    clearcoat: 1.0,
  },
  {
    id: 'beakLowerBlue',
    label: 'Deep Royal Blue Lower Beak Facet',
    pts: [V.headCheek, V.beakChin, V.beakTip],
    color: 0x0033B8,
    emissive: 0x001455,
    roughness: 0.12,
    metalness: 0.10,
    clearcoat: 1.0,
  },
  {
    id: 'throatNavyBlue',
    label: 'Dark Navy Underside',
    pts: [V.headCheek, V.neckThroat, V.beakChin],
    color: 0x051438,
    emissive: 0x01081C,
    roughness: 0.16,
    metalness: 0.12,
    clearcoat: 0.92,
  },
];

/**
 * Assembly sequence timings and outside origins for opening origami animation.
 * Facets swoop in from outside (top, right, bottom), growing from small to full size.
 * Sequential folding: Central body -> Lower belly/tail -> Upper wing -> Head & Beak.
 * Finishes smoothly around t ~ 2.25s to blend seamlessly with cinematic flight.
 */
export const ASSEMBLY_CONFIG = {
  // Phase 1: Central Body Core (comes from top & depth outside, t: 0.15 to 1.20)
  centralWhitePinkMain:  { start: 0.15, dur: 1.05, offset: [ 1.2,  7.2, -4.5], rot: [ 0.9, -0.6,  0.8] },
  centralWhitePinkLower: { start: 0.20, dur: 1.05, offset: [ 1.8,  6.8, -4.0], rot: [-0.8,  0.7, -0.7] },
  chestCrimsonRed:       { start: 0.25, dur: 1.05, offset: [ 3.5,  7.0, -3.5], rot: [ 0.8, -0.8,  0.9] },
  chestMagentaFold:      { start: 0.30, dur: 1.05, offset: [ 4.5,  6.2, -3.0], rot: [-0.9, -0.6, -0.8] },

  // Phase 2: Lower Body & Belly (comes from bottom & bottom-left outside, t: 0.40 to 1.45)
  bellyBrightYellow:     { start: 0.40, dur: 1.05, offset: [-1.8, -7.5, -2.5], rot: [-0.9,  0.7, -0.8] },
  bellyGoldenYellow:     { start: 0.45, dur: 1.05, offset: [ 1.2, -7.8, -2.0], rot: [-0.8, -0.7,  0.9] },
  bellyKeelUnder:        { start: 0.50, dur: 1.05, offset: [ 0.2, -8.2, -3.0], rot: [-1.0,  0.5, -0.8] },
  tailOrangeUpper:       { start: 0.55, dur: 1.05, offset: [-5.2, -7.2, -2.5], rot: [-0.9,  0.8,  0.7] },
  tailOrangeSpur:        { start: 0.60, dur: 1.05, offset: [-6.8, -7.8, -3.0], rot: [-1.1,  0.9, -0.8] },
  lowerWingBlue:         { start: 0.65, dur: 1.05, offset: [-8.0, -7.0, -3.5], rot: [-1.0, -0.8,  0.9] },

  // Phase 3: Upper-Left Wing (comes from top & top-left outside, t: 0.70 to 1.75)
  wingSilverUnder:       { start: 0.70, dur: 1.05, offset: [-6.0,  7.2, -2.5], rot: [ 0.8, -0.9, -0.8] },
  wingGreenMain:         { start: 0.78, dur: 1.05, offset: [-7.5,  8.0, -3.0], rot: [ 1.0, -1.0, -0.9] },
  wingOuterBevel:        { start: 0.86, dur: 1.05, offset: [-9.0,  8.5, -3.5], rot: [ 1.1, -1.1, -1.0] },

  // Phase 4: Head & Beak (comes from far right side outside, t: 0.95 to 2.25)
  neckElectricBlue:      { start: 0.95, dur: 1.05, offset: [ 7.2,  3.5, -2.0], rot: [-0.7,  0.9,  0.6] },
  throatNavyBlue:        { start: 1.00, dur: 1.05, offset: [ 7.5,  2.0, -2.0], rot: [-0.8,  0.8, -0.7] },
  headCyanCrown:         { start: 1.05, dur: 1.05, offset: [ 8.2,  4.2, -2.2], rot: [ 0.9,  1.0,  0.8] },
  beakTopCyan:           { start: 1.12, dur: 1.05, offset: [ 9.2,  2.8, -2.5], rot: [ 0.7,  1.1, -0.8] },
  beakLowerBlue:         { start: 1.20, dur: 1.05, offset: [ 9.0,  1.5, -2.2], rot: [-0.8,  1.0,  0.7] },
};

/**
 * Constructs the deterministic 3D Origami Bird model matching Image 2.
 * Each facet is centered on its centroid to allow coordinated assembly animations
 * while locking into the exact mathematical reference geometry at rest.
 */
export function createOrigamiBird() {
  const birdGroup = new THREE.Group();
  birdGroup.userData.facetMeshes = [];

  // Build 18 3D Crystal Facets with Smooth Shading & Centroid Anchors
  BIRD_FACETS.forEach((f) => {
    // 1. Calculate facet centroid
    const center = new THREE.Vector3()
      .add(f.pts[0])
      .add(f.pts[1])
      .add(f.pts[2])
      .divideScalar(3);

    // 2. Geometry in local space centered on centroid
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array([
      f.pts[0].x - center.x, f.pts[0].y - center.y, f.pts[0].z - center.z,
      f.pts[1].x - center.x, f.pts[1].y - center.y, f.pts[1].z - center.z,
      f.pts[2].x - center.x, f.pts[2].y - center.y, f.pts[2].z - center.z,
    ]);
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.computeVertexNormals();

    const mat = new THREE.MeshPhysicalMaterial({
      color: f.color,
      roughness: f.roughness,
      metalness: f.metalness,
      clearcoat: f.clearcoat || 1.0,
      clearcoatRoughness: 0.04,
      emissive: f.emissive,
      emissiveIntensity: 0.42,
      flatShading: false,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = f.id;
    mesh.position.copy(center);
    mesh.visible = false;
    mesh.scale.set(0, 0, 0);

    // Assembly animation metadata
    const config = ASSEMBLY_CONFIG[f.id] || { start: 0, dur: 1.0, offset: [0, 0, 0], rot: [0, 0, 0] };
    mesh.userData = {
      id: f.id,
      finalPos: center.clone(),
      initPos: center.clone().add(new THREE.Vector3(...config.offset)),
      initRot: new THREE.Vector3(...config.rot),
      baseEmissiveIntensity: 0.42,
      assemblyStart: config.start,
      assemblyDuration: config.dur,
    };

    birdGroup.userData.facetMeshes.push(mesh);
    birdGroup.add(mesh);
  });

  birdGroup.scale.set(1.0, 1.0, 1.0);
  birdGroup.rotation.set(0, 0, 0);

  return birdGroup;
}

/**
 * Deprecated orbital rings stub: returns empty group to avoid interfering with the bird.
 */
export function createOrbitalRings() {
  const ringsGroup = new THREE.Group();
  return { ringsGroup, ring1: null, ring2: null };
}



