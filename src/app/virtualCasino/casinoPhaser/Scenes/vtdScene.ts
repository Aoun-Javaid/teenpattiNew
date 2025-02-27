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
    this.load.image('0', '/assets/cards/0.png');
    this.load.image('C2_', '/assets/cards/C2_.png');
    this.load.image('C3_', '/assets/cards/C3_.png');
    this.load.image('C4_', '/assets/cards/C4_.png');
    this.load.image('C5_', '/assets/cards/C5_.png');
    this.load.image('C6_', '/assets/cards/C6_.png');
    this.load.image('C7_', '/assets/cards/C7_.png');
    this.load.image('C8_', '/assets/cards/C8_.png');
    this.load.image('C9_', '/assets/cards/C9_.png');
    this.load.image('C10_', '/assets/cards/C10_.png');
    this.load.image('CA_', '/assets/cards/CA_.png');
    this.load.image('CJ_', '/assets/cards/CJ_.png');
    this.load.image('CK_', '/assets/cards/CK_.png');
    this.load.image('CLUB KING', '/assets/cards/CLUB KING.png');
    this.load.image('CLUBS', '/assets/cards/CLUBS.png');
    this.load.image('CQ_', '/assets/cards/CQ_.png');
    this.load.image('D2_', '/assets/cards/D2_.png');
    this.load.image('D3_', '/assets/cards/D3_.png');
    this.load.image('D4_', '/assets/cards/D4_.png');
    this.load.image('D5_', '/assets/cards/D5_.png');
    this.load.image('D6_', '/assets/cards/D6_.png');
    this.load.image('D7_', '/assets/cards/D7_.png');
    this.load.image('D8_', '/assets/cards/D8_.png');
    this.load.image('D9_', '/assets/cards/D9_.png');
    this.load.image('D10_', '/assets/cards/D10_.png');
    this.load.image('DA_', '/assets/cards/DA_.png');
    this.load.image('DIAMOND KING', '/assets/cards/DIAMOND KING.png');
    this.load.image('DIAMONDS', '/assets/cards/DIAMONDS.png');
    this.load.image('DJ_', '/assets/cards/DJ_.png');
    this.load.image('DK_', '/assets/cards/DK_.png');
    this.load.image('DQ_', '/assets/cards/DQ_.png');
    this.load.image('H2_', '/assets/cards/H2_.png');
    this.load.image('H3_', '/assets/cards/H3_.png');
    this.load.image('H4_', '/assets/cards/H4_.png');
    this.load.image('H5_', '/assets/cards/H5_.png');
    this.load.image('H6_', '/assets/cards/H6_.png');
    this.load.image('H7_', '/assets/cards/H7_.png');
    this.load.image('H8_', '/assets/cards/H8_.png');
    this.load.image('H9_', '/assets/cards/H9_.png');
    this.load.image('H10_', '/assets/cards/H10_.png');
    this.load.image('HA_', '/assets/cards/HA_.png');
    this.load.image('HEART KING', '/assets/cards/HEART KING.png');
    this.load.image('HEARTS', '/assets/cards/HEARTS.png');
    this.load.image('HJ_', '/assets/cards/HJ_.png');
    this.load.image('HK_', '/assets/cards/HK_.png');
    this.load.image('HQ_', '/assets/cards/HQ_.png');
    this.load.image('null', '/assets/cards/null.png');
    this.load.image('S2_', '/assets/cards/S2_.png');
    this.load.image('S3_', '/assets/cards/S3_.png');
    this.load.image('S4_', '/assets/cards/S4_.png');
    this.load.image('S5_', '/assets/cards/S5_.png');
    this.load.image('S6_', '/assets/cards/S6_.png');
    this.load.image('S7_', '/assets/cards/S7_.png');
    this.load.image('S8_', '/assets/cards/S8_.png');
    this.load.image('S9_', '/assets/cards/S9_.png');
    this.load.image('S10_', '/assets/cards/S10_.png');
    this.load.image('SA_', '/assets/cards/SA_.png');
    this.load.image('SJ_', '/assets/cards/SJ_.png');
    this.load.image('SK_', '/assets/cards/SK_.png');
    this.load.image('SPADE KING', '/assets/cards/SPADE KING.png');
    this.load.image('SPADES', '/assets/cards/SPADES.png');
    this.load.image('SQ_', '/assets/cards/SQ_.png');
    // this.load.image('hiddenCard', '/assets/cards/Ca.svg');
    this.load.image('single', '/assets/cards/Broder.svg');
    this.load.image('single1', '/assets/cards/Broder.png');
    // this.load.image('single1', '/assets/cards/b1.svg');
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
