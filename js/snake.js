class Snake{

    constructor(){
        //Initialize Snake body, location, xy direction and length 
        this.body = [];
        this.body[0] = createVector(floor(w/2), floor(h/2));
        this.xdir = 0;
        this.ydir = 0;
        this.len = 0;
    }

    update(isPaused, isGameOver){
        //Update the snake body location
        let head = this.body[this.body.length-1].copy();
        if(!isPaused && !isGameOver){  
            this.body.shift();          //Move the Snake body according to xy direction
            head.x += this.xdir;        //if game neither paused or game over
            head.y += this.ydir;
            this.body.push(head);
        }
    }

    move(){
        //Check if Snake is move from initial position
        if(this.xdir != 0 || this.ydir != 0){
            return true;
        }
    }

    show(){
        //Draw Snake body
        for (let i = 0; i < this.body.length; i++){
            fill(0);
            noStroke();
            rect(this.body[i].x, this.body[i].y, 1, 1);
        }
    }

    checkBody(x,y){
        //Check if the coordinate overlapping Snake body
        for (let i = 0; i < this.body.length; i++){
            if(x == this.body[i].x || y == this.body[i].y){
                return true;
            }else{
                return false;
            }
        }
    }


    checkHead(){
        let head = this.body[this.body.length-1].copy();
        if(head.x == (this.body[this.body.length-1].x+this.xdir)
            || head.y == (this.body[this.body.length-1].y+this.ydir)){
                return true;
            }else{
                return false;
            }
    }

    grow(){
        //Add length every time Snake grows
        this.len++;

        //Add one block of body every time Snake grows
        let head = this.body[this.body.length-1].copy();
        this.body.push(head);
    }

    pause(isPaused){
        if(!isPaused){
            return false;
        }
        return true;
    }

    gameOver(){
        //Get current Snake head coordinate
        let x = this.body[this.body.length-1].x;
        let y = this.body[this.body.length-1].y;
        if(x < 0 || x > w-1 || y < 0 || y > h-1){   
            return true;    //Check if Snake head coordinate is out of canvas boundary
        }
        for (let i = 0; i < this.body.length-1; i++){
            let part = this.body[i];            //Check if Snake head overlapping the body
            if(x == part.x && y == part.y){
                return true;
            }
        }
        return false;
    }

    eat(pos){
        //Get current Snake head coordinate
        let x = this.body[this.body.length-1].x;
        let y = this.body[this.body.length-1].y;
        if(x == pos.x && y == pos.y){
            this.grow();        //Check if Snake head overlapping food
            return true;
        }
        return false;
    }

    doNothing(){
        //Do nothing
    }

    endGame(){
        return;
    }

    setDir(x,y){
        this.xdir = x;
        this.ydir = y;
    }
}