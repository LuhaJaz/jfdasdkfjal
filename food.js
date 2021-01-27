class Food {
    constructor(){
    this.image=loadImage('milk.png');
    this.foodStock=0;
    }
  
   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }
  
   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }
  getFeedTime(lastFed){
this.lastFed = lastFed

  }
    getFoodStock(){
      return this.foodStock;
    }
  
    display(){
      fill(255,255,254);
       textSize(15);
        if(lastFed>=12){
           text("Last Feed : "+ lastFed%12 + " PM", 50,30);
           }else if(lastFed==0){
              text("Last Feed : 12 AM",50,30); 
            }else{ text("Last Feed : "+ lastFed + " AM", 50,30); 
          }

      var x=80,y=100;
      
      imageMode(CENTER);
   
      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=80;
            y=y+50;
          }
          image(this.image,x,y,100,100);
          x=x+30;
        }
      }
    }
    bedroom(){
      background(bedroomimg,550,500)
    }
    washroom(){
      background(washroomimg,550,500)
    }
livingroom(){
  background(livingroomimg,550,500)
}
lazy(){
  background(lazyimg,550,500)
}
  }