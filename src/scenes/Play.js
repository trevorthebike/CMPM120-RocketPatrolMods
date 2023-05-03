class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('ocean', './assets/bg.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.audio('bgmusic', "assets/bgsound.wav");
    }

    create() {
        this.ocean = this.add.tileSprite(0,0,1920,1080, 'ocean').setOrigin(0,0).setScale(0.5);
        let playerGroup = this.physics.add.group({
            classType: Rocket,
            runChildUpdate: true
        });
        for(let i = 0; i < 1; i++){
            let player = playerGroup.get(this, borderUISize, 240 , 'rocket').setOrigin(0.5, 0);
            player.setActive(true);
            player.setVisible(true);
            player.reset();
        }
        let spaceshipsGroup = this.physics.add.group({
            classType: Spaceship,
            runChildUpdate: true
        });
        for(let i = 0; i < num_enemies; i++){
            let spaceship = spaceshipsGroup.get(this, game.config.width + borderUISize*Math.random(0,6), Math.random()*300, 'spaceship', 0, 1);
            spaceship.setActive(true);
            spaceship.setVisible(true);
            spaceship.reset();
        }
        this.physics.add.overlap(playerGroup, spaceshipsGroup, this.shipExplode, null, this);
        this.physics.add.collider(spaceshipsGroup, spaceshipsGroup, null, null, this);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { 
                start: 0, 
                end: 9, 
                first: 0
            }),
            frameRate: 30
        });
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
        this.initialTime = game.settings.gameTimer;
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
        let gamemusic = this.sound.add('bgmusic');
        gamemusic.play({
            volume: 0.5,
            loop: true}   );
    }

    

    update(){
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        if(!this.gameOver) {
            this.ocean.tilePositionX -= 3; 
        }
    }

    shipExplode(player, spaceshipGroup) {    
        spaceshipGroup.reset();
        player.reset();                    
        let boom = this.add.sprite(spaceshipGroup.x, spaceshipGroup.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            //spaceshipGroup.reset();
            spaceshipGroup.alpha = 1; 
            boom.destroy(); 
           // this.p1Score += 1;
           // this.scoreLeft.text = this.p1Score; 
        });
        this.p1Score += 1;
        this.scoreLeft.text = this.p1Score; 
        this.sound.play('caught');
        let collect = this.sound.add('caught');
        collect.play({
          volume: 1,
          loop: false}   );
        }
}