let snake;
let game;
let res = 20;
let x = 0;
let y = 0;
let speed = 7;
let w;
let h;
let isPaused = false;
let isStarted = false;
let isGameOver = false;
let dir;
let canvas;
let dim;


function setup() {
    // Set the background canvas
    dim = 400;
    canvas = createCanvas(dim, dim);
    canvas.parent("canvas");

    //Set initial canvas dimension
    w = floor(width/res);
    h = floor(height/res);

    snake = new Snake();
    game = new GameEvent();

    //Draw first food
    foodLocation();
}

function draw() {
    //Draw the Snake elements and set the Snake's speed
    scale(res);
    background(220);
    frameRate(speed);

    //Update and draw the Snake elements
    snake.update(isPaused, isGameOver);
    snake.show();
    
    //Check if game is over or not
    checkIsGameOver();

    //Check if food is still exist in canvas and draw food
    checkFood();
    foodDraw();

    console.log(isPaused, isGameOver);
}


function foodLocation(){
    //Randomize food coordinate (x,y)
    let x = floor(random(w));
    let y = floor(random(h));

    //Check if food location overriding Snake's body
    let isBodyPresent = snake.checkBody(x, y);

    //Create food vector if (x, y) in canvas range and not
    //overridning Snake's body
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
    if(!snake.gameOver()){                      //Check if game is over or not and
        if(key == " " && isStarted){            //if game is paused or not when
             checkIsPaused();                   //function keyPressed() executed
        }else if(!isPaused){
            switch(keyCode){
                case DOWN_ARROW:
                    if(dir == "up"){            //Check if current direction
                        snake.doNothing();      //is opposite with previous direction
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
    //Set Snake direction
    snake.setDir(x, y);
}






