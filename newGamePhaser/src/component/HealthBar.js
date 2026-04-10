export default class HealthBar {
    constructor(scene) {
        this.scene = scene;
        this.maxHealth = 20;  
        this.currentHealth = 20;
        this.pizzaCount = 5;
        this.pizzaSprites = [];

        this.createUI();
        this.updateSprites(); 
    }

    createUI() {
        const startX = 20;
        const startY = this.scene.scale.height - 50;
        const spacing = 40;

        for (let i = 0; i < this.pizzaCount; i++) {
            const sprite = this.scene.add.image(
                startX + i * spacing,
                startY,
                'vida_4' 
            ).setScale(1).setScrollFactor(0).setDepth(100);

            this.pizzaSprites.push(sprite);
        }
    }

    takeDamage(quarters) {
        this.currentHealth = Math.max(0, this.currentHealth - quarters);
        this.updateSprites();

        if (this.currentHealth <= 0) {
            this.scene.events.emit('playerDead');
        }
    }

    updateSprites() {
        for (let i = 0; i < this.pizzaCount; i++) {
            // Cuántos cuartos le quedan a esta pizza
            const quartersForThisPizza = Math.min(
                4,
                Math.max(0, this.currentHealth - i * 4)
            );
            this.pizzaSprites[i].setTexture(`vida_${quartersForThisPizza}`);
        }
    }
}