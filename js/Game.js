class Game {
  constructor(){

  }
  getstate() {
    var gameStateRef = database.ref('gameState')
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })
  }
  update(state) {
    database.ref('/').update({
      gameState: state
    })

  }
  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value")
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getcount();

      }

      form = new Form();
      form.display();

    }
    car1=createSprite(200,200)
    car1.addImage(car1Img);
    car2=createSprite(200+175,200)
    car2.addImage(car2Img);
    car3=createSprite(200+175+175,200)
    car3.addImage(car3Img);    
    car4=createSprite(200+175+175+175,200)
    car4.addImage(car4Img);
    cars=[car1,car2,car3,car4];

  }

  play() {
    form.hide();
      textSize(30);
    text("Game Start", 120, 100);
    background(ground);
    Player.getPlayerInfo();

    if (allPlayers !== undefined) {

      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      var index=0;
      var x=90;
      var y=0;

      for (var p in allPlayers) {
         index=index+1;
         x=0+(index*200)+allPlayers[p].xPos;
         y=displayHeight-allPlayers[p].distance;
            console.log(cars)
         cars[index-1].x=x;
         cars[index-1].y=y;

         textAlign(CENTER)
         textSize(20);
         fill("white");
         text(allPlayers[p].name,cars[index-1].x, cars[index-1].y+75)
         if(index===player.index){
          // fill("red")
          cars[index-1].shapeColor="red"
          camera.position.x=displayWidth/2
          camera.position.y=cars[index-1].y
         }
     
          else{      
            fill("white")
          }
    
      

    }
  }
    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 50;
      yVel+=0.9;
      player.update();

    }
    // if (keyIsDown(38) && player.index !== null) {
      // yVel+=0.9;

      if(keyIsDown(37)){
        xVel-=0.2;
      }

      if(keyIsDown(39)){
        xVel+=0.2;
      }
    

    // }
    player.distance+=yVel;
    yVel*=0.98;
     
    player.xPos+=xVel  
    xVel*=0.985;
    player.update();  

    if(player.distance>displayHeight*5){
      gameState=2
    }
    if(gameState===2){
      game.end();
    }
    drawSprites();

  }//End Of Play() 

  end(){
    console.log("Game Ended")
  }


}