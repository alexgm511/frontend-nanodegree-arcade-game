// Random number function to vary enemy position and speed 
var randNum = function(topNum) {
	var num = Math.floor((Math.random() * topNum) + 1);
	return num;
}


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = -101;
	this.y = (randNum(3)+1) * 101;
	this.speed = randNum(100);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	if (this.x > 505 + 101) {
		this.x = -101;
	} else {
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
	this.x = 2 * 101;
	this.y = 4 * 101;
}

Player.prototype.update = function() {
	// pos variable will be updated here and multiplied by dt parameter
}

	// Draw player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);	
}

Player.prototype.handleInput = function(key) {
	console.log(key);
	switch (key) {
		case 37:
			//move left
			this.posX -= 101;
			break;
		case 38:
			//move up
			this.posY -= 101;
			break;
		case 39:
			//move right
			this.posX += 101;
			break;
		case 37:
			//move down
			this.posY += 101;
			break;
	}
	
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
console.log(e.keyCode +' hello');
    player.handleInput(allowedKeys[e.keyCode]);
});
