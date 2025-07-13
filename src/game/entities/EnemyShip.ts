import Phaser from 'phaser';
import { Ship } from './Ship';
import { PlayerShip } from './PlayerShip';

export class EnemyShip extends Ship {
  private target!: PlayerShip;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // Initialize with default speed; will be set later
    super(scene, x, y, 'enemy', 0);
  }

  /**
   * Set the player ship to track
   */
  public setTarget(target: PlayerShip): void {
    this.target = target;
  }

  /**
   * Update the movement speed
   */
  public setSpeed(speed: number): void {
    this.speed = speed;
  }

  update(): void {
    // Move downwards at configured speed
    this.setVelocityY(this.speed);
    // Track horizontally towards the player
    const dx = this.target.x - this.x;
    this.setVelocityX(Math.sign(dx) * this.speed);

    // Destroy if past bottom
    if (this.y > this.scene.scale.height + this.height) {
      this.destroy();
    }
  }
}
