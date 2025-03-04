import { Scene } from 'phaser';

export class vdtScene extends Scene {
  private width!: number;
  private height!: number;
  private leftCard!: Phaser.GameObjects.Image;
  private rightCard!: Phaser.GameObjects.Image;
  private cardScaleLeft!: number;
  private cardScaleRight!: number;
  private cardSize!: number;
  private hiddenCardSize!: number;
  private cardStartPointX!: number;
  private cardStartPointY!: number;
  private cardEndPointY!: number;
  private leftCardEndPositionX!: number;
  private rightCardEndPositionX!: number;
  private hiddenCardEndPointX!: number;
  private hiddenCardEndPointY!: number;

  constructor() {
    super({ key: 'vdtScene' });
  }

  preload(): void {
    this.load.image('C2_', '/assets/52 Cards skew/C2_.svg');
    this.load.image('C3_', '/assets/52 Cards skew/C3_.svg');
    this.load.image('C4_', '/assets/52 Cards skew/C4_.svg');
    this.load.image('C5_', '/assets/52 Cards skew/C5_.svg');
    this.load.image('C6_', '/assets/52 Cards skew/C6_.svg');
    this.load.image('C7_', '/assets/52 Cards skew/C7_.svg');
    this.load.image('C8_', '/assets/52 Cards skew/C8_.svg');
    this.load.image('C9_', '/assets/52 Cards skew/C9_.svg');
    this.load.image('C10_', '/assets/52 Cards skew/C10_.svg');
    this.load.image('CA_', '/assets/52 Cards skew/CA_.svg');
    this.load.image('CJ_', '/assets/52 Cards skew/CJ_.svg');
    this.load.image('CK_', '/assets/52 Cards skew/CK_.svg');
    this.load.image('CQ_', '/assets/52 Cards skew/CQ_.svg');
    this.load.image('D2_', '/assets/52 Cards skew/D2_.svg');
    this.load.image('D3_', '/assets/52 Cards skew/D3_.svg');
    this.load.image('D4_', '/assets/52 Cards skew/D4_.svg');
    this.load.image('D5_', '/assets/52 Cards skew/D5_.svg');
    this.load.image('D6_', '/assets/52 Cards skew/D6_.svg');
    this.load.image('D7_', '/assets/52 Cards skew/D7_.svg');
    this.load.image('D8_', '/assets/52 Cards skew/D8_.svg');
    this.load.image('D9_', '/assets/52 Cards skew/D9_.svg');
    this.load.image('D10_', '/assets/52 Cards skew/D10_.svg');
    this.load.image('DA_', '/assets/52 Cards skew/DA_.svg');
    this.load.image('DJ_', '/assets/52 Cards skew/DJ_.svg');
    this.load.image('DK_', '/assets/52 Cards skew/DK_.svg');
    this.load.image('DQ_', '/assets/52 Cards skew/DQ_.svg');
    this.load.image('H2_', '/assets/52 Cards skew/H2_.svg');
    this.load.image('H3_', '/assets/52 Cards skew/H3_.svg');
    this.load.image('H4_', '/assets/52 Cards skew/H4_.svg');
    this.load.image('H5_', '/assets/52 Cards skew/H5_.svg');
    this.load.image('H6_', '/assets/52 Cards skew/H6_.svg');
    this.load.image('H7_', '/assets/52 Cards skew/H7_.svg');
    this.load.image('H8_', '/assets/52 Cards skew/H8_.svg');
    this.load.image('H9_', '/assets/52 Cards skew/H9_.svg');
    this.load.image('H10_', '/assets/52 Cards skew/H10_.svg');
    this.load.image('HA_', '/assets/52 Cards skew/HA_.svg');
    this.load.image('HJ_', '/assets/52 Cards skew/HJ_.svg');
    this.load.image('HK_', '/assets/52 Cards skew/HK_.svg');
    this.load.image('HQ_', '/assets/52 Cards skew/HQ_.svg');
    this.load.image('null', '/assets/52 Cards skew/null.svg');
    this.load.image('S2_', '/assets/52 Cards skew/S2_.svg');
    this.load.image('S3_', '/assets/52 Cards skew/S3_.svg');
    this.load.image('S4_', '/assets/52 Cards skew/S4_.svg');
    this.load.image('S5_', '/assets/52 Cards skew/S5_.svg');
    this.load.image('S6_', '/assets/52 Cards skew/S6_.svg');
    this.load.image('S7_', '/assets/52 Cards skew/S7_.svg');
    this.load.image('S8_', '/assets/52 Cards skew/S8_.svg');
    this.load.image('S9_', '/assets/52 Cards skew/S9_.svg');
    this.load.image('S10_', '/assets/52 Cards skew/S10_.svg');
    this.load.image('SA_', '/assets/52 Cards skew/SA_.svg');
    this.load.image('SJ_', '/assets/52 Cards skew/SJ_.svg');
    this.load.image('SK_', '/assets/52 Cards skew/SK_.svg');
    this.load.image('SQ_', '/assets/52 Cards skew/SQ_.svg');
    this.load.image('h1', '/assets/cards/h1.svg');
    // this.load.image('hiddenCard', '/assets/cards/Ca.svg');
    this.load.image('single', '/assets/cards/Broder.svg');
    this.load.image('single1', '/assets/cards/Broder.png');
    // this.load.image('single1', '/assets/cards/b1.svg');
    this.load.image('multi', '/assets/cards/BroderImage2.svg');
    this.textures.get('single1').setFilter(Phaser.Textures.FilterMode.NEAREST);
  }

  create() {
    this.setBreakPoints();
    this.updateWidthHeight();
    if (this.input.keyboard) {
      this.input.keyboard.on('keydown-G', () => {
        this.showCardWithAnimationLeft('C5_');
      });
      this.input.keyboard.on('keydown-H', () => {
        this.showCardWithAnimationRight('H4_');
      });
      this.input.keyboard.on('keydown-L', () => {
        this.animateCardUpDown(this.leftCard, this.cardScaleLeft);
      });
      this.input.keyboard.on('keydown-R', () => {
        this.animateCardUpDown(this.rightCard, this.cardScaleRight);
      });
      this.input.keyboard.on('keydown-D', () => {
        this.moveAndRemoveCard(this.leftCard, this.width * 0.5);
        this.moveAndRemoveCard(this.rightCard, this.width * 0.5);
        setTimeout(() => {
          this.createHiddenCard(this.cardStartPointX, this.cardEndPointY);
        }, 600);
        setTimeout(() => {
          this.scene.restart();
        }, 2600);
      });
    }
  }
  override update(time: number, delta: number): void {}
  private updateWidthHeight() {
    const camera = this.cameras.main;
    const { width, height } = camera;
    this.width = width;
    this.height = height;
  }

  private createHiddenCard(x: number, y: number): void {
    const hiddenCardTexture = this.textures
      .get('single1')
      .getSourceImage() as HTMLImageElement;

    const originalWidth = hiddenCardTexture.width;
    const originalHeight = hiddenCardTexture.height;

    const scale = this.hiddenCardSize / originalWidth;

    const hiddenCard = this.add
      .image(x, y, 'single1')
      .setOrigin(0.5, 0.5)
      .setScale(scale)
      .setAngle(1);

    this.tweens.add({
      targets: hiddenCard,
      x: this.hiddenCardEndPointX,
      y: this.hiddenCardEndPointY,
      alpha: 0,
      duration: 400,
      ease: 'Cubic.easeInOut',
      onComplete: () => {
        hiddenCard.destroy();
      },
    });
  }
  //   private createStackedCard(x: number, y: number) {
  //     const hiddenCardTexture = this.textures
  //       .get('single')
  //       .getSourceImage() as HTMLImageElement;

  //     const originalWidth = hiddenCardTexture.width;
  //     const originalHeight = hiddenCardTexture.height;

  //     const desiredWidth = 45;

  //     const scale = desiredWidth / originalWidth;

  //     const hiddenCard = this.add
  //       .image(x, y, 'single')
  //       .setOrigin(0.5, 0.5)
  //       .setScale(scale)
  //       .setAngle(1);
  //   }
  private showCardWithAnimationLeft(cardName: string): void {
    const cardTexture = this.textures
      .get(cardName)
      .getSourceImage() as HTMLImageElement;

    const originalWidth = cardTexture.width;
    const originalHeight = cardTexture.height;

    this, (this.cardScaleLeft = this.cardSize / originalWidth);

    this.leftCard = this.add
      .image(this.cardStartPointX, this.cardStartPointY, cardName)
      .setScale(this.cardScaleLeft)
      .setOrigin(0.5, 0.5);
    this.leftCard.setAlpha(0);

    const targetX = this.cardStartPointX - this.leftCardEndPositionX;
    const targetY = this.cardEndPointY;

    this.tweens.add({
      targets: this.leftCard,
      x: targetX,
      y: targetY,
      alpha: 1,
      duration: 600,
      ease: 'Power2',
      onComplete: () => {},
    });
  }
  private showCardWithAnimationRight(cardName: string): void {
    const cardTexture = this.textures
      .get(cardName)
      .getSourceImage() as HTMLImageElement;

    const originalWidth = cardTexture.width;
    const originalHeight = cardTexture.height;

    this.cardScaleRight = this.cardSize / originalWidth;

    this.rightCard = this.add
      .image(this.cardStartPointX, this.cardStartPointY, cardName)
      .setScale(this.cardScaleRight)

      .setOrigin(0.5, 0.5);
    this.rightCard.setAlpha(0);

    const targetX = this.cardStartPointX + this.rightCardEndPositionX;
    const targetY = this.cardEndPointY;

    this.tweens.add({
      targets: this.rightCard,
      x: targetX,
      y: targetY,
      alpha: 1,
      duration: 600,
      ease: 'Power2',
      onComplete: () => {},
    });
  }
  private animateCardUpDown(
    card: Phaser.GameObjects.Image,
    scale: number
  ): void {
    const startY = card.y;
    const shadow = this.add.graphics({
      fillStyle: { color: 0x000000, alpha: 0.5 },
    });

    const tween = this.tweens.add({
      targets: card,
      y: { from: startY, to: startY - 15 },
      duration: 600,
      yoyo: true,
      scale: scale * 1.01,
      repeat: 1,
      ease: 'Sine.easeInOut',
      onRepeat: () => {
        // shadow.clear();
        // shadow.fillEllipse(card.x - 10, card.y + 5, 30, 10);
        // shadow.fillEllipse(card.x + 10, card.y + 5, 30, 10);
      },
      onComplete: () => {
        // shadow.destroy();
      },
    });
  }

  private moveAndRemoveCard(
    card: Phaser.GameObjects.Image,
    endX: number
  ): void {
    this.tweens.add({
      targets: card,
      x: endX,
      //   y: endY,
      alpha: 0,
      duration: 1000,
      ease: 'Cubic.easeInOut',
      onComplete: () => {
        card.destroy();
      },
    });
  }

  showCardDragon(card: string) {
    this.showCardWithAnimationLeft(card);
  }
  showCardPlayer(card: string) {
    this.showCardWithAnimationRight(card);
  }
  animateUpOrDown(key: number) {
    if (key === 1) {
      this.animateCardUpDown(this.leftCard, this.cardScaleLeft);
    } else if (key === 2) {
      this.animateCardUpDown(this.rightCard, this.cardScaleLeft);
    } else {
      this.animateCardUpDown(this.rightCard, this.cardScaleLeft);
      this.animateCardUpDown(this.leftCard, this.cardScaleLeft);
    }
  }

  clearRound() {
    this.moveAndRemoveCard(this.leftCard, this.cardStartPointX);
    this.moveAndRemoveCard(this.rightCard, this.cardStartPointX);
    setTimeout(() => {
      this.createHiddenCard(this.cardStartPointX, this.cardEndPointY);
    }, 600);
    setTimeout(() => {
      this.scene.restart();
    }, 2600);
  }
  private setBreakPoints() {
    const camera = this.cameras.main;
    const { width, height } = camera;
    this.width = width;
    this.height = height;
    switch (true) {
      case width < 285:
        this.cardSize = 30;
        this.hiddenCardSize = 35;
        this.cardStartPointX = this.width * 0.5;
        this.cardStartPointY = this.height * 0.3;
        this.cardEndPointY = this.cardStartPointY + 70;

        this.leftCardEndPositionX = 27;
        this.rightCardEndPositionX = 27;

        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.45;

        break;
      case width < 310:
        this.cardSize = 35;
        this.hiddenCardSize = 40;
        this.cardStartPointX = this.width * 0.5;
        this.cardStartPointY = this.height * 0.3;
        this.cardEndPointY = this.cardStartPointY + 70;

        this.leftCardEndPositionX = 27;
        this.rightCardEndPositionX = 27;

        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.45;
        break;

      case width < 340:
        this.cardSize = 35;
        this.hiddenCardSize = 40;
        this.cardStartPointX = this.width * 0.5;
        this.cardStartPointY = this.height * 0.35;
        this.cardEndPointY = this.cardStartPointY + 70;

        this.leftCardEndPositionX = 27;
        this.rightCardEndPositionX = 27;

        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.45;

        break;
      case width < 350:
        this.cardSize = 35;
        this.hiddenCardSize = 40;
        this.cardStartPointX = this.width * 0.5;
        this.cardStartPointY = this.height * 0.35;
        this.cardEndPointY = this.cardStartPointY + 70;

        this.leftCardEndPositionX = 27;
        this.rightCardEndPositionX = 27;

        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.45;

        break;
      case width < 363:
        this.cardSize = 35;
        this.hiddenCardSize = 40;
        this.cardStartPointX = this.width * 0.5;
        this.cardStartPointY = this.height * 0.35;
        this.cardEndPointY = this.cardStartPointY + 70;

        this.leftCardEndPositionX = 37;
        this.rightCardEndPositionX = 37;

        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.45;

        break;
      case width < 377:
        this.cardSize = 35;
        this.hiddenCardSize = 40;
        this.cardStartPointX = this.width * 0.5;
        this.cardStartPointY = this.height * 0.35;
        this.cardEndPointY = this.cardStartPointY + 70;

        this.leftCardEndPositionX = 37;
        this.rightCardEndPositionX = 37;

        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.45;

        break;
      case width < 500:
        this.cardSize = 40;
        this.hiddenCardSize = 45;
        this.cardStartPointX = this.width * 0.5;
        this.cardStartPointY = this.height * 0.3;
        this.cardEndPointY = this.cardStartPointY + 80;

        this.leftCardEndPositionX = 30;
        this.rightCardEndPositionX = 30;

        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.43;

        break;
      case width < 700:
        this.cardSize = 60;
        this.hiddenCardSize = 65;
        this.cardStartPointX = this.width * 0.49;
        this.cardStartPointY = this.height * 0.3;
        this.cardEndPointY = this.cardStartPointY + 120;

        this.leftCardEndPositionX = 60;
        this.rightCardEndPositionX = 60;

        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.43;

        break;
      default:
        this.cardSize = 50;
        this.hiddenCardSize = 55;
        this.cardStartPointX = this.width * 0.49;
        this.cardStartPointY = this.height * 0.3;
        this.cardEndPointY = this.cardStartPointY + 120;

        this.leftCardEndPositionX = 60;
        this.rightCardEndPositionX = 60;

        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.43;

        break;
    }
  }
}
