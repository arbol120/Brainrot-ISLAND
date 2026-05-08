import Boss from "./Boss.js";

export default class Diddy extends Boss {
    constructor(scene, x, y) {
        super(
            scene, x, y,
            'diddy',
            40,  
            2,   
            160,  
            300   
        );
        this.setScale(2.5)
        this.shootCooldown = 0; 
    }
}