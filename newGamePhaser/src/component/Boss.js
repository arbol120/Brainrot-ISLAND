import Enemy from "./Enemy.js";

export default class Boss extends Enemy {
    constructor(scene, x, y, texture, health, damage, speed, shootInterval) {
        super(scene, x, y, texture, speed, damage);
        this.health = health;
        this.shootInterval = shootInterval;
        this.setScale(2.5);
        this.isBoss = true;

        // Barra de vida del jefe
        this.createHealthBar();
    }

    createHealthBar() {
        const cx = this.scene.scale.width / 2;
        this.maxHealth = this.health;

        // Fondo barra
        this.hpBarBg = this.scene.add.rectangle(cx, 20, 300, 16, 0x444444)
            .setScrollFactor(0).setDepth(200);

        // Relleno barra
        this.hpBarFill = this.scene.add.rectangle(cx - 148, 20, 296, 12, 0xff2200)
            .setScrollFactor(0).setDepth(201).setOrigin(0, 0.5);

        // Nombre del jefe
        this.hpBarName = this.scene.add.text(cx, 36, this.texture.key.toUpperCase(), {
            fontSize: '12px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5).setScrollFactor(0).setDepth(201);
    }

    updateHealthBar() {
        const pct = Math.max(0, this.health / this.maxHealth);
        this.hpBarFill.width = 296 * pct;
    }

    takeDamage(amount = 1) {
        this.health -= amount;
        this.setTint(0xff0000);
        this.scene.time.delayedCall(100, () => this.clearTint());
        this.updateHealthBar();

        if (this.health <= 0) {
            this.hpBarBg.destroy();
            this.hpBarFill.destroy();
            this.hpBarName.destroy();
            this.destroy();
        }
    }
}