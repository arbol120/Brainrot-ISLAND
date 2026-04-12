import Boss from "./Boss.js";

export default class Jeff extends Boss {
    constructor(scene, x, y) {
        super(
            scene, x, y,
            'jeff',
            60,   
            3,    
            140,  
            250   
        );
        this.shootCooldown = 0; 
    }
}