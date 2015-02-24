function getSpeed() {
	// Use a random number to assign the lane and speed of enemy
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	//return Math.random() * (max - min) + min;
	var speed = Math.floor(Math.random() * (600-180)) + 180;
	return speed;
}

function getLane() {
	// Use random number from 1 to 3 to assign a lane to enemy
	// multiply that by lane height and 
	// last number adjusts enemy to right position on y axis.
	var lane = Math.floor((Math.random() * 3) + 1) * 83 - 20;
	return lane;
}

	//Agorithm to detect collision in 2D games from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function collision(pX, pY, eX, eY) {
	var playerRect = {x: pX, y: pY, width: 68, height: 76}
	var enemyRect = {x: eX, y: eY, width: 100, height: 68}

	if (playerRect.x < enemyRect.x + enemyRect.width &&
	   playerRect.x + playerRect.width > enemyRect.x &&
	   playerRect.y < enemyRect.y + enemyRect.height &&
	   playerRect.height + playerRect.y > enemyRect.y) {
		// collision detected!
		player.home();
	}

}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	// Position enemy just outside the canvas
	this.x = -101;
	this.y = getLane();
	this.speed = getSpeed();

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	// If ouside the canvas send back to beginning, else move along
	
	if (this.x > 505 + 101) {
		this.x = -101;
		this.y = getLane();
		this.speed = getSpeed();
	} else {
		collision(player.x + 30, player.y, this.x, this.y);
		this.x += (this.speed * dt);
	}
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	//player built following Enemy class provided
	this.sprite = 'images/char-boy.png';
	this.home();
}

Player.prototype.update = function() {

}

	// Draw player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);	
}

Player.prototype.handleInput = function(key) {

	switch ( key ) {
		case "left":
			//move left
			if (this.x > 100) 
				this.x -= 101;
			break;
		case "up":
			//move up
			if (this.y > 138) {
				this.y -= 83;
			} else {
				// if player reaches water, go back home
				this.home();
			}
			break;
		case "right":
			//move right
			if (this.x < 404) 
				this.x += 101;
			break;
		case "down":
			//move down
			if (this.y < 354)
				player.y += 83;
			break;
	}
	//console.log('X= '+this.x);
	//console.log('Y= '+this.y);

}

	// Function that returns player to home base
Player.prototype.home = function() {
	this.x = 2 * 101;
	this.y = 5 * 83 - 25;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemy1 = new Enemy();
allEnemies.push(enemy1);
var enemy2 = new Enemy();
allEnemies.push(enemy2);
var enemy3 = new Enemy();
allEnemies.push(enemy3);

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
