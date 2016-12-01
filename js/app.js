// LOGIC

// DONE: Enemies move left to right across the screen.
// DONE: Enemies have a this.y of either 60(lane1), 145(lane2), 228(lane3).
// DONE: Enemies move at random speeds for each run.

// DONE: Character shows up in the middle of start sq.
// DONE: Character moves on keyboard press to middle of adjacent tiles - 4 different directions.

// DONE: Enemy must be running at the same y coordinates as the character when they  move to the enemy square. Y Coordinates are: 50, 132.5, 215.
// If enemy collides with character, the game must reset.

// RESET FUNCTION
// Move player back to x = 200 and y = 380.
// Move all enemies back to x = -100.

// DONE: If character makes it to water, player wins and game resets.
// Water y placement is -32.5 for some reason...? The position before that is 50...
// So basically as soon as the character moves past 0, upwards the game is won, and the character resets.




var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100; // starting position of -100 is of the canvas which looks good
    // canvas height is 606 so thats 101 per row. I want bugs to show up in 3 positions, the middles of each tile so: 60 (for some reason?), 145, 228 (wierdly)
    this.y = y;
    this.speed = this.getSpeed();
    return this;
};

// Enemy.prototype.reset = function() {
//     for (var i=0; i < allEnemies.length; i++) {
//         this.x = -100;
//     };
//     return;
// };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 600) {
        this.x = -100;
    }
    return;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.getSpeed = function() {
    var random = Math.random() * 300;
    if (Math.floor(random)< 100)
        {return 100;}
        else
        {return random;}
};

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    return this;
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
}

Player.prototype.collision = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if ((this.x - allEnemies[i].x) <50 && (allEnemies[i].x - this.x) <50 && (this.y === allEnemies[i].y)) {
            console.log("they match");
            alert("GAME OVER!");
            this.reset();
            break;
        };
    };
};


Player.prototype.update = function(dt) {

    this.collision();
    if (this.y === -32.5) {
        // alert("YOU WIN!");
        delayedAlert();
        this.reset();
        // Enemy.prototype.reset();
        // this.reset();
    };

};

function delayedAlert() {
    window.setTimeout(youWin, 50);
};
function youWin() {
    alert("YOU WIN! Play again...");
};



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
};

Player.prototype.handleInput = function(move) {
    if (move === 'left' && this.x > 25) {
        this.x -= 100;
    }
    if (move === 'up' && this.y > 0) {
        this.y -= 82.5;
    }
    if (move === 'right' && this.x < 400) {
        this.x += 100;
    }
    if (move === 'down' && this.y < 300) {
        this.y += 82.5;
    }
};

var enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, player;

enemy1 = new Enemy(50);
enemy2 = new Enemy(50);
enemy3 = new Enemy(132.5);
enemy4 = new Enemy(132.5);
enemy5 = new Enemy(215);
enemy6 = new Enemy(215);
player = new Player(200, 380);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

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
