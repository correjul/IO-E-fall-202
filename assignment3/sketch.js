/* 
November 2021 - Julia Correia
Program that causes the computer to repeat after the user
Testing p5.SpeechRec and p5.Speech
*/

//create speechRec object
let myRec = new p5.SpeechRec('en-US', parseResult); 
myRec.continuous = true; //always listen for user input

//create speech object
let voice = new p5.Speech();

let lastWord;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    //start recording
    myRec.start();
}

function draw() {
    textSize(72);
    textAlign(CENTER);

}

function parseResult()
	{
		let words = myRec.resultString;
        voice.setLang("en-GB");
		
        //stop the program from repeating after itself
        if(words != lastWord) {
            voice.speak(words);
            console.log(words);
            background(255);
            text(words, width/2, height/2);
        }
        lastWord = words;
	}