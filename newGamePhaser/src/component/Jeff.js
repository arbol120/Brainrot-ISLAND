import Boss from "./Boss.js";

export default class Jeff extends Boss {
    constructor(scene, x, y) {
        super(scene, x, y, 'jeff', 80, 3, 140, 1100);
        this.setScale(2.5);
        this.shootCooldown = 0;
    }

    shoot(player) {
        // 👇 Jeff dispara en 8 direcciones como un jefe final
        const directions = [
            { x: 1,   y: 0   },
            { x: -1,  y: 0   },
            { x: 0,   y: 1   },
            { x: 0,   y: -1  },
            { x: 0.7, y: 0.7 },
            { x: -0.7,y: 0.7 },
            { x: 0.7, y: -0.7},
            { x: -0.7,y: -0.7},
        ];

        directions.forEach(dir => {
            this.scene.events.emit('enemyShootDir', this, dir, this.damage);
        });

        // También dispara hacia el jugador
        this.scene.events.emit('enemyShoot', this, player, this.damage);
    }
}