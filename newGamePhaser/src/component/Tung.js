import Enemy from "./Enemy.js";

export default class Tung extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'tung', 90, 1);
        this.setScale(1.5);
        this.shootInterval = 1800;
        this.health = 2; 
    }
}