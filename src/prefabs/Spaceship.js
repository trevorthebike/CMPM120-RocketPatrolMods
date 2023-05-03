// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, frame);
        this.points = pointValue;
        this.setScale(2);
        this.moveSpeed = game.settings.spaceshipSpeed;
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
    }

    update() {
        this.body.setVelocityX(-this.moveSpeed*Math.random()*100, true);
        if(this.x < 35) {
             this.reset();
        }
    }

    reset() {
        //this.body.disableBody(true, true);
        this.x = game.config.width;
        this.y = Math.random()*game.config.height;
    }
}