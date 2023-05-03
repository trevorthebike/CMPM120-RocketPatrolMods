class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('caught', './assets/splash.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('ocean', './assets/bg.png');
    }

    create() {
      this.ocean = this.add.tileSprite(0,0,1920,1080, 'ocean').setOrigin(0,0).setScale(0.5);
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFA500',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'CATCH THE FISH', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#808080';
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ & UP/DOWN arrows to move', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00008b';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // Novice mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60   
          }
          num_enemies = 10;
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // Expert mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 5    
          }
          num_enemies = 100;
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        
      }
}