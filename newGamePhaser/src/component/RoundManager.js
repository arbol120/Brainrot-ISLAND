export default class RoundManager {
    constructor(scene, startRound = 1) {
        this.scene = scene;
        this.currentRound  = startRound;
        this.totalRounds   = 6;
        this.transitioning = false;

        this.rounds = [
            // Ronda 1: 5 Tung
            [
                { type: 'tung', x: 100, y: 100 },
                { type: 'tung', x: 600, y: 100 },
                { type: 'tung', x: 100, y: 300 },
                { type: 'tung', x: 600, y: 300 },
                { type: 'tung', x: 350, y: 200 },
                {type: 'emi', x :120, y : 100},
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
            // Ronda 5: placeholder Trump (enemigos normales por ahora)
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
        const Trump = this.scene.registry.get('TrumpClass');

        const data = this.rounds[this.currentRound - 1];
        const isBossRound = data.length === 1 && ['diddy', 'jeff', 'trump'].includes(data[0].type);

        // Banner especial para rondas de jefe
        if (isBossRound) {
            this.showBossBanner(data[0].type);
        }

        data.forEach(e => {
            let enemy;
            if      (e.type === 'tung')   enemy = new Tung(this.scene, e.x, e.y);
            else if (e.type === 'karkar') enemy = new Karkar(this.scene, e.x, e.y);
            else if (e.type === 'emi')    enemy = new Emi(this.scene, e.x, e.y);
            else if (e.type === 'diddy')  enemy = new Diddy(this.scene, e.x, e.y);
            else if (e.type === 'jeff')   enemy = new Jeff(this.scene, e.x, e.y);
            else if (e.type === 'trump') enemy = new Trump(this.scene, e.x, e.y);
            enemiesGroup.add(enemy);
        });
    }

    showBossBanner(tipo) {
        const cx   = this.scene.scale.width / 2;
        const cy   = this.scene.scale.height / 2;
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
                this.spawnRound(enemiesGroup);
                this.transitioning = false;
            });
        } else {
            this.showRoundBanner('¡GANASTE! 🎉');
            this.scene.time.delayedCall(3000, () => {
            this.scene.scene.start('WinScene'); 
    });
        }
    }
}