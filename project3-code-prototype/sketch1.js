/* 
November 2021 - Julia Correia
drawing lines to the height of the cursor to simulate the interaction of the water
*/

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
}

function draw() {
    fill(0);
    stroke(0);
    line(mouseX, height, mouseX, mouseY);
}