
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,backgroundImage;
var FoodGroup, obstaclesGroup;
var score
var survivalTime = 0
var gameState = "play";
function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("background.png");
 
}



function setup() {
  
  
  bg = createSprite(0,0,800,400);
  bg.addImage(backgroundImage);
  bg.x = bg.width/2;
  bg.scale = 1.3;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  console.log(ground.x)

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1


  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  survivalTime = 0
}
function draw() {
 background(255);
  createCanvas(800,400);
  if(gameState == "play"){
    survivalTime = Math.ceil(frameCount/frameRate())
    if(ground.x<0) {
      ground.x = ground.width/2
   }
   if(bg.x<0){
     bg.x = bg.width/2;
   }
    
    if(keyDown("space")) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    spawnBanana();
    spawnObstacles();
    if(monkey.isTouching(obstaclesGroup)){
      gameState = "end";
     
    }
  
    
  }
 stroke("black")
  textSize(20);
  fill("black");
  
  text("Survival Time: "+ survivalTime, 100,50);   
  
  monkey.collide(ground);
  
 
  camera.position.x = monkey.x;
   if(gameState === "end"){
    monkey.velocityX = 0;
    ground.velocityX = 0;
    
    
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    textSize(30);
    text("GAME OVER",100,200);
   }
   

   
    

  drawSprites();
  
  


}
function spawnBanana() {
  if(frameCount % 80 === 0){
    var banana = createSprite(80,315,10,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX = -4
    banana.lifetime = 100
    banana.scale = 0.1
    FoodGroup.add(banana);

 }
}
function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(300,300,10,40)
    obstacle.y = Math.round(random(325,325));
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4
    obstacle.scale = 0.1
    obstaclesGroup.add(obstacle);
  }
}





