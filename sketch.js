var a;
var b;
var b1, b2;
var Y_AXIS = 1;
var X_AXIS = 2;
var bullet_start_pos;//bullet
var pbullet_oldx;
var pbullet_oldy;
var bullet_reducefactor;//decrease the size of bullet
var shoot;//if bullet shot
var stop_enemybullet=0;
var enable_shoot;
var player_health=10;///////////////////Player health*****
var system; //for particle effect
var enemy_die_particle=0;
var enemy_die_particle_lifespan=50;

//arduino variables
var serial; // variable to hold an instance of the serialport library
var portName = 'COM4';  // fill in your serial
var inData;
var buttondata;
var checkval = 0;

var font,/////////////////text part******
  fontsize = 40;
var game_over=0;
var player_hit=0;
var player_hit_color=0;
//player hit color*****
var c1, c2;


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
  movespeed = 15;
  bullet_start_pos=windowHeight-153;
  shoot=0;//bullet is shot
  enable_shoot=-1;
  bullet_reducefactor=1; //reduce size of bullet slightly
  enemy_bullet_x=width / 4;
  enemy_bullet_y=height/2;

   //arduino part
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  //serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
 serial.list(); // list the serial ports
 serial.open(portName);              // open a serial port
    
  
  fontsize=windowHeight/24;
  textSize(fontsize);//text part*****
    
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
  
    //  setGradient(50, 90, 540, 80, c1, c2, Y_AXIS);

     

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
  //setGradient(0, 0, windowWidth, windowHeight, c2, c1, Y_AXIS);
  setGradient(0, windowHeight/2, windowWidth, windowHeight, b2, b1, Y_AXIS);
  
 
    
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
 
  
  if((x2enem1>(windowWidth - 60)) || (x1enem1<30))
  {
    movespeed = (-movespeed);
    mover = mover + movespeed;
  }
  mover = mover + movespeed;


  //UI
   fill(100); 
 quad(0, 0, 0, windowHeight/16, windowWidth, windowHeight/16,windowWidth, 0); 
  
  //display text.....level**********
    fill(200);
    text('Level 1', windowWidth/16,windowHeight/21);
  
  //UI-PlayerHealth_outerborder.......******
   fill(80); 
 quad(windowWidth/1.24, windowHeight/21, windowWidth/1.24, windowHeight/64, windowWidth/1.02, windowHeight/64,windowWidth/1.02, windowHeight/21); 
  
  //UI payer health
  
  //game over condition.....*******
  if(player_health==0)
  {
    //canvas(100,100);
    //fill(200);
    //text('GAME OVER', (windowWidth/2)-100,(windowHeight/2)-10);
    game_over=1;
    
  }
  if(player_health>0)
  {
   fill(0); 
 quad(windowWidth/1.05, windowHeight/24, windowWidth/1.05, windowHeight/50, windowWidth/1.03, windowHeight/50,windowWidth/1.03, windowHeight/24); 
  }
  
  if(player_health>1)
  {
   fill(0); 
 quad(windowWidth/1.07, windowHeight/24, windowWidth/1.07, windowHeight/50, windowWidth/1.05, windowHeight/50,windowWidth/1.05, windowHeight/24); 
  }
  if(player_health>2)
  {
   fill(0); 
 quad(windowWidth/1.09, windowHeight/24, windowWidth/1.09, windowHeight/50, windowWidth/1.07, windowHeight/50,windowWidth/1.07, windowHeight/24); 
  }
  ////additional player health bars******
  if(player_health>3)
  {
   fill(0); 
 quad(windowWidth/1.11, windowHeight/24, windowWidth/1.11, windowHeight/50, windowWidth/1.09, windowHeight/50,windowWidth/1.09, windowHeight/24); 
  }
  if(player_health>4)
  {
   fill(0); 
 quad(windowWidth/1.13, windowHeight/24, windowWidth/1.13, windowHeight/50, windowWidth/1.11, windowHeight/50,windowWidth/1.11, windowHeight/24); 
  }
  if(player_health>5)
  {
   fill(0); 
 quad(windowWidth/1.15, windowHeight/24, windowWidth/1.15, windowHeight/50, windowWidth/1.13, windowHeight/50,windowWidth/1.13, windowHeight/24); 
  }
  if(player_health>6)
  {
   fill(0); 
 quad(windowWidth/1.17, windowHeight/24, windowWidth/1.17, windowHeight/50, windowWidth/1.15, windowHeight/50,windowWidth/1.15, windowHeight/24); 
  }
    if(player_health>7)
  {
   fill(0); 
 quad(windowWidth/1.19, windowHeight/24, windowWidth/1.19, windowHeight/50, windowWidth/1.17, windowHeight/50,windowWidth/1.17, windowHeight/24); 
  }
  if(player_health>8)
  {
   fill(0); 
 quad(windowWidth/1.21, windowHeight/24, windowWidth/1.21, windowHeight/50, windowWidth/1.19, windowHeight/50,windowWidth/1.19, windowHeight/24); 
  }
  if(player_health>9)
  {
   fill(0); 
 quad(windowWidth/1.23, windowHeight/24, windowWidth/1.23, windowHeight/50, windowWidth/1.21, windowHeight/50,windowWidth/1.21, windowHeight/24); 
  }

  //enemy die...particle effect
  if(enemy_die_particle==1)
  {
    if(enemy_die_particle_lifespan>0)
    {
     fill(255);
    ellipse(random((width/2)-20,(width/2)+20), random((height/2)-45,(height/2)+40), 5, 5);  
    enemy_die_particle_lifespan=enemy_die_particle_lifespan-1;
    }
  }
  
  fill(0); //body color
 quad(x1enem1, y1enem1, x2enem1, y2enem1, x3enem1, y3enem1, x4enem1, y4enem1); //body
 fill(255); //misc color
  if(movespeed!=0)
  {
 triangle(x1enem1+40, y1enem1+70, x1enem1+40, y1enem1+30, x1enem1+70, y1enem1+70); //left eye
 triangle(x1enem1+100, y1enem1+70, x1enem1+130, y1enem1+30, x1enem1+130, y1enem1+70); //right eye
  
  }
  
 quad(x4enem1+15, y4enem1-50, x4enem1+65, y4enem1-50, x4enem1+60, y4enem1-60, x4enem1+20, y4enem1-60);
  
  //if dead...left eye******
  if(movespeed<1)
  {
     triangle(x1enem1+40, y1enem1+30, x1enem1+40, y1enem1+30, x1enem1+70, y1enem1+70); //left eye
     triangle(x1enem1+100, y1enem1+70, x1enem1+130, y1enem1+30, x1enem1+130, y1enem1+30); //right eye
    
    triangle(x1enem1+70, y1enem1+30, x1enem1+40, y1enem1+70, x1enem1+70, y1enem1+30);   
    triangle(x1enem1+100, y1enem1+30, x1enem1+100, y1enem1+30, x1enem1+130, y1enem1+70);  
  }
  

  //bullet shoot effect
   if (buttondata==1 && enable_shoot==1) 
   {
  push();
     fill(180);
     noStroke();
  star(windowWidth/2,windowHeight-100,100,40,8);
  pop();
  function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  }
   }
  
  //enemy bullets...while enemy is alive*******
  if(movespeed!=0)
  {
  fill(100);
  ellipse(enemy_bullet_x,enemy_bullet_y, 24, 24);
  }
  if(enemy_bullet_y< windowHeight && stop_enemybullet==0)
   {
    //lerp from initial to final position
    enemy_bullet_x = lerp(enemy_bullet_x, windowWidth/2, 0.03);
    enemy_bullet_y = lerp(enemy_bullet_y, windowHeight+180, 0.03);
   }
  
  //player health condition
  if(enable_shoot == 1 && enemy_bullet_y> (windowHeight-8) )
  {
    player_health=player_health-1;
    player_hit=1;
  }
  
  //resetting and reshooting enemy bullet
  if(enemy_bullet_y> (windowHeight-5) && stop_enemybullet==0)
   {
    enemy_bullet_x=x2enem1;
    enemy_bullet_y=windowHeight/2;
   }
  
 ///////condition for checking if c pressed or if bullet is midway*******
  if(enable_shoot==1||(bullet_start_pos<(windowHeight-153)&&bullet_start_pos>((windowHeight/2)-50)))
  {
    
    //after images
    if(pbullet_oldy<windowHeight-163)
    {
      fill(190,80);
      noStroke();
  ellipse(windowWidth/2, bullet_start_pos+30, 80/bullet_reducefactor, 80/bullet_reducefactor+40);
    }
      
  //bullets of gun
  fill(255);
    noStroke();
  ellipse(windowWidth/2, bullet_start_pos, 80/bullet_reducefactor, 80/bullet_reducefactor);
  }
  pbullet_oldx=windowWidth/2;
  pbullet_oldy=bullet_start_pos;
  if(shoot==1)//condition if shoot is pressed
  {
    bullet_start_pos=bullet_start_pos-10;//bullet speed
    bullet_reducefactor=bullet_reducefactor+0.05;
  }
   if(bullet_start_pos < (windowHeight/2)-50)
  {
    //shoot=0;
  //  var reload=0;
    //setInterval(bullet_reset,10000);
    //if(reload=1)
    //{
   bullet_start_pos=windowHeight-153;
    shoot=0;
    
    bullet_reducefactor=1;
    //}
    //reload=0;
  }
  
  //function bullet_reset()
  //{
    //bullet_start_pos=windowHeight-153;
    //reload=1;
   // bullet_reducefactor=1;
  //}
  
  
  //Bullet hit
  if(bullet_start_pos < (windowHeight/2)  && bullet_start_pos > (windowHeight/2)-80)// condition check for hit
  {
    //check if enemy x position is in middle of screen
    if(x1enem1>((windowWidth/2)-150) && x2enem1<((windowWidth/2)+150) )
    {
      //fill(255);
     // ellipse(windowWidth/2, windowHeight/2, 80, 80);
      mover=0;
      movespeed=0;
      stop_enemybullet=1;
      //generate particle effect here: (windowHeight/2)-50...h/2+50..-+5......w/2 +- 5
      enemy_die_particle=1;
      
    }
  }
    
  
  //if fire pressed
  if (buttondata==1 && enable_shoot==1) 
  {
    shoot=1;
  }

  if (inData == 1)
  {
   enable_shoot = 1;
  }
  else
  {
   enable_shoot = -1;
  }

 if(game_over==1)
   {
  fill(10,10,10); //body color
 quad(0,0, windowWidth, 0, windowWidth, windowHeight, 0, windowHeight); //body
  
    fill(255,0,0);
    text('GAME OVER', (windowWidth/2)-100,(windowHeight/2)-10);
     enable_shoot=0;
     stop_enemybullet=1;
   }
  

  //gunhand
  //fill(255);
  //quad(((windowWidth/2)-40),windowHeight-100,((windowWidth/2)+40),windowHeight-80,((windowWidth/2)+40),windowHeight,((windowWidth/2)-40),windowHeight);
  //stroke(0);
  //line(((windowWidth/2)-40), windowHeight-80, ((windowWidth/2)+40), windowHeight-60);
  
 if(enable_shoot==1)
  {
  //gun
  fill(255);
  quad(((windowWidth/2)-40),windowHeight-100,((windowWidth/2)+40),windowHeight-80,((windowWidth/2)+40),windowHeight,((windowWidth/2)-40),windowHeight);
  stroke(0);
  line(((windowWidth/2)-40), windowHeight-80, ((windowWidth/2)+40), windowHeight-60);
  }
  
  //show player is hit ********
  if(player_hit==1)
  {
    
    //fill(255,0,0,player_hit_color);
    fill(255,0,0,30);
     noStroke();
      quad(0,0, windowWidth,0, windowWidth, windowHeight, 0, windowHeight);
    
    player_hit_color=player_hit_color+10;
    player_hit=0;
  }
  
  

function windowResized() {
    // change canvas size
    createCanvas(windowWidth, windowHeight);    
}

 

}

function windowResized() {
    // change canvas size
    createCanvas(windowWidth, windowHeight);    
}

function serverConnected() {
  //console.print('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}
 
/*function serialEvent() {
 inData = serial.readStringUntil('\r\n');
 console.log(inData);
 checkval = 1;
}*/
function serialEvent()   //this function is called every time data is received
{
  
var rawData = serial.readStringUntil('\r\n'); //read the incoming string until it sees a newline
    console.log(rawData);                   //uncomment this line to see the incoming string in the console     
    if(rawData.length>1)                      //check that there is something in the string
    {                                         
      
      inData = JSON.parse(rawData).s1;       //the parameter value .s1 must match the parameter name created within the arduino file
      buttondata = JSON.parse(rawData).s2; 
    }
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}

function windowResized() {
    // change canvas size
    createCanvas(windowWidth, windowHeight);    
}
