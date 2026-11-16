/**
 * AMPLIFY AI — SMART MASCOT ANIMATION CONTROLLER
 * Manages state transitions, crossfade interpolation, and automatic idle pose cycling.
 */

import { MASCOT_STATES, POSE_CONFIGS } from './MascotAnimations';

export class MascotController {
  constructor(initialState = MASCOT_STATES.WELCOME) {
    this.currentState = initialState;
    this.targetState = initialState;
    this.transitionProgress = 1.0;
    this.transitionDuration = 0.6; // seconds
    this.listeners = new Set();

    // Idle rotation tracking
    this.lastInteractionTime = Date.now();
    this.idleSubPoseIndex = 0;
    this.idleSubPoses = [
      { yaw: 0.0, pitch: 0.0 },
      { yaw: 0.08, pitch: -0.02 },
      { yaw: -0.08, pitch: 0.03 }
    ];
    this.idleRotationInterval = 3200; // ms
  }

  /**
   * Request state transition
   */
  setState(newState, force = false) {
    if (!POSE_CONFIGS[newState]) return;
    if (this.currentState === newState && !force) return;

    this.targetState = newState;
    this.transitionProgress = 0.0;
    this.lastInteractionTime = Date.now();
    this.notifyListeners();
  }

  /**
   * Subscribe to state changes
   */
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    this.listeners.forEach(fn => fn(this.targetState, POSE_CONFIGS[this.targetState]));
  }

  /**
   * Per-frame update (delta in seconds)
   */
  update(delta) {
    // 1. Advance crossfade
    if (this.transitionProgress < 1.0) {
      this.transitionProgress += delta / this.transitionDuration;
      if (this.transitionProgress >= 1.0) {
        this.transitionProgress = 1.0;
        this.currentState = this.targetState;
      }
    }

    // 2. Automatic Idle Rotation (PART 6.1)
    // Only triggers when the state is IDLE and visitor hasn't interacted recently
    if (this.targetState === MASCOT_STATES.IDLE) {
      const now = Date.now();
      if (now - this.lastInteractionTime > this.idleRotationInterval) {
        this.idleSubPoseIndex = (this.idleSubPoseIndex + 1) % this.idleSubPoses.length;
        this.lastInteractionTime = now;
      }
    }
  }

  /**
   * Compute blended transform values for the current frame
   */
  getBlendedTransform(time) {
    const from = POSE_CONFIGS[this.currentState] || POSE_CONFIGS.IDLE;
    const to = POSE_CONFIGS[this.targetState] || POSE_CONFIGS.IDLE;
    const t = this.easeOutCubic(this.transitionProgress);

    // Interpolate base pose values
    const pitch = from.pitch * (1 - t) + to.pitch * t;
    const roll = from.roll * (1 - t) + to.roll * t;
    let yaw = from.yaw * (1 - t) + to.yaw * t;
    const baseY = from.baseY * (1 - t) + to.baseY * t;
    const scaleMod = from.scaleMod * (1 - t) + to.scaleMod * t;

    // Add idle sub-pose micro-rotation if idle
    if (this.targetState === MASCOT_STATES.IDLE) {
      const sub = this.idleSubPoses[this.idleSubPoseIndex];
      yaw += sub.yaw * 0.5;
    }

    // Dynamic vertical breathing bob
    const bobSpeed = from.bobSpeed * (1 - t) + to.bobSpeed * t;
    const bobAmp = from.bobAmplitude * (1 - t) + to.bobAmplitude * t;
    const bobOffset = Math.sin(time * bobSpeed) * bobAmp;

    return {
      pitch,
      yaw,
      roll,
      y: baseY + bobOffset,
      scaleMod,
      auraColor: to.auraColor
    };
  }

  easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }
}
