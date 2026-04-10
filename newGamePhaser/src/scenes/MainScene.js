import Player from "../component/Player.js";
import Tung from "../component/Tung.js";
import Karkar from "../component/Karkar.js";
import HealthBar from "../component/HealthBar.js";
import Scene from "../engine/Scene.js";

export default class MainScene extends Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        
    }

    create() {
        this.events.off('enemyShoot');
        this.events.off('playerShoot');
        this.events.off('playerDead');
        this.add.image(300, 140, 'background');

        const map = this.make.tilemap({ key: 'map' });
        const tiles = map.addTilesetImage('platformPack_tilesheet', 'tiles');
        this.layer = map.createLayer('epstein', tiles, 0, 0);
        this.layer.setCollisionByExclusion([-1]);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Grupos de balas
        this.enemyBullets  = this.physics.add.group();
        this.playerBullets = this.physics.add.group(); 

        // Enemigos
        this.enemies = this.physics.add.group();
        this.enemies.add(new Tung(this, 100, 100));
        this.enemies.add(new Karkar(this, 500, 200));

        // Jugador
        this.player = new Player(this, 400, 300, 'player').setScale(1.5);

        // Barra de vida
        this.healthBar = new HealthBar(this);

        // Colisiones
        this.physics.add.collider(this.player, this.layer);
        this.physics.add.collider(this.enemies, this.layer);

        // Bala enemiga toca jugador
       // Bala toca jugador
        this.physics.add.overlap(this.player, this.enemyBullets, (player, bullet) => {
        const damage = bullet.damage ?? 1;
             bullet.destroy();
            this.healthBar.takeDamage(damage);
});

     
        this.physics.add.overlap(this.playerBullets, this.enemies, (bullet, enemy) => {
            bullet.destroy();
            enemy.takeDamage(1);
        });

        // Evento disparo enemigo
        this.events.on('enemyShoot', (enemy, target, damage) => {
            const bullet = this.enemyBullets.create(enemy.x, enemy.y, 'bullet');
            bullet.body.setGravityY(-this.physics.world.gravity.y);
            bullet.damage = damage;
            this.physics.moveToObject(bullet, target, 300);
            this.time.delayedCall(3000, () => {
                if (bullet && bullet.active) bullet.destroy();
            });
        });

      
        this.events.on('playerShoot', (player, dirX, dirY, index) => {
            const texture = index === 0 ? 'archivo' : 'archivo2';
            const bullet = this.playerBullets.create(player.x, player.y, texture);
            bullet.setScale(1); 
            bullet.body.setGravityY(-this.physics.world.gravity.y);
            bullet.setVelocity(dirX * 400, dirY * 400);
            this.time.delayedCall(2000, () => {
                if (bullet && bullet.active) bullet.destroy();
            });
        });

        // Game Over
        this.events.on('playerDead', () => {
            this.scene.launch('GameOverScene');
            this.scene.pause();
        });
    }

    update(time) {
        this.player.update(time); 
        this.enemies.getChildren().forEach(enemy => {
            enemy.update(this.player, time);
        });
    }
}