let config = {
    type: Phaser.CANVAS,
    zoom: 1, 
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 640,
        height: 480
    },
    //width: 640,
    //height: 480,
    physics: {
        default: 'arcade',
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
console.log(borderUISize);
console.log(borderPadding);
let keyF, keyR, keyLEFT, keyRIGHT, keyDOWN, keyUP;
let enemys;
let enemy;
let spaceship;
let num_enemies = 5;