import Phaser from 'phaser';

export interface InputController {
  left: boolean;
  right: boolean;
  shoot: boolean;
  update(): void;
}

export class KeyboardInput implements InputController {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  public left = false;
  public right = false;
  public shoot = false;

  constructor(scene: Phaser.Scene) {
    this.cursors = scene.input.keyboard.createCursorKeys();
    scene.input.keyboard.on('keydown-SPACE', () => (this.shoot = true));
  }

  update(): void {
    this.left = this.cursors.left?.isDown ?? false;
    this.right = this.cursors.right?.isDown ?? false;
  }
}
