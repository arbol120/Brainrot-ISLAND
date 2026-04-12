import Boss from "./Boss.js";

export default class Diddy extends Boss {
    constructor(scene, x, y) {
        super(
            scene, x, y,
            'diddy',
            40,   // 40 balas para morir (más vida)
            2,    // daño: media pizza
            160,  // más rápido
            300   // dispara cada 0.3s (muy rápido)
        );
        this.shootCooldown = 0; // 👈 empieza a disparar de inmediato
    }
}