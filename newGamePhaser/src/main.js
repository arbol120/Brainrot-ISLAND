import Phaser from './lib/phaser.js'
import LoadingScene from './scenes/LoadingScene.js'
import MainScene from './scenes/MainScene.js'
import GameOverScene from './scenes/GameOverScene.js'

const config = { width: 800, height: 480 };

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: config.width,
    height: config.height,
    parent: "canvas",
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [LoadingScene, MainScene, GameOverScene] // 👈 LoadingScene primero
});