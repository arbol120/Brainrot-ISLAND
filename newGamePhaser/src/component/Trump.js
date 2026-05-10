import Boss from "./Boss.js";

export default class Trump extends Boss {
    constructor(scene, x, y) {
        super(
            scene, x, y,
            'trump',
            75,  
            2,    
            125,  
            1200
        );
         this.setScale(2.5)
        this.shootCooldown = 0;
    }
}