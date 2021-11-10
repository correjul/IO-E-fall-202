/* 
November 2021 - Julia Correia
reciting weather using an Arduino temperature sensor
experimenting with combining the libraries p5.serialport and p5.speech
*/

let serial;
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
let splitter;
let diameter0 = 0, diameter1 = 0, diameter2 = 0;

let myRec = new p5.SpeechRec('en-US', parseResult); 
myRec.continuous = true; 

let voice = new p5.Speech();

let img;

function setup() {
  
  createCanvas(windowWidth, windowHeight);

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

  myRec.start();
 
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



// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  //console.log("currentString  ", currentString);             // println the string
  latestData = currentString;            // save it for the draw method
  console.log("latestData" + latestData);   //check to see if data is coming in
  splitter = split(latestData, ',');       // split each number using the comma as a delimiter
  //console.log("splitter[0]" + splitter[0]); 
  diameter0 = splitter[0];     //put the first sensor's data into a variable
  diameter1 = splitter[1];
  diameter2 = splitter[2]; 



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

preload = () => {
    img = loadImage("weather/w-100.jpg");
}


function draw() {
    image(img, 0, 0, width, height);
}


function parseResult()
	{
		let mostrecentword = myRec.resultString;
        console.log(mostrecentword);
		
        //if the word weather or temperature are included anywhere in the recording respond with the weather
        if(mostrecentword.includes("temperature") || mostrecentword.includes("weather")) {
            voice.speak("It is" + diameter0 + "degrees celcius");
            console.log(diameter0);
            if(diameter2 >= 9) {
                voice.speak("and it's a bright, sunny day");
            } else {
                voice.speak("and there is heavy overcast");
            }
        }

        //change the display image based on the weather
        if (diameter0 > 18 && diameter2 >= 9) {
            img = loadImage("weather/hot-sun.jpg");
        } else if (0 < diameter0 < 18 && diameter2 >= 9) {
            img = loadImage("weather/mild-sun.jpg");
        } else if (diameter0 <= 0 && diameter2 >= 9) {
            img = loadImage("weather/cold-sun.jpg");
        } else if (diameter0 > 18 && diameter2 < 9) {
            img = loadImage("weather/hot-cloud.jpg");
        } else if (0 < diameter0 < 18 && diameter2 , 9) {
            img = loadImage("weather/mild-cloud.jpg");
        } else if (diameter0 <= 0 && diameter2 < 9) {
            img = loadImage("weather/cold-cloud.jpg");
        }
	}

