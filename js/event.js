class GameEvent{
    constructor(){
        this.showElement;
    }

    isOver(){
        snake.setDir(0,0);
        this.showElement = document.getElementsByClassName("stat");
        for(let i = 0; i< showElement.length;i++){
            showElement[i].style.display = "block";
        }
        document.getElementById("status").innerHTML= "<b>Too bad :'(</b></br>Refresh browser</br>to restart.";
        document.getElementById("score").innerHTML= "Your score is "+snake.len;
    }

    isPausing(){
        snake.setDir(0,0);
        this.showElement = document.getElementsByClassName("stat");
        for(let i = 0; i< showElement.length;i++){
            showElement[i].style.display = "block";
        }
        document.getElementById("status").innerHTML= "The game is</br>paused,</br>take your time</br>:D";
    }

    isUnpausing(x,y){
        snake.setDir(x,y);
        this.showElement = document.getElementsByClassName("stat");
        for(let i = 0; i< showElement.length;i++){
            showElement[i].style.display = "none";
        }
        document.getElementById("status").innerHTML= "</br>";
    }

    isStarting(){
        if(snake.move()){
            return true
        }else{
            return false
        }
    }

}