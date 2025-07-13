import Phaser from 'phaser';
import { generateAllTextures } from './utils/texture-generator';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload(): void {
    generateAllTextures(this);
  }

  create(): void {
    this.scene.start('GameScene');
  }
}
