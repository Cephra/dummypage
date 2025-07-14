import Phaser from 'phaser';

export class ScoreSystem {
  private scene: Phaser.Scene;
  private scoreText: Phaser.GameObjects.Text;
  private highScoreText: Phaser.GameObjects.Text;

  private score = 0;
  private highScore = 0;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.highScore = scene.registry.get('highScore') ?? 0;

    this.scoreText = scene.add.text(10, 10, 'Score: 0', {
      fontSize: '20px',
      color: '#ffffff',
    });

    this.highScoreText = scene.add.text(10, 40, `High Score: ${this.highScore}`, {
      fontSize: '20px',
      color: '#ffff00',
    });

    scene.registry.set('score', this.score);
    scene.registry.set('highScore', this.highScore);

    scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.incrementScore,
      callbackScope: this,
    });
  }

  private incrementScore(): void {
    this.score++;
    this.scoreText.setText(`Score: ${this.score}`);
    this.scene.registry.set('score', this.score);

    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.scene.registry.set('highScore', this.highScore);
      this.highScoreText.setText(`High Score: ${this.highScore}`);
    }
  }

  public getScore(): number {
    return this.score;
  }

  public addPoints(points: number): void {
    this.score += points;
    this.scoreText.setText(`Score: ${this.score}`);
    this.scene.registry.set('score', this.score);

    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.scene.registry.set('highScore', this.highScore);
      this.highScoreText.setText(`High Score: ${this.highScore}`);
    }
  }

  public setPosition(x: number, y: number): void {
    this.scoreText.setPosition(x, y);
    this.highScoreText.setPosition(x, y + 30);
  }

  public get text(): Phaser.GameObjects.Text {
    return this.scoreText;
  }
}
