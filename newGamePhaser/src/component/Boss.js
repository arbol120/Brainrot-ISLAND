export default class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, health, damage, speed, shootInterval) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setGravityY(-this.scene.physics.world.gravity.y);
        this.setCollideWorldBounds(true);
        this.setDepth(10);

        this.speed         = speed;
        this.damage        = damage;
        this.health        = health;
        this.maxHealth     = health;
        this.shootInterval = shootInterval;
        this.shootCooldown = 0;
        this.isBoss        = true;

        this.createHealthBar();
    }

    createHealthBar() {
    // 👇 destruye barras anteriores si existen
    if (this.hpBarBg)   this.hpBarBg.destroy();
    if (this.hpBarFill) this.hpBarFill.destroy();
    if (this.hpBarName) this.hpBarName.destroy();

    const cx = this.scene.scale.width / 2;

    this.hpBarBg = this.scene.add.rectangle(cx, 20, 304, 20, 0x444444)
        .setScrollFactor(0).setDepth(500);

    this.hpBarFill = this.scene.add.rectangle(cx - 148, 20, 296, 14, 0xff2200)
        .setScrollFactor(0).setDepth(501).setOrigin(0, 0.5);

    this.hpBarName = this.scene.add.text(cx, 36, this.texture.key.toUpperCase(), {
        fontSize: '12px',
        fill: '#ffffff',
        stroke: '#000000',
        strokeThickness: 3
    }).setOrigin(0.5).setScrollFactor(0).setDepth(501);
}

        updateHealthBar() {
    const pct = Math.max(0, this.health / this.maxHealth);
    const maxWidth = 296;
    const newWidth = Math.max(1, maxWidth * pct);
    this.hpBarFill.setSize(newWidth, 14);
    this.hpBarFill.x = (this.scene.scale.width / 2) - 148;
}
    update(player, time) {
        if (!player || !this.active) return;
        this.scene.physics.moveToObject(this, player, this.speed);

        if (time > this.shootCooldown) {
            this.shoot(player);
            this.shootCooldown = time + this.shootInterval;
        }
    }

   shoot(player) {
    // Disparo principal hacia el jugador
    this.scene.events.emit('enemyShoot', this, player, this.damage);

    //  dispara en 4 direcciones extra simultáneamente
    const directions = [
        { x: 1,  y: 0  },
        { x: -1, y: 0  },
        { x: 0,  y: 1  },
        { x: 0,  y: -1 },
    ];

    directions.forEach(dir => {
        this.scene.events.emit('enemyShootDir', this, dir, this.damage);
    });
}

    takeDamage(amount = 1) {
        this.health -= amount;
        this.setTint(0xff0000);
        this.scene.time.delayedCall(100, () => this.clearTint());
        this.updateHealthBar();

        if (this.health <= 0) {
            // 👇 detiene música del jefe al morir
            if (this.scene.roundManager) {
                this.scene.roundManager.stopMusic();
            }
            this.hpBarBg.destroy();
            this.hpBarFill.destroy();
            this.hpBarName.destroy();
            this.destroy();
        }
    }
}