/* 
November 2021 - Julia Correia
cursor represents user passing by the interaction
streams of circles represent water jets
*/

var bubbles = [];
let test;

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
    let d2 = dist(200, mouseY, mouseX, mouseY);
    let d3 = dist(300, mouseY, mouseX, mouseY);
    let d4 = dist(400, mouseY, mouseX, mouseY);
    let d5 = dist(500, mouseY, mouseX, mouseY);
    let d6 = dist(600, mouseY, mouseX, mouseY);
    let d7 = dist(700, mouseY, mouseX, mouseY);
    let d8 = dist(800, mouseY, mouseX, mouseY);
    let d9 = dist(900, mouseY, mouseX, mouseY);
    let d10 = dist(1000, mouseY, mouseX, mouseY);
    
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
        let p = new Bubble(100, 25);
        bubbles.push(p);
        }
    }   

    if(d2<100) {
    for (let i = 0; i < 1; i++) {
        let p1 = new Bubble(200, 50);
        bubbles.push(p1);
        }
    }

    if(d3<100) {
        for (let i = 0; i < 1; i++) {
            let p2 = new Bubble(300, 75);
            bubbles.push(p2);
        }
    }
    if(d4<100) {
        for (let i = 0; i < 1; i++) {
            let p2 = new Bubble(400, 100);
            bubbles.push(p2);
        }
    }
    if(d5<100) {
        for (let i = 0; i < 1; i++) {
            let p2 = new Bubble(500, 125);
            bubbles.push(p2);
        }
    }
    if(d6<100) {
        for (let i = 0; i < 1; i++) {
            let p2 = new Bubble(600, 150);
            bubbles.push(p2);
        }
    }
    if(d7<100) {
        for (let i = 0; i < 1; i++) {
            let p2 = new Bubble(700, 175);
            bubbles.push(p2);
        }
    }
    if(d8<100) {
        for (let i = 0; i < 1; i++) {
            let p2 = new Bubble(800, 200);
            bubbles.push(p2);
        }
    }
    if(d9<100) {
        for (let i = 0; i < 1; i++) {
            let p2 = new Bubble(900, 225);
            bubbles.push(p2);
        }
    }
    if(d10<100) {
        for (let i = 0; i < 1; i++) {
            let p2 = new Bubble(1000, 250);
            bubbles.push(p2);
        }
    }

}

//particle class
class Bubble {
    constructor(w, c) {
        this.h = windowHeight;
        this.w = w;
        this.size = 10;
        this.speed = random(5, 8);
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
        return this.h < mouseY;
    }
}
