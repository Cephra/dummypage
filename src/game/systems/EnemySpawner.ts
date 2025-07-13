import Phaser from 'phaser';
import { EnemyShip } from '../entities/EnemyShip';
import { PlayerShip } from '../entities/PlayerShip';
import { ScoreSystem } from './ScoreSystem';
import { constants } from '../constants';

export class EnemySpawner {
  private scene: Phaser.Scene;
  private player: PlayerShip;
  private scoreSystem: ScoreSystem;
  private enemies: Phaser.Physics.Arcade.Group;

  constructor(
    scene: Phaser.Scene,
    player: PlayerShip,
    scoreSystem: ScoreSystem
  ) {
    this.scene = scene;
    this.player = player;
    this.scoreSystem = scoreSystem;
    this.enemies = scene.physics.add.group({
      classType: EnemyShip,
      maxSize: constants.maxEnemies,
      runChildUpdate: true,
    });
    this.scheduleNext();
  }

  private scheduleNext(): void {
    const tier = Math.floor(
      this.scoreSystem.getScore() / constants.scorePerTier
    );
    const interval = Phaser.Math.Clamp(
      constants.baseInterval - tier * constants.intervalDecrement,
      constants.minInterval,
      constants.baseInterval
    );
    this.scene.time.addEvent({
      delay: interval,
      callback: () => {
        this.spawn();
        this.scheduleNext();
      },
      callbackScope: this,
    });
  }

  private spawn(): void {
    const x = Phaser.Math.Between(
      constants.enemySpawnMinX,
      constants.enemySpawnMaxX
    );
    const tier = Math.floor(
      this.scoreSystem.getScore() / constants.scorePerTier
    );
    const speed =
      constants.enemyBaseSpeed + tier * constants.enemySpeedIncrement;

    // Obtain an enemy from the pool (or create if none free)
    const enemy = this.enemies.get(x, 0, 'enemy') as EnemyShip;
    if (!enemy) {
      return;
    }

    // Reactivate and configure
    enemy.setActive(true).setVisible(true);
    (enemy.body as Phaser.Physics.Arcade.Body).enable = true;
    enemy.setTarget(this.player);
    enemy.setSpeed(speed);
  }

  public getGroup(): Phaser.Physics.Arcade.Group {
    return this.enemies;
  }
}
