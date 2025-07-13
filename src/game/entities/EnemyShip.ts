import Phaser from 'phaser';
import { Ship } from './Ship';
import { PlayerShip } from './PlayerShip';

export class EnemyShip extends Ship {
  private target: PlayerShip;

  constructor(scene: Phaser.Scene, x: number, y: number, target: PlayerShip, speed: number) {
    super(
      scene,
      x,
      y,
      "enemy",
      speed,
    );
    this.target = target;
    this.setInteractive();
  }

  static generateTexture(scene: Phaser.Scene): void {
    const gfx = scene.add.graphics();
    gfx.fillStyle(0xff0000);
    gfx.fillTriangle(32, 0, 16, 32, 0, 0);
    gfx.generateTexture("enemy", 32, 32);
    gfx.destroy();
  }

  update(): void {
    this.setVelocityY(this.speed);
    const dx = this.target.x - this.x;
    this.setVelocityX(Math.sign(dx) * this.speed);
    if (this.y > this.scene.scale.height + this.height) this.destroy();
  }
}
