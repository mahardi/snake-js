let snake;
let res = 20;
let w;
let h;
let isPaused = false;
let isStarted = false;
let isGameOver = false;
let x = 0;
let y = 0;
let dir;

function setup() {
    createCanvas(400,400);
    snake = new Snake();
    event = new GameEvent();

    w = floor(width/res);
    h = floor(height/res);
    frameRate(5);

    foodLocation();
}

function draw() {
    scale(res);
    background(220);
    
    snake.update(isPaused, isGameOver);
    snake.show();
    
    checkIsGameOver();
    checkFood();
    foodDraw();

    if(isPaused){
        snake.doNothing();
    }

}

function gameIsOver(){

}

function foodLocation(){
    let x = floor(random(w));
    let y = floor(random(h));
    let isBodyPresent;

    isBodyPresent = snake.checkBody(x, y);
    console.log(isBodyPresent);

    if(x == 0 || y == 0 || x > w-2 ||  y > h-2 ){
        foodLocation();
    }else if(isBodyPresent){
        foodLocation();
    }else{
        food = createVector(x, y);
    }
}

function foodDraw(){
    fill (255, 0, 0);
    rect(food.x, food.y, 1, 1);
}

function checkIsStarted(){
    isStarted = true;
}

function checkFood(){
    if(snake.eat(food)){
        foodLocation();
    }
}

function checkIsGameOver(){
    if (snake.gameOver()){
        isGameOver = true;
        event.gameIsOver();
    }
}

function checkIsPaused(){
    if(!snake.pause(isPaused)){
        snake.setDir(0, 0);
        document.getElementById("status").innerHTML= "PAUSED";
        isPaused = true;
    }else if(snake.pause(isPaused)){
        snake.setDir(x, y);
        document.getElementById("status").innerHTML= "</br>";
        isPaused = false;
    }
}

function keyPressed(){
    if(!snake.gameOver()){
        if(key == " " && isStarted){
             checkIsPaused();
        }else if(!isPaused){
            if(keyCode === DOWN_ARROW){
                if(dir == "up"){
                    snake.doNothing();
                }else{
                    dir = "down";
                    setSnakeDirection(dir);
                    checkIsStarted();
                }
            }else if(keyCode === UP_ARROW){
                if(dir == "down"){
                    snake.doNothing();
                }else{
                    dir = "up";
                    setSnakeDirection(dir);
                    checkIsStarted();
                }
            }else if(keyCode === RIGHT_ARROW){
                if(dir == "left"){
                    snake.doNothing();
                }else{
                    dir = "right";
                    setSnakeDirection(dir);
                    checkIsStarted();
                }
            }else if(keyCode === LEFT_ARROW){
                if (dir == "right"){
                    snake.doNothing();
                }else{
                    dir = "left";
                    setSnakeDirection(dir);
                    checkIsStarted();
                }
            }
        }
    }
}

function setSnakeDirection(dir){
    switch(dir){
        case "down":
            x = 0;
            y = 1;
            break;
        case "up":
            x = 0;
            y = -1;
            break;
        case "right":
            x = 1;
            y = 0;
            break;
        case "left":
            x = -1;
            y = 0;
            break;
    }
    console.log(dir);
    snake.setDir(x, y);
    
}






