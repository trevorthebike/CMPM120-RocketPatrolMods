// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   
        this.isFiring = false;      
        this.moveSpeed = 10;        
        this.sfxRocket = scene.sound.add('sfx_rocket')  
    }
    update() {
        if(!this.isFiring) {
            if(keyUP.isDown && this.y >= borderUISize + this.width) {
                this.y -= this.moveSpeed;
            } else if (keyDOWN.isDown && this.y <= borderUISize*13.5) {
                this.y += this.moveSpeed;
            }
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true; 
            this.sfxRocket.play();
        }
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.x += this.moveSpeed;
        }
       /// if(this.x > game.config.width) {
       //    this.reset();
       // }
    }
    reset() {
        this.isFiring = false;
        this.y = 240;
        this.x = borderUISize + borderPadding;
    }
}
