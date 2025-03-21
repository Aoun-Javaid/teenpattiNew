import { Scene } from 'phaser';

export class MusicScene extends Scene {
  private music!: Phaser.Sound.BaseSound;
  private planeFly!: Phaser.Sound.BaseSound;
  private startPlane!: Phaser.Sound.BaseSound;
  private buttonPressed!: Phaser.Sound.BaseSound;
  private cashOutSound!: Phaser.Sound.BaseSound;
  isPlaneFly: boolean = false;
  isPlaneStart: boolean = false;
  musicState: boolean = false;

  constructor() {
    super({ key: 'MusicScene' });
  }

  preload(): void {
    this.load.audio('backgroundMusic', '/bg_music.mp3');
    this.load.audio('flyPlaneMusic', '/flyPlane.mp3');
    this.load.audio('startPlaneMusic', '/start_plane.mp3');
    this.load.audio('buttonSound', '/assets/button-pressed.mp3');
    this.load.audio('cashOutSound', '/assets/cashout.mp3');
  }

  create(): void {
    this.music = this.sound.add('backgroundMusic', {
      loop: true,
      volume: 0.5,
    });
    // this.music.play();
    this.planeFly = this.sound.add('flyPlaneMusic', {
      loop: false,
      volume: 0.5,
    });
    this.startPlane = this.sound.add('startPlaneMusic', {
      loop: false,
      volume: 0.5,
    });
    this.stopSound();
    this.cashOutSound = this.sound.add('cashOutSound', {
      loop: false,
      volume: 1,
    });
    this.buttonPressed = this.sound.add('buttonSound', {
      loop: false,
      volume: 1,
    });
  }

  playButtonSound() {
    this.buttonPressed.play();
  }
  playCashOutSound() {
    this.cashOutSound.play();
  }

  flyPlane() {
    if (!this.isPlaneFly) {
      this.planeFly.play();
      this.isPlaneFly = true;
      setTimeout(() => {
        this.isPlaneFly = false;
      });
    }
  }
  planeStart() {
    if (!this.isPlaneStart) {
      this.startPlane.play();
      this.isPlaneStart = true;
      setTimeout(() => {
        this.isPlaneStart = false;
      });
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
    if (this.startPlane && this.startPlane instanceof Phaser.Sound.BaseSound) {
      (this.startPlane as Phaser.Sound.WebAudioSound).mute = true;
    }
    if (this.planeFly && this.planeFly instanceof Phaser.Sound.BaseSound) {
      (this.planeFly as Phaser.Sound.WebAudioSound).mute = true;
    }
  }

  playSound() {
    if (this.planeFly && this.planeFly instanceof Phaser.Sound.BaseSound) {
      (this.planeFly as Phaser.Sound.WebAudioSound).mute = false;
    }
    if (this.startPlane && this.startPlane instanceof Phaser.Sound.BaseSound) {
      (this.startPlane as Phaser.Sound.WebAudioSound).mute = false;
    }
  }
}
