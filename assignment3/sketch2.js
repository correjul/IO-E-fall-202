/* 
November 2021 - Julia Correia
Draw with the users hand and customize the drawing using voice commands
Experimenting with combining the libraries posenet and p5.speech
*/

let video;
let posex, posey;
let h, i = 0;
let size = 50;
let shapes = [];

let voice = new p5.Speech();
let myRec = new p5.SpeechRec('en-US', parseResult); 
myRec.continuous = true; 

preload = () => {
    //load images into an array using a for loop
    for (let i = 0; i < 7; i++) {
        shapes[i] = loadImage('svgs/' + (i+1) + ".svg");
    }
}


function setup(){
let cnv = createCanvas(windowWidth, windowHeight);
video = createCapture(VIDEO);
video.size(width, height);
video.hide();
//flip canvas to match interaction
push();
    translate(windowWidth, 0);
    scale(-1.0, 1.0);
    image(video, 0, 0, windowWidth, windowHeight);
    scale(1.0, 1.0);
 pop();
poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses); 
background(0);
//start recording
myRec.start();
//list instruction on load
//voice.speak("The available commands include selecting a colour, selecting a shape, saying bigger or smaller to change the size, saying clear to erase. The commands colours or shapes will list available options.");
}


function modelLoaded(){
    console.log("modelLoaded function has been called so this work!!!!");
    
};

function gotPoses(poses){
    console.log(poses);
    if( poses.length > 0 ){
        posex = poses[0].pose.keypoints[10].position.x;
        posey = poses[0].pose.keypoints[10].position.y;
    } 
    
} 

function draw(){

    colorMode(HSB);
    noStroke();
    tint(h, 255, 255);
    image(shapes[i], posex, posey, size, size);
}

function parseResult()
	{
        //only listen to last word
        //start of code from https://github.com/IDMNYU/p5.js-speech/blob/master/examples/05continuousrecognition.html
		let mostrecentword = myRec.resultString.split(' ').pop();
        //end of code from https://github.com/IDMNYU/p5.js-speech/blob/master/examples/05continuousrecognition.html
        
        //set hue value to the colour specified by the user
		if(mostrecentword == "red") { h=0 }
        else if(mostrecentword == "orange") { h=34 }
        else if(mostrecentword == "yellow") { h=57 }
        else if(mostrecentword == "green") { h=109 }
        else if(mostrecentword == "blue") { h=218 }
        else if(mostrecentword == "purple") { h=275 }
        else if(mostrecentword == "pink") { h=320 }
        //set image to the shape specified by the user
        else if(mostrecentword == "circle") { i=0 }
        else if(mostrecentword == "square") { i=1 }
        else if(mostrecentword == "star") { i=2 }
        else if(mostrecentword == "triangle") { i=3 }
        else if(mostrecentword == "flower") { i=5 }
        else if(mostrecentword == "heart") { i=6 }
        else if(mostrecentword == "bigger") { size+=15 }
        else if(mostrecentword == "smaller") { size-=15 }
        //redraw the background
        else if(mostrecentword == "clear") { background(0); }
        else if(mostrecentword == "colours") {
            voice.speak("The available colour options are: red, orange, yellow, green, blue, purple, and pink. End of list.");
        } else if(mostrecentword == "shapes") {
            voice.speak("The available shape options are: circle, square, triangle, star, flower, heart. End of list.");
        } 
		console.log(mostrecentword);
	}

    function mousePressed() {
        voice.speak("The available commands include selecting a colour, selecting a shape, saying bigger or smaller to change the size, saying clear to erase. The commands colours or shapes will list available options.");
    }