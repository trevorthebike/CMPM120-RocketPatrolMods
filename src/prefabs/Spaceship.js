// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, frame);
        texture = 'spaceship';
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.world.on('collideWorldBounds', this.onCollideWorldBounds, this);
    }

    onCollideWorldBounds() {
        // Trigger function when spaceship collides with world bounds
        //if (this.body.blocked.left) {
            Spaceship.reset();
        //}
    }


    update() {
        this.x -= this.moveSpeed;
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
        this.y = Math.random()*400;
    }
}