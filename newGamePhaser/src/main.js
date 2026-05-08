import Phaser from './lib/phaser.js'
import TitleScene from './scenes/TitleScene.js'
import IntroScene from './scenes/IntroScene.js'
import LoadingScene from './scenes/LoadingScene.js'
import MainScene from './scenes/MainScene.js'
import PlayaScene from './scenes/PlayaScene.js'
import TransitionScene from './scenes/TransitionScene.js'
import WinScene from './scenes/WinScene.js'
import GameOverScene from './scenes/GameOverScene.js'
import CharacterSelectScene from './scenes/CharacterSelectScene.js'

const config = { width: 800, height: 640 };

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: config.width,
    height: config.height,
    parent: "canvas",
    scale: { autoCenter: Phaser.Scale.CENTER_BOTH },
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: [TitleScene, CharacterSelectScene, IntroScene, LoadingScene, MainScene, PlayaScene, TransitionScene, GameOverScene, WinScene]
});