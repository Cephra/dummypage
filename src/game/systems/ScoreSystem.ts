import Phaser from 'phaser';

export class ScoreSystem {
  private scene: Phaser.Scene;
  private scoreText: Phaser.GameObjects.Text;
  private score = 0;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.scoreText = scene.add.text(10, 10, 'Score: 0', {
      fontSize: '20px',
      color: '#ffffff',
    });
    scene.registry.set('score', this.score);
    scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.incrementScore,
      callbackScope: this,
    });
  }

  private incrementScore(): void {
    this.score++;
    this.scene.registry.set('score', this.score);
    this.scoreText.setText(`Score: ${this.score}`);
  }

  public getScore(): number {
    return this.score;
  }

  public addPoints(points: number): void {
    this.score += points;
    this.scene.registry.set('score', this.score);
    this.scoreText.setText(`Score: ${this.score}`);
  }
}
