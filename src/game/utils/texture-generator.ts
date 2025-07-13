import Phaser from 'phaser';
import { constants } from '../constants';

export function generateAllTextures(scene: Phaser.Scene): void {
  const gfx = scene.add.graphics();

  // player
  gfx.fillStyle(constants.playerColor);
  gfx.fillTriangle(0, 32, 16, 0, 32, 32);
  gfx.generateTexture('player', 32, 32);
  gfx.clear();

  // enemy
  gfx.fillStyle(constants.enemyColor);
  gfx.fillTriangle(32, 0, 16, 32, 0, 0);
  gfx.generateTexture('enemy', 32, 32);
  gfx.clear();

  // projectile
  gfx.fillStyle(constants.projectileColor);
  gfx.fillRect(0, 0, 4, 12);
  gfx.generateTexture('projectile', 4, 12);
  gfx.destroy();

  // starfield
  const starGfx = scene.add.graphics();
  starGfx.fillStyle(constants.starColor);
  for (let i = 0; i < constants.starCount; i++) {
    starGfx.fillRect(
      Phaser.Math.Between(0, constants.starTileSize - 1),
      Phaser.Math.Between(0, constants.starTileSize - 1),
      1,
      1
    );
  }
  starGfx.generateTexture('star', constants.starTileSize, constants.starTileSize);
  starGfx.destroy();
}
