export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name) {
        super(scene, x, y, name);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setGravityY(-this.scene.physics.world.gravity.y);
        this.setCollideWorldBounds(true);

        // WASD para moverse
        this.keys = this.scene.input.keyboard.addKeys({
            up:    Phaser.Input.Keyboard.KeyCodes.W,
            down:  Phaser.Input.Keyboard.KeyCodes.S,
            left:  Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Flechas para disparar
        this.arrows = this.scene.input.keyboard.createCursorKeys();

        // Control de disparo
        this.shootCooldown = 0;
        this.shootInterval = 400; // ms entre disparos
        this.bulletIndex = 0;     // alterna entre archivo y archivo2
    }

    update(time) {
        const speed = 200;
        this.setVelocity(0);

        // Movimiento WASD
        if (this.keys.left.isDown) {
            this.setVelocityX(-speed);
        } else if (this.keys.right.isDown) {
            this.setVelocityX(speed);
        }

        if (this.keys.up.isDown) {
            this.setVelocityY(-speed);
        } else if (this.keys.down.isDown) {
            this.setVelocityY(speed);
        }

        // Diagonal normalizada
        if (this.body.velocity.x !== 0 && this.body.velocity.y !== 0) {
            this.body.velocity.normalize().scale(speed);
        }

        // Disparo con flechas
        if (time > this.shootCooldown) {
            let dirX = 0;
            let dirY = 0;

            if (this.arrows.left.isDown)  dirX = -1;
            if (this.arrows.right.isDown) dirX = 1;
            if (this.arrows.up.isDown)    dirY = -1;
            if (this.arrows.down.isDown)  dirY = 1;

            if (dirX !== 0 || dirY !== 0) {
                this.scene.events.emit('playerShoot', this, dirX, dirY, this.bulletIndex);
                this.bulletIndex = this.bulletIndex === 0 ? 1 : 0; // alterna
                this.shootCooldown = time + this.shootInterval;
            }
        }
    }
}