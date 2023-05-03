let config = {
    type: Phaser.CANVAS,
    zoom: 1, 
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920/2,
        height: 1080/2
    },
    physics: {
        default: 'arcade',
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = 1;
let keyLEFT, keyRIGHT, keyDOWN, keyUP, keyR;
let enemys;
let enemy;
let spaceship;
let num_enemies = 10;
