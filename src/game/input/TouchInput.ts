import Phaser from 'phaser';
import { InputController } from './InputController';

export class TouchInput implements InputController {
  public left = false;
  public right = false;
  public shoot = false;

  private activePointer: Phaser.Input.Pointer | null = null;
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    scene.input.on('pointerdown', this.onDown, this);
    scene.input.on('pointermove', this.onMove, this);
    scene.input.on('pointerup', this.onUp, this);
  }

  private onDown(p: Phaser.Input.Pointer) {
    const { width } = this.scene.scale;
    if (p.x < width / 2) {
      // Begin movement tracking
      this.activePointer = p;
      this.left = false;
      this.right = false;
    } else {
      // Shoot tap
      this.shoot = true;
    }
  }

  private onMove(p: Phaser.Input.Pointer) {
    if (p === this.activePointer) {
      const half = this.scene.scale.width / 2;
      // Map x from [0..half] → [-1..+1]
      const norm = Phaser.Math.Clamp((p.x / half) * 2 - 1, -1, 1);
      this.left  = norm < -0.2;
      this.right = norm > +0.2;
    }
  }

  private onUp(p: Phaser.Input.Pointer) {
    if (p === this.activePointer) {
      this.activePointer = null;
      this.left = this.right = false;
    } else {
      // Clear shoot after a tiny delay so update() can see it
      this.scene.time.delayedCall(50, () => (this.shoot = false));
    }
  }

  update(): void {
    // all state is event-driven
  }
}