import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Triangle;

  constructor() {
    super('GameScene');
  }

  preload() {
    // no assets to load—pure geometry!
  }

  create() {
    const { width, height } = this.scale;
    // Build an equilateral triangle centered at (x, y)
    this.player = this.add
      .triangle(width / 2, height - 50, 0, 50, 25, 0, 50, 50, 0x00ff00)
      .setOrigin(0.5, 0.5);
  }

  update(time: number, delta: number) {
    const cursors = this.input.keyboard.createCursorKeys();
    const speed = 300 * (delta / 1000);

    if (cursors.left.isDown)  this.player.x -= speed;
    if (cursors.right.isDown) this.player.x += speed;

    // clamp to screen
    this.player.x = Phaser.Math.Clamp(this.player.x, 25, this.scale.width - 25);
  }
}
