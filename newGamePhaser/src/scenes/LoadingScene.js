import Scene from "../engine/Scene.js";

export default class LoadingScene extends Scene {
    constructor() {
        super('LoadingScene');
    }

    preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/jugador.png');
    this.load.tilemapTiledJSON('map', 'assets/mapa.tmj');
    this.load.tilemapTiledJSON('playa', 'assets/playa.tmj'); // 👈
    this.load.image('tiles', 'assets/platformPack_tilesheet.png');
    this.load.image('tiles_playa', 'assets/tilemap_packed.png'); // 👈
    this.load.image('karkar', 'assets/KARKAR.png');
    this.load.image('tung', 'assets/tung.png');
    this.load.image('emi', 'assets/emi.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('archivo', 'assets/archivo.png');
    this.load.image('archivo2', 'assets/archivo2.png');
    this.load.image('agentea', 'assets/agentea.png');
    this.load.image('agentev', 'assets/jugador.png');
    this.load.image('agenteb', 'assets/agenteb.png');
    this.load.image('agentet', 'assets/agentet.png');
    this.load.image('jeff', 'assets/jeff.png');
    this.load.image('vida_4', 'assets/vida_4.png');
    this.load.image('vida_3', 'assets/vida_3.png');
    this.load.image('vida_2', 'assets/vida_2.png');
    this.load.image('vida_1', 'assets/vida_1.png');
    this.load.image('vida_0', 'assets/vida_0.png');
    this.load.image('cesar',    'assets/cesar.png');
    this.load.image('vacuna',   'assets/vacuna.png');
    this.load.image('buzzball', 'assets/buzzball.png');
    this.load.image('diddy', 'assets/diddy.png');
    this.load.image('trump', 'assets/trump.png');
    this.load.audio('jeff_theme', 'assets/jeff_theme.mp3');
    this.load.image('agentea', 'assets/agentea.png');
    this.load.image('agenteb', 'assets/agenteb.png');
    this.load.image('agentet', 'assets/agentet.png');
    this.load.image('jugador', 'assets/Jugador.png');
    this.load.audio('diddy_theme', 'assets/diddytheme.mp3');
    this.load.audio('trump_theme', 'assets/trumptheme.mp3');
}
    create() {
        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;

        // Fondo negro
        this.add.rectangle(cx, cy, this.scale.width, this.scale.height, 0x000000);

        // Título
        this.add.text(cx, 40, 'BRAINROT ISLAND', {
            fontSize: '36px',
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#ff6600',
            strokeThickness: 6
        }).setOrigin(0.5);

        // Personajes con sus nombres
        const personajes = [
            { key: 'agentea', nombre: 'Agente A' },
            { key: 'agentev', nombre: 'Agente V' },
            { key: 'agenteb', nombre: 'Agente B' },
            { key: 'agentet', nombre: 'Agente T' },
            { key: 'jeff',    nombre: 'Jeff'     },
        ];

        const startX = cx - 180;

        personajes.forEach((p, i) => {
            const x = startX + i * 90;

            const sprite = this.add.image(x, cy - 20, p.key).setScale(0.9);

            this.add.text(x, cy + 40, p.nombre, {
                fontSize: '10px',
                fill: '#ffffff'
            }).setOrigin(0.5);

            // Rebote
            this.tweens.add({
                targets: sprite,
                y: cy - 40,
                duration: 450,
                yoyo: true,
                repeat: -1,
                delay: i * 130,
                ease: 'Sine.easeInOut'
            });
        });

        // Barra de carga
        const barW = 340;
        const barH = 16;
        const barX = cx - barW / 2;
        const barY = cy + 80;

        this.add.rectangle(cx, barY, barW + 4, barH + 4, 0x444444).setOrigin(0.5);
        const barFill = this.add.rectangle(barX, barY, 0, barH, 0xff6600).setOrigin(0, 0.5);

        const loadingText = this.add.text(cx, barY + 24, 'Cargando mapa...', {
            fontSize: '14px',
            fill: '#aaaaaa'
        }).setOrigin(0.5);

        const mensajes = [
            'Cargando mapa...',
            'Generando enemigos...',
            'Preparando archivos...',
            'Casi listo...',
            '¡Entrando a Brainrot Island!'
        ];

        this.tweens.add({
            targets: barFill,
            width: barW,
            duration: 4000,
            ease: 'Linear',
            onUpdate: (tween) => {
                const idx = Math.min(Math.floor(tween.progress * mensajes.length), mensajes.length - 1);
                loadingText.setText(mensajes[idx]);
            },
            onComplete: () => {
                this.scene.start('MainScene');
            }
        });
    }
}
