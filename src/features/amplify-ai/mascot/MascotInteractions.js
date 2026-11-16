/**
 * AMPLIFY AI — MASCOT INTERACTION HANDLER
 * Enables smooth mouse/touch drag rotation with damping, plus cursor-tracking parallax.
 */

export class MascotInteractions {
  constructor(domElement) {
    this.domElement = domElement;
    this.isDragging = false;
    this.previousPointerPosition = { x: 0, y: 0 };
    
    // Rotation state
    this.dragRotationY = 0;
    this.targetDragRotationY = 0;
    this.dragRotationX = 0;
    this.targetDragRotationX = 0;

    // Cursor tracking parallax
    this.mouseNormX = 0;
    this.mouseNormY = 0;
    this.targetMouseNormX = 0;
    this.targetMouseNormY = 0;

    this.initEvents();
  }

  initEvents() {
    if (!this.domElement) return;

    this.onPointerDown = this.handlePointerDown.bind(this);
    this.onPointerMove = this.handlePointerMove.bind(this);
    this.onPointerUp = this.handlePointerUp.bind(this);

    this.domElement.addEventListener('pointerdown', this.onPointerDown);
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
  }

  handlePointerDown(e) {
    this.isDragging = true;
    this.previousPointerPosition = { x: e.clientX, y: e.clientY };
  }

  handlePointerMove(e) {
    if (this.isDragging) {
      const deltaX = e.clientX - this.previousPointerPosition.x;
      const deltaY = e.clientY - this.previousPointerPosition.y;

      this.targetDragRotationY += deltaX * 0.008;
      this.targetDragRotationX = Math.max(-0.35, Math.min(0.35, this.targetDragRotationX + deltaY * 0.005));

      this.previousPointerPosition = { x: e.clientX, y: e.clientY };
    } else {
      // Calculate normalized mouse coords (-1 to +1) relative to container for head tracking
      const rect = this.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      this.targetMouseNormX = Math.max(-1, Math.min(1, x));
      this.targetMouseNormY = Math.max(-1, Math.min(1, y));
    }
  }

  handlePointerUp() {
    this.isDragging = false;
  }

  /**
   * Update damping frame-by-frame
   */
  update(delta) {
    const damping = Math.min(1.0, delta * 8.0);

    // Smooth drag rotation
    this.dragRotationY += (this.targetDragRotationY - this.dragRotationY) * damping;
    this.dragRotationX += (this.targetDragRotationX - this.dragRotationX) * damping;

    // Smooth cursor tracking
    this.mouseNormX += (this.targetMouseNormX - this.mouseNormX) * damping;
    this.mouseNormY += (this.targetMouseNormY - this.mouseNormY) * damping;

    // If not dragging for a while, slowly return towards center facing
    if (!this.isDragging) {
      this.targetDragRotationY *= 0.985;
      this.targetDragRotationX *= 0.985;
    }
  }

  getRotations() {
    return {
      yaw: this.dragRotationY + this.mouseNormX * 0.18,
      pitch: this.dragRotationX - this.mouseNormY * 0.12
    };
  }

  dispose() {
    if (!this.domElement) return;
    this.domElement.removeEventListener('pointerdown', this.onPointerDown);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
  }
}
