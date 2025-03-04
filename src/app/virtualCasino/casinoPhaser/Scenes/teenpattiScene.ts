import { Scene } from 'phaser';

export class teenpattiScene extends Scene {
  private width!: number;
  private height!: number;
  private leftCard1!: any;
  private leftCard2!: any;
  private leftCard3!: any;
  private rightCard1!: any;
  private rightCard2!: any;
  private rightCard3!: any;
  private cardScaleLeft!: number;
  private cardScaleRight!: number;
  private cardSize!: number;
  private hiddenCardSize!: number;
  private cardStartPointX!: number;
  private cardStartPointY!: number;
  private cardEndPointY!: number;
  private leftCard1EndPositionX!: number;
  private leftCard2EndPositionX!: number;
  private leftCard3EndPositionX!: number;
  private rightCard1EndPositionX!: number;
  private rightCard2EndPositionX!: number;
  private rightCard3EndPositionX!: number;
  private hiddenCardEndPointX!: number;
  private hiddenCardEndPointY!: number;
  private dpr!: number;

  constructor() {
    super({ key: 'teenpattiScene' });
  }

  preload(): void {
    this.dpr = window.devicePixelRatio || 1;
    this.load.image('C2_', '/assets/52 Cards skew/C2_.svg');
    this.load.image('C3_', '/assets/52 Cards skew/C3_.svg');
    this.load.image('C4_', '/assets/52 Cards skew/C4_.svg');
    this.load.image('C5_', '/assets/52 Cards skew/C5_.svg');
    this.load.image('C51_', '/assets/52 Cards skew/C5_1.svg');
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
    this.cameras.main.roundPixels = true;

    this.setBreakPoints();
    this.updateWidthHeight();
    if (this.input.keyboard) {
      this.input.keyboard.on('keydown-ONE', () => {
        this.showCardWithAnimationLeft1('C5_');
      });
      this.input.keyboard.on('keydown-TWO', () => {
        this.showCardWithAnimationLeft2('C6_');
      });
      this.input.keyboard.on('keydown-THREE', () => {
        this.showCardWithAnimationLeft3('C7_');
      });
      this.input.keyboard.on('keydown-FOUR', () => {
        this.showCardWithAnimationRight1('H4_');
      });
      this.input.keyboard.on('keydown-FIVE', () => {
        this.showCardWithAnimationRight2('H5_');
      });
      this.input.keyboard.on('keydown-SIX', () => {
        this.showCardWithAnimationRight3('H6_');
      });
      this.input.keyboard.on('keydown-L', () => {
        this.animateCardUpDown(this.leftCard1, this.cardScaleLeft);
        this.animateCardUpDown(this.leftCard2, this.cardScaleLeft);
        this.animateCardUpDown(this.leftCard3, this.cardScaleLeft);
      });
      this.input.keyboard.on('keydown-R', () => {
        this.animateCardUpDown(this.rightCard1, this.cardScaleRight);
        this.animateCardUpDown(this.rightCard2, this.cardScaleRight);
        this.animateCardUpDown(this.rightCard3, this.cardScaleRight);
      });
      this.input.keyboard.on('keydown-D', () => {
        this.moveAndRemoveCard(this.leftCard1, this.cardStartPointX);
        this.moveAndRemoveCard(this.leftCard2, this.cardStartPointX);
        this.moveAndRemoveCard(this.leftCard3, this.cardStartPointX);
        this.moveAndRemoveCard(this.rightCard1, this.cardStartPointX);
        this.moveAndRemoveCard(this.rightCard2, this.cardStartPointX);
        this.moveAndRemoveCard(this.rightCard3, this.cardStartPointX);
        setTimeout(() => {
          this.createHiddenCard(this.cardStartPointX, this.cardEndPointY);
        }, 600);
      });
    }
  }
  override update(time: number, delta: number): void {}

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

  //     const this.cardSize = 45;

  //     const scale = this.cardSize / originalWidth;

  //     const hiddenCard = this.add
  //       .image(x, y, 'single')
  //       .setOrigin(0.5, 0.5)
  //       .setScale(scale)
  //       .setAngle(1);
  //   }
  private showCardWithAnimationLeft1(cardName: string): void {
    const cardTexture = this.textures
      .get(cardName)
      .getSourceImage() as HTMLImageElement;

    const originalWidth = cardTexture.width;
    const originalHeight = cardTexture.height;

    this, (this.cardScaleLeft = this.cardSize / originalWidth);

    this.leftCard1 = this.add
      .image(this.cardStartPointX, this.cardStartPointY, cardName)
      .setScale(this.cardScaleLeft)
      .setOrigin(0.5, 0.5);
    this.leftCard1.setAlpha(0);
  

    const targetX = this.cardStartPointX - this.leftCard1EndPositionX;
    const targetY = this.cardEndPointY;

    this.tweens.add({
      targets: this.leftCard1,
      x: targetX,
      y: targetY,
      alpha: 1,
      duration: 600,
      ease: 'Power2',
      onComplete: () => {},
    });
  }
  private showCardWithAnimationLeft2(cardName: string): void {
    const cardTexture = this.textures
      .get(cardName)
      .getSourceImage() as HTMLImageElement;

    const originalWidth = cardTexture.width;
    const originalHeight = cardTexture.height;

    this, (this.cardScaleLeft = this.cardSize / originalWidth);

    this.leftCard2 = this.add
      .image(this.cardStartPointX, this.cardStartPointY, cardName)
      .setScale(this.cardScaleLeft)
      .setOrigin(0.5, 0.5);

    this.leftCard2.setAlpha(0);

    const targetX = this.cardStartPointX - this.leftCard2EndPositionX;
    const targetY = this.cardEndPointY;

    this.tweens.add({
      targets: this.leftCard2,
      x: targetX,
      y: targetY,
      alpha: 1,
      duration: 600,
      ease: 'Power2',
      onComplete: () => {},
    });
  }
  private showCardWithAnimationLeft3(cardName: string): void {
    const cardTexture = this.textures
      .get(cardName)
      .getSourceImage() as HTMLImageElement;

    const originalWidth = cardTexture.width;
    const originalHeight = cardTexture.height;

    this, (this.cardScaleLeft = this.cardSize / originalWidth);

    this.leftCard3 = this.add
      .image(this.cardStartPointX, this.cardStartPointY, cardName)
      .setScale(this.cardScaleLeft)
      .setOrigin(0.5, 0.5);
    this.leftCard3.setAlpha(0);

    const targetX = this.cardStartPointX - this.leftCard3EndPositionX;
    const targetY = this.cardEndPointY;

    this.tweens.add({
      targets: this.leftCard3,
      x: targetX,
      y: targetY,
      alpha: 1,
      duration: 600,
      ease: 'Power2',
      onComplete: () => {},
    });
  }
  private showCardWithAnimationRight1(cardName: string): void {
    const cardTexture = this.textures
      .get(cardName)
      .getSourceImage() as HTMLImageElement;

    const originalWidth = cardTexture.width;
    const originalHeight = cardTexture.height;

    this.cardScaleRight = this.cardSize / originalWidth;

    this.rightCard1 = this.add
      .image(this.cardStartPointX, this.cardStartPointY, cardName)
      .setScale(this.cardScaleRight)
      .setOrigin(0.5, 0.5);
    this.rightCard1.setAlpha(0);

    const targetX = this.cardStartPointX + this.rightCard1EndPositionX;
    const targetY = this.cardEndPointY;

    this.tweens.add({
      targets: this.rightCard1,
      x: targetX,
      y: targetY,
      alpha: 1,
      duration: 600,
      ease: 'Power2',
      onComplete: () => {},
    });
  }
  private showCardWithAnimationRight2(cardName: string): void {
    const cardTexture = this.textures
      .get(cardName)
      .getSourceImage() as HTMLImageElement;

    const originalWidth = cardTexture.width;
    const originalHeight = cardTexture.height;

    this.cardScaleRight = this.cardSize / originalWidth;

    this.rightCard2 = this.add
      .image(this.cardStartPointX, this.cardStartPointY, cardName)
      .setScale(this.cardScaleRight)
      .setOrigin(0.5, 0.5);
    this.rightCard2.setAlpha(0);

    const targetX = this.cardStartPointX + this.rightCard2EndPositionX;
    const targetY = this.cardEndPointY;

    this.tweens.add({
      targets: this.rightCard2,
      x: targetX,
      y: targetY,
      alpha: 1,
      duration: 600,
      ease: 'Power2',
      onComplete: () => {},
    });
  }
  private showCardWithAnimationRight3(cardName: string): void {
    const cardTexture = this.textures
      .get(cardName)
      .getSourceImage() as HTMLImageElement;

    const originalWidth = cardTexture.width;
    const originalHeight = cardTexture.height;

    this.cardScaleRight = this.cardSize / originalWidth;

    this.rightCard3 = this.add
      .image(this.cardStartPointX, this.cardStartPointY, cardName)
      .setScale(this.cardScaleRight)
      .setOrigin(0.5, 0.5);
    this.rightCard3.setAlpha(0);

    const targetX = this.cardStartPointX + this.rightCard3EndPositionX;
    const targetY = this.cardEndPointY;

    this.tweens.add({
      targets: this.rightCard3,
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
    const startPoint = card.y;
    const shadow = this.add.graphics({
      fillStyle: { color: 0x000000, alpha: 0.5 },
    });

    const tween = this.tweens.add({
      targets: card,
      y: { from: startPoint, to: startPoint - 15 },
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

  showCardDragon1(card: string) {
    this.showCardWithAnimationLeft1(card);
  }
  showCardPlayer1(card: string) {
    this.showCardWithAnimationRight1(card);
  }
  showCardDragon2(card: string) {
    this.showCardWithAnimationLeft2(card);
  }
  showCardPlayer2(card: string) {
    this.showCardWithAnimationRight2(card);
  }
  showCardDragon3(card: string) {
    this.showCardWithAnimationLeft3(card);
  }
  showCardPlayer3(card: string) {
    this.showCardWithAnimationRight3(card);
  }
  animateUpOrDown(key: number) {
    if (key === 1) {
      this.animateCardUpDown(this.leftCard1, this.cardScaleLeft);
      this.animateCardUpDown(this.leftCard2, this.cardScaleLeft);
      this.animateCardUpDown(this.leftCard3, this.cardScaleLeft);
    } else if (key === 2) {
      this.animateCardUpDown(this.rightCard1, this.cardScaleLeft);
      this.animateCardUpDown(this.rightCard2, this.cardScaleLeft);
      this.animateCardUpDown(this.rightCard3, this.cardScaleLeft);
    } else {
      this.animateCardUpDown(this.leftCard1, this.cardScaleLeft);
      this.animateCardUpDown(this.leftCard2, this.cardScaleLeft);
      this.animateCardUpDown(this.leftCard3, this.cardScaleLeft);
      this.animateCardUpDown(this.rightCard1, this.cardScaleLeft);
      this.animateCardUpDown(this.rightCard2, this.cardScaleLeft);
      this.animateCardUpDown(this.rightCard3, this.cardScaleLeft);
    }
  }

  clearRound() {
    this.moveAndRemoveCard(this.leftCard1, this.cardStartPointX);
    this.moveAndRemoveCard(this.leftCard2, this.cardStartPointX);
    this.moveAndRemoveCard(this.leftCard3, this.cardStartPointX);
    this.moveAndRemoveCard(this.rightCard1, this.cardStartPointX);
    this.moveAndRemoveCard(this.rightCard2, this.cardStartPointX);
    this.moveAndRemoveCard(this.rightCard3, this.cardStartPointX);
    setTimeout(() => {
      this.createHiddenCard(this.cardStartPointX, this.cardEndPointY);
    }, 600);
    setTimeout(() => {
      this.scene.restart();
    }, 1500);
  }
  private updateWidthHeight() {
    const camera = this.cameras.main;
    const { width, height } = camera;
    this.width = width;
    this.height = height;
  }

  private setBreakPoints() {
    const camera = this.cameras.main;
    const { width, height } = camera;
    this.width = width;
    this.height = height;
    switch (true) {
      case width < 285:
        this.cardSize = 40;
        this.hiddenCardSize = 45;
        this.cardStartPointX = this.width * 0.5;
        this.cardStartPointY = this.height * 0.3;
        this.cardEndPointY = this.cardStartPointY + 70;
        this.leftCard1EndPositionX = 105;
        this.leftCard2EndPositionX = 65;
        this.leftCard3EndPositionX = 27;
        this.rightCard1EndPositionX = 27;
        this.rightCard2EndPositionX = 65;
        this.rightCard3EndPositionX = 105;
        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.45;

        break;
      case width < 310:
        this.cardSize = 35;
        this.hiddenCardSize = 40;
        this.cardStartPointX = this.width * 0.5;
        this.cardStartPointY = this.height * 0.3;
        this.cardEndPointY = this.cardStartPointY + 70;
        this.leftCard1EndPositionX = 113;
        this.leftCard2EndPositionX = 70;
        this.leftCard3EndPositionX = 27;
        this.rightCard1EndPositionX = 27;
        this.rightCard2EndPositionX = 70;
        this.rightCard3EndPositionX = 113;
        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.45;
        break;

      case width < 340:
        this.cardSize = 35;
        this.hiddenCardSize = 40;
        this.cardStartPointX = this.width * 0.5;
        this.cardStartPointY = this.height * 0.35;
        this.cardEndPointY = this.cardStartPointY + 70;
        this.leftCard1EndPositionX = 113;
        this.leftCard2EndPositionX = 70;
        this.leftCard3EndPositionX = 27;
        this.rightCard1EndPositionX = 27;
        this.rightCard2EndPositionX = 70;
        this.rightCard3EndPositionX = 113;
        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.45;

        break;
      case width < 350:
        this.cardSize = 35;
        this.hiddenCardSize = 40;
        this.cardStartPointX = this.width * 0.5;
        this.cardStartPointY = this.height * 0.35;
        this.cardEndPointY = this.cardStartPointY + 70;
        this.leftCard1EndPositionX = 113;
        this.leftCard2EndPositionX = 70;
        this.leftCard3EndPositionX = 27;
        this.rightCard1EndPositionX = 27;
        this.rightCard2EndPositionX = 70;
        this.rightCard3EndPositionX = 113;
        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.45;

        break;
      case width < 363:
        this.cardSize = 35;
        this.hiddenCardSize = 40;
        this.cardStartPointX = this.width * 0.5;
        this.cardStartPointY = this.height * 0.35;
        this.cardEndPointY = this.cardStartPointY + 70;
        this.leftCard1EndPositionX = 123;
        this.leftCard2EndPositionX = 80;
        this.leftCard3EndPositionX = 37;
        this.rightCard1EndPositionX = 37;
        this.rightCard2EndPositionX = 80;
        this.rightCard3EndPositionX = 123;
        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.45;

        break;
      case width < 377:
        this.cardSize = 35;
        this.hiddenCardSize = 40;
        this.cardStartPointX = this.width * 0.5;
        this.cardStartPointY = this.height * 0.35;
        this.cardEndPointY = this.cardStartPointY + 70;
        this.leftCard1EndPositionX = 123;
        this.leftCard2EndPositionX = 80;
        this.leftCard3EndPositionX = 37;
        this.rightCard1EndPositionX = 37;
        this.rightCard2EndPositionX = 80;
        this.rightCard3EndPositionX = 123;
        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.45;

        break;
      case width < 500:
        this.cardSize = 40;
        this.hiddenCardSize = 45;
        this.cardStartPointX = this.width * 0.5;
        this.cardStartPointY = this.height * 0.3;
        this.cardEndPointY = this.cardStartPointY + 80;
        this.leftCard1EndPositionX = 130;
        this.leftCard2EndPositionX = 80;
        this.leftCard3EndPositionX = 30;
        this.rightCard1EndPositionX = 30;
        this.rightCard2EndPositionX = 80;
        this.rightCard3EndPositionX = 130;
        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.43;

        break;
      case width < 700:
        this.cardSize = 75;
        this.hiddenCardSize = 80;
        this.cardStartPointX = this.width * 0.49;
        this.cardStartPointY = this.height * 0.3;
        this.cardEndPointY = this.cardStartPointY + 120;
        this.leftCard1EndPositionX = 220;
        this.leftCard2EndPositionX = 140;
        this.leftCard3EndPositionX = 60;
        this.rightCard1EndPositionX = 60;
        this.rightCard2EndPositionX = 140;
        this.rightCard3EndPositionX = 220;
        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.43;

        break;
      default:
        this.cardSize = 60;
        this.hiddenCardSize = 65;
        this.cardStartPointX = this.width * 0.49;
        this.cardStartPointY = this.height * 0.3;
        this.cardEndPointY = this.cardStartPointY + 120;
        this.leftCard1EndPositionX = 200;
        this.leftCard2EndPositionX = 130;
        this.leftCard3EndPositionX = 60;
        this.rightCard1EndPositionX = 60;
        this.rightCard2EndPositionX = 130;
        this.rightCard3EndPositionX = 200;
        this.hiddenCardEndPointX = this.width * 0.22;
        this.hiddenCardEndPointY = this.height * 0.43;

        break;
    }
  }
}
