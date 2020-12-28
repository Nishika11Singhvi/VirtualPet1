var dog, happyDog, dogImg;
var food1, foodStock, foodImg, foodS;
var text1, textImg, text2Img;
var database;

function preload()
{
  dogImg = loadImage("dogImg.png");
  dogHappy = loadImage("dogImg1.png");
  foodImg = loadImage("dogFood.png");
  textImg = loadImage("Picture1.png");
  text2Img = loadImage("text2.png");
}

function setup() 
{
  createCanvas(500, 500);
  
  database = firebase.database();
  
  dog = createSprite(250,250,40,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodS = createSprite(-100,300,20,20);
  food1 = 20;

  text1 = createSprite(140,150,20,20);
  text1.addImage(textImg);
  text1.scale = 0.5;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw() 
{  
  background(0, 176, 240);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(food1);
    dog.addImage(dogHappy);

    foodS.addImage(foodImg);
    foodS.x = 180;
    foodS.scale = 0.1;

    if(food1 <= 0)
    {
      food1 = 0;
    }
    else
    {
      food1 = food1-1;
    }

    if(food1 == 0)
    {
      text1.x = 140;
      text1.addImage(text2Img);
      foodS.x = -100;
    }

    text1.x = -100;
  }

  if(keyWentDown(DOWN_ARROW))
  {
    dog.addImage(dogImg);

    foodS.x = -100;
    text1.x = 140;

    if(food1 == 0)
    {
      text1.addImage(text2Img);
      foodS.x = -100;
    }
  }
  
  drawSprites();

  textSize(17);
  fill(255);
  textFont("bembo");
  text("Food remaining: "+food1,190,400);
  text("Press the up arrow key",300,110);
  text("To feed Bingo",327,130);
  text("Press the down arrow key",290,150);
  text("To stop feeding Bingo",305,170);
}

function readStock(data)
{
  food1 = data.val();
}

function writeStock(x)
{
  x = 20;

  if(x <= 0)
  {
    x = 0;
  }
  else
  {
    x = x-1;
  }
  
  database.ref('/').update({Food : x});
}



