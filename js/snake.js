class Snake{

    constructor(){
        this.body = [];
        this.body[0] = createVector(floor(w/2), floor(h/2));
        this.xdir = 0;
        this.ydir = 0;
        this.len = 0;
        this.tempLen = 0;
    }

    update(isPaused, isGameOver){
        let head = this.body[this.body.length-1].copy();
        if(!isPaused && !isGameOver){
            this.body.shift();
            head.x += this.xdir;
            head.y += this.ydir;
            this.body.push(head);
        }
        console.log("updating");
    }

    move(){
        if(this.xdir != 0 || this.ydir != 0){
            return true;
        }
    }

    show(){
        for (let i = 0; i < this.body.length; i++){
            fill(0);
            noStroke();
            rect(this.body[i].x, this.body[i].y, 1, 1);
        }
    }

    checkBody(x,y){
        for (let i = 0; i < this.body.length; i++){
            if(x == this.body[i].x || y == this.body[i].y){
                return true;
            }else{
                return false;
            }
        }
    }

    grow(){
        this.len++;
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
        let x = this.body[this.body.length-1].x;
        let y = this.body[this.body.length-1].y;
        if(x < 0 || x > w-1 || y < 0 || y > h-1){
            return true;
        }
        for (let i = 0; i < this.body.length-1; i++){
            let part = this.body[i];
            if(x == part.x && y == part.y){
                return true;
            }
        }
        return false;
    }

    getLength(){
        this.tempLen = this.len;
        return this.tempLen;
    }

    eat(pos){
        let x = this.body[this.body.length-1].x;
        let y = this.body[this.body.length-1].y;
        if(x == pos.x && y == pos.y){
            this.grow();
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