export default class HealthBar {
    constructor(scene) {
    this.scene         = scene;

   
    this.maxHealth     = scene.registry.get('maxHealth')     ?? 20;
    this.currentHealth = scene.registry.get('currentHealth') ?? 20;
    this.pizzaCount    = scene.registry.get('pizzaCount')    ?? 5;
    this.pizzaSprites  = [];

    this.createUI();
}

    createUI() {
        const startX  = 30;
        const startY  = this.scene.scale.height - 40;
        this.startX   = startX;
        this.startY   = startY;
        this.spacing  = 28;

        for (let i = 0; i < this.pizzaCount; i++) {
            const sprite = this.scene.add.image(
                startX + i * this.spacing,
                startY,
                'vida_4'
            ).setScale(0.8).setScrollFactor(0).setDepth(100);
            this.pizzaSprites.push(sprite);
        }
        this.updateSprites();
    }

    takeDamage(quarters) {
        this.currentHealth = Math.max(0, this.currentHealth - quarters);
        this.updateSprites();
        if (this.currentHealth <= 0) {
            this.scene.events.emit('playerDead');
        }
    }

    heal(quarters) {
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + quarters);
        this.updateSprites();
    }

    
    addMaxPizza() {
        this.pizzaCount++;
        this.maxHealth    += 4;
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + 4);

        // Agrega el nuevo sprite
        const x = this.startX + (this.pizzaCount - 1) * this.spacing;
        const sprite = this.scene.add.image(x, this.startY, 'vida_4')
            .setScale(0.8).setScrollFactor(0).setDepth(100);
        this.pizzaSprites.push(sprite);

        this.updateSprites();
    }

    updateSprites() {
        for (let i = 0; i < this.pizzaCount; i++) {
            const quarters = Math.min(4, Math.max(0, this.currentHealth - i * 4));
            this.pizzaSprites[i].setTexture(`vida_${quarters}`);
        }
    }
}