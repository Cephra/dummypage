import Phaser from 'phaser';
import { constants } from './constants';
import { PlayerShip } from './entities/PlayerShip';
import { Projectile } from './entities/Projectile';
import { Starfield } from './entities/Starfield';
import { ScoreSystem } from './systems/ScoreSystem';
import { EnemySpawner } from './systems/EnemySpawner';
import { KeyboardInput } from './input/KeyboardInput';
import { TouchInput } from './input/TouchInput';

export default class GameScene extends Phaser.Scene {
  private inputType!: KeyboardInput | TouchInput;
  private player!: PlayerShip;
  private projectiles!: Phaser.Physics.Arcade.Group;
  private starfield!: Starfield;
  private scoreSystem!: ScoreSystem;
  private enemySpawner!: EnemySpawner;

  constructor() {
    super('GameScene');
  }

  create(): void {
    // choose input based on touch support
    this.inputType = this.sys.game.device.input.touch
      ? new TouchInput(this)
      : new KeyboardInput(this);

    // visuals
    this.starfield = new Starfield(this);

    const startX = this.scale.width / 2;
    const startY = this.scale.height - constants.bottomMargin;
    this.player = new PlayerShip(this, startX, startY, this.inputType);

    // projectile pool
    this.projectiles = Projectile.createPool(this);

    // systems
    this.scoreSystem = new ScoreSystem(this);
    this.enemySpawner = new EnemySpawner(this, this.player, this.scoreSystem);

    // collisions
    this.physics.add.overlap(
      this.player,
      this.enemySpawner.getGroup(),
      () => this.gameOver(),
      undefined,
      this
    );
    this.physics.add.overlap(
      this.projectiles,
      this.enemySpawner.getGroup(),
      (proj, enemy) => {
        proj.destroy();
        enemy.destroy();
        this.scoreSystem.addPoints(constants.pointsPerHit);
      },
      undefined,
      this
    );
    
    this.scale.on('resize', (gameSize: Phaser.Structs.Size) => {
      const { width, height } = gameSize;

      // resize starfield
      this.starfield.setSize(width, height);

      // move score
      this.scoreSystem.setPosition(10, 10);

      // reposition the player
      this.player.setPosition(
        width  / 2,
        height - constants.bottomMargin
      );

      // (and camera/world bounds if you’re using them)
      this.physics.world.setBounds(0, 0, width, height);
      this.cameras.main.setBounds(0, 0, width, height);
    });
  }

  update(): void {
    this.starfield.update();
    this.player.update();

    if (this.inputType.shoot) {
      this.spawnProjectile();
      this.inputType.shoot = false;
    }
  }

  private spawnProjectile(): void {
    const { x, y } = this.player;
    const proj = this.projectiles.get(x, y - 16) as Projectile;
    if (!proj) return;
    proj.setActive(true).setVisible(true);
    (proj.body as Phaser.Physics.Arcade.Body).enable = true;
    proj.reset(x, y - 16);
  }

  private gameOver(): void {
    this.scene.restart();
  }
}