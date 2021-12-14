/* 
December 2021 - Julia Correia
Code prototype for Project 3: Interactive Installation 
*/

var bubbles = [];
let test, y1, y2, y3, y4, y5;
let night = 0;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);


    ///////////////////////////////////////////////////////////////////
    //Begin serialport library methods, this is using callbacks
    ///////////////////////////////////////////////////////////////////    
        

    // Instantiate our SerialPort object
    serial = new p5.SerialPort();

    // Get a list the ports available
    // You should have a callback defined to see the results
    serial.list();
    console.log("serial.list()   ", serial.list());

    //////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    // Assuming our Arduino is connected, let's open the connection to it
    // Change this to the name of your arduino's serial port
    serial.open("COM3");
    /////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    // Here are the callbacks that you can register

    // When we connect to the underlying server
    serial.on('connected', serverConnected);

    // When we get a list of serial ports that are available
    serial.on('list', gotList);
    // OR
    //serial.onList(gotList);

    // When we some data from the serial port
    serial.on('data', gotData);
    // OR
    //serial.onData(gotData);

    // When or if we get an error
    serial.on('error', gotError);
    // OR
    //serial.onError(gotError);

    // When our serial port is opened and ready for read/write
    serial.on('open', gotOpen);
    // OR
    //serial.onOpen(gotOpen);

    // Callback to get the raw data, as it comes in for handling yourself
    //serial.on('rawdata', gotRawData);
    // OR
    //serial.onRawData(gotRawData);
    
    }
    ////////////////////////////////////////////////////////////////////////////
    // End serialport callbacks
    ///////////////////////////////////////////////////////////////////////////




    // We are connected and ready to go
    function serverConnected() {
    console.log("Connected to Server");
    }

    // Got the list of ports
    function gotList(thelist) {
    console.log("List of Serial Ports:");
    // theList is an array of their names
    for (var i = 0; i < thelist.length; i++) {
        // Display in the console
        console.log(i + " " + thelist[i]);
    }
    }

    // Connected to our serial device
    function gotOpen() {
    console.log("Serial Port is Open");
    }

    // Ut oh, here is an error, let's log it
    function gotError(theerror) {
    console.log(theerror);
    
    
}


// We are connected and ready to go
function serverConnected() {
    console.log("Connected to Server");
  }
  
  // Got the list of ports
  function gotList(thelist) {
    console.log("List of Serial Ports:");
    // theList is an array of their names
    for (var i = 0; i < thelist.length; i++) {
      // Display in the console
      console.log(i + " " + thelist[i]);
    }
  }
  
  // Connected to our serial device
  function gotOpen() {
    console.log("Serial Port is Open");
  }
  
  // Ut oh, here is an error, let's log it
  function gotError(theerror) {
    console.log(theerror);
  }
  
  
  
  // There is data available to work with from the serial port
  function gotData() {
    var currentString = serial.readLine();  // read the incoming string
    trim(currentString);                    // remove any trailing whitespace
    if (!currentString) return;             // if the string is empty, do no more
    console.log("currentString  ", currentString);             // println the string
    latestData = currentString;            // save it for the draw method
    console.log("latestData" + latestData);   //check to see if data is coming in
    splitter = split(latestData, ',');       // split each number using the comma as a delimiter
    //console.log("splitter[0]" + splitter[0]); 
    diameter0 = splitter[0];                 //put the first sensor's data into a variable
    diameter1 = splitter[1];
    night = splitter[2]; 
  }
  
  // We got raw data from the serial port
  function gotRawData(thedata) {
    println("gotRawData" + thedata);
  }
  
  // Methods available
  // serial.read() returns a single byte of data (first in the buffer)
  // serial.readChar() returns a single char 'A', 'a'
  // serial.readBytes() returns all of the data available as an array of bytes
  // serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
  // serial.readString() retunrs all of the data available as a string
  // serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
  // serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
  // serial.last() returns the last byte of data from the buffer
  // serial.lastChar() returns the last byte of data from the buffer as a char
  // serial.clear() clears the underlying serial buffer
  // serial.available() returns the number of bytes available in the buffer
  // serial.write(somevar) writes out the value of somevar to the serial device


function draw() {
    //if it is dark asjust colours
    if (night <= 5) {
        background('rgba(0,0,0, 0.5)');
    } else {
        background(255);
    }

    //calculate distance of person and particle system
    let d1 = dist(100, mouseY, mouseX, mouseY);
    let d2 = dist(250, mouseY, mouseX, mouseY);
    let d3 = dist(400, mouseY, mouseX, mouseY);
    let d4 = dist(550, mouseY, mouseX, mouseY);
    let d5 = dist(700, mouseY, mouseX, mouseY);
    let d6 = dist(850, mouseY, mouseX, mouseY);
    let d7 = dist(1000, mouseY, mouseX, mouseY);
    let d8 = dist(1150, mouseY, mouseX, mouseY);
    let d9 = dist(1300, mouseY, mouseX, mouseY);
    let d10 = dist(1450, mouseY, mouseX, mouseY);
    
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
            let p = new Bubble(100, 25, mouseY);
            bubbles.push(p);
        }
    }   

     if(d2<100) {
         for (let i = 0; i < 1; i++) {
             let p1 = new Bubble(250, 50, mouseY);
             bubbles.push(p1);
             }
     }

    if(d3<100) {
        for (let i = 0; i < 1; i++) {
            let p2 = new Bubble(400, 75, mouseY);
            bubbles.push(p2);
        }
    }
     if(d4<100) {
         for (let i = 0; i < 1; i++) {
             let p2 = new Bubble(550, 100, mouseY);
             bubbles.push(p2);
         }
     }
    if(d5<100) {
        for (let i = 0; i < 1; i++) {
            let p2 = new Bubble(700, 125, mouseY);
            bubbles.push(p2);
        }
    }
     if(d6<100) {
         for (let i = 0; i < 1; i++) {
             let p2 = new Bubble(850, 150, mouseY);
             bubbles.push(p2);
         }
     }
    if(d7<100) {
        for (let i = 0; i < 1; i++) {
            let p2 = new Bubble(1000, 175, mouseY);
            bubbles.push(p2);
        }
    }
     if(d8<100) {
         for (let i = 0; i < 1; i++) {
             let p2 = new Bubble(1150, 200, mouseY);
             bubbles.push(p2);
         }
     }
    if(d9<100) {
        for (let i = 0; i < 1; i++) {
            let p2 = new Bubble(1300, 225, mouseY);
            bubbles.push(p2);
        }
    }
     if(d10<100) {
         for (let i = 0; i < 1; i++) {
             let p2 = new Bubble(1450, 250, mouseY);
             bubbles.push(p2);
         }
     }

}

//particle class
//constructor calls for x position, colour, and max height
class Bubble {
    constructor(w, c, y) {
        this.h = windowHeight;
        this.w = w;
        this.size = 10;
        this.speed = random(5, 8);
        this.y = y
        //if it is dark asjust colours
        if(night <= 5) {
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
        return this.h < this.y;
    }
}
