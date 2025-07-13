import Phaser from 'phaser';

export abstract class Ship extends Phaser.Physics.Arcade.Sprite {
  protected speed: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, speed: number) {
    super(scene, x, y, texture);
    this.speed = speed;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
  }

  abstract update(): void;
}