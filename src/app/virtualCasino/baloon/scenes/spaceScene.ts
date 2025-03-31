import { Scene } from 'phaser';

export class spaceScene extends Scene {
  private moon!: Phaser.GameObjects.Image;
  private comet!: Phaser.GameObjects.Image;
  private satelite!: Phaser.GameObjects.Image;
  private spaceCar!: Phaser.GameObjects.Image;
  private ufo!: Phaser.GameObjects.Image;
  private isMoonMoving: boolean = false;
  private moonPositionX!: number;
  private moonPositionY!: number;
  private moonWidth!: number;
  private moonHeight!: number;
  private moonSpeedY!: number;
  private cometPositionX!: number;
  private cometPositionY!: number;
  private satelitePositionX!: number;
  private satelitePositionY!: number;
  private sateliteSpeedY!: number;
  private sateliteSpeedX!: number;
  private ufoPositionY!: number;
  private ufoPositionX!: number;
  private ufoSpeedX!: number;
  private ufoSpeedY!: number;
  private spaceCardPositionY!: number;
  private spaceCarPositionX!: number;
  private spaceCarSpeedX!: number;
  private spaceCarSpeedY!: number;

  constructor() {
    super({ key: 'spaceScene' });
  }

  preload(): void {
    this.load.image('moon', 'baloon/assets/moon.png');
    this.load.image('comet', 'baloon/assets/comet.png');
    this.load.image('satelite', 'baloon/assets/satelite.png');
    this.load.image('ufo', 'baloon/assets/ufo.png');
    this.load.image('spaceCar', 'baloon/assets/tesla.png');
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    switch (true) {
      case width < 314:
        this.moonWidth = 500;
        this.moonHeight = 500;
        this.moonPositionY = -3000;

        this.moonPositionX = 280;
        this.cometPositionX = -1700;
        this.cometPositionY = -9800;
        this.satelitePositionX = -2300;
        this.satelitePositionY = -3300;
        this.ufoPositionY = -5600;
        this.ufoPositionX = -2600;
        this.spaceCardPositionY = -6300;
        this.spaceCarPositionX = -1830;
        this.sateliteSpeedX = 0.5;
        this.sateliteSpeedY = 0.7;
        this.ufoSpeedX = 0.5;
        this.ufoSpeedY = 1;
        this.spaceCarSpeedX = 0.3;
        this.spaceCarSpeedY = 1;
        this.moonSpeedY = 0.8;
        break;
      case width < 335:
        this.moonWidth = 500;
        this.moonHeight = 500;
        this.moonPositionY = -3000;
        this.moonSpeedY = 0.8;

        this.moonPositionX = 280;
        this.cometPositionX = -1700;
        this.cometPositionY = -9800;
        this.satelitePositionX = -2300;
        this.satelitePositionY = -3300;
        this.ufoPositionY = -5600;
        this.ufoPositionX = -2600;
        this.spaceCardPositionY = -6300;
        this.spaceCarPositionX = -1830;
        this.sateliteSpeedX = 0.5;
        this.sateliteSpeedY = 0.7;
        this.ufoSpeedX = 0.5;
        this.ufoSpeedY = 1;
        this.spaceCarSpeedX = 0.3;
        this.spaceCarSpeedY = 1;
        break;
      case width < 351:
        this.moonWidth = 500;
        this.moonHeight = 500;
        this.moonPositionY = -3000;
        this.moonSpeedY = 0.8;

        this.moonPositionX = 280;
        this.cometPositionX = -1700;
        this.cometPositionY = -9800;
        this.satelitePositionX = -2300;
        this.satelitePositionY = -3300;
        this.ufoPositionY = -5600;
        this.ufoPositionX = -2600;
        this.spaceCardPositionY = -6300;
        this.spaceCarPositionX = -1830;
        this.sateliteSpeedX = 0.5;
        this.sateliteSpeedY = 0.7;
        this.ufoSpeedX = 0.5;
        this.ufoSpeedY = 1;
        this.spaceCarSpeedX = 0.3;
        this.spaceCarSpeedY = 1;
        break;
      case width === 365 && height === 657:
        this.moonWidth = 500;
        this.moonHeight = 500;
        this.moonPositionY = -3000;
        this.moonSpeedY = 0.8;

        this.moonPositionX = 280;
        this.cometPositionX = -1700;
        this.cometPositionY = -9800;
        this.satelitePositionX = -2300;
        this.satelitePositionY = -3300;
        this.ufoPositionY = -5600;
        this.ufoPositionX = -2600;
        this.spaceCardPositionY = -6300;
        this.spaceCarPositionX = -1830;
        this.sateliteSpeedX = 0.5;
        this.sateliteSpeedY = 0.7;
        this.ufoSpeedX = 0.5;
        this.ufoSpeedY = 1;
        this.spaceCarSpeedX = 0.3;
        this.spaceCarSpeedY = 1;

        break;
      case width < 381:
        this.moonWidth = 500;
        this.moonHeight = 500;
        this.moonPositionY = -3000;
        this.moonSpeedY = 0.8;

        this.moonPositionX = 280;
        this.cometPositionX = -1700;
        this.cometPositionY = -9800;
        this.satelitePositionX = -2300;
        this.satelitePositionY = -3300;
        this.ufoPositionY = -5600;
        this.ufoPositionX = -2600;
        this.spaceCardPositionY = -6300;
        this.spaceCarPositionX = -1830;
        this.sateliteSpeedX = 0.5;
        this.sateliteSpeedY = 0.7;
        this.ufoSpeedX = 0.5;
        this.ufoSpeedY = 1;
        this.spaceCarSpeedX = 0.3;
        this.spaceCarSpeedY = 1;

        break;
      case width < 403:
        this.moonWidth = 500;
        this.moonHeight = 500;
        this.moonPositionY = -3000;
        this.moonSpeedY = 0.8;

        this.moonPositionX = 310;
        this.cometPositionX = -1700;
        this.cometPositionY = -9800;
        this.satelitePositionX = -2300;
        this.satelitePositionY = -3300;
        this.ufoPositionY = -5600;
        this.ufoPositionX = -2600;
        this.spaceCardPositionY = -6300;
        this.spaceCarPositionX = -1830;
        this.sateliteSpeedX = 0.5;
        this.sateliteSpeedY = 0.7;
        this.ufoSpeedX = 0.5;
        this.ufoSpeedY = 1;
        this.spaceCarSpeedX = 0.3;
        this.spaceCarSpeedY = 1;

        break;
      case width < 405:
        this.moonWidth = 500;
        this.moonHeight = 500;
        this.moonPositionY = -3000;
        this.moonSpeedY = 0.8;

        this.moonPositionX = 310;
        this.cometPositionX = -1700;
        this.cometPositionY = -9800;
        this.satelitePositionX = -2300;
        this.satelitePositionY = -3300;
        this.ufoPositionY = -5600;
        this.ufoPositionX = -2600;
        this.spaceCardPositionY = -6300;
        this.spaceCarPositionX = -1830;
        this.sateliteSpeedX = 0.5;
        this.sateliteSpeedY = 0.7;
        this.ufoSpeedX = 0.5;
        this.ufoSpeedY = 1;
        this.spaceCarSpeedX = 0.3;
        this.spaceCarSpeedY = 1;

        break;
      case width < 416:
        this.moonWidth = 500;
        this.moonHeight = 500;
        this.moonPositionY = -3000;
        this.moonSpeedY = 0.8;

        this.moonPositionX = 340;
        this.cometPositionX = -1700;
        this.cometPositionY = -9800;
        this.satelitePositionX = -2300;
        this.satelitePositionY = -3300;
        this.ufoPositionY = -5600;
        this.ufoPositionX = -2600;
        this.spaceCardPositionY = -6300;
        this.spaceCarPositionX = -1830;
        this.sateliteSpeedX = 0.5;
        this.sateliteSpeedY = 0.7;
        this.ufoSpeedX = 0.5;
        this.ufoSpeedY = 1;
        this.spaceCarSpeedX = 0.3;
        this.spaceCarSpeedY = 1;

        break;
      case width < 480:
        this.moonWidth = 500;
        this.moonHeight = 500;
        this.moonPositionY = -3000;
        this.moonPositionX = 340;
        this.cometPositionX = -1700;
        this.cometPositionY = -9800;
        this.satelitePositionX = -2300;
        this.satelitePositionY = -3300;
        this.ufoPositionY = -5600;
        this.ufoPositionX = -2600;
        this.spaceCardPositionY = -6300;
        this.spaceCarPositionX = -1830;
        this.sateliteSpeedX = 0.5;
        this.sateliteSpeedY = 0.7;
        this.ufoSpeedX = 0.5;
        this.ufoSpeedY = 1;
        this.spaceCarSpeedX = 0.3;
        this.spaceCarSpeedY = 1;
        this.moonSpeedY = 0.8;

        break;
      case width < 580:
        this.moonWidth = 500;
        this.moonHeight = 500;
        this.moonPositionY = -3000;
        this.moonPositionX = 440;
        this.cometPositionX = -1700;
        this.cometPositionY = -9800;
        this.satelitePositionX = -2300;
        this.satelitePositionY = -3300;
        this.ufoPositionY = -5600;
        this.ufoPositionX = -2600;
        this.spaceCardPositionY = -6300;
        this.spaceCarPositionX = -1830;
        this.sateliteSpeedX = 0.5;
        this.sateliteSpeedY = 0.7;
        this.ufoSpeedX = 0.5;
        this.ufoSpeedY = 1;
        this.spaceCarSpeedX = 0.3;
        this.spaceCarSpeedY = 1;
        this.moonSpeedY = 0.8;

        break;
      case width < 780:
        this.moonWidth = 500;
        this.moonHeight = 500;
        this.moonPositionY = -2500;
        this.moonPositionX = 670;
        this.cometPositionX = -950;
        this.cometPositionY = -5700;
        this.satelitePositionX = -2650;
        this.satelitePositionY = -1900;
        this.ufoPositionY = -3500;
        this.ufoPositionX = -3050;
        this.spaceCardPositionY = -3900;
        this.spaceCarPositionX = -3050;
        this.sateliteSpeedX = 1;
        this.sateliteSpeedY = 0.7;
        this.ufoSpeedX = 1;
        this.ufoSpeedY = 1;
        this.spaceCarSpeedX = 0.8;
        this.spaceCarSpeedY = 1;
        this.moonSpeedY = 1.2;

        break;
      case width < 821:
        this.moonWidth = 500;
        this.moonHeight = 500;
        this.moonPositionY = -2500;
        this.moonPositionX = 670;
        this.cometPositionX = -950;
        this.cometPositionY = -5700;
        this.satelitePositionX = -2650;
        this.satelitePositionY = -1900;
        this.ufoPositionY = -3500;
        this.ufoPositionX = -3050;
        this.spaceCardPositionY = -3900;
        this.spaceCarPositionX = -3050;
        this.sateliteSpeedX = 1;
        this.sateliteSpeedY = 0.7;
        this.ufoSpeedX = 1;
        this.ufoSpeedY = 1;
        this.spaceCarSpeedX = 0.8;
        this.spaceCarSpeedY = 1;
        this.moonSpeedY = 1.2;

        break;
      case width < 861:
        this.moonWidth = 500;
        this.moonHeight = 500;
        this.moonPositionY = -2500;
        this.moonPositionX = 670;
        this.cometPositionX = -950;
        this.cometPositionY = -5700;
        this.satelitePositionX = -2650;
        this.satelitePositionY = -1900;
        this.ufoPositionY = -3500;
        this.ufoPositionX = -2950;
        this.spaceCardPositionY = -4100;
        this.spaceCarPositionX = -3300;
        this.sateliteSpeedX = 1;
        this.sateliteSpeedY = 0.7;
        this.ufoSpeedX = 1;
        this.ufoSpeedY = 1;
        this.spaceCarSpeedX = 0.8;
        this.spaceCarSpeedY = 1;
        this.moonSpeedY = 1.2;

        break;
      case width < 913:
        this.moonWidth = 500;
        this.moonHeight = 500;
        this.moonPositionY = -2500;
        this.moonPositionX = 770;
        this.cometPositionX = -950;
        this.cometPositionY = -5700;
        this.satelitePositionX = -2650;
        this.satelitePositionY = -1900;
        this.ufoPositionY = -3500;
        this.ufoPositionX = -2950;
        this.spaceCardPositionY = -4100;
        this.spaceCarPositionX = -3250;
        this.sateliteSpeedX = 1;
        this.sateliteSpeedY = 0.7;
        this.ufoSpeedX = 1;
        this.ufoSpeedY = 1;
        this.spaceCarSpeedX = 0.8;
        this.spaceCarSpeedY = 1;
        this.moonSpeedY = 1.2;

        break;
      case width === 950 && height === 520:
        this.moonWidth = 500;
        this.moonHeight = 500;
        this.moonPositionY = -2500;
        this.moonPositionX = 870;
        this.cometPositionX = -950;
        this.cometPositionY = -5700;
        this.satelitePositionX = -2650;
        this.satelitePositionY = -1900;
        this.ufoPositionY = -3500;
        this.ufoPositionX = -3050;
        this.spaceCardPositionY = -4100;
        this.spaceCarPositionX = -3150;
        this.sateliteSpeedX = 1;
        this.sateliteSpeedY = 0.7;
        this.ufoSpeedX = 1;
        this.ufoSpeedY = 1;
        this.spaceCarSpeedX = 0.8;
        this.spaceCarSpeedY = 1;
        this.moonSpeedY = 1.2;

        break;
      default:
        this.moonWidth = 500;
        this.moonHeight = 500;
        this.moonPositionY = -2500;
        this.moonPositionX = 870;
        this.cometPositionX = -950;
        this.cometPositionY = -5700;
        this.satelitePositionX = -2650;
        this.satelitePositionY = -1900;
        this.ufoPositionY = -3500;
        this.ufoPositionX = -3050;
        this.spaceCardPositionY = -4100;
        this.spaceCarPositionX = -3150;
        this.sateliteSpeedX = 1;
        this.sateliteSpeedY = 0.7;
        this.ufoSpeedX = 1;
        this.ufoSpeedY = 1;
        this.spaceCarSpeedX = 0.8;
        this.spaceCarSpeedY = 1;
        this.moonSpeedY = 1.2;

        break;
    }
    this.moon = this.add.image(this.moonPositionX, this.moonPositionY, 'moon');
    this.moon.setDisplaySize(this.moonWidth, this.moonHeight);
    this.moon.setDepth(8);

    this.comet = this.add.image(
      this.cometPositionX,
      this.cometPositionY,
      'comet'
    );
    this.comet.setDisplaySize(250, 400);

    this.comet.setAngle(10);
    this.comet.setDepth(8);

    this.satelite = this.add.image(
      this.satelitePositionX,
      this.satelitePositionY,
      'satelite'
    );
    this.satelite.setDisplaySize(20, 20);
    this.satelite.setScale(0.9);
    this.satelite.setDepth(8);

    this.ufo = this.add.image(this.ufoPositionX, this.ufoPositionY, 'ufo');
    this.ufo.setDisplaySize(100, 50);
    this.ufo.setDepth(8);
    this.ufo.rotation = 50;
    this.createUFOTween();

    this.spaceCar = this.add.image(
      this.spaceCarPositionX,
      this.spaceCardPositionY,
      'spaceCar'
    );
    this.spaceCar.setDisplaySize(120, 60);
    this.spaceCar.setDepth(8);
    this.spaceCar.setRotation(179.8);
    this.spaceCar.setFlipY(true);
  }

  override update(): void {
    if (this.isMoonMoving) {
      this.moon.y += this.moonSpeedY;
      this.comet.y += 2.8;
      this.comet.x += 0.5;
      this.satelite.rotation -= 0.003;
      this.satelite.x += this.sateliteSpeedX;
      this.satelite.y += this.sateliteSpeedY;
      this.ufo.x += this.ufoSpeedX;
      this.ufo.y += this.ufoSpeedY;
      this.spaceCar.y += this.spaceCarSpeedY;
      this.spaceCar.x += this.spaceCarSpeedX;
    } else {
      if (this.satelite.x > -1) {
        this.satelite.x += this.sateliteSpeedX;
        this.satelite.y += this.sateliteSpeedY;
      }
      if (this.ufo.x > 0) {
        this.ufo.x += this.ufoSpeedX;
        this.ufo.y += this.ufoSpeedY;
      }
      if (this.spaceCar.x > 0) {
        this.spaceCar.y += this.spaceCarSpeedY;
        this.spaceCar.x += this.spaceCarSpeedX;
      }
      if (this.comet.x > 0) {
        this.comet.y += 2.8;
        this.comet.x += 0.5;
      }
      this.satelite.rotation -= 0.003;
    }
    // console.log(this.satelite.x, 'satx');
    // console.log(this.satelite.y, 'satY');
    // console.log(this.ufo.y, 'ufoY');
    // console.log(this.ufo.x, 'ufox');
    // console.log(this.spaceCar.x, 'carx');
    // console.log(this.spaceCar.y, 'carY');
  }

  startMoon() {
    this.isMoonMoving = true;
  }

  stopMoon() {
    this.isMoonMoving = false;
  }
  reset() {
    this.scene.restart();
  }
  createUFOTween(): void {
    this.tweens.add({
      targets: this.ufo,
      rotation: '+0.6000',
      duration: 1500,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
      onRepeat: () => {},
    });
  }
}
