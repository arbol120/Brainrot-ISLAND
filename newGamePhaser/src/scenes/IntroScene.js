import Scene from "../engine/Scene.js";

export default class IntroScene extends Scene {
    constructor() {
        super('IntroScene');
    }

    create() {
        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;

        
        this.add.rectangle(cx, cy, this.scale.width, this.scale.height, 0x000000);

        
        this.add.text(cx, 40, '🔒 AGENCIA CENTRAL DE INTELIGENCIA', {
            fontSize: '14px',
            fill: '#cc0000',
            fontStyle: 'bold',
            letterSpacing: 4
        }).setOrigin(0.5);

        this.add.text(cx, 62, '— ARCHIVO CLASIFICADO —', {
            fontSize: '11px',
            fill: '#888888',
            letterSpacing: 6
        }).setOrigin(0.5);

        
        this.add.rectangle(cx, 78, 600, 1, 0x333333);

        
        const parrafos = [
            { texto: 'AGENTE, ESCUCHA CON ATENCIÓN.', color: '#ff4444', delay: 0 },
            { texto: 'Eres uno de nuestros mejores agentes de campo.', color: '#ffffff', delay: 1200 },
            { texto: 'Hemos identificado a un sujeto de alto riesgo:', color: '#ffffff', delay: 2800 },
            { texto: 'JEFFREY EPSTEIN.', color: '#ff4444', delay: 4200 },
            { texto: 'Jeff posee una isla privada conocida como', color: '#ffffff', delay: 5400 },
            { texto: '"BRAINROT ISLAND"...', color: '#ffaa00', delay: 6800 },
            { texto: 'un lugar donde se cometen crímenes de la peor clase y \nquieren mucho a los niños.', color: '#ffffff', delay: 8200 },
            { texto: 'Tu misión es infiltrarte en la isla,', color: '#aaffaa', delay: 10000 },
            { texto: 'eliminar a sus secuaces,', color: '#aaffaa', delay: 11400 },
            { texto: 'y capturar a JEFF con vida (o muerte).', color: '#aaffaa', delay: 12800 },
            { texto: 'Llevarlo ante la justicia (o no).', color: '#ffffff', delay: 14200 },
            { texto: 'No falles, Agente.', color: '#ff4444', delay: 15600 },
            { texto: 'El mundo está contando contigo.', color: '#ffffff', delay: 17000 },
        ];

        
        parrafos.forEach((p, i) => {
            this.time.delayedCall(p.delay, () => {
                const y = 110 + i * 38;
                const fullText = p.texto;
                const textObj = this.add.text(120, y, '', {
                    fontSize: '18px',
                    fill: p.color,
                    fontFamily: 'Courier New',
                }).setAlpha(0);

            
                this.tweens.add({
                    targets: textObj,
                    alpha: 1,
                    duration: 200
                });

                // Efecto máquina de escribir
                let charIndex = 0;
                const timer = this.time.addEvent({
                    delay: 40,
                    repeat: fullText.length - 1,
                    callback: () => {
                        charIndex++;
                        textObj.setText(fullText.substring(0, charIndex));
                    }
                });
            });
        });

        // Botón saltar
        const skipBtn = this.add.text(this.scale.width - 20, this.scale.height - 20, '[ SALTAR → ]', {
            fontSize: '16px',
            fill: '#555555',
            fontFamily: 'Courier New'
        }).setOrigin(1, 1).setInteractive({ useHandCursor: true });

        skipBtn.on('pointerover', () => skipBtn.setFill('#ffffff'));
        skipBtn.on('pointerout',  () => skipBtn.setFill('#555555'));
        skipBtn.on('pointerdown', () => this.goToGame());

        // Auto avanza después de que termina todo el texto
        this.time.delayedCall(20000, () => this.goToGame());

        // Cursor parpadeante al final
        this.time.delayedCall(18500, () => {
            const cursor = this.add.text(120, 110 + parrafos.length * 38, '█', {
                fontSize: '18px',
                fill: '#ffffff',
                fontFamily: 'Courier New'
            });
            this.tweens.add({
                targets: cursor,
                alpha: 0,
                duration: 500,
                yoyo: true,
                repeat: -1
            });
        });
    }

    goToGame() {
        this.cameras.main.fade(800, 0, 0, 0);
        this.time.delayedCall(800, () => {
            this.scene.start('LoadingScene');
        });
    }
}