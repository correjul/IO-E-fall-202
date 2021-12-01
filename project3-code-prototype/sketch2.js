/* 
November 2021 - Julia Correia
Experimenting with easing to make the water move up and down towards the cursor
*/

let x = 1;
let y = 1;
let easing = 0.05;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    y=height;
}

function draw() {
    background('rgba(255,255,255, 0.5)');

    let targetY = mouseY;
    let dy = targetY - y;
    y += dy * easing;

    fill(0);
    stroke(0);
    line(mouseX, height, mouseX, y);
}