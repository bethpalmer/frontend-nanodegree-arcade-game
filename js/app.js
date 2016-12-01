var Enemy = function(y) {
    // The image/sprite for our enemies, uses a helper provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100; // starting position of -100 is to left of the canvas
    this.y = y;
    this.speed = this.getSpeed();
    return this;
};

// Update the enemy's position, required method for game. Multiply any movement by the dt parameter.
// Parameter: dt, a time delta between ticks which ensures game runs at the same speed for all computers.
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x > 600) {
        this.x = -100;
    }
    return;
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.getSpeed = function() {
    var random = Math.random() * 300;
    if (Math.floor(random) < 100) {
        return 100;
    } else {
        return random;
    }
};

var Player = function(x, y) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
    return this;
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

Player.prototype.collision = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if ((this.x - allEnemies[i].x) < 50 && (allEnemies[i].x - this.x) < 50 && (this.y === allEnemies[i].y)) {
            alert("GAME OVER! Play again...");
            this.reset();
            break;
        }
    }
};

Player.prototype.update = function(dt) {
    this.collision();
    if (this.y === -35) {
        delayedAlert();
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move player height of rows and width of columns and keep within the bounds of the canvas
Player.prototype.handleInput = function(move) {
    if (move === 'left' && this.x > 25) {
        this.x -= 101;
    }
    if (move === 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (move === 'right' && this.x < 400) {
        this.x += 101;
    }
    if (move === 'down' && this.y < 300) {
        this.y += 83;
    }
};

// Allow the animation to show the player is moving up past the stone row before they win.
function delayedAlert() {
    window.setTimeout(youWin, 50);
}

function youWin() {
    alert("YOU WIN! Play again...");
}

var enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, player;

// Enemies move along x axis, at y coordinates which conincides with the y coordinate of player when on that row.
enemy1 = new Enemy(48);
enemy2 = new Enemy(48);
enemy3 = new Enemy(131);
enemy4 = new Enemy(131);
enemy5 = new Enemy(214);
enemy6 = new Enemy(214);
player = new Player(200, 380);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// Listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});