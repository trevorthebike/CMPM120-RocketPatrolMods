class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        this.starfield = this.add.tileSprite(0,0,640,480, 'starfield').setOrigin(0,0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.p1Rocket = new Rocket(this, borderUISize, 240 , 'rocket').setOrigin(0.5, 0);
        let spaceshipsGroup = this.add.group({
            classType: Spaceship,
            runChildUpdate: true
        });
        for(let i = 0; i < num_enemies; i++){
        let spaceship = spaceshipsGroup.get(this, game.config.width + borderUISize*Math.random(0,6), borderUISize*4, 'spaceship', 0, 30);
            spaceship.setActive(true);
            spaceship.setVisible(true);
            spaceship.reset();
        
        this.physics.add.collider(spaceship, Rocket);
        this.physics.add.overlap(spaceship, Rocket, this.shipExplode, null, this);
        }
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { 
                start: 0, 
                end: 9, 
                first: 0
            }),
            frameRate: 30
        });
       // createEnemy.call(this);
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.gameOver = false;
        scoreConfig.fixedWidth = 0;

        this.initialTime = 60;
        this.text = this.add.text(game.config.width-borderUISize*6, borderUISize + borderPadding*2, 'Timer: ' + this.initialTime, scoreConfig);
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
        
        function onEvent (){
            if(this.initialTime == 0){
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
                this.gameOver = true;
            }
            else{
                this.initialTime -= 1;
                this.text.setText('Timer: ' + (this.initialTime));
            }
        }
    }

    

    update(){
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4; 

        if(!this.gameOver) {
            this.p1Rocket.update();
            //this.spaceship.update();
            //this.ship01.update();            
            //this.ship02.update();
            //this.ship03.update();
        }
        //if(this.checkCollision(this.p1Rocket, this.ship03)) {
        //    this.p1Rocket.reset();
        //    this.shipExplode(this.ship03);
        //}
    }

    shipExplode(ship) {
        ship.alpha = 0;                         
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1; 
            boom.destroy(); 
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        
        this.sound.play('sfx_explosion');
      }
}