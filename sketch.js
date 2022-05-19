const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,rope2,rope3,fruit,ground;
var fruit_con,fruit_con2;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var bgSound,cutSound,sadSound,eatingSound,airSound;
var ballon;
var muteBtn;
var canW,canH;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  bgSound = loadSound("sound1.mp3");
  cutSound = loadSound("rope_cut.mp3");
  sadSound = loadSound("sad.wav");
  eatingSound = loadSound("eating_sound.mp3");
  airSound = loadSound("air.wav");
  
  blink.playing = true;
  eat.playing = true;
  eat.looping = false;
  sad.playing = true;
  sad.looping = false;
}

function setup() {
  var isMobile = /iPhone|iPad|android/i.test(navigator.userAgent);
  if(isMobile){
   canW = displayWidth;
   canH = displayHeight;
   createCanvas(displayWidth+80,displayHeight);
  } else{
   canW = windowWidth;
   canH = windowHeight;
   createCanvas(windowWidth,windowHeight);
  }
  createCanvas(500,700);
  frameRate(80);
  bgSound.play();
  bgSound.setVolume(0.5);
  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg("cut_btn.png");
  button2.position(330,35);
  button2.size(50,50);
  button2.mouseClicked(drop2);

 
  ballon = createImg("ballon.png");
  ballon.position(10,250);
  ballon.size(150,100);
  ballon.mouseClicked(airBlow);

  muteBtn = createImg("mute.png");
  muteBtn.position(450,20);
  muteBtn.size(50,50);
  muteBtn.mouseClicked(mute);


  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;
  
  bunny = createSprite(260,canH-80,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;

  bunny.addAnimation("blinking",blink);
  bunny.addAnimation("eating",eat);
  bunny.addAnimation("crying",sad);
  bunny.changeAnimation("blinking");
  
  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  
  ground = new Ground(200,canH,600,20);
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight+600);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  rope.show();
  rope2.show();
  
  Engine.update(engine);
  ground.show();
  if(collide(fruit,bunny)==true){
    bunny.changeAnimation("eating");
    eatingSound.play();
  }
  if(collide(fruit,ground.body)==true){
    bunny.changeAnimation("crying");
    sadSound.play();
  }
   drawSprites();
}

function drop()
{
  cutSound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2(){
  cutSound.play();
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
 }
 
 


function collide(body,sprite){
  if(body!=null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=80){
      World.remove(engine.world,fruit);
      fruit = null;
      return true;
      
    }else{
      return  false;
    }
  }
}




function airBlow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  airSound.play();
}
function mute(){
  if (bgSound.isPlaying()) {
    bgSound.stop();
  } else {
    bgSound.play();
  }
}