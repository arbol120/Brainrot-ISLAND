export default class ItemManager {
   constructor(scene) {
    this.scene = scene;
    this.items = scene.physics.add.group();

    // 👇 recupera si la vacuna estaba activa
    this.powerDamageActive = scene.registry.get('powerDamage') ?? false;

    scene.physics.add.overlap(scene.player, this.items, (player, item) => {
        this.collectItem(item.texture.key);
        item.destroy();
    });
}

    // Suelta 1-3 items aleatorios en posiciones random del mapa
    spawnItems() {
        const tipos   = ['cesar', 'vacuna', 'buzzball'];
        const cantidad = Phaser.Math.Between(1, 3);

        for (let i = 0; i < cantidad; i++) {
            const tipo = Phaser.Utils.Array.GetRandom(tipos);
            const x    = Phaser.Math.Between(80, this.scene.scale.width  - 80);
            const y    = Phaser.Math.Between(80, this.scene.scale.height - 80);

            const item = this.items.create(x, y, tipo).setScale(1.2);
            item.body.setGravityY(-this.scene.physics.world.gravity.y);
            item.body.setImmovable(true);

            // Animación de flotación
            this.scene.tweens.add({
                targets:  item,
                y:        y - 10,
                duration: 800,
                yoyo:     true,
                repeat:   -1,
                ease:     'Sine.easeInOut'
            });
        }
    }

    collectItem(tipo) {
        const hb = this.scene.healthBar;

        if (tipo === 'cesar') {
            // Cura 4 pizzas (16 cuartos)
            hb.heal(16);
            this.showMessage(' +4 Pizzas de vida!', '#ff6644');

        } else if (tipo === 'vacuna') {
            // Doble daño temporal (30 segundos)
            this.powerDamageActive = true;
            this.showMessage(' ¡Daño doble por 30s!', '#44ffaa');
            this.scene.time.delayedCall(30000, () => {
                this.powerDamageActive = false;
            });

        } else if (tipo === 'buzzball') {
            // Aumenta vida máxima en 1 pizza (4 cuartos) y cura esa pizza
            hb.addMaxPizza();
            this.showMessage(' ¡+1 Pizza máxima!', '#ff88ff');
        }
    }

    // Retorna el daño real aplicando vacuna si está activa
    getDamage(baseDamage) {
        return this.powerDamageActive ? baseDamage * 2 : baseDamage;
    }

    showMessage(texto, color) {
        const cx = this.scene.scale.width / 2;
        const msg = this.scene.add.text(cx, 60, texto, {
            fontSize: '22px',
            fill:     color,
            fontStyle: 'bold',
            stroke:   '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0).setDepth(200);

        this.scene.tweens.add({
            targets:  msg,
            y:        30,
            alpha:    0,
            duration: 2000,
            onComplete: () => msg.destroy()
        });
    }
}