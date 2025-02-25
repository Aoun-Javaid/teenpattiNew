import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import Phaser from 'phaser';
import { vdtScene } from '../Scenes/vtdScene';

@Component({
  selector: 'app-vtd-phaser',
  standalone: true,
  imports: [],
  templateUrl: './vtd-phaser.component.html',
  styleUrl: './vtd-phaser.component.css',
})
export class VtdPhaserComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('phaserContainer', { static: false }) phaserContainer!: ElementRef;
  game!: Phaser.Game;
  ipadProState: boolean = false;
  nestHubState: boolean = false;

  constructor() {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}

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
      case width < 900:
        screenWidth = 641.699;
        screenHeight = 294.109;
        break;

      default:
        screenWidth = 950;
        screenHeight = 520;
        break;
    }

    const phaserGameContainer =
      this.phaserContainer.nativeElement.querySelector('.phaser-game');
    const dpr = window.devicePixelRatio || 1;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
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
      scene: [vdtScene],
      // physics: {
      //   default: 'matter',
      //   matter: {
      //     debug: false,
      //     // gravity: { x: 0, y: 0.7 },
      //   },
      // },

      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          // debug: true,
        },
      },
    };

    this.game = new Phaser.Game(config);
    this.game.scene?.start('vdtScene');

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

  winnerCard(key: number) {
    // for dragon card key is 1 , for player card key is 2 , for both card add 3
    const vdtScene = this.game?.scene?.getScene('backgroundScene') as vdtScene;
    if (vdtScene && typeof vdtScene.animateUpOrDown === 'function') {
      vdtScene.animateUpOrDown(1);
    }
  }
  showDragonCard(card: string) {
    const vdtScene = this.game?.scene?.getScene('backgroundScene') as vdtScene;
    if (vdtScene && typeof vdtScene.clearRound === 'function') {
      vdtScene.showCardDragon(card);
    }
  }
  showPlayerCard(card: string) {
    const vdtScene = this.game?.scene?.getScene('backgroundScene') as vdtScene;
    if (vdtScene && typeof vdtScene.showCardDragon === 'function') {
      vdtScene.showCardPlayer(card);
    }
  }
  clearRound() {
    const vdtScene = this.game?.scene?.getScene('backgroundScene') as vdtScene;
    if (vdtScene && typeof vdtScene.clearRound === 'function') {
      vdtScene.clearRound();
    }
  }
}
