var bubbles = [];

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    
}

function draw() {
    background('rgba(255,255,255, 0.5)');

    let x1 = 200;
    let x2 = mouseX;

    let d = dist(x1, mouseY, x2, mouseY);
    
    for (let i = bubbles.length - 1; i >= 0; i--) {
        
        bubbles[i].create(200);
        bubbles[i].float();
        

        if (bubbles[i].delete()) {
            bubbles.splice(i, 1);
        }
    
    } 
    if (d < 10){
    for (let i = 0; i < 5; i++) {
        let p = new Bubble();
        bubbles.push(p);
    }
}
}


class Bubble {
    constructor() {
        this.h = windowHeight;
        this.w = mouseX;
        this.size = 10;
        this.speed = random(5, 10);
    }

    float() {
        this.h -= this.speed;
    }

    create(w) {
        fill(20, 50, 255);
        noStroke();
        ellipse(w, this.h, this.size, this.size);
    }

    delete() {
        return this.h < mouseY;
    }
}
