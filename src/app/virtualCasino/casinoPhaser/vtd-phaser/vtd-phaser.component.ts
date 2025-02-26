import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import Phaser from 'phaser';
import { vdtScene } from '../Scenes/vtdScene';
import { teenpattiScene } from '../Scenes/teenpattiScene';

@Component({
  selector: 'app-vtd-phaser',
  standalone: true,
  imports: [],
  templateUrl: './vtd-phaser.component.html',
  styleUrl: './vtd-phaser.component.css',
})
export class VtdPhaserComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('phaserContainer', { static: false }) phaserContainer!: ElementRef;
  @Input() GameType: string = 'vdt';

  game!: Phaser.Game;
  ipadProState: boolean = false;
  nestHubState: boolean = false;

  constructor() {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.game.destroy(true);
  }

  ngAfterViewInit(): void {
    this.initializeGame();
    const canvasContainer = document.querySelector('.canvas-container');
    const canvas = document.querySelector('canvas');
    canvasContainer?.appendChild(canvas as Node);
  }

  initializeGame(): void {
    // Set screen dimensions based on device width

    let screenWidth;
    let screenHeight;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // console.log('width', width, 'height', height);

    // screenWidth = width;
    // screenHeight = height;
    switch (true) {
      case width < 500:
        screenWidth = width * 0.88;
        screenHeight = 173.23;
        break;

      default:
        screenWidth = 641.699;
        screenHeight = 294.109;
        break;
    }

    const phaserGameContainer =
      this.phaserContainer.nativeElement.querySelector('.phaser-game');
    const dpr = window.devicePixelRatio || 1;

    let gameScene = [];
    if (this.GameType === 'vdt') {
      gameScene = [vdtScene];
    } else {
      gameScene = [teenpattiScene];
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: screenWidth,
      height: screenHeight,
      parent: phaserGameContainer,
      transparent: true,
      banner: false,
      render: {
        pixelArt: false,
        antialias: true,
        antialiasGL: true,
        
      },
      // scene: [vdtScene, teenpattiScene],
      scene: gameScene,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          // debug: true,
        },
      },
    };

    this.game = new Phaser.Game(config);
    if (this.GameType === 'vdt') {
      this.game.scene?.start('vdtScene');
    } else {
      this.game.scene?.start('teenpattiScene');
    }

    this.applyCanvasStyles();
  }

  applyCanvasStyles(): void {
    setTimeout(() => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.style.border = '0px solid transparent';
        // canvas.style.borderRadius = '12px';
        canvas.style.boxSizing = 'border-box';
        canvas.style.margin = '19.28px';
      }
    }, 100);
  }

  winnerCardVdt(key: number) {
    // for dragon card key is 1 , for player card key is 2 , for both card add 3
    const vdtScene = this.game?.scene?.getScene('vdtScene') as vdtScene;
    if (vdtScene && typeof vdtScene.animateUpOrDown === 'function') {
      vdtScene.animateUpOrDown(1);
    }
  }
  showDragonCardVdt(card: string) {
    const vdtScene = this.game?.scene?.getScene('vdtScene') as vdtScene;
    if (vdtScene && typeof vdtScene.showCardDragon === 'function') {
      vdtScene.showCardDragon(card);
    }
  }
  showPlayerCardVdt(card: string) {
    const vdtScene = this.game?.scene?.getScene('vdtScene') as vdtScene;
    if (vdtScene && typeof vdtScene.showCardPlayer === 'function') {
      vdtScene.showCardPlayer(card);
    }
  }
  clearRoundVdt() {
    const vdtScene = this.game?.scene?.getScene('vdtScene') as vdtScene;
    if (vdtScene && typeof vdtScene.clearRound === 'function') {
      vdtScene.clearRound();
    }
  }

  clearRoundTeenpatti() {
    const teenpattiScene = this.game?.scene?.getScene(
      'teenpattiScene'
    ) as teenpattiScene;
    if (teenpattiScene && typeof teenpattiScene.clearRound === 'function') {
      teenpattiScene.clearRound();
    }
  }

  winnerCardTeenpatti(key: number) {
    // for PlayerA key is 1 , for player B card key is 2 , for both card add 3
    const teenpattiScene = this.game?.scene?.getScene(
      'teenpattiScene'
    ) as teenpattiScene;
    if (
      teenpattiScene &&
      typeof teenpattiScene.animateUpOrDown === 'function'
    ) {
      teenpattiScene.animateUpOrDown(key);
    }
  }
  showPlayerACard1(card: string) {

    const teenpattiScene = this.game?.scene?.getScene(
      'teenpattiScene'
    ) as teenpattiScene;
    if (
      teenpattiScene &&
      typeof teenpattiScene.showCardDragon1 === 'function'
    ) {
      teenpattiScene.showCardDragon1(card);
    }
  }
  showPlayerACard2(card: string) {
    const teenpattiScene = this.game?.scene?.getScene(
      'teenpattiScene'
    ) as teenpattiScene;
    if (
      teenpattiScene &&
      typeof teenpattiScene.showCardDragon2 === 'function'
    ) {
      teenpattiScene.showCardDragon2(card);
    }
  }
  showPlayerACard3(card: string) {

    const teenpattiScene = this.game?.scene?.getScene(
      'teenpattiScene'
    ) as teenpattiScene;
    if (
      teenpattiScene &&
      typeof teenpattiScene.showCardDragon3 === 'function'
    ) {
      teenpattiScene.showCardDragon3(card);
    }
  }
  showPlayerBCard1(card: string) {
    const teenpattiScene = this.game?.scene?.getScene(
      'teenpattiScene'
    ) as teenpattiScene;
    if (
      teenpattiScene &&
      typeof teenpattiScene.showCardPlayer1 === 'function'
    ) {
      teenpattiScene.showCardPlayer1(card);
    }
  }
  showPlayerBCard2(card: string) {
    const teenpattiScene = this.game?.scene?.getScene(
      'teenpattiScene'
    ) as teenpattiScene;
    if (
      teenpattiScene &&
      typeof teenpattiScene.showCardPlayer2 === 'function'
    ) {
      teenpattiScene.showCardPlayer2(card);
    }
  }
  showPlayerBCard3(card: string) {
    const teenpattiScene = this.game?.scene?.getScene(
      'teenpattiScene'
    ) as teenpattiScene;
    if (
      teenpattiScene &&
      typeof teenpattiScene.showCardPlayer3 === 'function'
    ) {
      teenpattiScene.showCardPlayer3(card);
    }
  }
}
