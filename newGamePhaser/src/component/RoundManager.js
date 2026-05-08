export default class RoundManager {
    constructor(scene, startRound = 1) {
        this.scene = scene;
        this.currentRound  = startRound;
        this.totalRounds   = 6;
        this.transitioning = false;
        this.music         = null;

        this.rounds = [
            // Ronda 1: 5 Tung
            [
                { type: 'tung', x: 100, y: 100 },
                { type: 'tung', x: 600, y: 100 },
                { type: 'tung', x: 100, y: 300 },
                { type: 'tung', x: 600, y: 300 },
                { type: 'tung', x: 350, y: 200 },
                { type: 'emi',  x: 120, y: 100  },
            ],
            // Ronda 2: 6 Karkar
            [
                { type: 'karkar', x: 100, y: 100 },
                { type: 'karkar', x: 600, y: 100 },
                { type: 'karkar', x: 100, y: 300 },
                { type: 'karkar', x: 600, y: 300 },
                { type: 'karkar', x: 200, y: 200 },
                { type: 'karkar', x: 500, y: 200 },
            ],
            // Ronda 3: mezcla
            [
                { type: 'tung',   x: 100, y: 100 },
                { type: 'tung',   x: 600, y: 100 },
                { type: 'tung',   x: 350, y: 80  },
                { type: 'karkar', x: 100, y: 300 },
                { type: 'karkar', x: 600, y: 300 },
                { type: 'karkar', x: 350, y: 350 },
                { type: 'tung',   x: 200, y: 200 },
                { type: 'karkar', x: 500, y: 200 },
            ],
            // Ronda 4: JEFE Diddy
            [
                { type: 'diddy', x: 400, y: 200 },
            ],
            // Ronda 5: JEFE Trump
            [
                { type: 'trump', x: 400, y: 200 },
            ],
            // Ronda 6: JEFE Jeff (jefe final)
            [
                { type: 'jeff', x: 400, y: 200 },
            ],
        ];

        this.roundText   = null;
        this.roundBanner = null;
    }

    spawnRound(enemiesGroup) {
        const Tung   = this.scene.registry.get('TungClass');
        const Karkar = this.scene.registry.get('KarkarClass');
        const Emi    = this.scene.registry.get('EmiClass');
        const Diddy  = this.scene.registry.get('DiddyClass');
        const Jeff   = this.scene.registry.get('JeffClass');
        const Trump  = this.scene.registry.get('TrumpClass');

        const data = this.rounds[this.currentRound - 1];

        data.forEach(e => {
            let enemy;
            if      (e.type === 'tung')   enemy = new Tung(this.scene, e.x, e.y);
            else if (e.type === 'karkar') enemy = new Karkar(this.scene, e.x, e.y);
            else if (e.type === 'emi')    enemy = new Emi(this.scene, e.x, e.y);
            else if (e.type === 'diddy')  enemy = new Diddy(this.scene, e.x, e.y);
            else if (e.type === 'jeff')   enemy = new Jeff(this.scene, e.x, e.y);
            else if (e.type === 'trump')  enemy = new Trump(this.scene, e.x, e.y);
            if (enemy) enemiesGroup.add(enemy);
        });
    }

    stopMusic() {
        if (this.music) {
            try {
                this.music.stop();
                this.music.destroy();
                this.music = null;
            } catch(e) {}
        }
    }

    showBossIntro(bossKey, bossName, subtitle, musicKey, onComplete) {
        const cx = this.scene.scale.width / 2;
        const cy = this.scene.scale.height / 2;

        const bg = this.scene.add.rectangle(cx, cy, this.scene.scale.width, this.scene.scale.height, 0x000000, 0)
            .setScrollFactor(0).setDepth(300);

        this.scene.tweens.add({
            targets: bg,
            alpha: 0.92,
            duration: 600,
            onStart: () => {
                try {
                    this.music = this.scene.sound.add(musicKey, { loop: true, volume: 0.6 });
                    this.music.play();
                } catch(e) {
                    console.log('Error música:', e);
                }
            },
            onComplete: () => {
                const lines = [];
                for (let i = 0; i < 12; i++) {
                    const line = this.scene.add.rectangle(
                        cx + Phaser.Math.Between(-400, 400),
                        cy,
                        Phaser.Math.Between(2, 6),
                        this.scene.scale.height * 2,
                        0xff0000, 0.15
                    ).setScrollFactor(0).setDepth(301)
                     .setRotation(Phaser.Math.Between(-20, 20) * Math.PI / 180);
                    lines.push(line);
                }

                const labelText = this.scene.add.text(cx, cy - 220, '⚠  JEFE  ⚠', {
                    fontSize: '22px',
                    fill: '#ff0000',
                    fontStyle: 'bold',
                    fontFamily: 'Courier New',
                    stroke: '#000',
                    strokeThickness: 4,
                    letterSpacing: 6
                }).setOrigin(0.5).setScrollFactor(0).setDepth(302).setAlpha(0);

                const bossImg = this.scene.add.image(cx, cy - 30, bossKey)
                    .setScale(0).setScrollFactor(0).setDepth(302);

                const nameText = this.scene.add.text(cx, cy + 160, bossName, {
                    fontSize: '72px',
                    fill: '#ffffff',
                    fontStyle: 'bold',
                    stroke: '#ff0000',
                    strokeThickness: 8
                }).setOrigin(0.5).setScrollFactor(0).setDepth(302).setAlpha(0);

                const subText = this.scene.add.text(cx, cy + 230, subtitle, {
                    fontSize: '20px',
                    fill: '#aaaaaa',
                    fontFamily: 'Courier New',
                    stroke: '#000',
                    strokeThickness: 3
                }).setOrigin(0.5).setScrollFactor(0).setDepth(302).setAlpha(0);

                this.scene.tweens.add({
                    targets: bossImg,
                    scale: 2.5,
                    duration: 700,
                    ease: 'Back.easeOut',
                    onComplete: () => {
                        this.scene.tweens.add({ targets: labelText, alpha: 1, duration: 300 });
                        this.scene.tweens.add({ targets: nameText,  alpha: 1, duration: 400, delay: 200 });
                        this.scene.tweens.add({ targets: subText,   alpha: 1, duration: 400, delay: 500 });

                        this.scene.tweens.add({
                            targets: bossImg,
                            x: cx + 8,
                            duration: 60,
                            yoyo: true,
                            repeat: 6
                        });

                        this.scene.time.delayedCall(3000, () => {
                            const allObjects = [bg, bossImg, nameText, subText, labelText, ...lines];
                            this.scene.tweens.add({
                                targets: allObjects,
                                alpha: 0,
                                duration: 800,
                                onComplete: () => {
                                    allObjects.forEach(o => o.destroy());
                                    onComplete();
                                }
                            });
                        });
                    }
                });
            }
        });
    }

    showBossBanner(tipo) {
        const cx    = this.scene.scale.width / 2;
        const cy    = this.scene.scale.height / 2;
        const nombre = tipo === 'diddy' ? 'DIDDY' : tipo === 'trump' ? 'TRUMP' : 'JEFF';

        if (this.roundBanner) this.roundBanner.destroy();
        if (this.roundText)   this.roundText.destroy();

        this.roundBanner = this.scene.add.rectangle(cx, cy, 500, 100, 0x000000, 0.85)
            .setScrollFactor(0).setDepth(200);

        this.scene.add.text(cx, cy - 18, '⚠ JEFE ⚠', {
            fontSize: '20px',
            fill: '#ff0000',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0).setDepth(201);

        this.roundText = this.scene.add.text(cx, cy + 16, `¡${nombre} ha aparecido!`, {
            fontSize: '32px',
            fill: '#ffaa00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5).setScrollFactor(0).setDepth(201);

        this.scene.time.delayedCall(2500, () => {
            if (this.roundBanner) this.roundBanner.destroy();
            if (this.roundText)   this.roundText.destroy();
        });
    }

    showRoundBanner(texto) {
        const cx = this.scene.scale.width / 2;
        const cy = this.scene.scale.height / 2;

        if (this.roundBanner) this.roundBanner.destroy();
        if (this.roundText)   this.roundText.destroy();

        this.roundBanner = this.scene.add.rectangle(cx, cy, 400, 80, 0x000000, 0.7)
            .setScrollFactor(0).setDepth(200);

        this.roundText = this.scene.add.text(cx, cy, texto, {
            fontSize: '40px',
            fill: '#ffaa00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5).setScrollFactor(0).setDepth(201);

        this.scene.time.delayedCall(2000, () => {
            if (this.roundBanner) this.roundBanner.destroy();
            if (this.roundText)   this.roundText.destroy();
        });
    }

    checkRoundComplete(enemiesGroup) {
        if (this.transitioning) return;
        if (enemiesGroup.getChildren().length > 0) return;

        if (this.scene.itemManager) {
            this.scene.itemManager.spawnItems();
        }

        this.transitioning = true;

        if (this.currentRound === 3) {
            this.showRoundBanner('¡Nuevas amenazas se acercan!');
            this.scene.time.delayedCall(2500, () => {
                this.scene.events.emit('changeMap');
            });
        } else if (this.currentRound < this.totalRounds) {
            this.currentRound++;
            this.showRoundBanner(`RONDA ${this.currentRound}`);
            this.scene.time.delayedCall(2500, () => {

                if (this.currentRound === 5) {
                    // 👇 Trump con intro y música igual que Diddy y Jeff
                    this.stopMusic();
                this.showBossIntro(
                     'trump',
                    'T R U M P',
                    '"La mano derecha de Epstein"',
                    'trump_theme',
                    () => {
                    this.spawnRound(enemiesGroup);
                    this.transitioning = false;
                 }
                    );
                } else if (this.currentRound === 6) {
                    // 👇 Jeff: detiene música de Trump y muestra intro
                    this.stopMusic();
                    this.showBossIntro(
                        'jeff',
                        'J E F F',
                        '"El dueño de Brainrot Island"',
                        'jeff_theme',
                        () => {
                            this.spawnRound(enemiesGroup);
                            this.transitioning = false;
                        }
                    );
                } else {
                    this.spawnRound(enemiesGroup);
                    this.transitioning = false;
                }
            });
        } else {
            this.stopMusic();
            this.showRoundBanner('¡GANASTE! 🎉');
            this.scene.time.delayedCall(3000, () => {
                this.scene.scene.start('WinScene');
            });
        }
    }
}