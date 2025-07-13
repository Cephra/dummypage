import Phaser from 'phaser';
import { constants } from '../constants';

export class Projectile extends Phaser.Physics.Arcade.Sprite {
  private speed = constants.projectileSpeed;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'projectile');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(false);
  }

  static createPool(
    scene: Phaser.Scene,
    maxSize = constants.maxProjectiles
  ): Phaser.Physics.Arcade.Group {
    return scene.physics.add.group({
      classType: Projectile,
      maxSize,
      runChildUpdate: true,
    });
  }

  reset(x: number, y: number): void {
    this.setPosition(x, y);
  }

  update(): void {
    this.setVelocityY(-this.speed);
    if (this.y < -this.height) this.destroy();
  }
}