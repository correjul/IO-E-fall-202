/* 
November 2021 - Julia Correia
Alter the image based on user input
*/

let myRec = new p5.SpeechRec('en-US', parseResult); 
myRec.continuous = true; 

//images from https://emojiisland.com/
let img;
let faces = ["angry", "bashful", "cool", "embarressed", "happy", "hungry", "laughing", "neutral", "sad", "sassy", "scared", "silly", "sly", "worried"];

let lastWord;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    myRec.start();
    background(255);
    img = loadImage("img/happy.png");
}

function draw() {
    imageMode(CENTER);
    image(img, width/2, height/2, 500, 500);
    textSize(48);
    textAlign(CENTER);

}

function parseResult()
	{
		let mostrecentword = myRec.resultString;
		
        //if emotion is in the array display related image and text
        if(faces.indexOf(mostrecentword) !== -1) {
            background(255);
            text(myRec.resultString, width/2, 100);
            img = loadImage("img/" + mostrecentword + ".png");
            console.log(mostrecentword);
        }
	}