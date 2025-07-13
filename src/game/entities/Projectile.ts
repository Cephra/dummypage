import Phaser from 'phaser';

export class Projectile extends Phaser.Physics.Arcade.Sprite {
  private speed: number = 500;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'projectile');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(false);
  }

  static generateTexture(scene: Phaser.Scene): void {
    const gfx = scene.add.graphics();
    gfx.fillStyle(0xffffff);
    gfx.fillRect(0, 0, 4, 12);
    gfx.generateTexture('projectile', 4, 12);
    gfx.destroy();
  }

  // Create and return a physics group for projectiles
  static createPool(scene: Phaser.Scene, maxSize: number = 50): Phaser.Physics.Arcade.Group {
    return scene.physics.add.group({
      classType: Projectile,
      maxSize,
      runChildUpdate: true
    });
  }

  update(): void {
    this.setVelocityY(-this.speed);
    if (this.y < -this.height) this.destroy();
  }
}
