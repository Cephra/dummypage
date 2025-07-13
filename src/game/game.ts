import Phaser from 'phaser';
import BootScene from './BootScene';
import GameScene from './GameScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#000000',
  // *** NEW SCALE SETTINGS ***
  scale: {
    mode: Phaser.Scale.FIT,             // or Phaser.Scale.ENVELOP
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,                         // your game’s “virtual” width
    height: 600,                        // your game’s “virtual” height
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { x: 0, y: 0 } },
  },
  scene: [BootScene, GameScene],
};

new Phaser.Game(config);
