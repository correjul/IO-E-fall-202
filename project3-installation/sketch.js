/* 
December 2021 - Julia Correia
Code prototype for Project 3: Interactive Installation 
*/

var bubbles = [];
let test, y1, y2, y3, y4, y5;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    
}

function draw() {
    //change colour based on time of day
    if (hour() >= 17) {
        background('rgba(0,0,0, 0.5)');
    } else {
        background(255);
    }

    //calculate distance of person and particle system
    let d1 = dist(100, mouseY, mouseX, mouseY);
    let d2 = dist(250, mouseY, mouseX, mouseY);
    let d3 = dist(400, mouseY, mouseX, mouseY);
    let d4 = dist(550, mouseY, mouseX, mouseY);
    let d5 = dist(700, mouseY, mouseX, mouseY);
    let d6 = dist(850, mouseY, mouseX, mouseY);
    let d7 = dist(1000, mouseY, mouseX, mouseY);
    let d8 = dist(1150, mouseY, mouseX, mouseY);
    let d9 = dist(1300, mouseY, mouseX, mouseY);
    let d10 = dist(1450, mouseY, mouseX, mouseY);
    
    for (let i = bubbles.length - 1; i >= 0; i--) {
        
        bubbles[i].create();
        bubbles[i].float();

        if (bubbles[i].delete()) {
            bubbles.splice(i, 1);
        }
    
    }
    
    //start partcle systems based on user position
    if(d1<100) {
        for (let i = 0; i < 1; i++) {
            let p = new Bubble(100, 25, mouseY);
            bubbles.push(p);
        }
    }   

     if(d2<100) {
         for (let i = 0; i < 1; i++) {
             let p1 = new Bubble(250, 50, mouseY);
             bubbles.push(p1);
             }
     }

    if(d3<100) {
        for (let i = 0; i < 1; i++) {
            let p2 = new Bubble(400, 75, mouseY);
            bubbles.push(p2);
        }
    }
     if(d4<100) {
         for (let i = 0; i < 1; i++) {
             let p2 = new Bubble(550, 100, mouseY);
             bubbles.push(p2);
         }
     }
    if(d5<100) {
        for (let i = 0; i < 1; i++) {
            let p2 = new Bubble(700, 125, mouseY);
            bubbles.push(p2);
        }
    }
     if(d6<100) {
         for (let i = 0; i < 1; i++) {
             let p2 = new Bubble(850, 150, mouseY);
             bubbles.push(p2);
         }
     }
    if(d7<100) {
        for (let i = 0; i < 1; i++) {
            let p2 = new Bubble(1000, 175, mouseY);
            bubbles.push(p2);
        }
    }
     if(d8<100) {
         for (let i = 0; i < 1; i++) {
             let p2 = new Bubble(1150, 200, mouseY);
             bubbles.push(p2);
         }
     }
    if(d9<100) {
        for (let i = 0; i < 1; i++) {
            let p2 = new Bubble(1300, 225, mouseY);
            bubbles.push(p2);
        }
    }
     if(d10<100) {
         for (let i = 0; i < 1; i++) {
             let p2 = new Bubble(1450, 250, mouseY);
             bubbles.push(p2);
         }
     }

}

//particle class
//constructor calls for x position, colour, and max height
class Bubble {
    constructor(w, c, y) {
        this.h = windowHeight;
        this.w = w;
        this.size = 10;
        this.speed = random(5, 8);
        this.y = y
        if(hour() >= 17) {
            this.colour = c;
        } else {
            this.colour = 195
            this.alpha = 0.5;
        }
    }
    //move particles up
    float() {
        this.h -= this.speed;
    }

    //create particles
    create() {
        colorMode(HSB);
        fill(this.colour, 255, 255);
        noStroke();
        ellipse(this.w, this.h, this.size, this.size);
    }
    //delete particles when they reach the height of the mouse
    delete() {
        return this.h < this.y;
    }
}
