import Phaser from 'phaser';
import { constants } from '../constants';

export class Starfield extends Phaser.GameObjects.TileSprite {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, scene.scale.width, scene.scale.height, 'star');
    scene.add.existing(this);
    this.setOrigin(0);
    this.setScrollFactor(0);
  }

  update(): void {
    this.tilePositionY -= constants.starScrollSpeed;
  }
}
