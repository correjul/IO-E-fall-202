/* 
November 2021 - Julia Correia
create effect of fire emerging from hand
*/

particles = [];
let ready = false;

let poseNet;
let handRX, handRY;
let cam;

//load particle images

setup = () => {
    let can = createCanvas(windowWidth, windowHeight);
    can.position(0, 0);
    
    cam = createCapture(VIDEO);
    cam.size(windowWidth, windowHeight);
    // hide the html element that createCapture adds to the screen
    cam.hide();

    poseNet = ml5.poseNet(cam, {
        flipHorizontal: true //flips interaction
    }, modelReady);
    poseNet.on('pose', gotPoses);
}

let modelReady = () => {
    console.log('model ready');
    ready = true;
}

let gotPoses = (poses) => {
    console.log(poses);
    //only detect if there is a person
    if (poses.length > 0) {
        //lerp smoothes position from camera noise
        handRX = poses[0].pose.keypoints[10].position.x;
        handRY = poses[0].pose.keypoints[10].position.y;
        
       
        //console.log(positions);    
    }
}

draw = () => {
    
    if (ready) {
        push();
        translate(windowWidth, 0);
        scale(-1.0, 1.0);
        noTint();
        image(cam, 0, 0, windowWidth, windowHeight);
        scale(1.0, 1.0);
        pop();

        //start of code from https://editor.p5js.org/codingtrain/sketches/D4ty3DgZB
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].show();
            //remove particles that are no longer visible
            if (particles[i].trash()) {
                particles.splice(i, 1);
            }
        }
        //end of code from https://editor.p5js.org/codingtrain/sketches/D4ty3DgZB
        
        //if the figure has moved, create particles
        
            for (let i = 0; i < 1; i++) {
                let p = new Particle();
                particles.push(p);
            }
        
    }
    
    //set the current position as the last position
    
}

//particle class
class Particle {
    constructor() {
        //select random position to spawn particles
        this.x = handRX;
        this.y = handRY;
        this.velx = random(-1, 0);
        this.vely = random(-5, -1);
        this.alpha = 255;
        this.hue = random(0, 230);
    }
//start of code from https://editor.p5js.org/codingtrain/sketches/D4ty3DgZB
trash() {
    return this.alpha < 0;
}

update() {
    this.x += this.velx;
    this.y += this.vely;
    //fade out
    this.alpha -= 5;
}
//end of code from https://editor.p5js.org/codingtrain/sketches/D4ty3DgZB

show() {
    noStroke();
    fill(255, this.hue, 0, this.alpha);
    ellipse(this.x, this.y, 50, 50);
  }
}

windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
}
