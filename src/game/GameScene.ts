import Phaser from 'phaser';
import { PlayerShip } from './entities/PlayerShip';
import { EnemyShip } from './entities/EnemyShip';
import { Projectile } from './entities/Projectile';

export default class GameScene extends Phaser.Scene {
  private spawnInterval = 2000;
  private stars!: Phaser.GameObjects.TileSprite;
  private player!: PlayerShip;
  private enemies!: Phaser.Physics.Arcade.Group;
  private projectiles!: Phaser.Physics.Arcade.Group;
  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;

  constructor() {
    super('GameScene');
  }

  preload(): void {
    // Generate textures
    PlayerShip.generateTexture(this);
    EnemyShip.generateTexture(this);
    Projectile.generateTexture(this);
  }

  create(): void {
    // Reset score
    this.score = 0;
    this.registry.set('score', 0);

    // Starfield texture
    const tileSize = 64;
    const starGfx = this.add.graphics();
    for (let i = 0; i < 100; i++) {
      starGfx.fillStyle(0x00ff00);
      starGfx.fillRect(
        Phaser.Math.Between(0, tileSize - 1),
        Phaser.Math.Between(0, tileSize - 1),
        1,
        1
      );
    }
    starGfx.generateTexture('star', tileSize, tileSize);
    starGfx.destroy();
    this.stars = this.add
      .tileSprite(0, 0, this.scale.width, this.scale.height, 'star')
      .setOrigin(0)
      .setScrollFactor(0);

    // Create player
    this.player = new PlayerShip(this, 400, 500);

    // Create groups
    this.enemies = this.physics.add.group({ classType: EnemyShip, runChildUpdate: true });
    this.projectiles = Projectile.createPool(this);

    // Input
    this.input.keyboard.on('keydown-SPACE', () => this.spawnProjectile(), this);

    // Initial spawn
    this.scheduleNextEnemy();

    // Collisions
    this.physics.add.overlap(
      this.player,
      this.enemies,
      () => this.gameOver(),
      undefined,
      this
    );

    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      (proj, enemy) => {
        // Destroy both and award points
        proj.destroy();
        enemy.destroy();
        this.score += 10;
        this.registry.set('score', this.score);
        this.scoreText.setText(`Score: ${this.score}`);
      },
      undefined,
      this
    );

    // Score UI
    this.scoreText = this.add.text(10, 10, 'Score: 0', {
      fontSize: '20px',
      color: '#ffffff'
    });
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.score++;
        this.registry.set('score', this.score);
        this.scoreText.setText(`Score: ${this.score}`);
      }
    });
  }

  update(): void {
    // Scroll background
    this.stars.tilePositionY -= 0.5;
    // Update player position
    this.player.update();
  }

  /**
   * Schedule next enemy spawn based on score difficulty tiers (every 100 points)
   */
  private scheduleNextEnemy(): void {
    // Difficulty increases every 100 points
    const tier = Math.floor(this.score / 100);
    // Decrease spawn interval by 300ms per tier, min 500ms
    const interval = Phaser.Math.Clamp(2000 - tier * 300, 500, 2000);
    this.time.addEvent({
      delay: interval,
      callback: () => {
        this.spawnEnemy();
        this.scheduleNextEnemy();
      },
      callbackScope: this
    });
  }

  private spawnEnemy(): void {
    const x = Phaser.Math.Between(50, 750);
    const tier = Math.floor(this.score / 100);
    const baseSpeed = 100;
    const speedIncrement = 50;
    const speed = baseSpeed + tier * speedIncrement;
    const enemy = new EnemyShip(this, x, 0, this.player, speed);
    this.enemies.add(enemy);
  }

  private spawnProjectile(): void {
    const { x, y } = this.player;
    const proj = this.projectiles.get(x, y - 16) as Projectile;
    if (!proj) return;
    proj.setActive(true);
    proj.setVisible(true);
    (proj.body as Phaser.Physics.Arcade.Body).enable = true;
    proj.setPosition(x, y - 16);
  }

  private gameOver(): void {
    this.scene.restart();
  }
}
