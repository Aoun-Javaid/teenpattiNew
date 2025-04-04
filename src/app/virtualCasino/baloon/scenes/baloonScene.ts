import { Scene } from 'phaser';

export class baloonScene extends Scene {
  private balloonRed!: Phaser.GameObjects.Sprite;
  private fire!: Phaser.GameObjects.Sprite;
  private fireWidthOffset!: number;
  private fireHeightOffset!: number;
  private fireWidth!: number;
  private fireHeight!: number;
  private ballonHeightOffset!: number;
  private ballonWidthOffset!: number;
  private ballonWidth!: number;
  private ballonHeight!: number;
  private width!: number;
  private height!: number;
  sunRaysImage!: Phaser.GameObjects.Image;
  private sunRaysTween!: Phaser.Tweens.Tween;

  private movingUp: boolean = false;

  constructor() {
    super({ key: 'baloonScene' });
  }

  preload(): void {
    this.load.image('baloon', 'baloon/assets/airballoon-red.png');
    this.load.spritesheet('fire', 'baloon/assets/fire@3x.png', {
      frameWidth: 47,
      frameHeight: 90,
    });
    this.load.image('balloonRays', 'baloon/assets/icons/balloon-rays.svg');
  }

  create(): void {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    switch (true) {
      case this.width < 314:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 225;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = 150;
        this.ballonWidth = 180;
        this.ballonHeight = 255;

        break;
      case this.width < 335:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 425;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = 365;
        this.ballonWidth = 180;
        this.ballonHeight = 260;

        break;
      case this.width < 351:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 370;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = 293;
        this.ballonWidth = 180;
        this.ballonHeight = 260;

        break;
      case this.width === 365 && this.height === 657:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 314;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = 256;
        this.ballonWidth = 180;
        this.ballonHeight = 260;

        break;
      case this.width < 366:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 307;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = 230;
        this.ballonWidth = 180;
        this.ballonHeight = 260;

        break;
      case this.width < 375:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 421;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = 345;
        this.ballonWidth = 180;
        this.ballonHeight = 260;

        break;
      case this.width < 381:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 422;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = 345;
        this.ballonWidth = 180;
        this.ballonHeight = 260;
        break;
      case this.width < 395:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 422;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = 345;
        this.ballonWidth = 180;
        this.ballonHeight = 260;
        break;
      case this.width < 403:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 439;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = 362;
        this.ballonWidth = 180;
        this.ballonHeight = 260;
        break;
      case this.width < 405:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 377;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = 300;
        this.ballonWidth = 180;
        this.ballonHeight = 260;
        break;
      case this.width < 416:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 530;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = 471;
        this.ballonWidth = 180;
        this.ballonHeight = 260;
        break;

      case this.width < 480:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 464;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = 388;
        this.ballonWidth = 180;
        this.ballonHeight = 260;
        break;
      case this.width < 580:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 342;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = 283;
        this.ballonWidth = 180;
        this.ballonHeight = 260;
        break;
      case this.width < 781:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 358;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = this.height - 258;
        this.ballonWidth = 220;
        this.ballonHeight = 315;
        break;
      case this.width < 821:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 358;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = this.height - 258;
        this.ballonWidth = 220;
        this.ballonHeight = 315;
        break;
      case this.width < 861:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 358;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = this.height - 258;
        this.ballonWidth = 220;
        this.ballonHeight = 315;
        break;
      case this.width < 913:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 356;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = this.height - 260;
        this.ballonWidth = 220;
        this.ballonHeight = 315;
        break;
      case this.width === 950 && this.height === 520:
        this.fireWidthOffset = this.width / 2 - 0.5;
        this.fireHeightOffset = 356.5;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = this.height - 258;
        this.ballonWidth = 220;
        this.ballonHeight = 315;
        break;
      default:
        this.fireWidthOffset = this.width / 2;
        this.fireHeightOffset = 358;
        this.fireHeight = 30;
        this.fireWidth = 15;
        this.ballonWidthOffset = this.width / 2;
        this.ballonHeightOffset = this.height - 258;
        this.ballonWidth = 220;
        this.ballonHeight = 315;

        break;
    }

    this.sunRaysImage = this.add.image(
      this.width / 2,
      this.height / 2,
      'balloonRays'
    );
    this.sunRaysImage.setOrigin(0.5, 0.5);
    this.sunRaysImage.setAlpha(0);
    this.sunRaysImage.setScale(1.5);

    this.fire = this.add.sprite(
      this.fireWidthOffset,
      this.fireHeightOffset,
      'fire'
    );
    this.fire.setDisplaySize(this.fireWidth, this.fireHeight);
    this.fire.setOrigin(0.5, 0.5);
    this.fire.setDepth(10);

    this.balloonRed = this.add.sprite(
      this.ballonWidthOffset,
      this.ballonHeightOffset,
      'baloon'
    );
    this.balloonRed.setDisplaySize(this.ballonWidth, this.ballonHeight);
    this.balloonRed.setOrigin(0.5, 0.5);
    this.balloonRed.setDepth(11);

    this.anims.create({
      key: 'fire_anim',
      frames: this.anims.generateFrameNumbers('fire', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    this.fireStop();
  }

  override update(): void {
    if (this.movingUp) {
      this.balloonRed.y -= 20;
    } else {
      this.resetBalloon();
    }
  }

  blastBalloon() {
    this.movingUp = true;
    this.fireStop();
  }

  fireStart(): void {
    this.fire.setVisible(true);
    this.fire.anims.play('fire_anim', true);
  }

  fireStop(): void {
    this.fire.setVisible(false);
  }

  animateSunRays(): void {
    this.sunRaysImage.setAlpha(0);
    this.sunRaysImage.setAngle(0);

    this.sunRaysTween = this.tweens.add({
      targets: this.sunRaysImage,
      angle: 35,
      alpha: {
        value: 0.3,
        duration: 1000,
        ease: 'Power1',
      },
      repeat: 0,
      onComplete: () => {},
    });

    this.tweens.add({
      targets: this.sunRaysImage,
      alpha: 0,
      duration: 1000,
      ease: 'Power1',
      delay: 1000,
      onComplete: () => {},
    });
  }

  resetBalloon(): void {
    this.movingUp = false;
    if (this.balloonRed) {
      this.balloonRed.destroy();
    }
    this.balloonRed = this.add.sprite(
      this.ballonWidthOffset,
      this.ballonHeightOffset,
      'baloon'
    );
    this.balloonRed.setDisplaySize(this.ballonWidth, this.ballonHeight);
    this.balloonRed.setOrigin(0.5, 0.5);
    this.balloonRed.setDepth(11);
  }
}
