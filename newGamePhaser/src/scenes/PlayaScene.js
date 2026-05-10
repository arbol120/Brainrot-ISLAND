import MainScene from "./MainScene.js";

export default class PlayaScene extends MainScene {
    constructor() {
        super('PlayaScene');
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

   create() {
    super.create();

    // 👇 detiene Megalovania al entrar a PlayaScene
    if (this.bgMusic) {
        this.bgMusic.stop();
        this.bgMusic.destroy();
        this.bgMusic = null;
    }

    if (this.registry.get('currentScore')) {
        this.scoreManager.score = this.registry.get('currentScore');
        this.scoreManager.scoreText.setText(`SCORE: ${this.scoreManager.score}`);
    }

    this.enemies.getChildren().forEach(e => {
        if (e.hpBarBg)   e.hpBarBg.destroy();
        if (e.hpBarFill) e.hpBarFill.destroy();
        if (e.hpBarName) e.hpBarName.destroy();
    });

    this.enemies.clear(true, true);
    this.roundManager.transitioning = true;

    this.roundManager.showBossIntro(
        'diddy',
        'D I D D Y',
        '"El Fanático de los niños y Justin Bieber"',
        'diddy_theme',
        () => {
            const Diddy = this.registry.get('DiddyClass');
            const diddy = new Diddy(this, 400, 200);
            this.enemies.add(diddy);
            this.roundManager.transitioning = false;
        }
    );
}
}
