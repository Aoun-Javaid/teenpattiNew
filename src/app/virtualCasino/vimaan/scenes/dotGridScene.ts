import { MainScene } from './mainScene';

export class DotGridScene extends Phaser.Scene {
  private bottomDots: Phaser.GameObjects.Arc[] = [];
  private leftDots: Phaser.GameObjects.Arc[] = [];
  private animationStarted: boolean = false;
  text!: Phaser.GameObjects.Text;
  flewAwayText: Phaser.GameObjects.Text | null = null;
  private borderGraphics!: Phaser.GameObjects.Graphics;
  private prop!: Phaser.GameObjects.Image;
  private propTween!: Phaser.Tweens.Tween;
  private propellorPosition!: number;
  private progressBar!: Phaser.GameObjects.Graphics;
  progress: number = 0.9;
  MultiValue!: number;

  constructor() {
    super({ key: 'DotGridScene' });
  }

  preload() {
    this.load.image('p', '/prop.svg');
  }

  create() {
    // Add text to the scene
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.createPropellor();

    this.createBottomDots();
    this.createLeftDots();
    this.addBorders();
  }

  override update(time: number, delta: number) {
    // Check if the progress in MainScene is >= 0.6
    if (MainScene.sharedProgress >= 0.6 && !this.animationStarted) {
      this.animationStarted = true;
    } else {
      this.animationStarted = false;
    }

    // If the animation has started, move the dots
    if (this.animationStarted) {
      this.moveBottomDots(delta);
      this.moveLeftDots(delta);
    }

    this.drawProgressBar();
  }

  // Create dots along the bottom
  private createBottomDots() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Spacing for dots along the x-axis (starting from 10%)
    const startX = width * 0.1;
    const spacingX = width / 10;

    // Draw 10 dots along the bottom (x-axis)
    for (let x = 0; x <= 9; x++) {
      const xPos = startX + x * spacingX;
      const dot = this.add.circle(xPos, height - 15, 2, 0xffffff);
      this.bottomDots.push(dot);
    }
  }

  // Create dots along the left side
  private createLeftDots() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const spacingY = height / 10.5;

    // Draw 10 dots along the left (y-axis)
    for (let y = 0; y <= 9; y++) {
      const yPos = y * spacingY;
      const dot = this.add.circle(15, yPos, 2, 0x33b4ff);
      this.leftDots.push(dot);
    }
  }

  // Move the bottom dots leftward and wrap them when they move off-screen
  private moveBottomDots(delta: number) {
    const width = this.cameras.main.width;

    // Speed of dot movement to the left
    const dotSpeed = 0.05 * delta;

    // Loop through each bottom dot
    for (let i = 0; i < this.bottomDots.length; i++) {
      const dot = this.bottomDots[i];

      // Move the dot to the left
      dot.x -= dotSpeed;

      // If the dot goes off the left edge of the screen, wrap it to the right side
      if (dot.x < +30) {
        // Reappear on the right side of the screen
        dot.x = width + 30;
      }
    }
  }

  // Move the left dots downward and wrap them when they move off-screen
  private moveLeftDots(delta: number) {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Speed of dot movement downward
    const dotSpeed = 0.05 * delta;

    // Loop through each left dot
    for (let i = 0; i < this.leftDots.length; i++) {
      const dot = this.leftDots[i];

      // Move the dot downward
      dot.y += dotSpeed;

      // If the dot goes off the bottom edge of the screen, wrap it to the top
      if (width > 992) {
        if (dot.y > height - 40) {
          dot.y = -10;
        }
      } else {
        if (dot.y > height - 30) {
          dot.y = -18;
        }
      }
    }
  }

  private createPropellor() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    let centerX;
    let centerY;
    let propWidth: number;
    let propHeight: number;

    switch (true) {
      case width < 520:
        propWidth = 50;
        propHeight = 50;

        centerX = this.cameras.main.width / 2;
        centerY = this.cameras.main.height / 2 - 28;
        this.propellorPosition = centerY;
        break;
      case width < 600:
        propWidth = 90;
        propHeight = 90;
        centerX = this.cameras.main.width / 2;
        centerY = this.cameras.main.height / 2 - 42;
        this.propellorPosition = centerY;

        break;
      case width < 980:
        propWidth = 125;
        propHeight = 125;
        centerX = this.cameras.main.width / 2;
        centerY = this.cameras.main.height / 2 - 48;
        this.propellorPosition = centerY;

        break;

      default:
        propWidth = 125;
        propHeight = 125;
        centerX = this.cameras.main.width / 2;
        centerY = this.cameras.main.height / 2 - 48;
        this.propellorPosition = centerY;

        break;
    }

    this.prop = this.add.image(centerX, centerY, 'p');
    this.prop.setDisplaySize(propWidth, propHeight);

    this.prop.setOrigin(0.5, 0.5);

    // Create a tween to rotate the prop 360 degrees infinitely
    this.propTween = this.tweens.add({
      targets: this.prop,
      angle: 360,
      duration: 1980,
      repeat: -1,
      ease: 'Linear',
    });

    this.progressBar = this.add.graphics();

    this.drawProgressBar();
  }

  private addBorders() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.borderGraphics = this.add.graphics();

    // Set the line style for the border (border width and color)
    this.borderGraphics.lineStyle(1, 0x413033);

    // Draw the right border for the left dots (y=0 to y=100, to the right of the left dots)
    this.borderGraphics.beginPath();
    this.borderGraphics.moveTo(30, 0);
    this.borderGraphics.lineTo(30, height - 30);
    this.borderGraphics.strokePath();

    // Draw the top border for the bottom dots
    this.borderGraphics.moveTo(30, height - 30);
    this.borderGraphics.lineTo(width, height - 30);
    this.borderGraphics.strokePath();
  }

  // Hide dots and border lines
  private hideDotsAndLines() {
    // Hide all bottom dots
    this.bottomDots.forEach((dot) => dot.setVisible(false));

    // Hide all left dots
    this.leftDots.forEach((dot) => dot.setVisible(false));

    // Hide the border graphics
    if (this.borderGraphics) {
      this.borderGraphics.setVisible(false);
    }
  }

  // Reset the scene and remove additional text

  // Show dots and border lines
  private showDotsAndLines() {
    this.bottomDots.forEach((dot) => dot.setVisible(true));
    this.leftDots.forEach((dot) => dot.setVisible(true));
    if (this.borderGraphics) {
      this.borderGraphics.setVisible(true);
    }
  }
  private hideText() {
    this.text.setVisible(false);
    if (this.flewAwayText) {
      this.flewAwayText.setVisible(false);
    }
  }

  private drawProgressBar() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    let centerX;
    let progressBarWidth;
    let progressBarHeight;
    let progressBarX;
    let progressBarY;
    let borderRadius;
    switch (true) {
      case width < 527:
        centerX = this.cameras.main.width / 2;
        progressBarWidth = 100;
        progressBarHeight = 4;
        progressBarX = centerX - progressBarWidth / 2;
        progressBarY = this.propellorPosition + 75;
        borderRadius = 2;
        break;
      case width < 588:
        centerX = this.cameras.main.width / 2;
        progressBarWidth = 200;
        progressBarHeight = 8;
        progressBarX = centerX - progressBarWidth / 2;
        progressBarY = this.propellorPosition + 100;

        borderRadius = 4;
        break;
      case width < 980:
        centerX = this.cameras.main.width / 2;
        progressBarWidth = 200;
        progressBarHeight = 8;
        progressBarX = centerX - progressBarWidth / 2;
        progressBarY = this.propellorPosition + 138;

        borderRadius = 4;
        break;
      default:
        centerX = this.cameras.main.width / 2;
        progressBarWidth = 200;
        progressBarHeight = 8;
        progressBarX = centerX - progressBarWidth / 2;
        progressBarY = this.propellorPosition + 138;
        borderRadius = 4;
        break;
    }
    // Clear previous graphics
    this.progressBar.clear();
    // Draw the background of the progress bar (gray color) with rounded corners
    this.progressBar.fillStyle(0x252830, 1);
    this.progressBar.fillRoundedRect(
      progressBarX,
      progressBarY,
      progressBarWidth,
      progressBarHeight,
      borderRadius
    );
    // Draw the progress (filled with red color) with rounded corners
    this.progressBar.fillStyle(0xe50439, 1);
    this.progressBar.fillRoundedRect(
      progressBarX,
      progressBarY,
      progressBarWidth * this.progress,
      progressBarHeight,
      borderRadius
    );
  }
  play() {
    this.hidePropellor();
    this.scene.setVisible(true);
    this.showDotsAndLines();
  }
  reset() {
    
    this.animationStarted = false;
    this.showPropellor();
    this.scene.setVisible(true);
    this.showDotsAndLines();
    // this.hideDotsAndLines();

    this.progressBarAnimation();
  }

  progressBarAnimation() {
    const totalDuration = 10000;
    const intervalTime = 50;
    const steps = totalDuration / intervalTime;
    const decrementValue = 1 / steps;

    this.progress = 1;

    const interval = setInterval(() => {
      this.progress -= decrementValue;
      if (this.progress <= 0) {
        this.progress = 0;
        clearInterval(interval);
      }
    }, intervalTime);
  }

  // Modified fly method to only hide dots and lines, but keep text visible
  fly() {
    this.hidePropellor();

    this.hideDotsAndLines();
  }

  private hidePropellor() {
    if (this.prop) {
      this.prop.setVisible(false);
    }

    if (this.progressBar) {
      this.progressBar.setVisible(false);
    }
  }
  private showPropellor() {
    if (this.prop) {
      this.prop.setVisible(true);
    }

    if (this.progressBar) {
      this.progressBar.setVisible(true);
    }
  }

  updateMultiVal(val: number) {
    this.MultiValue = val;
    this.text.setText(this.MultiValue + 'x');
  }
}
