import Phaser from 'phaser';
import { Ship } from './Ship';

export class PlayerShip extends Ship {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player', 300);
    this.setDragX(600);
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  static generateTexture(scene: Phaser.Scene): void {
    const gfx = scene.add.graphics();
    gfx.fillStyle(0x00ff00);
    gfx.fillTriangle(0, 32, 16, 0, 32, 32);
    gfx.generateTexture('player', 32, 32);
    gfx.destroy();
  }

  update(): void {
    if (this.cursors.left?.isDown) this.setVelocityX(-this.speed);
    else if (this.cursors.right?.isDown) this.setVelocityX(this.speed);
    else this.setVelocityX(0);
  }
}

