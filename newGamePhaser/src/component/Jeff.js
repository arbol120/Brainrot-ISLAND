import Boss from "./Boss.js";

export default class Jeff extends Boss {
    constructor(scene, x, y) {
        super(
            scene, x, y,
            'jeff',
            80,   
            3,    
            140,  
            150   
        );
         this.setScale(2.5)
        this.shootCooldown = 0; 
    }
}