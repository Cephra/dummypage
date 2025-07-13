import Phaser from 'phaser';
import GameScene from './GameScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.FIT,
  width: 800,
  height: 600,
  parent: 'game',
  backgroundColor: '#000000',
  physics: { default: 'arcade', arcade: { gravity: { y: 0, x: 0 } } },
  scene: [GameScene],
};

new Phaser.Game(config);