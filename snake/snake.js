class Snake {

    constructor() {
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.body = [];
        this.initSnake();
        console.log(this.body);
    }

    initSnake() {
        this.body.push(createVector(0, 0));
        console.log(this.body);
    }

    dir(x, y) {
        this.xSpeed = x;
        this.ySpeed = y;
    }

    eat(food) {
        const d = dist(this.body[0].x, this.body[0].y, food.x, food.y);
        if (d < scl) {
            this.body.push(createVector(0, 0));
            return true;
        } else {
            return false;
        }
    }

    die() {
        let pos = this.body[0];
        this.body = [pos];
    }

    checkIfDead() {
        for (let i = 1; i < this.body.length; i++) {
            const d = dist(this.body[0].x, this.body[0].y, this.body[i].x, this.body[i].y);
            if (d < scl) {
                this.die();
            }
        }
    }

    update() {
        // if (this.total == this.tail.length) {
        //     for (let i = 0; i < this.total - 1; i ++) {
        //         this.tail[i] = this.tail[i+1];
        //     }
        // }
        // this.tail[this.total-1] = createVector(this.x, this.y);

        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        let x = (this.body[0].x + this.xSpeed * scl);
        let y = (this.body[0].y + this.ySpeed * scl);

        // console.log('width: ' + width);
        // console.log('x: ' + this.body[0].x);
        // console.log('mod: ' + width % this.body[0].x);

        this.body[0].x = x > 0 ? x % width : (x < 0 ? width - scl : 0);
        this.body[0].y = y > 0 ? y % height : (y < 0 ? height - scl : 0);
        

        this.checkIfDead();
    }

    show() {
        fill(255);
        for (let i = 0; i < this.body.length; i ++) {
            rect(this.body[i].x, this.body[i].y, scl, scl);
        }
        // rect(this.x, this.y, scl, scl);
    }


}

