import Phaser from 'phaser';
import BootScene from './BootScene';
import GameScene from './GameScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#060606',
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { x: 0, y: 0 } },
  },
  input: {
    activePointers: 2,
  },
  scene: [BootScene, GameScene],
};

new Phaser.Game(config);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register(new URL("service-worker.ts", import.meta.url))
      .then((reg) => console.log("ServiceWorker registered:", reg))
      .catch((err) => console.error("ServiceWorker registration failed:", err));
  });
}