//Create variables here
var happyDog, dog, database, foodref, ball, food, feed, add, dinner, hour, n, minute, back;
let b = [];
let gameState, white, park, room, wash;

function preload() {
  happy = loadImage("images/dogImg.png");
  normal = loadImage("images/dogImg1.png");
  white = loadImage("images/preview.png");
  park = loadImage("images/Garden.png");
  room = loadImage("images/Bed Room.png");
  wash = loadImage("images/Wash Room.png");
}



function setup() {
  database = firebase.database();
  createCanvas(480, 700);
  
 // hour = 0;
  time = 0;
  ball = new Ball();
  n = new Ball();
  m = new Ball();
  gameState = "not hungry";
  feed = createButton("Feed");
  add = createButton("Add Food");
  for (let i = 1; i <= ball.x; i++) {
    var x = 10 + i * 30;
    b[i] = new Milk(x);
  }
  dog = createSprite(410, 250, 10, 10);
  dog.addImage("n", normal);
  dog.scale = 0.15
  dog.addImage("h", happy);
  foodref = database.ref("food");
  foodref.on('value', readPosition);
  back = createSprite(width / 2 , height / 2, width, height);
  back.addImage("no", white);
  back.addImage("garden", park);
  back.addImage("bed", room);
  back.addImage("bath", wash);
}

function draw() {
  background(46, 139, 87);
  getTime();
  n.display();
  m.display();
  ball.display();
  console.log(hour-n.x,gameState);   
  //if (gameState ==="not hungry") {
    if (food !== undefined && gameState==="not hungry") {
      drawSprites();
      back.changeImage("no",white);
      feed.mousePressed(function () {
        if(gameState==="not hungry"){
        ball.move();
        dog.changeImage("h", happy);
        n.x = hour;
        m.x = minute;
        }
      })
      add.mousePressed(function () {
        if(gameState==="not hungry"){
        ball.x = ball.x + 1;
        dog.changeImage("n", normal);
        }
      })
      if (ball.x > 10) {
        ball.x = 10;
      }
      for (let i = 1; i <= ball.x; i++) {
        b[i].display();
      }
      
      
     
      writePosition();
      if (ball.x < 0) {
        ball.x = 0;
      }
      feed.position(170, 10);
      add.position(230, 10);
    }
 // }
  if (food !== undefined) {
    drawSprites();
    textSize(20);
    fill("white");
    text("Food Remaining:" + ball.x, 180, 100);
    text("Last Fed:" + n.x + ":" + m.x, 20, 20);
    if (hour - n.x >= 3 && hour - n.x < 4) {
      gameState = "washroom";
     
    }
    if (hour - n.x < 2 && hour - n.x >= 1 ) {
      gameState = "garden";
  
    }
    if (hour - n.x >= 2 && hour-n.x<3) {
      gameState = "bedroom";
     
    }
    
    if (hour - n.x >=4 ) {
      gameState = "not hungry";
     
    }
    if(hour - n.x < 1) {
      gameState = "not hungry";
      
      }
      if(gameState === "washroom"){
        back.changeImage("bath", wash);
        add.position(width+100000000,20);
      feed.position(width+1000000000000,20);
      }
      if(gameState === "garden"){
        back.changeImage("garden", park);
        add.position(width+10000000,20);
      feed.position(width+10000000,20);
        }
        if(gameState==="bedroom"){
          back.changeImage("bed", room);
          add.position(width+10000000000,20);
      feed.position(width+100000000,20);
        }
        
        if (hour - n.x >=4) {
          textSize(30);
          text("Hungry!Give Food !!!!!", 180, 170);
        }
  }
  
}

function writePosition() {
  database.ref('food').set({
    milk: ball.x,
    time: n.x,
    min: m.x
  })
}

function readPosition(data) {
  food = data.val();
  ball.x = food.milk;
  n.x = food.time;
  m.x = food.min;
}
async function getTime() {
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var datetime = responseJSON.datetime;
  hour = datetime.slice(11, 13);
  minute = datetime.slice(14, 16);
}