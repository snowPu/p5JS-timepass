let width = 600;
let height = 600;
let scl = 10;
let fr = 20;
let snake;
let food;


function setup() {
    createCanvas(width, height);
    frameRate(fr);
    snake = new Snake();
    placeFood();
}

function placeFood() {
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function drawFood() {
    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        snake.dir(0, 1);
    } else if (keyCode === UP_ARROW) {
        snake.dir(0, -1);
    } else if (keyCode === LEFT_ARROW) {
        snake.dir(-1, 0);
    } else if (keyCode === RIGHT_ARROW) {
        snake.dir(1, 0);
    }
}

function draw() {
    background(51);
    snake.update();
    snake.show();
    if (snake.eat(food)) {
        placeFood();
    }
    drawFood();
}