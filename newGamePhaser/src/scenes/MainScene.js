import Player from "../component/Player.js";
import Tung from "../component/Tung.js";
import Karkar from "../component/Karkar.js";
import Emi from "../component/Emi.js";
import HealthBar from "../component/HealthBar.js";
import RoundManager from "../component/RoundManager.js";
import ItemManager from "../component/ItemManager.js";
import Diddy from "../component/Diddy.js";
import Jeff  from "../component/Jeff.js";
import Trump from "../component/Trump.js";
import Scene from "../engine/Scene.js";
import ScoreManager from "../component/ScoreManager.js";

export default class MainScene extends Scene {
    constructor(key = 'MainScene') {
        super(key);
    }

    init(data) {
        this.mapKey      = data?.mapKey      || 'map';
        this.tilesKey    = data?.tilesKey    || 'tiles';
        this.tilesetName = data?.tilesetName || 'platformPack_tilesheet';
        this.layerName   = data?.layerName   || 'epstein';
        this.startRound  = data?.startRound  || 1;
    }

    preload() {}

    create() {
        this.events.off('enemyShoot');
        this.events.off('playerShoot');
        this.events.off('playerDead');
        this.events.off('changeMap');

        this.add.image(400, 320, 'background');

        const map = this.make.tilemap({ key: this.mapKey });
        const tiles = map.addTilesetImage(this.tilesetName, this.tilesKey);
        this.layer = map.createLayer(this.layerName, tiles, 0, 0);
        this.layer.setCollisionByExclusion([-1]);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.enemyBullets  = this.physics.add.group();
        this.playerBullets = this.physics.add.group();
        this.enemies       = this.physics.add.group();

        this.registry.set('TungClass',   Tung);
        this.registry.set('KarkarClass', Karkar);
        this.registry.set('EmiClass',    Emi);
        this.registry.set('DiddyClass',  Diddy);
        this.registry.set('JeffClass',   Jeff);
        this.registry.set('TrumpClass',  Trump);

        // 👇 usa el personaje seleccionado
        const playerSprite = this.registry.get('playerSprite') ?? 'jugador';
        this.player = new Player(this, 400, 300, playerSprite).setScale(1.5);
        this.player.setDepth(50);

        this.healthBar   = new HealthBar(this);
        this.itemManager = new ItemManager(this);
        this.scoreManager = new ScoreManager(this);

        this.roundManager = new RoundManager(this, this.startRound);
        this.roundManager.spawnRound(this.enemies);

        this.physics.add.collider(this.player, this.layer);
        this.physics.add.collider(this.enemies, this.layer);

        this.physics.add.overlap(this.player, this.enemyBullets, (player, bullet) => {
    const damage = bullet.damage ?? 1;
    bullet.destroy();
    this.healthBar.takeDamage(damage);
    // 👇 resta puntos por recibir daño
    this.scoreManager.addScore(-15);
});

        this.physics.add.overlap(this.playerBullets, this.enemies, (bullet, enemy) => {
    bullet.destroy();
    const dmg = this.itemManager.getDamage(1);
    enemy.takeDamage(dmg);
    // 👇 suma puntos por golpear
    const points = enemy.isBoss ? 50 : 10;
    this.scoreManager.addScore(points);
});

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

        // 👇 un solo playerDead con todo
        this.events.on('playerDead', () => {
            this.registry.set('finalScore', this.scoreManager.score);
        this.scoreManager.saveScore(this.registry.get('playerName'));
            if (this.sound.get('jeff_theme')) {
                this.sound.stopByKey('jeff_theme');
            }
            if (this.roundManager) {
                this.roundManager.stopMusic();
            }
            this.scene.launch('GameOverScene');
            this.scene.pause();
        });

        this.events.on('changeMap', () => {
    this.registry.set('currentHealth', this.healthBar.currentHealth);
    this.registry.set('maxHealth',     this.healthBar.maxHealth);
    this.registry.set('pizzaCount',    this.healthBar.pizzaCount);
    this.registry.set('powerDamage',   this.itemManager.powerDamageActive);
    this.registry.set('currentScore',  this.scoreManager.score); // 👈 guarda score

    this.scene.start('TransitionScene', {
        nextScene: 'PlayaScene',
        message:   '¡Nuevas amenazas en la playa!'
    });
});
    }

    update(time) {
        this.player.update(time);
        this.enemies.getChildren().forEach(enemy => {
            enemy.update(this.player, time);
        });
        this.roundManager.checkRoundComplete(this.enemies);
    }
}