import { Scene } from 'phaser';

export class aviatorScene extends Scene {
  private aviator!: Phaser.GameObjects.Sprite;
  private isPlaneFlyVertical: boolean = false;
  private isPlaneFlyHorizontal: boolean = false;
  private trail!: Phaser.GameObjects.Image;
  private planeSpeedX!: number;
  private trailSpeedX!: number;

  private planePositionY!: number;
  private planePositionX: number = 0;
  private trailPositionX!: number;
  private trailPositionY!: number;
  private trailWidth!: number;
  private trailHeight!: number;
  //   private planePositionY: number = 500;
  //   private planePositionX: number = 150;
  //   private trailPositionX: number = -95;
  //   private trailPositionY: number = 535;

  constructor() {
    super({ key: 'aviatorScene' });
  }

  preload(): void {
    this.load.image('trail', 'baloon/assets/trail.png');
    this.load.spritesheet('plane', 'baloon/assets/plane@3x.png', {
      frameWidth: 300,
      frameHeight: 180,
    });
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    switch (true) {
      case width < 314:
        this.trailWidth = width;
        this.trailHeight = 40;
        this.trailPositionX = -220;
        this.trailPositionY = -570;
        this.trailSpeedX = 0.55;
        this.planeSpeedX = 0.55;
        this.planePositionY = -600;
        break;
      case width < 335:
        this.trailWidth = width;
        this.trailHeight = 40;
        this.trailPositionX = -260;
        this.trailPositionY = -570;
        this.trailSpeedX = 0.55;
        this.planePositionY = -600;
        this.planeSpeedX = 0.55;
        break;
      case width < 351:
        this.trailWidth = width;
        this.trailHeight = 60;
        this.trailPositionX = -240;
        this.trailPositionY = -560;
        this.trailSpeedX = 0.55;
        this.planePositionY = -600;
        this.planeSpeedX = 0.55;
        break;

      case width === 365 && height === 657:
        this.trailWidth = width;
        this.trailHeight = 60;
        this.trailPositionX = -260;
        this.trailPositionY = -560;
        this.trailSpeedX = 0.55;
        this.planePositionY = -600;
        this.planeSpeedX = 0.55;
        break;
      case width < 366:
        this.trailWidth = width;
        this.trailHeight = 60;
        this.trailPositionX = -260;
        this.trailPositionY = -560;
        this.trailSpeedX = 0.55;
        this.planePositionY = -600;
        this.planeSpeedX = 0.55;
        break;
      case width < 381:
        this.trailWidth = width;
        this.trailHeight = 60;
        this.trailPositionX = -260;
        this.trailPositionY = -560;
        this.trailSpeedX = 0.55;
        this.planePositionY = -600;
        this.planeSpeedX = 0.55;
        break;
      case width < 390:
        this.trailWidth = width;
        this.trailHeight = 60;
        this.trailPositionX = -240;
        this.trailPositionY = -560;
        this.trailSpeedX = 0.55;
        this.planePositionY = -600;
        this.planeSpeedX = 0.55;
        break;
      case width < 405:
        this.trailWidth = width;
        this.trailHeight = 60;
        this.trailPositionX = -260;
        this.trailPositionY = -565;
        this.trailSpeedX = 0.55;
        this.planePositionY = -600;
        this.planeSpeedX = 0.55;
        break;
      case width < 480:
        this.trailWidth = width;
        this.trailHeight = 60;
        this.trailPositionX = -260;
        this.trailPositionY = -565;
        this.trailSpeedX = 0.55;
        this.planePositionY = -600;
        this.planeSpeedX = 0.55;
        break;
      case width < 580:
        this.trailWidth = width;
        this.trailHeight = 60;
        this.trailPositionX = -310;
        this.trailPositionY = -575;
        this.trailSpeedX = 0.55;
        this.planePositionY = -600;
        this.planeSpeedX = 0.55;
        break;
      case width < 781:
        this.trailWidth = width;
        this.trailHeight = 60;
        this.trailPositionX = -420;
        this.trailPositionY = -485;
        this.trailSpeedX = 1.2;
        this.planePositionY = -500;
        this.planeSpeedX = 1.2;
        break;
      case width < 821:
        this.trailWidth = width;
        this.trailHeight = 60;
        this.trailPositionX = -450;
        this.trailPositionY = -485;
        this.trailSpeedX = 1.2;
        this.planePositionY = -500;
        this.planeSpeedX = 1.2;
        break;
      case width < 861:
        this.trailWidth = width;
        this.trailHeight = 60;
        this.trailPositionX = -475;
        this.trailPositionY = -485;
        this.trailSpeedX = 1.2;
        this.planePositionY = -500;
        this.planeSpeedX = 1.2;
        break;
      case width < 913:
        this.trailWidth = width;
        this.trailHeight = 60;
        this.trailPositionX = -500;
        this.trailPositionY = -1290;
        this.trailSpeedX = 1.2;
        this.planePositionY = -500;
        this.planeSpeedX = 1.2;
        break;
      case width === 950 && height === 520:
        this.trailWidth = width;
        this.trailHeight = 60;
        this.trailPositionX = -530;
        this.trailPositionY = -590;
        this.trailSpeedX = 1.2;
        this.planePositionY = -600;
        this.planeSpeedX = 1.2;
        break;
      default:
        this.trailWidth = width;
        this.trailHeight = 60;
        this.trailPositionX = -530;
        this.trailPositionY = -595;
        this.trailSpeedX = 1.2;
        this.planePositionY = -600;
        this.planeSpeedX = 1.2;

        break;
    }

    this.aviator = this.add.sprite(
      this.planePositionX,
      this.planePositionY,
      'plane'
    );
    this.aviator.setDisplaySize(100, 50);
    this.aviator.setOrigin(0.5, 0.5);
    this.aviator.setDepth(9);
    if (!this.anims.exists('plane_anim')) {
      this.anims.create({
        key: 'plane_anim',
        frames: this.anims.generateFrameNumbers('plane', { start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1,
      });
    }
    this.aviator.anims.play('plane_anim');

    this.trail = this.add.image(
      this.trailPositionX,
      this.trailPositionY,
      'trail'
    );
    this.trail.setDisplaySize(this.trailWidth, this.trailHeight);
    this.trail.setAngle(5);
    this.trail.setDepth(9);
    this.stopPlane();
  }

  override update(): void {
    if (this.isPlaneFlyVertical) {
      this.aviator.y += 1;
      this.trail.y += 1;
      if (this.aviator.y >= -100 && this.isPlaneFlyHorizontal) {
        this.aviator.x += this.planeSpeedX;
        this.trail.x += this.trailSpeedX;
      }
    }
  }

  startPlane() {
    this.isPlaneFlyVertical = true;
    this.isPlaneFlyHorizontal = true;
  }

  stopPlane() {
    this.isPlaneFlyVertical = false;
    this.isPlaneFlyHorizontal = false;
  }
  reset() {
    this.scene.restart();
  }
}
