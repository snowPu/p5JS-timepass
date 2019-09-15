let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 0;
sceneW = 400;
sceneH = 400;
let sliderFOV;


function setup() {
  createCanvas(800, 400);
  for (let i = 0; i < 5; i++) {
      let x1 = random(sceneW);
      let y1 = random(sceneH);
      let x2 = random(sceneW);
      let y2 = random(sceneH);
      walls[i] = new Boundary(x1, y1, x2, y2);
  }
  walls.push(new Boundary(0, 0, sceneW, 0));
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
  walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
  walls.push(new Boundary(0, sceneH, 0, 0));
  
  ray = new Ray(100, 200, 100, 200);
  particle = new Particle();
  sliderFOV = createSlider(0, 360, 45);
  sliderFOV.input(changeFOV);
}

function changeFOV() {
    const fov = sliderFOV.value();
    particle.updateFOV(fov);
}

// function keyPressed() {
//     if (key == 'a') {
//         particle.rotate(0.01);
//     } else if (key == 's') {
//         particle.rotate(-0.01);
//     }
// }

function draw() {

    if (keyIsDown(LEFT_ARROW)) {
        particle.rotate(-0.05);
    } else if (keyIsDown(RIGHT_ARROW)) {
        particle.rotate(0.05);
    } else if (keyIsDown(UP_ARROW)) {
        particle.move(1);
    } else if (keyIsDown(DOWN_ARROW)) {
        particle.move(-1);
    }

    background(0);
    for (let wall of walls) {
        wall.show();
    }
    //   particle.update(noise(xoff)*sceneW, noise(yoff)*sceneH);
    // particle.update(mouseX, mouseY);
    particle.show();
    let scene = particle.look(walls);
    const w = sceneW / scene.length;
    push();
    translate(sceneW, 0);

    //   console.log('w: ' + w);

    for  (let i = 0; i < scene.length; i++) {
        //   console.log(scene[i]);
        noStroke();
        const sq = scene[i] * scene[i];
        const wSq = sceneW * sceneW;
        const b = map(sq, 0, wSq, 255, 0);
        const h = map(scene[i], 0, sceneW, sceneH, 0)
        fill (0, 0, b);
        rectMode(CENTER);
        rect(i * w + w / 2, sceneH / 2, w + 1, h);
    }

    pop();

    xoff += 0.01;
    yoff += 0.01;
//   for (let wall of walls) {
//   }
//   ray.show();
//   ray.lookAt(mouseX, mouseY);
//   let pt = ray.cast(wall);
//   if (pt) {
//       fill(255);
//       ellipse(pt.x, pt.y, 8, 8);
//   }
//   console.log(pt);
}