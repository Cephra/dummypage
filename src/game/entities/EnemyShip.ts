import Phaser from "phaser";
import { Ship } from "./Ship";
import { PlayerShip } from "./PlayerShip";
import { constants } from "../constants";

export class EnemyShip extends Ship {
  private target!: PlayerShip;

  // new evasion state
  private isEvading = false;
  private evasionDir: -1 | 1 = 1;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "enemy", 0);
    this.scheduleNextEvasion();
  }

  public setTarget(target: PlayerShip): void {
    this.target = target;
  }

  public setSpeed(speed: number): void {
    this.speed = speed;
  }

  update(): void {
    // always move down
    this.setVelocityY(this.speed);

    if (this.isEvading) {
      // dodge purely sideways
      this.setVelocityX(this.evasionDir * constants.evasionSpeed);
    } else {
      // track toward the player
      const dx = this.target.x - this.x;
      this.setVelocityX(Math.sign(dx) * this.speed);
    }

    // off-screen clean up
    if (this.y > this.scene.scale.height + this.height) {
      this.destroy();
    }
  }

  private scheduleNextEvasion(): void {
    if (!this.scene) {
      return;
    }
    const delay = Phaser.Math.Between(
      constants.evasionIntervalMin,
      constants.evasionIntervalMax,
    );
    this.scene.time.delayedCall(delay, () => {
      this.startEvasion();
    });
  }

  private startEvasion(): void {
    // don’t do anything if we’ve been destroyed
    if (!this.scene) {
      return;
    }

    this.isEvading = true;
    this.evasionDir = Phaser.Math.RND.sign() as -1 | 1;

    const duration = Phaser.Math.Between(
      constants.evasionDurationMin,
      constants.evasionDurationMax,
    );
    this.scene.time.delayedCall(duration, () => {
      this.isEvading = false;
      this.scheduleNextEvasion();
    });
  }
}
