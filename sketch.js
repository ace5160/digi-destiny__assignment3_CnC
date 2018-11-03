var a;
var b;
var b1, b2;
var Y_AXIS = 1;
var X_AXIS = 2;
function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  a = 0.5*windowHeight;
  b= 0.58*windowHeight;
  c=0.66*windowHeight;
  d=0.75*windowHeight;
  e=0.833*windowHeight;
  f=0.916*windowHeight;
  b1 = color(255);
  b2 = color(0);
  mover = 2;
}



function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}
function draw() {

var x1enem1= ((windowWidth/2) - 100) + mover;
var y1enem1= windowHeight/4;
var x2enem1= ((windowWidth/2) + 80) + mover;
var y2enem1= ((windowHeight/2) - 200);
var x3enem1= ((windowWidth/2) + 30) + mover;
var y3enem1= windowHeight/2;
var x4enem1= ((windowWidth/2) - 50) + mover;
var y4enem1= windowHeight/2;

  background(0);
  //setGradient(0, 0, width/2, height, b1, b2, X_AXIS);
 // setGradient(width/2, 0, width/2, height, b2, b1, X_AXIS);
  setGradient(0, 0, windowWidth, windowHeight/2, b2, b1, Y_AXIS);
  setGradient(0, windowHeight/2, windowWidth, windowHeight, b2, b1, Y_AXIS);
  
  //gun
  fill(255);
  quad(((windowWidth/2)-40),windowHeight-100,((windowWidth/2)+40),windowHeight-80,((windowWidth/2)+40),windowHeight,((windowWidth/2)-40),windowHeight);
  
  //environment
  line(0.571*windowWidth, windowHeight/2, windowWidth, windowHeight);
  line(0.514*windowWidth, windowHeight/2, 0.714*windowWidth, windowHeight);
  line(0.485*windowWidth,windowHeight/2, 0.286*windowWidth, windowHeight);
  line(0.428*windowWidth, windowHeight/2, 0, windowHeight);
  line(0.371*windowWidth, windowHeight/2, 0, windowHeight/1.6);
  line(0.328*windowWidth, windowHeight/2, 0, windowHeight/1.8);
  line(0.285*windowWidth, windowHeight/2, 0, windowHeight/1.9);
  //line(170, 180, 0, height/16);
  //line(140, 180, 0, height/32);
  //line(110, 180, 0, height/64);
  line(0.628*windowWidth, windowHeight/2, windowWidth,windowHeight/1.6);
  line(0.671*windowWidth, windowHeight/2, windowWidth, windowHeight/1.8);
  line(0.714*windowWidth, windowHeight/2, windowWidth, windowHeight/1.9);
  //line(530, 180, 700, height/16);
  //line(560, 180, 700, height/32);
//  line(590, 180, 700, height/64);
  
  //line(0, 180, 700, 180);
  
  line(0, a, windowWidth, a);
  line(0, b, windowWidth, b);
  line(0, c, windowWidth, c);
  line(0, d, windowWidth, d);
  line(0, e, windowWidth, e);
  line(0, f, windowWidth, f);
  a = a + 4;
  b=b+4;
  c = c + 4;
  d = d + 4;
  e = e + 4;
  f = f + 4;
  if (a > windowHeight) {
    a = windowHeight/2;
  }
  if (b > windowHeight) {
    b = windowHeight/2;
  }
  if (c > windowHeight) {
    c = windowHeight/2;
  }
  if (d > windowHeight) {
    d = windowHeight/2;
  }
  if (e >windowHeight) {
    e = windowHeight/2;
  }
  if (f > windowHeight) {
    f = windowHeight/2;
  }
 
  mover = mover+5;
  if((x2enem1>(windowWidth - 60)) || (x1enem1<30))
  {
    mover = (-1)*mover;
  }


  fill(0);
 quad(x1enem1, y1enem1, x2enem1, y2enem1, x3enem1, y3enem1, x4enem1, y4enem1);
 fill(255);
 triangle(x1enem1+30, y1enem1+50, x1enem1+30, y1enem1+30, x1enem1+60, y1enem1+50); 
}

function windowResized() {
    // change canvas size
    createCanvas(windowWidth, windowHeight);    
}