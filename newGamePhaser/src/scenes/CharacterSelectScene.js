import Scene from "../engine/Scene.js";

export default class CharacterSelectScene extends Scene {
    constructor() {
        super('CharacterSelectScene');
    }

    preload() {
         this.load.image('agentea', 'assets/agentea.png');
    this.load.image('agenteb', 'assets/agenteb.png');
    this.load.image('agentet', 'assets/agentet.png');
    this.load.image('jugador', 'assets/jugador.png');
    }

    create() {
        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;

        // Fondo negro
        this.add.rectangle(cx, cy, this.scale.width, this.scale.height, 0x000000);

        // Título
        this.add.text(cx, 50, 'ELIGE TU AGENTE', {
            fontSize: '42px',
            fill: '#ffdd00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(cx, 100, 'CIA — Selección de Operativo', {
            fontSize: '16px',
            fill: '#888888',
            fontFamily: 'Courier New',
            letterSpacing: 4
        }).setOrigin(0.5);

        this.add.rectangle(cx, 120, 600, 1, 0x444444);

        const personajes = [
            { key: 'agentea', nombre: 'AGENTE A', sprite: 'agentea', desc: 'Especialista en\ncombate urbano' },
            { key: 'agenteb', nombre: 'AGENTE B', sprite: 'agenteb', desc: 'Experta en\ninfiltración' },
            { key: 'agentet', nombre: 'AGENTE T', sprite: 'agentet', desc: 'Fuerza bruta\ny resistencia' },
            { key: 'jugador', nombre: 'AGENTE V', sprite: 'jugador', desc: 'Velocidad y\nprecisión' },
        ];

        const startX  = cx - 280;
        const spacing = 185;
        this.selectedIndex = 0;
        this.cards = [];

        personajes.forEach((p, i) => {
            const x = startX + i * spacing;

            const card = this.add.rectangle(x, cy, 160, 280, 0x111111)
                .setInteractive({ useHandCursor: true })
                .setStrokeStyle(2, 0x444444);

            const sprite = this.add.image(x, cy - 50, p.key).setScale(1.2);

            const nombre = this.add.text(x, cy + 80, p.nombre, {
                fontSize: '16px',
                fill: '#ffffff',
                fontStyle: 'bold',
                stroke: '#000',
                strokeThickness: 3
            }).setOrigin(0.5);

            const desc = this.add.text(x, cy + 115, p.desc, {
                fontSize: '12px',
                fill: '#aaaaaa',
                align: 'center'
            }).setOrigin(0.5);

            this.cards.push({ card, sprite, nombre, desc, data: p });

            card.on('pointerover', () => {
                if (this.selectedIndex !== i) {
                    card.setStrokeStyle(2, 0x888888);
                    sprite.setScale(1.35);
                }
            });
            card.on('pointerout', () => {
                if (this.selectedIndex !== i) {
                    card.setStrokeStyle(2, 0x444444);
                    sprite.setScale(1.2);
                }
            });
            card.on('pointerdown', () => {
                this.selectCharacter(i);
            });
        });

        // Botón Jugar
        this.playBtn = this.add.text(cx, this.scale.height - 70, '[ JUGAR ]', {
            fontSize: '32px',
            fill: '#44ff44',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.playBtn.on('pointerover', () => this.playBtn.setFill('#88ff88'));
        this.playBtn.on('pointerout',  () => this.playBtn.setFill('#44ff44'));
        this.playBtn.on('pointerdown', () => {
            const selected = personajes[this.selectedIndex];
            this.registry.set('playerSprite', selected.sprite);
            this.registry.set('playerName',   selected.nombre);

            this.cameras.main.fade(600, 0, 0, 0);
            this.time.delayedCall(600, () => {
                this.scene.start('IntroScene');
            });
        });

        this.add.text(cx, this.scale.height - 30, 'Haz click en un agente para seleccionarlo', {
            fontSize: '13px',
            fill: '#555555',
            fontFamily: 'Courier New'
        }).setOrigin(0.5);

        this.selectCharacter(0);
    }

    selectCharacter(index) {
        this.cards.forEach((c) => {
            c.card.setStrokeStyle(2, 0x444444);
            c.card.setFillStyle(0x111111);
            c.sprite.setScale(1.2);
        });

        this.selectedIndex = index;
        const selected = this.cards[index];
        selected.card.setStrokeStyle(3, 0xffdd00);
        selected.card.setFillStyle(0x222200);
        selected.sprite.setScale(1.4);

        this.tweens.add({
            targets: selected.sprite,
            y: selected.sprite.y - 10,
            duration: 200,
            yoyo: true,
            ease: 'Sine.easeOut'
        });
    }
}