var canvas, ctx;

// snake
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = snakeY = 10;

// game world - dimensions are 400x400
var gridSize = tileSize = 20; //20 x 20 = 400
var nextX = nextY = 0;

// Food
var foodX = (foodY = 15);

window.onload = function() { 
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    document.addEventListener("keydown", keyDownEvent);

    // render X times per second 
    var x = 10;
    setInterval(draw, 1000/x);
};

//Main shit
function draw () { 
    //move snake in next position
    snakeX += nextX;
    snakeY += nextY;

    //snake go out of bounds?
    if (snakeX < 0) { 
        snakeX = gridSize - 1;
    } 
    if (snakeX > gridSize -1) { 
        snakeX = 0;
    } 
    if (snakeY < 0) { 
        snakeY = gridSize -1;
    }
    if (snakeY > gridSize -1) { 
        snakeY = 0;
    }

    //Snake eat food?
    if (snakeX == foodX && snakeY == foodY) { 
        tailSize++;
        foodX = Math.floor(Math.random() * gridSize);
        foodY = Math.floor(Math.random() * gridSize);
    } 

    //redraw the background
    ctx.fillStyle = "black";
    ctx.fillRect (0,0,canvas.width, canvas.height);

    // paint snake
    ctx.fillStyle = "green";
    for (var i = 0; i < snakeTrail.length; i++) { 
        ctx.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
        );

        //snake bites its tail?
        if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) { 
            tailSize = defaultTailSize; 
        }
    }

    // paint food
    ctx.fillStyle = "red";
    ctx.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);

    //set snake trail
    snakeTrail.push({ x: snakeX, y: snakeY });
    while(snakeTrail.length > tailSize) { 
        snakeTrail.shift();
    }
}

function keyDownEvent (e) { 
    switch (e.keyCode) { 
        case 37: 
            nextX = -1;
            nextY = 0;
            break;
        case 38: 
            nextX = 0;
            nextY = -1;
            break;
        case 39: 
            nextX = 1;
            nextY = 0;
            break;
        case 40: 
            nextX = 0;
            nextY = 1;
            break;
    }
}
