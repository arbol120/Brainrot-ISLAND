import Scene from "../engine/Scene.js";

export default class TransitionScene extends Scene {
    constructor() {
        super('TransitionScene');
    }

    init(data) {
        this.nextScene = data.nextScene;
        this.message  = data.message || 'Cargando...';
    }

    create() {
        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;

        this.add.rectangle(cx, cy, this.scale.width, this.scale.height, 0x000000);

        // Mensaje
        this.add.text(cx, cy - 40, this.message, {
            fontSize: '32px',
            fill: '#ffaa00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5);

        // Barra de carga falsa
        const barW = 300;
        const barX = cx - barW / 2;
        const barY = cy + 30;

        this.add.rectangle(cx, barY, barW + 4, 18, 0x444444).setOrigin(0.5);
        const barFill = this.add.rectangle(barX, barY, 0, 14, 0xff6600).setOrigin(0, 0.5);

        this.tweens.add({
            targets: barFill,
            width: barW,
            duration: 2500,
            ease: 'Linear',
            onComplete: () => {
                this.scene.start(this.nextScene);
            }
        });
    }
}