import MainScene from "./MainScene.js";

export default class PlayaScene extends MainScene {
    constructor() {
        super();
        // 👇 sobreescribe la key manualmente
        this.sys && (this.sys.settings.key = 'PlayaScene');
    }

    init() {
        super.init({
            mapKey:      'playa',
            tilesKey:    'tiles_playa',
            tilesetName: 'tilemap_packed',
            layerName:   'Tile Layer 1',
            startRound:  4
        });
    }
}