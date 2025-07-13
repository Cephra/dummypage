import Phaser from 'phaser';

export abstract class Ship extends Phaser.Physics.Arcade.Sprite {
  protected speed: number;

  constructor(scene: Phaser.Scene, x: number, y: number, textureKey: string, speed: number) {
    super(scene, x, y, textureKey);
    this.speed = speed;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
  }

  // Each subclass should override to generate texture
  static generateTexture(scene: Phaser.Scene): void {}

  abstract update(): void;
}
