import Enemy from "./Enemy.js";

export default class Karkar extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'karkar', 60, 2);
        this.setScale(2);
        this.shootInterval = 1200;
        this.health = 4; 
    }
}