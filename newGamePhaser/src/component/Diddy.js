import Boss from "./Boss.js";

export default class Diddy extends Boss {
    constructor(scene, x, y) {
        super(
            scene, x, y,
            'diddy',
            60,  
            2,   
            160,  
            1400
        );
        this.setScale(2.5)
        this.shootCooldown = 0; 
    }
}