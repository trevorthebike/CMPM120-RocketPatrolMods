/*
    Trevor Gardner
    Fishing Game
    15 hours
    I made a large amount of changes outside of the scope of the project. 
    The changes that I made that are listed are;
    -Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
    -Randomize each spaceship's movement direction at the start of each play (5) (change this to speed and location)
    -Allow the player to control the Rocket after it's fired (5)
    -Create a new scrolling tile sprite for the background (5)
    -Display the time remaining (in seconds) on the screen (10)
    -Create a new title screen (e.g., new artwork, typography, layout) (10)
    -Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
    

    Changes I made that are not on the list;
    -added phaser physics
    -removed collison function and use phaser physics instead
    -added a group for the enemies, which has physics and random movement and random start location
    -added collision from enemy to enemy to allow them to move apart from each other
    -added a group for the player, although I did not use in any particular different way than one player
    -changed background, spaceship, and rocket images to the ocean, fish, and a fishing rod.
    -added a new noise for the collision of enemy event, that sounds like a spashing fish
    -added new controls to allow the player to move in all directions and collect fish
    -removed the firing function, automicatlly resets and then allows movement
    -added a varaible amount of enemies dpending on game mode (expert has alot!)
    -and many other small changes
  */

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
