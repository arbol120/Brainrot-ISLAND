import Enemy from "./Enemy.js";

export default class Emi extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'emi', 85, 1); 
        this.setScale(1.3);
        this.shootInterval = 1600;
        this.health = 4; 
    }
}