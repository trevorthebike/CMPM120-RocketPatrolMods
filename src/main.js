let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
console.log(borderUISize);
console.log(borderPadding);
let keyF, keyR, keyLEFT, keyRIGHT, keyDOWN, keyUP;
/*let num_enemies = 10;

function createEnemy(player,myworldlayer){
    enemys = this.add.group({
      defaultKey: 'enemy',
      maxSize: num_enemies
    })
    for (i = 0; i < num_enemies; i++){
        let x = (i+1)*50;
        enemy = enemys.get(x,700);
    }
}*/