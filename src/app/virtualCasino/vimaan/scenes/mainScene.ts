export class MainScene extends Phaser.Scene {
  vimaan!: Phaser.GameObjects.Sprite;
  private progress: number = 0;
  private bezierGraphics!: Phaser.GameObjects.Graphics;
  background!: Phaser.GameObjects.Image;
  sunRaysImage!: Phaser.GameObjects.Image;
  private isFlyingAway: boolean = false;
  private isAnimating: boolean = false;
  static sharedProgress: number = 0;
  private planeDefaultPosition!: { width: number; height: number };
  private sunRaysTween!: Phaser.Tweens.Tween;
  public tintColor: string = '#C017B4';

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('blur', '/blur.svg');
    this.load.image('sunRays', '/sunRays.svg');
    this.load.image('vimaan', 'vimaan.svg');
    this.load.image('vimaan1', '/vimaan1.svg');
    this.load.image('vimaan2', '/vimaan2.svg');
    this.load.image('vimaan3', '/vimaan3.svg');
  }

  create() {
    const width = this.cameras.main.width;
    console.log(width);

    const height = this.cameras.main.height;
    // console.log(height);

    // Add the 'sunRays' image first so place it behind the blur and tint
    this.sunRaysImage = this.add.image(0, height, 'sunRays');
    this.sunRaysImage.setOrigin(0.5, 0.5);
    this.sunRaysImage.setPosition(0, height);
    if (width >= 1550) {
      this.sunRaysImage.setScale(2);
    }

    // Rotate the sun rays continuously
    this.sunRaysTween = this.tweens.add({
      targets: this.sunRaysImage,
      angle: 360,
      duration: 30000,
      repeat: -1,
      ease: 'Linear',
    });

    this.background = this.add.image(0, 0, 'blur');
    this.background.setOrigin(0, 0);
    this.background.setDisplaySize(width, height);

    this.bezierGraphics = this.add.graphics();

    // Responsive vimaan size based on screen dimensions
    let vimaanWidth;
    let vimaanHeight;

    switch (true) {
      case width <= 600:
        vimaanWidth = 98;
        vimaanHeight = 48;
        break;
      case width == 684 && height == 1094:
        vimaanWidth = 120;
        vimaanHeight = 60;
        break;
      case width == 684 && height == 328:
        vimaanWidth = 115;
        vimaanHeight = 55;
        break;

      case width < 788:
        vimaanWidth = 130;
        vimaanHeight = 60;
        break;
      case width < 880:
        vimaanWidth = 130;
        vimaanHeight = 65;
        break;
      // case width < 980:
      //   vimaanWidth = 150;
      //   vimaanHeight = 70;
      //   break;
      default:
        vimaanWidth = 150;
        vimaanHeight = 70;
        break;
    }

    // vimaan animation
    this.anims.create({
      key: 'plane_fly',
      frames: [
        { key: 'vimaan' },
        { key: 'vimaan1' },
        { key: 'vimaan2' },
        { key: 'vimaan3' },
      ],
      frameRate: 10,
      repeat: -1,
    });

    // Switch Case For Planer Default Position on different Screens

    switch (true) {
      case width <= 320:
        this.planeDefaultPosition = {
          width: width * 0.255,
          height: height * 0.79,
        };
        break;
      case width <= 332:
        // Actual camera width is 344px . due to margin left right
        this.planeDefaultPosition = {
          width: width * 0.24,
          height: height * 0.83,
        };
        break;
      case width <= 348:
        // Actual camera width is 360px . due to margin left right
        this.planeDefaultPosition = {
          width: width * 0.23,
          height: height * 0.8,
        };
        break;
      case width <= 363:
        // Actual camera width is 375px . due to margin left right
        this.planeDefaultPosition = {
          width: width * 0.225,
          height: height * 0.77,
        };
        break;
      case width <= 378:
        // Actual camera width is 390px . due to margin left right
        this.planeDefaultPosition = {
          width: width * 0.21,
          height: height * 0.82,
        };
        break;
      case width <= 402:
        // Actual camera width is 412px . due to margin left right
        this.planeDefaultPosition = {
          width: width * 0.2,
          height: height * 0.84,
        };
        break;
      case width <= 413:
        // Actual camera width is 425px . due to margin left right
        this.planeDefaultPosition = {
          width: width * 0.195,
          height: height * 0.79,
        };
        break;
      case width <= 463:
        // Actual camera width is 475px . due to margin left right
        this.planeDefaultPosition = {
          width: width * 0.195,
          height: height * 0.84,
        };
        break;
      case width <= 588:
        // Actual camera width is 600px . due to margin left right
        this.planeDefaultPosition = {
          width: width * 0.152,
          height: height * 0.785,
        };
        break;
      case width == 684 && height == 1094:
        // ipad pro . due to margin left right
        this.planeDefaultPosition = {
          width: width * 0.135,
          height: height * 0.945,
        };
        break;
      case width == 684 && height == 328:
        // nest hub . due to margin left right
        this.planeDefaultPosition = {
          width: width * 0.13,
          height: height * 0.825,
        };
        break;
      case width <= 788:
        // Actual camera width is 800px . due to margin left right
        this.planeDefaultPosition = {
          width: width * 0.13,
          height: height * 0.835,
        };
        break;
      case width <= 840:
        this.planeDefaultPosition = {
          width: width * 0.12,
          height: height * 0.86,
        };
        break;
      case width <= 880:
        // Actual camera width is 880px . due to margin left right
        this.planeDefaultPosition = {
          width: width * 0.115,
          height: height * 0.87,
        };
        break;
      case width == 888 && height == 468:
        // Nest Hub Max. due to margin left right
        this.planeDefaultPosition = {
          width: width * 0.12,
          height: height * 0.865,
        };
        break;
      case width <= 950:
        // Actual camera width is 962px . due to margin left right
        this.planeDefaultPosition = {
          width: width * 0.12,
          height: height * 0.87,
        };
        break;
      case width <= 1010:
        this.planeDefaultPosition = {
          width: width * 0.105,
          height: height * 0.85,
        };
        break;
      default:
        this.planeDefaultPosition = {
          width: width * 0.085,
          height: height * 0.855,
        };
        break;
    }

    this.vimaan = this.add.sprite(
      this.planeDefaultPosition.width,
      this.planeDefaultPosition.height,
      'vimaan'
    );
    this.vimaan.setDisplaySize(vimaanWidth, vimaanHeight);
    this.vimaan.play('plane_fly');

    this.drawBezierCurve(0);
  }

  override update(time: number, delta: number) {
    if (this.isFlyingAway || !this.isAnimating) {
      return;
    }

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    let speed;
    if (width <= 330) {
      switch (true) {
        case this.progress < 0.3:
          speed = 0.01;
          break;
        case this.progress < 0.45:
          speed = 0.002;
          break;
        case this.progress < 0.6:
          speed = 0.0005;
          break;
        default:
          speed = 0.0008;
          break;
      }
    } else if (width <= 333) {
      switch (true) {
        case this.progress < 0.3:
          speed = 0.01;
          break;
        case this.progress < 0.45:
          speed = 0.0015;
          break;
        case this.progress < 0.6:
          speed = 0.00055;
          break;
        default:
          speed = 0.0008;
          break;
      }
    } else if (width <= 348) {
      switch (true) {
        case this.progress < 0.3:
          speed = 0.008;
          break;
        case this.progress < 0.45:
          speed = 0.002;
          break;
        case this.progress < 0.6:
          speed = 0.0005;
          break;
        default:
          speed = 0.0008;
          break;
      }
    } else if (width <= 375) {
      switch (true) {
        case this.progress < 0.3:
          speed = 0.008;
          break;
        case this.progress < 0.45:
          speed = 0.0017;
          break;
        case this.progress < 0.6:
          speed = 0.00055;
          break;
        default:
          speed = 0.0008;
          break;
      }
    } else if (width <= 378) {
      switch (true) {
        case this.progress < 0.3:
          speed = 0.01;
          break;
        case this.progress < 0.45:
          speed = 0.001;
          break;
        case this.progress < 0.6:
          speed = 0.00055;
          break;
        default:
          speed = 0.0008;
          break;
      }
    } else if (width <= 402) {
      switch (true) {
        case this.progress < 0.3:
          speed = 0.007;
          break;
        case this.progress < 0.45:
          speed = 0.001;
          break;
        case this.progress < 0.6:
          speed = 0.0005;
          break;
        default:
          speed = 0.0008;
          break;
      }
    } else if (width <= 413) {
      switch (true) {
        case this.progress < 0.3:
          speed = 0.007;
          break;
        case this.progress < 0.45:
          speed = 0.0017;
          break;
        case this.progress < 0.6:
          speed = 0.00035;
          break;
        default:
          speed = 0.0008;
          break;
      }
    } else if (width <= 463) {
      switch (true) {
        case this.progress < 0.3:
          speed = 0.007;
          break;
        case this.progress < 0.45:
          speed = 0.001;
          break;
        case this.progress < 0.6:
          speed = 0.00035;
          break;
        default:
          speed = 0.0008;
          break;
      }
    } else if (width <= 588) {
      switch (true) {
        case this.progress < 0.3:
          speed = 0.01;
          break;
        case this.progress < 0.45:
          speed = 0.001;
          break;
        case this.progress < 0.6:
          speed = 0.0004;
          break;
        default:
          speed = 0.0008;
          break;
      }
    } else if (width === 684 && height === 328) {
      switch (true) {
        case this.progress < 0.3:
          speed = 0.01;
          break;
        case this.progress < 0.45:
          speed = 0.0015;
          break;
        case this.progress < 0.6:
          speed = 0.0007;
          break;
        default:
          speed = 0.0016;
          break;
      }
    } else if (width < 780) {
      switch (true) {
        case this.progress < 0.3:
          speed = 0.0075;
          break;
        case this.progress < 0.45:
          speed = 0.001;
          break;
        case this.progress < 0.6:
          speed = 0.0003;
          break;
        default:
          speed = 0.0008;
          break;
      }
    } else if (width === 888 && height === 468) {
      switch (true) {
        case this.progress < 0.3:
          speed = 0.002;
          break;
        case this.progress < 0.45:
          speed = 0.0015;
          break;
        case this.progress < 0.6:
          speed = 0.0015;
          break;
        default:
          speed = 0.0016;
          break;
      }
    } else {
      switch (true) {
        case this.progress < 0.3:
          speed = 0.003;
          break;
        case this.progress < 0.45:
          speed = 0.0005;
          break;
        case this.progress < 0.6:
          speed = 0.0002;
          break;
        default:
          speed = 0.0005;
          break;
      }
    }

    this.progress += speed;
    if (this.progress >= 1) {
      this.progress = 0.6;
    }

    // Update the shared progress for DotGridScene
    MainScene.sharedProgress = this.progress;
    const t = this.progress;
    let x, y;

    this.updateTint();

    // Plane movement logic based on device width

    switch (true) {
      case width <= 320:
        // upto 330px screen plane movement starts here
        if (t < 0.3) {
          // x=21% , y= 80% to x=30% , y=79%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.255, width * 0.3],
            stageProgress
          );
          y = height * 0.79;
        } else if (t < 0.45) {
          // x=21% , y= 80% to x=30% , y=79%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.3, width * 0.4],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.79, height * 0.6],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=50% , y= 60% to x=60% , y=1%
          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.4, width * 0.6],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.6, height * 0.1],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=60% , y= 10% to x=75% , y=35%
          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.6, width * 0.75],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.1, height * 0.45],
            easedProgress
          );
        } else {
          //  x=75% , y=35% to x=60% , y= 10%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.75, width * 0.6],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.45, height * 0.1],
            easedProgress
          );
        }
        // upto 330px screen plane movement ends here
        break;
      case width <= 333:
        // upto 345px screen plane movement starts here

        if (t < 0.3) {
          // x=21% , y= 83% to x=30% , y=79%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.24, width * 0.3],
            stageProgress
          );
          y = height * 0.83;
        } else if (t < 0.45) {
          // x=30% , y= 83% to x=50% , y=65%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.3, width * 0.4],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.83, height * 0.6],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=49.8% , y= 65.4% to x=70% , y=8%
          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.4, width * 0.65],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.6, height * 0.08],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=70% , y= 8% to x=85% , y=35%
          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.65, width * 0.8],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.08, height * 0.35],
            easedProgress
          );
        } else {
          //  x=85% , y=35% to x=70% , y= 8%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.8, width * 0.65],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.35, height * 0.08],
            easedProgress
          );
        }
        // upto 345px screen plane movement ends here
        break;

      case width <= 348:
        // upto 360px screen plane movement starts here

        if (t < 0.3) {
          // x=21% , y= 80% to x=30% , y=79.8%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.23, width * 0.3],
            stageProgress
          );
          y = height * 0.798;
        } else if (t < 0.45) {
          // x=30% , y= 79.8% to x=50% , y=65%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.3, width * 0.4],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.798, height * 0.6],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=49.8% , y= 65.4% to x=70% , y=10%
          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.4, width * 0.68],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.6, height * 0.1],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=70% , y= 10% to x=85% , y=35%
          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.68, width * 0.82],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.1, height * 0.45],
            easedProgress
          );
        } else {
          //  x=85% , y=35% to x=70% , y= 10%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.82, width * 0.68],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.45, height * 0.1],
            easedProgress
          );
        }
        // upto 360px screen plane movement ends here

        break;
      case width <= 363:
        // upto 375px screen plane movement starts here

        if (t < 0.3) {
          // x=21% , y= 77% to x=30% , y=77%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.225, width * 0.3],
            stageProgress
          );
          y = height * 0.77;
        } else if (t < 0.45) {
          // x=30% , y= 77% to x=50% , y=65%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.3, width * 0.45],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.77, height * 0.57],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=49.8% , y= 65.4% to x=70% , y=10%
          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.45, width * 0.7],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.57, height * 0.1],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=70% , y= 10% to x=85% , y=35%
          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.7, width * 0.82],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.1, height * 0.5],
            easedProgress
          );
        } else {
          //  x=85% , y=35% to x=70% , y= 10%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.82, width * 0.7],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.5, height * 0.1],
            easedProgress
          );
        }
        // upto 375px screen plane movement ends here

        break;

      case width <= 378:
        // upto 390px screen plane movement starts here

        if (t < 0.3) {
          // x=21% , y= 82% to x=30% , y=82%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.21, width * 0.3],
            stageProgress
          );
          y = height * 0.82;
        } else if (t < 0.45) {
          // x=30% , y= 82% to x=50% , y=65%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.3, width * 0.5],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.82, height * 0.55],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=49.8% , y= 65.4% to x=70% , y=10%
          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.5, width * 0.7],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.55, height * 0.08],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=70% , y= 10% to x=85% , y=35%
          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.7, width * 0.85],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.08, height * 0.45],
            easedProgress
          );
        } else {
          //  x=85% , y=35% to x=70% , y= 10%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.85, width * 0.7],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.45, height * 0.08],
            easedProgress
          );
        }
        // upto 390px screen plane movement ends here

        break;

      case width <= 402:
        // upto 414px screen plane movement starts here

        if (t < 0.3) {
          // x=19% , y= 84% to x=30% , y=84%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.2, width * 0.3],
            stageProgress
          );
          y = height * 0.838;
        } else if (t < 0.45) {
          // x=30% , y= 84% to x=50% , y=65%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.3, width * 0.5],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.838, height * 0.55],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=49.8% , y= 65.4% to x=78% , y=10%
          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.5, width * 0.72],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.55, height * 0.08],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=78% , y= 10% to x=85% , y=35%
          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.72, width * 0.84],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.08, height * 0.45],
            easedProgress
          );
        } else {
          //  x=85% , y=35% to x=78% , y= 10%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.84, width * 0.72],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.45, height * 0.08],
            easedProgress
          );
        }
        // upto 414px screen plane movement ends here

        break;
      case width <= 413:
        // upto 425px screen plane movement starts here

        if (t < 0.3) {
          // x=17% , y= 79% to x=30% , y=79%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.195, width * 0.3],
            stageProgress
          );
          y = height * 0.79;
        } else if (t < 0.45) {
          // x=30% , y= 79% to x=50% , y=65%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.3, width * 0.4],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.79, height * 0.6],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=49.8% , y= 65.4% to x=78% , y=10%
          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.4, width * 0.73],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.6, height * 0.1],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=78% , y= 10% to x=85% , y=35%
          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.73, width * 0.85],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.1, height * 0.45],
            easedProgress
          );
        } else {
          //  x=85% , y=35% to x=78% , y= 10%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.85, width * 0.73],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.45, height * 0.1],
            easedProgress
          );
        }
        // upto 425px screen plane movement ends here

        break;
      case width <= 463:
        // upto 475px screen plane movement starts here

        if (t < 0.3) {
          // x=20% , y= 84% to x=30% , y=84%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.195, width * 0.3],
            stageProgress
          );
          y = height * 0.84;
        } else if (t < 0.45) {
          // x=30% , y= 84% to x=50% , y=65%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.3, width * 0.45],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.84, height * 0.6],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=49.8% , y= 65.4% to x=78% , y=8%
          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.45, width * 0.73],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.6, height * 0.08],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=78% , y= 8% to x=85% , y=35%
          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.73, width * 0.85],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.08, height * 0.35],
            easedProgress
          );
        } else {
          //  x=85% , y=35% to x=78% , y= 08%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.85, width * 0.73],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.35, height * 0.08],
            easedProgress
          );
        }
        // upto 475px screen plane movement ends here

        break;
      case width <= 588:
        // upto 600px screen plane movement starts here

        if (t < 0.3) {
          // x=5% , y= 88% to x=30% , y=90%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.152, width * 0.2],
            stageProgress
          );
          y = height * 0.785;
        } else if (t < 0.45) {
          // x=5% , y= 88% to x=30% , y=90%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.2, width * 0.5],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.785, height * 0.71],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=30% , y= 88% to x=50% , y=65%

          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.5, width * 0.78],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.71, height * 0.1],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=80% , y= 7% to x=90% , y=35%

          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.78, width * 0.88],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.1, height * 0.5],
            easedProgress
          );
        } else {
          //  x=90% , y=35% to x=8% , y= 07%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.88, width * 0.78],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.5, height * 0.1],
            easedProgress
          );
        }
        break;
      case width <= 684 && height == 1094:
        // for ipadPro screen plane movement starts here

        if (t < 0.3) {
          // x=10% , y= 94.5% to x=30% , y=94.5%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.135, width * 0.2],
            stageProgress
          );
          y = height * 0.945;
        } else if (t < 0.45) {
          // x=30% , y= 94% to x=50% , y=65%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.2, width * 0.5],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.945, height * 0.71],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=49.8% , y= 65.4% to x=78% , y=35%
          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.5, width * 0.81],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.71, height * 0.035],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=78% , y= 35% to x=90% , y=35%
          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.81, width * 0.9],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.035, height * 0.2],
            easedProgress
          );
        } else {
          //  x=90% , y=35% to x=78% , y= 35%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.9, width * 0.81],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.2, height * 0.035],
            easedProgress
          );
        }
        // upto ipadPro screen plane movement ends here

        break;
      case width == 684 && height == 328:
        // for NestHub screen plane movement starts here

        if (t < 0.3) {
          // x=5% , y= 88% to x=30% , y=90%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.13, width * 0.2],
            stageProgress
          );
          y = height * 0.825;
        } else if (t < 0.45) {
          // x=5% , y= 88% to x=30% , y=90%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.2, width * 0.5],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.825, height * 0.71],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=30% , y= 88% to x=50% , y=65%

          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.5, width * 0.8],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.71, height * 0.1],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=80% , y= 7% to x=90% , y=35%

          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.8, width * 0.9],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.1, height * 0.35],
            easedProgress
          );
        } else {
          //  x=90% , y=35% to x=8% , y= 07%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.9, width * 0.8],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.35, height * 0.1],
            easedProgress
          );
        }
        break;

      case width <= 788:
        // upto 800px screen plane movement starts here

        if (t < 0.3) {
          // x=5% , y= 88% to x=30% , y=90%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.13, width * 0.2],
            stageProgress
          );
          y = height * 0.835;
        } else if (t < 0.45) {
          // x=5% , y= 88% to x=30% , y=90%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.2, width * 0.5],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.835, height * 0.71],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=30% , y= 88% to x=50% , y=65%

          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.5, width * 0.83],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.71, height * 0.07],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=80% , y= 7% to x=90% , y=35%

          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.83, width * 0.9],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.07, height * 0.5],
            easedProgress
          );
        } else {
          //  x=90% , y=35% to x=8% , y= 07%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.9, width * 0.83],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.5, height * 0.07],
            easedProgress
          );
        }
        break;

      case width <= 840:
        // upto 852px screen plane movement starts here

        if (t < 0.3) {
          // x=5% , y= 88% to x=30% , y=90%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.12, width * 0.2],
            stageProgress
          );
          y = height * 0.86;
        } else if (t < 0.45) {
          // x=5% , y= 88% to x=30% , y=90%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.2, width * 0.5],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.86, height * 0.71],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=30% , y= 88% to x=50% , y=65%

          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.5, width * 0.82],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.71, height * 0.08],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=80% , y= 7% to x=90% , y=35%

          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.82, width * 0.9],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.08, height * 0.35],
            easedProgress
          );
        } else {
          //  x=90% , y=35% to x=8% , y= 07%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.9, width * 0.82],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.35, height * 0.08],
            easedProgress
          );
        }
        break;
      case width <= 880:
        // upto 892px screen plane movement starts here

        if (t < 0.3) {
          // x=5% , y= 88% to x=30% , y=90%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.115, width * 0.2],
            stageProgress
          );
          y = height * 0.87;
        } else if (t < 0.45) {
          // x=5% , y= 88% to x=30% , y=90%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.2, width * 0.5],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.87, height * 0.71],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=30% , y= 88% to x=50% , y=65%

          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.5, width * 0.82],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.71, height * 0.08],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=80% , y= 7% to x=90% , y=35%

          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.82, width * 0.9],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.08, height * 0.35],
            easedProgress
          );
        } else {
          //  x=90% , y=35% to x=8% , y= 07%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.9, width * 0.82],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.35, height * 0.08],
            easedProgress
          );
        }
        break;
      case width == 888 && height == 468:
        // nest hub max screen plane movement starts here

        if (t < 0.15) {
          // x=10% , y= 88% to x=30% , y=84%
          const stageProgress = t / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.12, width * 0.3],
            stageProgress
          );
          y = height * 0.865;
        } else if (t < 0.3) {
          // x=30% , y= 88% to x=50% , y=65%
          const stageProgress = (t - 0.15) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.3, width * 0.5],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.865, height * 0.6],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=49.8% , y= 65.4% to x=78% , y=08%
          const stageProgress = (t - 0.3) / 0.3;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.5, width * 0.82],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.6, height * 0.08],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=78% , y= 05% to x=90% , y=35%
          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.82, width * 0.9],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.08, height * 0.4],
            easedProgress
          );
        } else {
          //  x=90% , y=35% to x=78% , y= 05%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.9, width * 0.82],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.4, height * 0.08],
            easedProgress
          );
        }
        // nest hub max  screen plane movement ends here

        break;
      case width <= 950:
        // upto 962px screen plane movement starts here
        if (t < 0.3) {
          // x=5% , y= 88% to x=30% , y=90%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.12, width * 0.2],
            stageProgress
          );
          y = height * 0.87;
        } else if (t < 0.45) {
          // x=5% , y= 88% to x=30% , y=90%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.2, width * 0.5],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.87, height * 0.71],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=30% , y= 88% to x=50% , y=65%

          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.5, width * 0.8],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.71, height * 0.07],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=80% , y= 7% to x=90% , y=35%

          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.8, width * 0.9],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.07, height * 0.35],
            easedProgress
          );
        } else {
          //  x=90% , y=35% to x=8% , y= 07%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.9, width * 0.8],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.35, height * 0.07],
            easedProgress
          );
        }
        break;
      case width <= 1010:
        if (t < 0.3) {
          // x=5% , y= 88% to x=30% , y=90%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.105, width * 0.2],
            stageProgress
          );
          y = height * 0.85;
        } else if (t < 0.45) {
          // x=5% , y= 88% to x=30% , y=90%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.2, width * 0.5],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.85, height * 0.71],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=30% , y= 88% to x=50% , y=65%

          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.5, width * 0.8],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.71, height * 0.07],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=80% , y= 7% to x=90% , y=35%

          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.8, width * 0.9],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.07, height * 0.35],
            easedProgress
          );
        } else {
          //  x=90% , y=35% to x=8% , y= 07%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.9, width * 0.8],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.35, height * 0.07],
            easedProgress
          );
        }
        break;
      default:
        // default device logic
        if (t < 0.3) {
          // x=5% , y= 88% to x=30% , y=90%
          const stageProgress = t / 0.3;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.085, width * 0.2],
            stageProgress
          );
          y = height * 0.855;
        } else if (t < 0.45) {
          // x=5% , y= 88% to x=30% , y=90%
          const stageProgress = (t - 0.3) / 0.15;
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.2, width * 0.5],
            stageProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.855, height * 0.71],
            stageProgress
          );
        } else if (t < 0.6) {
          // x=30% , y= 88% to x=50% , y=65%

          const stageProgress = (t - 0.45) / 0.15;
          const easedProgress = Phaser.Math.Easing.Sine.Out(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.5, width * 0.88],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.71, height * 0.07],
            easedProgress
          );
        } else if (t < 0.8) {
          // x=80% , y= 7% to x=90% , y=35%

          const stageProgress = (t - 0.6) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.88, width * 0.93],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.07, height * 0.35],
            easedProgress
          );
        } else {
          //  x=90% , y=35% to x=8% , y= 07%

          const stageProgress = (t - 0.8) / 0.2;
          const easedProgress = Phaser.Math.Easing.Sine.InOut(stageProgress);
          x = Phaser.Math.Interpolation.Linear(
            [width * 0.93, width * 0.88],
            easedProgress
          );
          y = Phaser.Math.Interpolation.Linear(
            [height * 0.35, height * 0.07],
            easedProgress
          );
        }
        break;
    }

    this.vimaan.setPosition(x, y);

    this.drawBezierCurve(t);
  }

  private drawBezierCurve(progress: number) {
    const segments = 100;
    const curvePoints: Phaser.Math.Vector2[] = [];
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.bezierGraphics.clear();

    if (width < 378) {
      this.bezierGraphics.lineStyle(4, 0xe50439, 1);
    } else {
      this.bezierGraphics.lineStyle(4, 0xe50439, 1);
    }

    let startPoint;
    // switch case for Start point of curved line
    switch (true) {
      case width <= 320:
        startPoint = new Phaser.Math.Vector2(width * 0.1, height * 0.87);
        break;
      case width <= 333:
        startPoint = new Phaser.Math.Vector2(width * 0.09, height * 0.9);
        break;
      case width <= 348:
        startPoint = new Phaser.Math.Vector2(width * 0.09, height * 0.87);
        break;
      case width <= 363:
        startPoint = new Phaser.Math.Vector2(width * 0.083, height * 0.858);
        break;
      case width <= 378:
        startPoint = new Phaser.Math.Vector2(width * 0.083, height * 0.89);
        break;
      case width <= 402:
        startPoint = new Phaser.Math.Vector2(width * 0.078, height * 0.9);
        break;
      case width <= 413:
        startPoint = new Phaser.Math.Vector2(width * 0.075, height * 0.87);
        break;
      case width <= 463:
        startPoint = new Phaser.Math.Vector2(width * 0.075, height * 0.9);
        break;
      case width <= 588:
        startPoint = new Phaser.Math.Vector2(width * 0.058, height * 0.865);
        break;
      case width == 684 && height == 1094:
        startPoint = new Phaser.Math.Vector2(width * 0.045, height * 0.97);
        break;
      case width == 684 && height == 328:
        startPoint = new Phaser.Math.Vector2(width * 0.045, height * 0.9);
        break;
      case width <= 788:
        startPoint = new Phaser.Math.Vector2(width * 0.04, height * 0.91);
        break;
      case width <= 840:
        startPoint = new Phaser.Math.Vector2(width * 0.039, height * 0.925);
        break;
      case width === 888 && height === 468:
        startPoint = new Phaser.Math.Vector2(width * 0.037, height * 0.928);
        break;
      case width <= 880:
        startPoint = new Phaser.Math.Vector2(width * 0.039, height * 0.93);
        break;
      case width <= 950:
        startPoint = new Phaser.Math.Vector2(width * 0.035, height * 0.936);
        break;
      case width <= 1010:
        startPoint = new Phaser.Math.Vector2(width * 0.03, height * 0.922);
        break;

      default:
        startPoint = new Phaser.Math.Vector2(width * 0.025, height * 0.92);
        break;
    }

    let controlPoints: Phaser.Math.Vector2[];

    // Switch case for curved line path
    switch (true) {
      case width <= 320:
        if (progress < 0.33) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.1, height * 0.865),
            new Phaser.Math.Vector2(width * 0.17, height * 0.865),
            new Phaser.Math.Vector2(width * 0.7, height * 0.1),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.2, height * 0.865),
            new Phaser.Math.Vector2(width * 0.22, height * 0.8),
            new Phaser.Math.Vector2(width * 0.7, height * 0.1),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        }
        break;
      case width <= 333:
        if (progress < 0.15) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.1, height * 0.9),
            new Phaser.Math.Vector2(width * 0.1, height * 0.9),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.15, height * 0.9),
            new Phaser.Math.Vector2(width * 0.22, height * 0.89),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        }
        break;
      case width <= 348:
        if (progress < 0.3) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.1, height * 0.87),
            new Phaser.Math.Vector2(width * 0.1, height * 0.87),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.18, height * 0.87),
            new Phaser.Math.Vector2(width * 0.22, height * 0.87),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        }
        break;
      case width <= 363:
        if (progress < 0.3) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.1, height * 0.858),
            new Phaser.Math.Vector2(width * 0.1, height * 0.858),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else if (progress < 0.33) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.2, height * 0.858),
            new Phaser.Math.Vector2(width * 0.2, height * 0.84),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.2, height * 0.858),
            new Phaser.Math.Vector2(width * 0.3, height * 0.79),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        }
        break;
      case width <= 378:
        if (progress < 0.2) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.1, height * 0.89),
            new Phaser.Math.Vector2(width * 0.1, height * 0.89),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.45),
          ];
        } else if (progress < 0.32) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.17, height * 0.89),
            new Phaser.Math.Vector2(width * 0.17, height * 0.88),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.45),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.17, height * 0.89),
            new Phaser.Math.Vector2(width * 0.27, height * 0.84),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.45),
          ];
        }
        break;
      case width <= 400:
        if (progress < 0.325) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.1, height * 0.9),
            new Phaser.Math.Vector2(width * 0.1, height * 0.9),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.18, height * 0.895),
            new Phaser.Math.Vector2(width * 0.28, height * 0.825),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        }
        break;
      case width <= 402:
        if (progress < 0.3275) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.1, height * 0.9),
            new Phaser.Math.Vector2(width * 0.1, height * 0.9),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.15, height * 0.895),
            new Phaser.Math.Vector2(width * 0.27, height * 0.825),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        }
        break;

      case width <= 413:
        if (progress < 0.35) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.05, height * 0.87),
            new Phaser.Math.Vector2(width * 0.2, height * 0.87),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.2, height * 0.87),
            new Phaser.Math.Vector2(width * 0.28, height * 0.78),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        }
        break;
      case width <= 463:
        if (progress < 0.33) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.1, height * 0.9),
            new Phaser.Math.Vector2(width * 0.17, height * 0.9),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.17, height * 0.9),
            new Phaser.Math.Vector2(width * 0.29, height * 0.83),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        }
        break;
      case width <= 588:
        if (progress < 0.3) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.05, height * 0.865),
            new Phaser.Math.Vector2(width * 0.05, height * 0.865),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else if (progress < 0.43) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.1, height * 0.865),
            new Phaser.Math.Vector2(width * 0.1, height * 0.86),
            new Phaser.Math.Vector2(width * 0.75, height * 0.1),
            new Phaser.Math.Vector2(width * 0.87, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.15, height * 0.865),
            new Phaser.Math.Vector2(width * 0.45, height * 0.79),
            new Phaser.Math.Vector2(width * 0.8, height * 0.07),
            new Phaser.Math.Vector2(width * 0.9, height * 0.35),
          ];
        }
        break;
      case width == 684 && height == 1094:
        if (progress < 0.308) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.05, height * 0.97),
            new Phaser.Math.Vector2(width * 0.05, height * 0.97),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.16, height * 0.97),
            new Phaser.Math.Vector2(width * 0.18, height * 0.94),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        }
        break;
      case width == 684 && height == 328:
        if (progress < 0.26) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.05, height * 0.9),
            new Phaser.Math.Vector2(width * 0.05, height * 0.9),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else if (progress < 0.43) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.13, height * 0.9),
            new Phaser.Math.Vector2(width * 0.13, height * 0.9),
            new Phaser.Math.Vector2(width * 0.75, height * 0.1),
            new Phaser.Math.Vector2(width * 0.87, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.15, height * 0.92),
            new Phaser.Math.Vector2(width * 0.45, height * 0.768),
            new Phaser.Math.Vector2(width * 0.8, height * 0.07),
            new Phaser.Math.Vector2(width * 0.9, height * 0.35),
          ];
        }
        break;
      case width <= 788:
        if (progress < 0.15) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.05, height * 0.91),
            new Phaser.Math.Vector2(width * 0.05, height * 0.91),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else if (progress < 0.43) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.1, height * 0.91),
            new Phaser.Math.Vector2(width * 0.1, height * 0.9),
            new Phaser.Math.Vector2(width * 0.75, height * 0.1),
            new Phaser.Math.Vector2(width * 0.87, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.2, height * 0.9),
            new Phaser.Math.Vector2(width * 0.45, height * 0.76),
            new Phaser.Math.Vector2(width * 0.8, height * 0.07),
            new Phaser.Math.Vector2(width * 0.9, height * 0.35),
          ];
        }
        break;
      case width <= 840:
        if (progress < 0.15) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.05, height * 0.925),
            new Phaser.Math.Vector2(width * 0.05, height * 0.925),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else if (progress < 0.43) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.15, height * 0.925),
            new Phaser.Math.Vector2(width * 0.15, height * 0.91),
            new Phaser.Math.Vector2(width * 0.75, height * 0.1),
            new Phaser.Math.Vector2(width * 0.87, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.15, height * 0.95),
            new Phaser.Math.Vector2(width * 0.45, height * 0.76),
            new Phaser.Math.Vector2(width * 0.8, height * 0.07),
            new Phaser.Math.Vector2(width * 0.9, height * 0.35),
          ];
        }
        break;
      case width === 888 && height === 468:
        if (progress < 0.15) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.05, height * 0.928),
            new Phaser.Math.Vector2(width * 0.05, height * 0.928),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else if (progress < 0.3) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.12, height * 0.928),
            new Phaser.Math.Vector2(width * 0.13, height * 0.92),
            new Phaser.Math.Vector2(width * 0.75, height * 0.1),
            new Phaser.Math.Vector2(width * 0.87, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.15, height * 0.94),
            new Phaser.Math.Vector2(width * 0.42, height * 0.67),
            new Phaser.Math.Vector2(width * 0.8, height * 0.07),
            new Phaser.Math.Vector2(width * 0.9, height * 0.35),
          ];
        }
        break;
      case width <= 880:
        if (progress < 0.3) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.05, height * 0.93),
            new Phaser.Math.Vector2(width * 0.05, height * 0.93),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else if (progress < 0.41) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.12, height * 0.93),
            new Phaser.Math.Vector2(width * 0.12, height * 0.925),
            new Phaser.Math.Vector2(width * 0.75, height * 0.1),
            new Phaser.Math.Vector2(width * 0.87, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.15, height * 0.94),
            new Phaser.Math.Vector2(width * 0.45, height * 0.76),
            new Phaser.Math.Vector2(width * 0.8, height * 0.07),
            new Phaser.Math.Vector2(width * 0.9, height * 0.35),
          ];
        }
        break;

      case width <= 950:
        if (progress < 0.15) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.05, height * 0.936),
            new Phaser.Math.Vector2(width * 0.05, height * 0.936),
            new Phaser.Math.Vector2(width * 0.7, height * 0.08),
            new Phaser.Math.Vector2(width * 0.85, height * 0.35),
          ];
        } else if (progress < 0.43) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.1, height * 0.936),
            new Phaser.Math.Vector2(width * 0.13, height * 0.93),
            new Phaser.Math.Vector2(width * 0.75, height * 0.1),
            new Phaser.Math.Vector2(width * 0.87, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.15, height * 0.94),
            new Phaser.Math.Vector2(width * 0.45, height * 0.76),
            new Phaser.Math.Vector2(width * 0.8, height * 0.07),
            new Phaser.Math.Vector2(width * 0.9, height * 0.35),
          ];
        }
        break;
      case width <= 1010:
        if (progress < 0.3) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.05, height * 0.922),
            new Phaser.Math.Vector2(width * 0.05, height * 0.922),
            new Phaser.Math.Vector2(width * 0.75, height * 0.1),
            new Phaser.Math.Vector2(width * 0.87, height * 0.35),
          ];
        } else if (progress < 0.43) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.08, height * 0.922),
            new Phaser.Math.Vector2(width * 0.1, height * 0.92),
            new Phaser.Math.Vector2(width * 0.75, height * 0.1),
            new Phaser.Math.Vector2(width * 0.87, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.15, height * 0.922),
            new Phaser.Math.Vector2(width * 0.45, height * 0.78),
            new Phaser.Math.Vector2(width * 0.8, height * 0.07),
            new Phaser.Math.Vector2(width * 0.9, height * 0.35),
          ];
        }

        break;

      default:
        if (progress < 0.3) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.05, height * 0.92),
            new Phaser.Math.Vector2(width * 0.05, height * 0.92),
            new Phaser.Math.Vector2(width * 0.75, height * 0.1),
            new Phaser.Math.Vector2(width * 0.87, height * 0.35),
          ];
        } else if (progress < 0.43) {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.1, height * 0.92),
            new Phaser.Math.Vector2(width * 0.1, height * 0.92),
            new Phaser.Math.Vector2(width * 0.75, height * 0.1),
            new Phaser.Math.Vector2(width * 0.87, height * 0.35),
          ];
        } else {
          controlPoints = [
            new Phaser.Math.Vector2(width * 0.15, height * 0.92),
            new Phaser.Math.Vector2(width * 0.45, height * 0.785),
            new Phaser.Math.Vector2(width * 0.8, height * 0.07),
            new Phaser.Math.Vector2(width * 0.9, height * 0.35),
          ];
        }

        break;
    }

    // switch case for curve line gap and placement adjustment with plane
    switch (true) {
      case width <= 588:
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const x = Phaser.Math.Interpolation.CubicBezier(
            t,
            startPoint.x,
            controlPoints[0].x,
            controlPoints[1].x,
            this.vimaan.x - 35
          );
          const y = Phaser.Math.Interpolation.CubicBezier(
            t,
            startPoint.y,
            controlPoints[0].y,
            controlPoints[1].y,
            this.vimaan.y + 20
          );

          curvePoints.push(new Phaser.Math.Vector2(x, y));

          if (i > 0) {
            this.bezierGraphics.lineBetween(
              curvePoints[i - 1].x,
              curvePoints[i - 1].y,
              x,
              y
            );
          }
        }
        this.bezierGraphics.beginPath();
        this.bezierGraphics.moveTo(startPoint.x, startPoint.y);
        curvePoints.forEach((point) => {
          this.bezierGraphics.lineTo(point.x, point.y);
        });
        // Setting fill color from end point .keep filled color above dots line from current plane position point
        this.bezierGraphics.lineTo(
          this.vimaan.x - 35,
          this.cameras.main.height - 30
        );
        // Setting fill color from start point . keep filled color above dots line from left start point
        this.bezierGraphics.lineTo(startPoint.x, this.cameras.main.height - 30);
        this.bezierGraphics.closePath();
        this.bezierGraphics.fillStyle(0xff0000, 0.32);
        this.bezierGraphics.fillPath();
        break;
      case width == 684 && height == 1094:
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const x = Phaser.Math.Interpolation.CubicBezier(
            t,
            startPoint.x,
            controlPoints[0].x,
            controlPoints[1].x,
            this.vimaan.x - 45.75
          );
          const y = Phaser.Math.Interpolation.CubicBezier(
            t,
            startPoint.y,
            controlPoints[0].y,
            controlPoints[1].y,
            this.vimaan.y + 26
          );

          curvePoints.push(new Phaser.Math.Vector2(x, y));

          if (i > 0) {
            this.bezierGraphics.lineBetween(
              curvePoints[i - 1].x,
              curvePoints[i - 1].y,
              x,
              y
            );
          }
        }
        this.bezierGraphics.beginPath();
        this.bezierGraphics.moveTo(startPoint.x, startPoint.y);
        curvePoints.forEach((point) => {
          this.bezierGraphics.lineTo(point.x, point.y);
        });
        // Setting fill color from end point .keep filled color above dots line from current plane position point
        this.bezierGraphics.lineTo(
          this.vimaan.x - 48,
          this.cameras.main.height - 30
        );
        // Setting fill color from start point . keep filled color above dots line from left start point
        this.bezierGraphics.lineTo(startPoint.x, this.cameras.main.height - 30);
        this.bezierGraphics.closePath();
        this.bezierGraphics.fillStyle(0xff0000, 0.32);
        this.bezierGraphics.fillPath();
        break;
      case width == 684 && height == 328:
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const x = Phaser.Math.Interpolation.CubicBezier(
            t,
            startPoint.x,
            controlPoints[0].x,
            controlPoints[1].x,
            this.vimaan.x - 42.5
          );
          const y = Phaser.Math.Interpolation.CubicBezier(
            t,
            startPoint.y,
            controlPoints[0].y,
            controlPoints[1].y,
            this.vimaan.y + 25
          );

          curvePoints.push(new Phaser.Math.Vector2(x, y));

          if (i > 0) {
            this.bezierGraphics.lineBetween(
              curvePoints[i - 1].x,
              curvePoints[i - 1].y,
              x,
              y
            );
          }
        }
        this.bezierGraphics.beginPath();
        this.bezierGraphics.moveTo(startPoint.x, startPoint.y);
        curvePoints.forEach((point) => {
          this.bezierGraphics.lineTo(point.x, point.y);
        });
        // Setting fill color from end point .keep filled color above dots line from current plane position point
        this.bezierGraphics.lineTo(
          this.vimaan.x - 42,
          this.cameras.main.height - 30
        );
        // Setting fill color from start point . keep filled color above dots line from left start point
        this.bezierGraphics.lineTo(startPoint.x, this.cameras.main.height - 30);
        this.bezierGraphics.closePath();
        this.bezierGraphics.fillStyle(0xff0000, 0.32);
        this.bezierGraphics.fillPath();
        break;
      case width <= 788:
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const x = Phaser.Math.Interpolation.CubicBezier(
            t,
            startPoint.x,
            controlPoints[0].x,
            controlPoints[1].x,
            this.vimaan.x - 48
          );
          const y = Phaser.Math.Interpolation.CubicBezier(
            t,
            startPoint.y,
            controlPoints[0].y,
            controlPoints[1].y,
            this.vimaan.y + 26
          );

          curvePoints.push(new Phaser.Math.Vector2(x, y));

          if (i > 0) {
            this.bezierGraphics.lineBetween(
              curvePoints[i - 1].x,
              curvePoints[i - 1].y,
              x,
              y
            );
          }
        }
        this.bezierGraphics.beginPath();
        this.bezierGraphics.moveTo(startPoint.x, startPoint.y);
        curvePoints.forEach((point) => {
          this.bezierGraphics.lineTo(point.x, point.y);
        });
        // Setting fill color from end point .keep filled color above dots line from current plane position point
        this.bezierGraphics.lineTo(
          this.vimaan.x - 48,
          this.cameras.main.height - 30
        );
        // Setting fill color from start point . keep filled color above dots line from left start point
        this.bezierGraphics.lineTo(startPoint.x, this.cameras.main.height - 30);
        this.bezierGraphics.closePath();
        this.bezierGraphics.fillStyle(0xff0000, 0.32);
        this.bezierGraphics.fillPath();
        break;
      case width <= 850:
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const x = Phaser.Math.Interpolation.CubicBezier(
            t,
            startPoint.x,
            controlPoints[0].x,
            controlPoints[1].x,
            this.vimaan.x - 48
          );
          const y = Phaser.Math.Interpolation.CubicBezier(
            t,
            startPoint.y,
            controlPoints[0].y,
            controlPoints[1].y,
            this.vimaan.y + 28
          );

          curvePoints.push(new Phaser.Math.Vector2(x, y));

          if (i > 0) {
            this.bezierGraphics.lineBetween(
              curvePoints[i - 1].x,
              curvePoints[i - 1].y,
              x,
              y
            );
          }
        }
        this.bezierGraphics.beginPath();
        this.bezierGraphics.moveTo(startPoint.x, startPoint.y);
        curvePoints.forEach((point) => {
          this.bezierGraphics.lineTo(point.x, point.y);
        });
        // Setting fill color from end point .keep filled color above dots line from current plane position point
        this.bezierGraphics.lineTo(
          this.vimaan.x - 48,
          this.cameras.main.height - 30
        );
        // Setting fill color from start point . keep filled color above dots line from left start point
        this.bezierGraphics.lineTo(startPoint.x, this.cameras.main.height - 30);
        this.bezierGraphics.closePath();
        this.bezierGraphics.fillStyle(0xff0000, 0.32);
        this.bezierGraphics.fillPath();
        break;
      case width == 888 && height == 528:
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const x = Phaser.Math.Interpolation.CubicBezier(
            t,
            startPoint.x,
            controlPoints[0].x,
            controlPoints[1].x,
            this.vimaan.x - 56
          );
          const y = Phaser.Math.Interpolation.CubicBezier(
            t,
            startPoint.y,
            controlPoints[0].y,
            controlPoints[1].y,
            this.vimaan.y + 30
          );

          curvePoints.push(new Phaser.Math.Vector2(x, y));

          if (i > 0) {
            this.bezierGraphics.lineBetween(
              curvePoints[i - 1].x,
              curvePoints[i - 1].y,
              x,
              y
            );
          }
        }
        this.bezierGraphics.beginPath();
        this.bezierGraphics.moveTo(startPoint.x, startPoint.y);
        curvePoints.forEach((point) => {
          this.bezierGraphics.lineTo(point.x, point.y);
        });
        // Setting fill color from end point .keep filled color above dots line from current plane position point
        this.bezierGraphics.lineTo(
          this.vimaan.x - 48,
          this.cameras.main.height - 30
        );
        // Setting fill color from start point . keep filled color above dots line from left start point
        this.bezierGraphics.lineTo(startPoint.x, this.cameras.main.height - 30);
        this.bezierGraphics.closePath();
        this.bezierGraphics.fillStyle(0xff0000, 0.32);
        this.bezierGraphics.fillPath();
        break;
      case width <= 950:
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const x = Phaser.Math.Interpolation.CubicBezier(
            t,
            startPoint.x,
            controlPoints[0].x,
            controlPoints[1].x,
            this.vimaan.x - 56
          );
          const y = Phaser.Math.Interpolation.CubicBezier(
            t,
            startPoint.y,
            controlPoints[0].y,
            controlPoints[1].y,
            this.vimaan.y + 31
          );

          curvePoints.push(new Phaser.Math.Vector2(x, y));

          if (i > 0) {
            this.bezierGraphics.lineBetween(
              curvePoints[i - 1].x,
              curvePoints[i - 1].y,
              x,
              y
            );
          }
        }
        this.bezierGraphics.beginPath();
        this.bezierGraphics.moveTo(startPoint.x, startPoint.y);
        curvePoints.forEach((point) => {
          this.bezierGraphics.lineTo(point.x, point.y);
        });
        // Setting fill color from end point .keep filled color above dots line from current plane position point
        this.bezierGraphics.lineTo(
          this.vimaan.x - 55,
          this.cameras.main.height - 30
        );
        // Setting fill color from start point . keep filled color above dots line from left start point
        this.bezierGraphics.lineTo(startPoint.x, this.cameras.main.height - 30);
        this.bezierGraphics.closePath();
        this.bezierGraphics.fillStyle(0xff0000, 0.32);
        this.bezierGraphics.fillPath();
        break;
      default:
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const x = Phaser.Math.Interpolation.CubicBezier(
            t,
            startPoint.x,
            controlPoints[0].x,
            controlPoints[1].x,
            this.vimaan.x - 57
          );
          const y = Phaser.Math.Interpolation.CubicBezier(
            t,
            startPoint.y,
            controlPoints[0].y,
            controlPoints[1].y,
            this.vimaan.y + 31
          );

          curvePoints.push(new Phaser.Math.Vector2(x, y));

          if (i > 0) {
            this.bezierGraphics.lineBetween(
              curvePoints[i - 1].x,
              curvePoints[i - 1].y,
              x,
              y
            );
          }
        }
        this.bezierGraphics.beginPath();
        this.bezierGraphics.moveTo(startPoint.x, startPoint.y);
        curvePoints.forEach((point) => {
          this.bezierGraphics.lineTo(point.x, point.y);
        });
        // Setting fill color from end point .keep filled color above dots line from current plane position point
        this.bezierGraphics.lineTo(
          this.vimaan.x - 55,
          this.cameras.main.height - 30
        );
        // Setting fill color from start point . keep filled color above dots line from left start point
        this.bezierGraphics.lineTo(startPoint.x, this.cameras.main.height - 30);
        this.bezierGraphics.closePath();
        this.bezierGraphics.fillStyle(0xff0000, 0.32);
        this.bezierGraphics.fillPath();
        break;
    }
    // switch case for curve line gap and placement adjustment with plane ends here
  }

  private updateTint() {
    const color = Phaser.Display.Color.HexStringToColor(this.tintColor);
    this.background.setTint(color.color);
  }

  public setTintColor(color: string) {
    this.tintColor = color;
  }

  flyAway() {
    this.isFlyingAway = true;
    const flyAwaySpeed = 500;
    this.bezierGraphics.clear();
    this.tweens.add({
      targets: this.vimaan,
      x: this.cameras.main.width + 100,
      duration: flyAwaySpeed,
      ease: 'Power1',
    });
    this.background.setTint(0, 0, 0, 0.5);
    this.isAnimating = false;
    this.sunRaysTween.remove();
  }

  resetPlanePosition() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    MainScene.sharedProgress = 0;
    this.bezierGraphics.clear();

    this.vimaan.setPosition(
      this.planeDefaultPosition.width,
      this.planeDefaultPosition.height
    );
    this.progress = 0;
    this.isFlyingAway = false;
    this.isAnimating = false;
    this.background.setTint(0, 0, 0, 0.5);
    this.sunRaysTween.stop();
  }

  startPlaneAnimation() {
    this.resetPlanePosition();
    this.isAnimating = true;
    this.updateTint();
    this.sunRaysTween = this.tweens.add({
      targets: this.sunRaysImage,
      angle: 360,
      duration: 30000,
      repeat: -1,
      ease: 'Linear',
    });
  }
  stopAnimation() {
    this.vimaan.setVisible(false);
    this.bezierGraphics.clear();
    this.bezierGraphics.setVisible(false);
  }

  startAnimation() {
    this.vimaan.setVisible(true);
    this.bezierGraphics.clear();
    this.bezierGraphics.setVisible(true);
    this.drawBezierCurve(this.progress);
  }
}
