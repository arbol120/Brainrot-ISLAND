export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, speed = 80, damage = 1) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setGravityY(-this.scene.physics.world.gravity.y);
        this.setCollideWorldBounds(true);

        this.speed = speed;
        this.damage = damage;
        this.health = 3;
        this.shootCooldown = 0;
        this.shootInterval = 2000;

       
        this.active_delay = false;
        this.scene.time.delayedCall(1000, () => {
            this.active_delay = true;
        });
    }

    update(player, time) {
    if (!player || !this.active) return;
    if (!this.active_delay && !this.isBoss) return; 

    this.scene.physics.moveToObject(this, player, this.speed);

    if (time > this.shootCooldown) {
        this.shoot(player);
        this.shootCooldown = time + this.shootInterval;
    }
    }

    shoot(player) {
        this.scene.events.emit('enemyShoot', this, player, this.damage);
    }

    takeDamage(amount = 1) {
        this.health -= amount;
        this.setTint(0xff0000);
        this.scene.time.delayedCall(150, () => this.clearTint());
        if (this.health <= 0) this.destroy();
    }
}