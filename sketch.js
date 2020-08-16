var trex,treximage,ground,iground,gimage,play = 1,end = 0,gamestate = play,cloud,cloudimage,score = 0;
var cloudgroup,obstaclegroup;
var cactus,img1,img2,img3,img4,img5,img6;
var rand;


function preload(){
treximage = loadAnimation("trex1.png","trex3.png","trex4.png");
  gimage= loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  img1 = loadImage("obstacle1.png");
  img2 = loadImage("obstacle2.png");
  img3 = loadImage("obstacle3.png");
  img4 = loadImage("obstacle4.png");
  img5 = loadImage("obstacle5.png");
  img6 = loadImage("obstacle6.png");
}



function setup() {
  createCanvas(600,200);
  trex = createSprite(50,160,20,20);
  trex.addAnimation("running",treximage);
  trex.scale = 0.5;
  ground = createSprite(60,170,600,7);
  ground.addImage("ground",gimage);
  iground = createSprite(60,175,600,7);
  iground.visible = false;
  ground.x = ground.width/2;
  
  cloudgroup = new Group();
  obstaclegroup = new Group();

  
  
  
}

function draw() {
  background("white");
  text("Score - " + score,520,40);
  if(gamestate === play){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(5+score/100);
    
    spawnclouds();
    spawncacti();
    if(keyDown("space")&&trex.y>=140){
      trex.velocityY = -10;
      
    }
    trex.velocityY = trex.velocityY + 0.6   ;
    ground.velocityX = -5; 
    if(ground.x<0){
      ground.x = ground.width/2
    } 
    
    if(obstaclegroup.isTouching(trex)){
      gamestate = end;
    }
    
  }
  else if(gamestate === end){
    ground.velocityX = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);  
  }
  trex.collide(iground);
  
  
  
  drawSprites();
}


function spawnclouds(){
if(frameCount%50===0){
  cloud = createSprite (615,Math.round(random(50,100)),5,5);
  cloud.scale = 0.7
  cloud.velocityX = -4;
  cloud.addImage(cloudimage);
  cloudgroup.add(cloud);
  cloud.depth = trex.depth;
  cloudgroup.setLifetimeEach(-1);
} 
}
function spawncacti(){
  if(frameCount%50===0){
    cactus = createSprite(620,160);
    cactus.velocityX = -(5+score/100);
    
    cactus.scale = 0.4;
    obstaclegroup.add(cactus);
    rand = Math.round(random(1,6));
    switch(rand){
      case 1:cactus.addImage(img1);  
      break;
      case 2 : cactus.addImage(img2);  
      break;
      case 3:cactus.addImage(img3);  
      break;
      case 4:cactus.addImage(img4);  
      break;
      case 5:cactus.addImage(img5);  
      break;
      case 6:cactus.addImage(img6);  
      break;
      default:break  
    } 
    obstaclegroup.setLifetimeEach(-1);
    
  }
}






