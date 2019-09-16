class Particle {
    constructor() {
        this.pos = createVector(width / 4, height / 2);
        this.rays = [];
        this.fov = 45;
        this.heading = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    update(x, y) {
        this.pos.set(x, y);
    }

    updateFOV(fov) {
        this.fov = fov;
        this.rays = [];
        for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
            this.rays.push(new Ray(this.pos, radians(a) + this.heading));
        }
    }

    rotate(angle) {
        this.heading += angle;
        let index = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
            this.rays[index].setAngle(radians(a) + this.heading);
            index++;
        }
    }

    move(amt) {
        const vel = p5.Vector.fromAngle(this.heading);
        vel.setMag(amt);
        this.pos.add(vel);
    }

    look(walls) {
        const scene = [];
        let r = 100;
        let g = 100;
        let b = 0;
        let a = 100;
        for (let ray of this.rays) {
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    let d = p5.Vector.dist(this.pos, pt);
                    const a = ray.dir.heading() - this.heading;
                    d *= cos(a);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                // r = (r + 20) % 255;
                // g = (g + 10) % 255;
                b = (b + 5) % 255;
                stroke(255, 100);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
            scene.push(record);
        }
        return scene;
    }

    show () {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 8);
        for (let ray of this.rays) {
            ray.show();
        }
    }
}