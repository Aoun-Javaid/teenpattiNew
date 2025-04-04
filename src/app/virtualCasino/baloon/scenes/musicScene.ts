import { Scene } from 'phaser';

export class MusicScene extends Scene {
  private music!: Phaser.Sound.BaseSound;
  private balloonHeatUpSound!: Phaser.Sound.BaseSound;
  private ballonFireSound!: Phaser.Sound.BaseSound;
  private autoCashOutCountSound!: Phaser.Sound.BaseSound;
  private balloonBlastSound!: Phaser.Sound.BaseSound;
  private winSound!: Phaser.Sound.BaseSound;
  private cashOutSound!: Phaser.Sound.BaseSound;
  isPlaneFly: boolean = false;
  isPlaneStart: boolean = false;

  constructor() {
    super({ key: 'MusicScene' });
  }

  preload(): void {
    this.load.audio(
      'backgroundMusic',
      '/baloon/assets/sound/balloon_bg_music.mp3'
    );
    this.load.audio(
      'balloonHeatUpSound',
      '/baloon/assets/sound/balloon_heat.mp3'
    );
    this.load.audio('balloonFireSound', '/baloon/assets/sound/balloon_fly.mp3');
    this.load.audio(
      'autoCashOutCountSound',
      '/baloon/assets/sound/balloon_auto_cashout_countdown.mp3'
    );
    this.load.audio(
      'balloonBlastSound',
      'baloon/assets/sound/balloon_blast.mp3'
    );
    this.load.audio('winSound', 'baloon/assets/sound/win.mp3');
    this.load.audio(
      'cashOutSound',
      'baloon/assets/sound/balloon_achieve_bonus.mp3'
    );
  }

  create(): void {
    this.music = this.sound.add('backgroundMusic', {
      loop: true,
      volume: 0.8,
    });

    this.balloonHeatUpSound = this.sound.add('balloonHeatUpSound', {
      loop: false,
      volume: 0.8,
    });
    this.ballonFireSound = this.sound.add('balloonFireSound', {
      loop: true,
      volume: 0.8,
    });
    this.autoCashOutCountSound = this.sound.add('autoCashOutCountSound', {
      loop: true,
      volume: 1,
    });

    this.balloonBlastSound = this.sound.add('balloonBlastSound', {
      loop: false,
      volume: 1,
    });

    this.winSound = this.sound.add('winSound', {
      loop: false,
      volume: 1,
    });
    this.cashOutSound = this.sound.add('cashOutSound', {
      loop: false,
      volume: 0.8,
    });
  }

  blastBalloonSound() {
    this.balloonBlastSound.play();
  }

  balloonHeatUpSoundStart() {
    this.balloonHeatUpSound.play();
  }
  balloonHeatUpSoundStop() {
    this.balloonHeatUpSound.stop();
  }

  autoCashOutSoundStart() {
    this.autoCashOutCountSound.play();
  }
  autoCashOutSoundStop() {
    if (this.autoCashOutCountSound) {
      this.autoCashOutCountSound.stop();
    }
  }
  playWinSound() {
    this.winSound.play();
  }

  playCashOutSound() {
    this.cashOutSound.play();
  }

  balloonFireStart() {
    this.ballonFireSound.play();
  }
  balloonFireStop() {
    if (this.ballonFireSound) {
      this.ballonFireSound.stop();
    }
  }

  stopMusic() {
    if (this.music) {
      this.music.stop();
    }
  }

  playMusic() {
    this.music.play();
  }
  stopSound() {
    if (
      this.balloonHeatUpSound &&
      this.balloonHeatUpSound instanceof Phaser.Sound.BaseSound
    ) {
      (this.balloonHeatUpSound as Phaser.Sound.WebAudioSound).mute = true;
    }
    if (
      this.ballonFireSound &&
      this.ballonFireSound instanceof Phaser.Sound.BaseSound
    ) {
      (this.ballonFireSound as Phaser.Sound.WebAudioSound).mute = true;
    }
    if (
      this.balloonBlastSound &&
      this.balloonBlastSound instanceof Phaser.Sound.BaseSound
    ) {
      (this.balloonBlastSound as Phaser.Sound.WebAudioSound).mute = true;
    }
    if (
      this.autoCashOutCountSound &&
      this.autoCashOutCountSound instanceof Phaser.Sound.BaseSound
    ) {
      (this.autoCashOutCountSound as Phaser.Sound.WebAudioSound).mute = true;
    }
  }

  playSound() {
    if (
      this.balloonHeatUpSound &&
      this.balloonHeatUpSound instanceof Phaser.Sound.BaseSound
    ) {
      (this.balloonHeatUpSound as Phaser.Sound.WebAudioSound).mute = false;
    }
    if (
      this.ballonFireSound &&
      this.ballonFireSound instanceof Phaser.Sound.BaseSound
    ) {
      (this.ballonFireSound as Phaser.Sound.WebAudioSound).mute = false;
    }
    if (
      this.balloonBlastSound &&
      this.balloonBlastSound instanceof Phaser.Sound.BaseSound
    ) {
      (this.balloonBlastSound as Phaser.Sound.WebAudioSound).mute = false;
    }
    if (
      this.autoCashOutCountSound &&
      this.autoCashOutCountSound instanceof Phaser.Sound.BaseSound
    ) {
      (this.autoCashOutCountSound as Phaser.Sound.WebAudioSound).mute = false;
    }
  }
}
