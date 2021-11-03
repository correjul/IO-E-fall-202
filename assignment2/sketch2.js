/* 
November 2021 - Julia Correia
draw with right arms
effect colour with left hand
effect stroke witdth with right hand
step back and show knee to erase
*/

let video;
let posex, posey, posex2, posey2, pose, clear, pose2;
let osc, playing, freq, amp;
let h = 0;


function setup(){
let cnv = createCanvas(windowWidth, windowHeight);
video = createCapture(VIDEO);
video.size(width, height);
video.hide();
push();
    translate(windowWidth, 0);
    scale(-1.0, 1.0);
    image(video, 0, 0, windowWidth, windowHeight);
    scale(1.0, 1.0);
    pop();
poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses); 
background(0);
}
function modelLoaded(){
    console.log("modelLoaded function has been called so this work!!!!");
    
};

function gotPoses(poses){
    console.log(poses);
    if( poses.length > 0 ){
        posex = poses[0].pose.keypoints[10].position.x;
        posey = poses[0].pose.keypoints[10].position.y;
        posex2 = poses[0].pose.keypoints[8].position.x;
        posey2 = poses[0].pose.keypoints[8].position.y;
        pose = poses[0].pose.keypoints[9].position.y;
        pose2 = poses[0].pose.keypoints[9].position.x;
        clear = poses[0].pose.keypoints[13].position.y;
    } 
    
} 

function draw(){
    //map colour to hand position
    h = map(pose, 0, height, 0, 255);

    //map width to hand position
    let w = map(posey, 0, height, 0, 20);

    colorMode(HSB);
    strokeWeight(w);
    stroke(h, 255, 255);
    //draw line from hand to elbow
    line(posex2, posey2, posex, posey);

    if (clear < height) {
        fill(0);
        rect(0, 0, width, height);
        console.log("clear");
    }

    
    ellipse(pose2, pose, 20);
    
}

function mouseClicked() {
  }