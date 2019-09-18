let width = 1200;
let height = 800;

let scl = 0.6;
let weightscl = 0.8;
let angle = 0;


function setup() {
    createCanvas(width, height);
    angle = PI/4;
    textAlign(CENTER, CENTER);
    drawTrees();
}

function keyPressed() {
    if (key === ' ') {
        drawTrees();
    }
}


function drawTrees() {
    background(30);
    stroke(255);
    strokeWeight(10);
    line(0, 605, width, 605);

    strokeWeight(1);
    textSize(32);
    fill(255);
    text('Press SPACE Bar', width / 2, 700);

    // let levels = 10;
    // let initLength = 200;
    // let weight = 10;
    strokeCap(SQUARE);
    // tree 1
    stroke(255);
    translate(75, 600);
    branch(25, 8, 4);
    
    // tree 2
    stroke(184, 29, 29);
    translate(75, 0);
    branch(50, 10, 6);

    // tree 3
    stroke(255);
    translate(150, 0);
    branch(100, 12, 8);

    // tree 4
    stroke(184, 29, 29);
    translate(300, 0);
    branch(200, 12, 10);

    // tree 5
    stroke(255);
    translate(300, 0);
    branch(100, 12, 8);

    // tree 6
    stroke(184, 29, 29);
    translate(150, 0);
    branch(50, 10, 6);

    // tree 7
    stroke(255);
    translate(75, 0);
    branch(25, 8, 4);
}

function draw() {
}

function branch(len, levels, weight) {
    levels --;
    if (levels === 0) {
        return;
    }
    strokeWeight(weight);
    line(0, 0, 0, -len);
    push();
    translate(0, -len);
    push();
    rotate(random(0, angle));
    branch(len * scl, levels, weight * weightscl);
    pop();
    push();
    rotate(random(-angle, 0));
    branch(len * scl, levels, weight * weightscl);
    pop();
    pop();
}