/* 
November 2021 - Julia Correia
Alter the fequency of the sound based on hand position
*/


let video;
let posex, posey;
let osc, playing, freq, amp;

function setup(){
let cnv = createCanvas(windowWidth, windowHeight);
video = createCapture(VIDEO);
video.size(width, height);
video.hide();
poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
osc = new p5.Oscillator('sine');  
  
}


function modelLoaded(){
    console.log("modelLoaded function has been called so this work!!!!");
    
};

function gotPoses(poses){
    console.log(poses);
    if( poses.length >0 ){
        posex = poses[0].pose.keypoints[10].position.x;
        posey = poses[0].pose.keypoints[10].position.y;
    } 
    
} 

function draw(){
    //map hand position to colour
    let h = map(posey, 0, height, 0, 255);
    colorMode(HSB);
    tint(h, 255, 255);
    image(video, 0, 0, width, height);
    //map hand position to frequency
    freq = constrain(map(posey, height, 0, 100, 500), 100, 500);

    osc.freq(freq, 0.1);
}

function mouseClicked() {
    osc.start();
  }