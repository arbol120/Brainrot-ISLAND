import Scene from "../engine/Scene.js";

export default class WinScene extends Scene {
    constructor() {
        super('WinScene');
    }

    create() {
        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;
        const score = this.registry.get('finalScore') || 0;

        // Fondo oscuro
        this.add.rectangle(cx, cy, this.scale.width, this.scale.height, 0x000000, 0.9);
        this.add.text(cx, cy + 20, `PUNTUACIÓN: ${score}`, {
            fontSize: '28px',
            fill: '#ffdd00',
                stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Título
        this.add.text(cx, cy - 120, '¡MISIÓN CUMPLIDA!', {
            fontSize: '52px',
            fill: '#ffdd00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 7
        }).setOrigin(0.5);

        this.add.text(cx, cy - 60, 'Jeff ha sido capturado.\nBrainrot Island es libre.', {
            fontSize: '22px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        // Botón volver a jugar
        const btnJugar = this.add.text(cx, cy + 40, '[ VOLVER A JUGAR ]', {
            fontSize: '28px',
            fill: '#44ff44',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btnJugar.on('pointerover', () => btnJugar.setFill('#88ff88'));
        btnJugar.on('pointerout',  () => btnJugar.setFill('#44ff44'));
        btnJugar.on('pointerdown', () => {
            this.registry.remove('currentHealth');
            this.registry.remove('maxHealth');
            this.registry.remove('pizzaCount');
            this.registry.remove('powerDamage');
            this.scene.start('MainScene');
        });

        // Botón pantalla de inicio
        const btnInicio = this.add.text(cx, cy + 110, '[ PANTALLA DE INICIO ]', {
            fontSize: '28px',
            fill: '#ffaa00',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btnInicio.on('pointerover', () => btnInicio.setFill('#ffcc66'));
        btnInicio.on('pointerout',  () => btnInicio.setFill('#ffaa00'));
        btnInicio.on('pointerdown', () => {
            this.scene.start('TitleScene');
        });
    }
}