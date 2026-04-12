import Scene from "../engine/Scene.js";

export default class GameOverScene extends Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;

        this.add.rectangle(cx, cy, this.scale.width, this.scale.height, 0x000000, 0.85);

        this.add.text(cx, cy - 60, 'GAME OVER', {
            fontSize: '64px',
            fill: '#ff0000',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(cx, cy + 20, 'BRAINROT ISLAND te venció...', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        const btn = this.add.text(cx, cy + 90, '[ REINTENTAR ]', {
            fontSize: '28px',
            fill: '#ffff00',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btn.on('pointerover', () => btn.setFill('#ff8800'));
        btn.on('pointerout',  () => btn.setFill('#ffff00'));
        btn.on('pointerdown', () => {

            this.registry.remove('currentHealth');
            this.registry.remove('maxHealth');
            this.registry.remove('pizzaCount');
            this.registry.remove('powerDamage');

            this.scene.stop('GameOverScene');
            this.scene.stop('PlayaScene');
            this.scene.stop('MainScene');
            this.scene.start('MainScene');
        });
    }
}