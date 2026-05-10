import Scene from "../engine/Scene.js";

export default class GameOverScene extends Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2;

    this.add.rectangle(cx, cy, this.scale.width, this.scale.height, 0x000000, 0.85);

    // Título arriba
    this.add.text(cx, cy - 120, 'GAME OVER', {
        fontSize: '64px',
        fill: '#ff0000',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 6
    }).setOrigin(0.5);

    // Subtexto
    this.add.text(cx, cy - 40, 'BRAINROT ISLAND te venció...', {
        fontSize: '24px',
        fill: '#ffffff'
    }).setOrigin(0.5);

    // 👇 Puntuación debajo del subtexto
    const score = this.registry.get('finalScore') || 0;
    this.add.text(cx, cy + 10, `PUNTUACIÓN: ${score}`, {
        fontSize: '28px',
        fill: '#ffdd00',
        stroke: '#000',
        strokeThickness: 4
    }).setOrigin(0.5);

    // Botón reintentar más abajo
    const btn = this.add.text(cx, cy + 80, '[ REINTENTAR ]', {
        fontSize: '28px',
        fill: '#ffff00',
        stroke: '#000000',
        strokeThickness: 4
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setFill('#ff8800'));
    btn.on('pointerout',  () => btn.setFill('#ffff00'));
    btn.on('pointerdown', () => {
        this.registry.remove('currentHealth');
        this.registry.remove('maxHealth');
        this.registry.remove('pizzaCount');
        this.registry.remove('powerDamage');
        this.registry.remove('finalScore');
        this.registry.remove('currentScore');

        this.scene.stop('GameOverScene');
        this.scene.stop('PlayaScene');
        this.scene.stop('MainScene');
        this.scene.start('MainScene');
    });
}
}