let snake;
let game;
let res = 10;
let x = 0;
let y = 0;
let speed = 7;
let w;
let h;
let isPaused = false;
let isStarted = false;
let isGameOver = false;
let isLevelUp = false;
let dir;
let canvas;

function setup() {
    canvas = createCanvas(400,400);
    canvas.parent("canvas");
    w = floor(width/res);
    h = floor(height/res);

    snake = new Snake();
    game = new GameEvent();

    foodLocation();
}

function draw() {
    scale(res);
    background(220);
    frameRate(speed);

    snake.update(isPaused, isGameOver);
    snake.show();
    
    checkIsGameOver();
    checkFood();
    foodDraw();
}


function foodLocation(){
    let x = floor(random(w));
    let y = floor(random(h));
    let isBodyPresent;

    isBodyPresent = snake.checkBody(x, y);
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
    if(game.isStarting()){
        isStarted = true;
    }
}

function checkFood(){
    if(snake.eat(food)){
        foodLocation();
    }
}

function checkIsGameOver(){
    if (snake.gameOver()){
        game.isOver();
        isGameOver = true;
    }
}

function checkIsPaused(){
    if(!snake.pause(isPaused)){
        game.isPausing();
        isPaused = true;
    }else if(snake.pause(isPaused)){
        game.isUnpausing(x, y);
        isPaused = false;
    }
}

function keyPressed(){
    if(!snake.gameOver()){
        if(key == " " && isStarted){
             checkIsPaused();
        }else if(!isPaused){
            switch(keyCode){
                case DOWN_ARROW:
                    if(dir == "up"){
                        snake.doNothing();
                    }else{
                        dir = "down";
                        setSnakeDirection(dir);
                        checkIsStarted();
                    }
                    break;
                case UP_ARROW:
                    if(dir == "down"){
                        snake.doNothing();
                    }else{
                        dir = "up";
                        setSnakeDirection(dir);
                        checkIsStarted();
                    }
                    break;
                case RIGHT_ARROW:
                    if(dir == "left"){
                        snake.doNothing();
                    }else{
                        dir = "right";
                        setSnakeDirection(dir);
                        checkIsStarted();
                    }
                    break;
                case LEFT_ARROW:
                    if (dir == "right"){
                        snake.doNothing();
                    }else{
                        dir = "left";
                        setSnakeDirection(dir);
                        checkIsStarted();
                    }
                    break;
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
    snake.setDir(x, y);
    
}






