// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, frame);
        texture = 'rocket';
        // Add physics properties
        scene.physics.add.existing(this);  
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.isFiring = false;      
        this.moveSpeed = 500;        
    }

    update() {
            if(keyUP.isDown) {
                this.body.setVelocityY(-this.moveSpeed);
            } else if (keyDOWN.isDown) {
                this.body.setVelocityY(this.moveSpeed);
            } else {
                this.body.setVelocityY(0);
            }
            if(keyLEFT.isDown) {
                this.body.setVelocityX(-this.moveSpeed);
            } else if (keyRIGHT.isDown) {
                this.body.setVelocityX(this.moveSpeed);
            } else {
                this.body.setVelocityX(0);
            }
    }

    reset() {
        this.isFiring = false;
        this.body.setVelocity(0);
        this.y = borderPadding;
        this.x = Math.random()*game.config.width;
    }
}
