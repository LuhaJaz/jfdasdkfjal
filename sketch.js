var database, food, foodStock, dog, dog1, dog2
var fedTime, lastFed
var gameState
function preload()
{
  dog1 = loadImage ("images/dogImg.png")
  dog2 = loadImage ("images/dogImg1.png")
  bg = loadImage ("Kitchen.gif")
  lazyimg = loadImage("virtual pet images/Lazy.png")
  bedroomimg = loadImage("virtual pet images/Bed Room.png")
  washroomimg = loadImage("virtual pet images/Wash Room.png")
  livingroomimg = loadImage("virtual pet images/Living Room.png")
}

function setup() {
	createCanvas(1300,800);
  database = firebase.database()
  dog = createSprite(850,550,150,150)
  dog.addImage(dog1)
  dog.scale = 0.5
  feed = createButton("Feed the Dog!")
  feed.position(850,95)
  feed.mousePressed(feedDog)
  //add = createButton("Add Food!")
  //add.position(1000,95)
  //add.mousePressed(addFood)
  foodObj = new Food()
  foodStock = database.ref("Food")
  foodStock.on("value", readStock)
  readState=database.ref('gameState');
   readState.on("value",function(data){
      gameState=data.val();
     });
  fedTime = database.ref("FeedTime")
  fedTime.on("value", function(data){
    lastFed = data.val()
  }
  )
}


function draw() {  
background(bg)
foodObj.display();
currentTime=hour();
 if(currentTime==(lastFed+1)){
    update("Playing"); 
    foodObj.livingroom(); 
  }else if(currentTime==(lastFed+2)){ 
    update("Sleeping");
     foodObj.bedroom(); 
    }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){ 
      update("Bathing");
       foodObj.washroom();
    }else if(currentTime>(lastFed+3) && currentTime<=(lastFed+2)){
      update("lazy");
      foodObj.lazy();
 }else{ update("Hungry") 
 foodObj.display();
 } 
 if(gameState!="Hungry"){ 
   feed.hide(); 
   addFood.hide(); 
   dog.remove();
   }else{ 
     feed.show();
      //addFood.show(); 
      dog.addImage(dog2); 
    }
  drawSprites();
  //add styles here

}



    function addFood(){
      foodS++
      database.ref('/').update({
      Food:foodS
      })
    }
    
    function feedDog(){
    
        dog.addImage(dog2);
        foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    
        database.ref('/').update({
        Food:foodObj.getFoodStock(),
        FeedTime:hour(),
        gameState : "Hungry"
      });
    }
    function showError(){
      console.log("Error in writing to the database");
    }
    function readStock(data){ 
      foodS=data.val(); 
      foodObj.updateFoodStock(foodS);
     }
     function update(state){
       database.ref('/').update({
         gameState: state
       

       }
       )
     }