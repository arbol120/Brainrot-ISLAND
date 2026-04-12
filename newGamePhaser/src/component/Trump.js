import Boss from "./Boss.js";

export default class Trump extends Boss {
    constructor(scene, x, y) {
        super(
            scene, x, y,
            'trump',
            40,  
            2,    
            125,  
            250   
        );
        this.shootCooldown = 0;
    }
}