class GameEvent{
    constructor(){
        this.showElement;
    }

    isOver(){
        //Stop Snake movement
        snake.setDir(0,0);
        if(detectmob()){
            document.getElementById("left-header-top").innerHTML= "<b>Too bad :'(</b></br>Refresh browser</br>to restart.";
        }else{
            //Show Stats
            this.showElement = document.getElementsByClassName("header");
            for(let i = 0; i< this.showElement.length;i++){
                this.showElement[i].style.display = "block";
            }
            //Print game over text and total score on Stats
            document.getElementById("left-header-top").innerHTML= "<b>Too bad :'(</b></br>Refresh browser</br>to restart.";
            document.getElementById("score").innerHTML= "Your score is "+snake.len;
        }
    }

    isPausing(){
        //Stop Snake movement
        snake.setDir(0,0);     
        if(detectmob()){

        }else{
            //Show Stats 
            this.showElement = document.getElementsByClassName("header");
            for(let i = 0; i< this.showElement.length;i++){
                this.showElement[i].style.display = "block";
            }
            //Print paused menu text on Stats
            document.getElementById("lef-header-top").innerHTML= "The game is</br>paused,</br>take your time</br>:D";
        }
    }

    isUnpausing(x,y){
        //Set Snake direction with previous direction before game paused
        snake.setDir(x,y);

        //Hide Stats
        this.showElement = document.getElementsByClassName("header");
        for(let i = 0; i< this.showElement.length;i++){
            this.showElement[i].style.display = "none";
        }
    }

    isStarting(){
        if(snake.move()){
            return true;
        }else{
            return false;
        }
    }
}