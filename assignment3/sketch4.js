/* 
November 2021 - Julia Correia
listen to a Robert Frost poem while the tone of voice changes
experimenting with tone and rate properties
*/

let voice = new p5.Speech();
let img;
//break the poem up into strings in an array
//Gethering Leaves by Robert Frost from https://www.poetryfoundation.org/poems/148658/gathering-leaves
let poem = [
    "Spades take up leaves", 
    "No better than spoons,", 
    "And bags full of leaves", 
    "Are light as balloons.", 
    "I make a great noise", 
    "Of rustling all day", 
    "Like rabbit and deer", 
    "Running away.", 
    "But the mountains I raise", 
    "Elude my embrace,", 
    "Flowing over my arms", 
    "And into my face.", 
    "I may load and unload", 
    "Again and again", 
    "Till I fill the whole shed,", 
    "And what have I then?", 
    "Next to nothing for weight,", 
    "And since they grew duller", 
    "From contact with earth,", 
    "Next to nothing for color.", 
    "Next to nothing for use,", 
    "But a crop is a crop,", 
    "And who’s to say where", 
    "The harvest shall stop?"
];

let i = 0;

function preload() {
    //image from https://unsplash.com/photos/Bl1jBUEIeo8
    img = loadImage("fall.jpg");
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    image(img, 0, 0, width, height);
    fill(255);
    textStyle(BOLD);
    textSize(48);
    text("Gathering Leaves", width/10, height/8);
    textStyle(NORMAL);
    textSize(24);
    text("by: Robert Frost", width/10, height/6);
    
    textSize(14);
    text("Click anywhere to begin", width/10, height/4.5);
}

function draw() {
    
}

function mousePressed() {
    //randomly assign the pitch of the voice
    voice.setPitch(random(.01, 2.0));
    //randomly assign the rate of the voice
	voice.setRate(random(.1, 2.0));	
    //continue through poem by increasng the value of the index number
    voice.speak(poem[i]);
    i++
    //if i reaches the end of the poem, restart
    if (i > 23) {
        i = 0;
    } 
}