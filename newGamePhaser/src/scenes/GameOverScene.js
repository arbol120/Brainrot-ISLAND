import Scene from "../engine/Scene.js";

export default class GameOverScene extends Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;

        // Fondo oscuro
        this.add.rectangle(cx, cy, this.scale.width, this.scale.height, 0x000000, 0.85);

        // Texto Game Over
        this.add.text(cx, cy - 60, 'GAME OVER', {
            fontSize: '64px',
            fill: '#ff0000',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        // Subtexto
        this.add.text(cx, cy + 20, 'EPSTEIN TE HA TOCADO...', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Botón reintentar
        const btn = this.add.text(cx, cy + 90, '[ REINTENTAR ]', {
            fontSize: '28px',
            fill: '#ffff00',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btn.on('pointerover', () => btn.setFill('#ff8800'));
        btn.on('pointerout', () => btn.setFill('#ffff00'));
        btn.on('pointerdown', () => {
            this.scene.stop('GameOverScene');
            this.scene.start('MainScene');
        });
    }
}