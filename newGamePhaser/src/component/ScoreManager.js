export default class ScoreManager {
    constructor(scene) {
        this.scene    = scene;
        this.score    = 0;
        this.API_URL = 'https://igq568jlb8.execute-api.us-east-1.amazonaws.com/prod/scores';

        this.createUI();
    }

    createUI() {
        // Fondo de la puntuación
        this.scoreBg = this.scene.add.rectangle(70, 30, 140, 30, 0x000000, 0.6)
            .setScrollFactor(0).setDepth(100);

        this.scoreText = this.scene.add.text(20, 18, 'SCORE: 0', {
            fontSize: '18px',
            fill: '#ffdd00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setScrollFactor(0).setDepth(101);
    }

    addScore(points) {
        this.score += points;
        if (this.score < 0) this.score = 0;
        this.scoreText.setText(`SCORE: ${this.score}`);

        // Animación de puntos
        const popup = this.scene.add.text(
            this.scene.player.x,
            this.scene.player.y - 30,
            points > 0 ? `+${points}` : `${points}`,
            {
                fontSize: '16px',
                fill: points > 0 ? '#00ff00' : '#ff0000',
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 3
            }
        ).setDepth(150);

        this.scene.tweens.add({
            targets: popup,
            y: popup.y - 40,
            alpha: 0,
            duration: 800,
            onComplete: () => popup.destroy()
        });
    }

    async saveScore(playerName) {
        try {
            await fetch(this.API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    playerId: Date.now().toString(),
                    score:    this.score,
                    nombre:   playerName || 'Agente'
                })
            });
            console.log('Score guardado:', this.score);
        } catch(e) {
            console.log('Error guardando score:', e);
        }
    }

    async getTopScores() {
        try {
            const res  = await fetch(this.API_URL);
            const data = await res.json();
            return data;
        } catch(e) {
            console.log('Error obteniendo scores:', e);
            return [];
        }
    }
}