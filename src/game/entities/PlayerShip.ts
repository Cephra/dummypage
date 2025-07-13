import { Ship } from './Ship';
import { InputController } from '../input/InputController';
import { constants } from '../constants';

export class PlayerShip extends Ship {
  private inputController: InputController;

  constructor(scene: Phaser.Scene, x: number, y: number, input: InputController) {
    super(scene, x, y, 'player', constants.playerSpeed);
    this.inputController = input;
    this.setDragX(constants.playerDrag);
  }

  update(): void {
    this.inputController.update();
    if (this.inputController.left) this.setVelocityX(-this.speed);
    else if (this.inputController.right) this.setVelocityX(this.speed);
    else this.setVelocityX(0);
  }
}