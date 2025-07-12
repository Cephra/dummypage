import Phaser from 'phaser';
import GameScene from './GameScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  backgroundColor: '#000000',
  physics: { default: 'arcade' },
  scene: [GameScene],
};

new Phaser.Game(config);