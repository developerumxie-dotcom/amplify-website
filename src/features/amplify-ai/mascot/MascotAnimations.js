/**
 * AMPLIFY AI — 7-STATE MASCOT ANIMATION SPECIFICATION
 * Maps the 7 canonical mascot poses into procedural 3D WebGL transforms,
 * breathing cycles, tilt angles, and aura lighting.
 */

export const MASCOT_STATES = {
  WELCOME: 'WELCOME',
  IDLE: 'IDLE',
  GREETING: 'GREETING',
  LISTENING: 'LISTENING',
  THINKING: 'THINKING',
  EXPLAINING: 'EXPLAINING',
  APOLOGETIC: 'APOLOGETIC'
};

export const POSE_CONFIGS = {
  WELCOME: {
    name: 'Welcome',
    subtext: 'Pleased to meet you',
    pitch: 0.08,        // Slight respectful forward bow
    yaw: 0.0,
    roll: 0.0,
    baseY: 0.0,
    bobAmplitude: 0.03,
    bobSpeed: 2.2,
    scaleMod: 1.02,
    auraColor: '#c026d3', // Magenta glow
    image: '/models/poses/WELCOME.jpg'
  },
  IDLE: {
    name: 'Resting / Idle',
    subtext: 'Ready to assist',
    pitch: 0.0,
    yaw: 0.0,
    roll: 0.0,
    baseY: 0.0,
    bobAmplitude: 0.05,
    bobSpeed: 1.8,
    scaleMod: 1.0,
    auraColor: '#7c3aed', // Deep purple
    image: '/models/poses/IDLE.jpg'
  },
  GREETING: {
    name: 'Greeting Wave',
    subtext: 'Hello there!',
    pitch: -0.04,
    yaw: 0.12,          // Turned slightly outward for wave
    roll: 0.06,
    baseY: 0.04,
    bobAmplitude: 0.07,
    bobSpeed: 3.0,
    scaleMod: 1.03,
    auraColor: '#06b6d4', // Cyan wave energy
    image: '/models/poses/GREETING.jpg'
  },
  LISTENING: {
    name: 'Listening',
    subtext: 'Paying close attention',
    pitch: 0.12,        // Leaning in attentively
    yaw: -0.05,
    roll: 0.02,
    baseY: 0.02,
    bobAmplitude: 0.02, // Stillness for focused listening
    bobSpeed: 1.2,
    scaleMod: 1.02,
    auraColor: '#3b82f6', // Focus blue
    image: '/models/poses/LISTENING.jpg'
  },
  THINKING: {
    name: 'Thinking',
    subtext: 'Processing knowledge...',
    pitch: -0.1,        // Looking upward thoughtfully
    yaw: 0.14,
    roll: -0.08,
    baseY: -0.02,
    bobAmplitude: 0.04,
    bobSpeed: 2.0,
    scaleMod: 0.98,
    auraColor: '#f59e0b', // Golden spark of thought
    image: '/models/poses/THINKING.jpg'
  },
  EXPLAINING: {
    name: 'Explaining',
    subtext: 'Sharing insights',
    pitch: 0.05,
    yaw: 0.0,
    roll: 0.0,
    baseY: 0.03,
    bobAmplitude: 0.06,
    bobSpeed: 3.5,      // Dynamic speaking cadence
    scaleMod: 1.04,
    auraColor: '#ec4899', // Vibrant magenta
    image: '/models/poses/EXPLAINING.jpg'
  },
  APOLOGETIC: {
    name: 'Apologetic',
    subtext: 'Connecting with team',
    pitch: 0.15,        // Respectful downward head tilt
    yaw: 0.0,
    roll: 0.04,
    baseY: -0.04,
    bobAmplitude: 0.02,
    bobSpeed: 1.4,
    scaleMod: 0.96,
    auraColor: '#f97316', // Warm amber
    image: '/models/poses/APOLOGETIC.jpg'
  }
};
