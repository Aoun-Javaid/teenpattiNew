export class backgroundScene extends Phaser.Scene {
  private bg!: Phaser.GameObjects.Image;
  private clouds!: Phaser.GameObjects.Image;
  private sky!: Phaser.GameObjects.Image;
  private stars!: Phaser.GameObjects.TileSprite;

  private cloudHeightOffset!: number;
  private cloudWidthOffset!: number;
  private isScrolling: boolean = false;
  private scrollSpeed!: number;
  private cloudSpeed!: number;
  private currentScroll: number = 0;
  private starsPositionY!: number;
  private starsSpeed!: number;
  private starsMaxSpeed: number = 4;
  private starsIncrement: number = 0.001;
  private bgImagePositionY!: number;
  private bgImagePositionX!: number;
  private bgImageScaleX!: number;
  private bgImageScaleY!: number;

  private starsScale!: number;
  private cloudsScaleX!: number;
  private cloudsScaleY!: number;
  private skyBlue = new Phaser.Display.Color(72, 180, 219); // Sky Blue
  private darkBlue = new Phaser.Display.Color(2, 32, 89); // Dark Blue
  private hasScrolled: boolean = false;
  private backgroundTheme: number = 0;

  constructor() {
    super({ key: 'backgroundScene' });
  }

  preload(): void {
    this.load.image('background', 'baloon/assets/locationLt.png');
    this.load.image('background1', 'baloon/assets/locationLt2.png');
    this.load.image('background2', 'baloon/assets/locationLt3.png');
    this.load.image('clouds', 'baloon/assets/clouds.png');
    this.load.image('stars', 'baloon/assets/stars@2x.png');
  }

  create(): void {
    const camera = this.cameras.main;
    const { width, height } = camera;
    // console.log(width, height);

    switch (true) {
      case width < 324:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 130;
        this.bgImageScaleX = 0.216;
        this.bgImageScaleY = 0.26;
        this.starsSpeed = 1;
        this.starsScale = 0.5;
        this.cloudHeightOffset = 695;
        this.cloudWidthOffset = width / 2;
        this.cloudsScaleX = 0.28;
        this.cloudsScaleY = 0.6;
        this.cloudSpeed = 0.8;

        this.scrollSpeed = 1;
        break;
      case width < 345:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 328;
        this.bgImageScaleX = 0.233;
        this.bgImageScaleY = 0.28;
        this.starsSpeed = 1;
        this.starsScale = 0.5;
        this.cloudHeightOffset = 528;
        this.cloudWidthOffset = width / 2;
        this.cloudsScaleX = 0.29;
        this.cloudsScaleY = 0.28;
        this.cloudSpeed = 0.8;

        this.scrollSpeed = 1;

        break;
      case width < 351:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 253;
        this.bgImageScaleX = 0.243;
        this.bgImageScaleY = 0.295;
        this.starsSpeed = 1;
        this.starsScale = 0.5;
        this.cloudHeightOffset = 432;
        this.cloudWidthOffset = width / 2;
        this.cloudsScaleX = 0.3;
        this.cloudsScaleY = 0.295;
        this.cloudSpeed = 0.8;

        this.scrollSpeed = 1;

        break;
      case width === 365 && height === 657:
        this.bgImagePositionX = width / 2.01;
        this.bgImagePositionY = 214;
        this.bgImageScaleX = 0.254;
        this.bgImageScaleY = 0.31;
        this.cloudHeightOffset = 377;
        this.cloudWidthOffset = width / 2;
        this.starsSpeed = 1;
        this.starsScale = 0.5;
        this.cloudsScaleX = 0.3;
        this.cloudsScaleY = 0.32;
        this.cloudSpeed = 0.8;

        this.scrollSpeed = 1;

        break;
      case width < 375:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 214;
        this.bgImageScaleX = 0.26;
        this.bgImageScaleY = 0.31;
        this.cloudHeightOffset = 377;
        this.cloudWidthOffset = width / 2;
        this.starsSpeed = 1;
        this.starsScale = 0.5;
        this.cloudsScaleX = 0.3;
        this.cloudsScaleY = 0.32;
        this.cloudSpeed = 0.8;

        this.scrollSpeed = 1;

        break;
      case width < 381:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 330;
        this.bgImageScaleX = 0.264;
        this.bgImageScaleY = 0.31;
        this.cloudHeightOffset = 377;
        this.cloudWidthOffset = width / 2;
        this.starsSpeed = 1;
        this.starsScale = 0.5;
        this.cloudsScaleX = 0.3;
        this.cloudsScaleY = 0.32;
        this.cloudSpeed = 0.8;

        this.scrollSpeed = 1;
        break;
      case width < 390:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 330;
        this.bgImageScaleX = 0.267;
        this.bgImageScaleY = 0.31;
        this.cloudHeightOffset = 377;
        this.cloudWidthOffset = width / 2;
        this.starsSpeed = 1;
        this.starsScale = 0.5;
        this.cloudsScaleX = 0.33;
        this.cloudsScaleY = 0.32;
        this.cloudSpeed = 0.8;

        this.scrollSpeed = 1;
        break;
      case width < 403:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 335;
        this.bgImageScaleX = 0.28;
        this.bgImageScaleY = 0.34;
        this.starsSpeed = 1;

        this.starsScale = 0.5;
        this.cloudHeightOffset = 436;
        this.cloudWidthOffset = width / 2;
        this.cloudsScaleX = 0.35;
        this.cloudsScaleY = 0.35;
        this.cloudSpeed = 0.8;

        this.scrollSpeed = 1;
        break;
      case width < 405:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 280;
        this.bgImageScaleX = 0.281;
        this.bgImageScaleY = 0.341;
        this.starsSpeed = 1;

        this.starsScale = 0.5;
        this.cloudHeightOffset = 520;
        this.cloudWidthOffset = width / 2;
        this.cloudsScaleX = 0.36;
        this.cloudsScaleY = 0.36;
        this.cloudSpeed = 0.8;

        this.scrollSpeed = 1;

        break;

      case width < 416:
        this.bgImagePositionX = width / 2.01;
        this.bgImagePositionY = 422;
        this.bgImageScaleX = 0.289;
        this.bgImageScaleY = 0.352;

        this.starsSpeed = 1;

        this.starsScale = 0.5;
        this.cloudHeightOffset = 652;
        this.cloudWidthOffset = width / 2;
        this.cloudsScaleX = 0.37;
        this.cloudsScaleY = 0.37;
        this.cloudSpeed = 0.8;

        this.scrollSpeed = 1;

        break;
      case width < 422:
        this.bgImagePositionX = width / 1.99;
        this.bgImagePositionY = 340;
        this.bgImageScaleX = 0.298;
        this.bgImageScaleY = 0.3;
        this.starsSpeed = 1;

        this.starsScale = 0.5;
        this.cloudHeightOffset = 452;
        this.cloudWidthOffset = width / 2;
        this.cloudsScaleX = 0.37;
        this.cloudsScaleY = 0.37;
        this.cloudSpeed = 0.8;

        this.scrollSpeed = 1;

        break;
      case width < 460:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 340;
        this.bgImageScaleX = 0.31;
        this.bgImageScaleY = 0.352;
        this.starsSpeed = 1;

        this.starsScale = 0.5;
        this.cloudHeightOffset = 652;
        this.cloudWidthOffset = width / 2;
        this.cloudsScaleX = 0.37;
        this.cloudsScaleY = 0.37;
        this.cloudSpeed = 0.8;

        this.scrollSpeed = 1;

        break;
      case width < 480:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 340;
        this.bgImageScaleX = 0.33;
        this.bgImageScaleY = 0.352;
        this.starsSpeed = 1;

        this.starsScale = 0.5;
        this.cloudHeightOffset = 652;
        this.cloudWidthOffset = width / 2;
        this.cloudsScaleX = 0.37;
        this.cloudsScaleY = 0.37;
        this.cloudSpeed = 0.8;
        this.scrollSpeed = 1;

        break;
      case width < 580:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 222;
        this.bgImageScaleX = 0.37;
        this.bgImageScaleY = 0.45;
        this.starsSpeed = 1;

        this.starsScale = 0.5;
        this.cloudHeightOffset = 420;
        this.cloudWidthOffset = width / 2;
        this.cloudsScaleX = 0.46;
        this.cloudsScaleY = 0.46;
        this.cloudSpeed = 0.8;
        this.scrollSpeed = 1;

        break;
      case width < 781:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 233;
        this.bgImageScaleX = 0.527;
        this.bgImageScaleY = 0.65;
        this.starsSpeed = 1;

        this.starsScale = 0.5;
        this.cloudHeightOffset = 210;
        this.cloudWidthOffset = width / 2;
        this.cloudsScaleX = 0.67;
        this.cloudsScaleY = 0.67;
        this.cloudSpeed = 1;
        this.scrollSpeed = 1.5;

        break;
      case width < 821:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 225;
        this.bgImageScaleX = 0.563;
        this.bgImageScaleY = 0.69;
        this.starsSpeed = 1;

        this.starsScale = 0.5;
        this.cloudHeightOffset = 205;
        this.cloudWidthOffset = width / 2;
        this.cloudsScaleX = 0.72;
        this.cloudsScaleY = 0.71;
        this.cloudSpeed = 1;
        this.scrollSpeed = 1.5;

        break;
      case width < 861:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 223;
        this.bgImageScaleX = 0.586;
        this.bgImageScaleY = 0.71;
        this.starsSpeed = 1;

        this.starsScale = 0.5;
        this.cloudHeightOffset = 205;
        this.cloudWidthOffset = width / 2;
        this.cloudsScaleX = 0.75;
        this.cloudsScaleY = 0.72;
        this.cloudSpeed = 1;
        this.scrollSpeed = 1.5;

        break;
      case width < 913:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 213;
        this.bgImageScaleX = 0.627;
        this.bgImageScaleY = 0.77;
        this.starsSpeed = 1;

        this.starsScale = 0.5;
        this.cloudHeightOffset = 205;
        this.cloudWidthOffset = width / 2;
        this.cloudsScaleX = 0.79;
        this.cloudsScaleY = 0.76;
        this.cloudSpeed = 1;
        this.scrollSpeed = 1.5;

        break;
      case width === 950 && height === 520:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 250;
        this.bgImageScaleX = 0.66;
        this.bgImageScaleY = 0.7;
        this.starsSpeed = 1;

        this.starsScale = 0.5;
        this.cloudHeightOffset = 185;
        this.cloudWidthOffset = width / 2;
        this.cloudsScaleX = 0.84;
        this.cloudsScaleY = 0.82;
        this.cloudSpeed = 1;
        this.scrollSpeed = 1.5;

        break;
      default:
        this.bgImagePositionX = width / 2;
        this.bgImagePositionY = 210;
        this.bgImageScaleX = 0.71;
        this.bgImageScaleY = 1;
        this.starsSpeed = 1;

        this.starsScale = 0.5;
        this.cloudHeightOffset = 185;
        this.cloudWidthOffset = width / 2;
        this.cloudsScaleX = 0.84;
        this.cloudsScaleY = 0.82;
        this.cloudSpeed = 1;
        this.scrollSpeed = 1.5;
    }
    if (this.backgroundTheme === 0) {
      this.bg = this.add.image(
        this.bgImagePositionX,
        this.bgImagePositionY,
        'background'
      );
    } else if (this.backgroundTheme === 1) {
      this.bg = this.add.image(
        this.bgImagePositionX,
        this.bgImagePositionY,
        'background1'
      );
    } else {
      this.bg = this.add.image(
        this.bgImagePositionX,
        this.bgImagePositionY,
        'background2'
      );
    }

    this.bg.setScale(this.bgImageScaleX, this.bgImageScaleY);

    this.stars = this.add.tileSprite(0, 0, width * 4, height * 3, 'stars');
    this.stars.setOrigin(0, 0);
    this.stars.setDepth(0);
    this.stars.setScale(this.starsScale);
    this.clouds = this.add
      .image(this.cloudWidthOffset, height - this.cloudHeightOffset, 'clouds')
      .setOrigin(0.5, 1);
    this.clouds.setScale(this.cloudsScaleX, this.cloudsScaleY);
    this.clouds.setDepth(0);
    this.stars.setVisible(false);
  }

  override update(time: number, delta: number): void {
    const camera = this.cameras.main;
    const { width, height } = camera;

    if (width < 880) {
      if (this.bg.y >= 1450) {
        this.cameras.main.setBackgroundColor(0x48b4db);
      }
      if (this.bg.y >= 1600) {
        this.stars.setVisible(true);
      }
    } else {
      if (this.bg.y >= 1450) {
        this.cameras.main.setBackgroundColor(0x48b4db);
      }
      if (this.bg.y >= 1950) {
        this.stars.setVisible(true);
      }
    }

    if (this.isScrolling) {
      const cameraHeight = this.cameras.main.height;
      this.bg.y += this.scrollSpeed;
      this.clouds.y += this.cloudSpeed;

      if (this.bg.y > 1450) {
        if (this.starsSpeed < this.starsMaxSpeed) {
          this.starsSpeed = this.starsSpeed;
          this.starsSpeed += this.starsIncrement;
          this.stars.setTilePosition(
            0,
            this.stars.tilePositionY - this.starsSpeed
          );
        } else {
          this.stars.setTilePosition(
            0,
            this.stars.tilePositionY - this.starsSpeed
          );
        }
      }

      this.currentScroll += this.scrollSpeed;

      // console.log(this.stars.y, 'stars.y');
      // console.log(this.bg.y, 'bg.y');
    }

    const y = this.bg.y;

    let step;

    if (width < 540) {
      step = Phaser.Math.Clamp((y - 1600) / (2700 - 1600), 0, 1);
    } else if (width === 1014 && height === 520) {
      step = Phaser.Math.Clamp((y - 2300) / (3500 - 2300), 0, 1);
    } else {
      step = Phaser.Math.Clamp((y - 2000) / (3300 - 2000), 0, 1);
    }

    const interpolatedColor = Phaser.Display.Color.Interpolate.ColorWithColor(
      this.skyBlue,
      this.darkBlue,
      100,
      step * 100
    );

    const finalColor = Phaser.Display.Color.GetColor(
      interpolatedColor.r,
      interpolatedColor.g,
      interpolatedColor.b
    );

    this.cameras.main.setBackgroundColor(finalColor);
  }

  startScrolling(): void {
    this.isScrolling = true;
  }

  stopScrolling(): void {
    this.isScrolling = false;
  }

  reset() {
    this.scene.restart();
    this.resetBackground();
  }
  private resetBackground() {
    if (this.backgroundTheme < 2) {
      this.backgroundTheme += 1;
    } else {
      this.backgroundTheme = 0;
    }
  }
}
