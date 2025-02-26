import { Scene } from 'phaser';

export class vdtScene extends Scene {
  private width!: number;
  private height!: number;
  private leftCard!: Phaser.GameObjects.Image;
  private rightCard!: Phaser.GameObjects.Image;
  private cardScaleLeft!: number;
  private cardScaleRight!: number;

  constructor() {
    super({ key: 'vdtScene' });
  }

  preload(): void {
    console.log('hiVdt');

    this.load.image('dt', '/dt.png');
    // this.load.image('0.png', '/assets/cards/newCards/0.png');
    // this.load.image('C2_.png', '/assets/cards/newCards/C2_.svg');
    this.load.image('C2_.png', '/assets/cards/C2_.png');
    this.load.image('C3_.png', '/assets/cards/C3_.png');
    this.load.image('C4_.png', '/assets/cards/C4_.png');
    this.load.image('C5_.png', '/assets/cards/C5_.png');
    this.load.image('C6_.png', '/assets/cards/C6_.png');
    this.load.image('C7_.png', '/assets/cards/C7_.png');
    this.load.image('C8_.png', '/assets/cards/C8_.png');
    this.load.image('C9_.png', '/assets/cards/C9_.png');
    this.load.image('C10_.png', '/assets/cards/C10_.png');
    this.load.image('CA_.png', '/assets/cards/CA_.png');
    this.load.image('CJ_.png', '/assets/cards/CJ_.png');
    this.load.image('CK_.png', '/assets/cards/CK_.png');
    // this.load.image('CLUB KING.png', '/assets/cards/CL.spngING.png');
    // this.load.image('CLUBS.png', '/assets/cards/CLUBpngng');
    this.load.image('CQ_.png', '/assets/cards/CQ_.png');
    this.load.image('D2_.png', '/assets/cards/D2_.png');
    this.load.image('D3_.png', '/assets/cards/D3_.png');
    this.load.image('D4_.png', '/assets/cards/D4_.png');
    this.load.image('D5_.png', '/assets/cards/D5_.png');
    this.load.image('D6_.png', '/assets/cards/D6_.png');
    this.load.image('D7_.png', '/assets/cards/D7_.png');
    this.load.image('D8_.png', '/assets/cards/D8_.png');
    this.load.image('D9_.png', '/assets/cards/D9_.png');
    this.load.image('D10_.png', '/assets/cards/D10_.png');
    this.load.image('DA_.png', '/assets/cards/DA_.png');
    // this.load.image('DIAMOND KING.png', '/assets/cards/DI.spngD KING.png');
    // this.load.image('DIAMONDS.png', '/assets/cards/DI.spngDS.png');
    this.load.image('DJ_.png', '/assets/cards/DJ_.png');
    this.load.image('DK_.png', '/assets/cards/DK_.png');
    this.load.image('DQ_.png', '/assets/cards/DQ_.png');
    this.load.image('H2_.png', '/assets/cards/H2_.png');
    // this.load.image('H2_.png', '/assets/cards/H2_.png');
    this.load.image('H3_.png', '/assets/cards/H3_.png');
    this.load.image('H4_.png', '/assets/cards/H4_.png');
    this.load.image('H5_.png', '/assets/cards/H5_.png');
    this.load.image('H6_.png', '/assets/cards/H6_.png');
    this.load.image('H7_.png', '/assets/cards/H7_.png');
    this.load.image('H8_.png', '/assets/cards/H8_.png');
    this.load.image('H9_.png', '/assets/cards/H9_.png');
    // this.load.image('H10_.png', '/assets/cards/H1.spngng');
    this.load.image('HA_.png', '/assets/cards/HA_.png');
    // this.load.image('HEART KING.png', '/assets/cards/HE.spngKING.png');
    // this.load.image('HEARTS.png', '/assets/cards/HE.spng.png');
    this.load.image('HJ_.png', '/assets/cards/HJ_.png');
    this.load.image('HK_.png', '/assets/cards/HK_.png');
    this.load.image('HQ_.png', '/assets/cards/HQ_.png');
    // this.load.image('null.png', '/assets/cards/nullpngg');
    this.load.image('S2_.png', '/assets/cards/S2_.png');
    this.load.image('S3_.png', '/assets/cards/S3_.png');
    this.load.image('S4_.png', '/assets/cards/S4_.png');
    this.load.image('S5_.png', '/assets/cards/S5_.png');
    this.load.image('S6_.png', '/assets/cards/S6_.png');
    this.load.image('S7_.png', '/assets/cards/S7_.png');
    this.load.image('S8_.png', '/assets/cards/S8_.png');
    this.load.image('S9_.png', '/assets/cards/S9_.png');
    this.load.image('S10_.png', '/assets/cards/S10_.png');
    this.load.image('SA_.png', '/assets/cards/SA_.png');
    this.load.image('SJ_.png', '/assets/cards/SJ_.png');
    this.load.image('SK_.png', '/assets/cards/SK_.png');
    // this.load.image('SPADE KING.png', '/assets/cards/SP.spngKING.png');
    // this.load.image('SPADES.png', '/assets/cards/SP.ppng);
    this.load.image('SQ_.png', '/assets/cards/SQ_.png');
    this.load.image('h1', '/assets/cards/h1.svg');
    // this.load.image('hiddenCard', '/assets/cards/Ca.svg');
    this.load.image('single', '/assets/cards/Broder.svg');
    this.load.image('single1', '/assets/cards/Broder.png');
    this.load.image('multi', '/assets/cards/BroderImage2.svg');
    this.textures.get('single1').setFilter(Phaser.Textures.FilterMode.NEAREST);
  }

  create() {
    this.updateWidthHeight();
    if (this.input.keyboard) {
      this.input.keyboard.on('keydown-G', () => {
        this.showCardWithAnimationLeft('C5_.png');
      });
      this.input.keyboard.on('keydown-H', () => {
        this.showCardWithAnimationRight('H4_.png');
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
          this.createHiddenCard(this.width * 0.5, this.height * 0.3 + 80);
        }, 600);
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
      .get('single')
      .getSourceImage() as HTMLImageElement;

    const originalWidth = hiddenCardTexture.width;
    const originalHeight = hiddenCardTexture.height;

    const desiredWidth = 40;

    const scale = desiredWidth / originalWidth;

    const hiddenCard = this.add
      .image(x, y, 'single')
      .setOrigin(0.5, 0.5)
      .setScale(scale)
      .setAngle(1);

    this.tweens.add({
      targets: hiddenCard,
      x: this.width * 0.07,
      y: this.height * 0.3,
      alpha: 0,
      duration: 800,
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
    const startX = this.width * 0.5;
    const startY = this.height * 0.3;

    const cardTexture = this.textures
      .get(cardName)
      .getSourceImage() as HTMLImageElement;

    const originalWidth = cardTexture.width;
    const originalHeight = cardTexture.height;

    const desiredWidth = 40;

    this, (this.cardScaleLeft = desiredWidth / originalWidth);

    this.leftCard = this.add
      .image(startX, startY, cardName)
      .setScale(this.cardScaleLeft)
      .setOrigin(0.5, 0.5);
    this.leftCard.setAlpha(0);

    const targetX = startX - 27;
    const targetY = startY + 80;

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
    const startX = this.width * 0.5;
    const startY = this.height * 0.3;

    const cardTexture = this.textures
      .get(cardName)
      .getSourceImage() as HTMLImageElement;

    const originalWidth = cardTexture.width;
    const originalHeight = cardTexture.height;

    const desiredWidth = 40;

    this.cardScaleRight = desiredWidth / originalWidth;

    this.rightCard = this.add
      .image(startX, startY, cardName)
      .setScale(this.cardScaleRight)

      .setOrigin(0.5, 0.5);
    this.rightCard.setAlpha(0);

    const targetX = startX + 27;
    const targetY = startY + 80;

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
    this.moveAndRemoveCard(this.leftCard, this.width * 0.5);
    this.moveAndRemoveCard(this.rightCard, this.width * 0.5);
  }
}
