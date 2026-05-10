import Scene from "../engine/Scene.js";

export default class ControlsScene extends Scene {
    constructor() {
        super('ControlsScene');
    }

    preload() {
        this.load.image('controles', 'assets/movimiento_y_disparo.png');
    }

    create() {
        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;

        // Fondo negro
        this.add.rectangle(cx, cy, this.scale.width, this.scale.height, 0x000000);

        // Título
        this.add.text(cx, 40, 'CONTROLES', {
            fontSize: '38px',
            fill: '#ffdd00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        // Imagen de controles centrada
        this.add.image(cx, cy + 10, 'controles')
            .setDisplaySize(600, 420);

        // Texto parpadeo abajo
        const continueText = this.add.text(cx, this.scale.height - 50, 'PRESIONA CUALQUIER TECLA PARA CONTINUAR', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Courier New',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.tweens.add({
            targets: continueText,
            alpha: 0,
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Cualquier tecla o click para continuar
        this.input.keyboard.once('keydown', () => this.goNext());
        this.input.once('pointerdown', () => this.goNext());
    }

    goNext() {
        this.cameras.main.fade(600, 0, 0, 0);
        this.time.delayedCall(600, () => {
            this.scene.start('CharacterSelectScene');
        });
    }
}