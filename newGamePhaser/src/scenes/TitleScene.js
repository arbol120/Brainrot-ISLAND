import Scene from "../engine/Scene.js";

export default class TitleScene extends Scene {
    constructor() {
        super('TitleScene');
    }

    preload() {
        this.load.image('title', 'assets/pantalla_de_inicio.png');
    }

    create() {
        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;

        this.add.image(cx, cy, 'title')
            .setDisplaySize(this.scale.width, this.scale.height);

        const pressText = this.add.text(cx, this.scale.height - 60, 'PRESIONA CUALQUIER TECLA PARA INICIAR', {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: 'Courier New',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5).setDepth(10);

        this.tweens.add({
            targets: pressText,
            alpha: 0,
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.input.keyboard.once('keydown', this.goNext, this);
        this.input.once('pointerdown', this.goNext, this);
    }

    goNext() { // 👈 sin "javascript" al inicio
        this.cameras.main.fade(800, 0, 0, 0);
        this.time.delayedCall(800, () => {
            this.scene.start('ControlsScene');
        });
    }
}