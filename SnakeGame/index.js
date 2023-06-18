const gameBoard = document.querySelector('#gameBoard');
const ctx=gameBoard.getContext("2d");
const scoreText=document.querySelector('#scoreText');
const highscoreText=document.querySelector('#highscoreText');
const resetBtn=document.querySelector('#resetBtn');
const startBtn=document.querySelector('#startBtn');




class Snake{
    
    constructor(color,border,xVelocity,yVelocity,body){
        this.color=color;
        this.border=border;
        this.xVelocity=xVelocity;
        this.yVelocity=yVelocity;
        this.body=body;
        
    }

    move() {
            const head={x:snake.body[0].x +snake.xVelocity,
                    y:snake.body[0].y+snake.yVelocity};
                        
            snake.body.unshift(head);
            //if food is eaten
            if(snake.body[0].x== food.foodX&&snake.body[0].y== food.foodY){
                            game.score++;
                            scoreText.textContent=game.score;
                            if(game.score>game.highscore){
                                highscoreText.textContent=game.score;
                                game.highscore=game.score;
                            }
                            food.createFood();
             }else{
                        snake.body.pop();
             }
    }
    draw(){
            ctx.fillStyle=snake.color;
            ctx.strokeStyle=snake.border;
            snake.body.forEach(snakePart=>{
                ctx.fillRect(snakePart.x,snakePart.y,game.unitSize,game.unitSize);
                ctx.strokeRect(snakePart.x,snakePart.y,game.unitSize,game.unitSize);
            })
    };
    changeDirection(event){
                const keyPressed=event.keyCode;
                const LEFT=37;
                const RIGHT=39;
                const UP=38;
                const DOWN=40;
            
                const goingUp=(snake.yVelocity==-game.unitSize);
                const goingDown=(snake.yVelocity==game.unitSize);
                const goingRight=(snake.xVelocity==game.unitSize);
                const goingLeft=(snake.xVelocity==-game.unitSize);
                
                switch(true){
                    case(keyPressed==LEFT && !goingRight): //you cant go left and then right you lose you can only move up or down or continiue going to the left
                    snake.xVelocity=-game.unitSize;
                    snake.yVelocity=0;
                        break;
                    case(keyPressed==UP && !goingDown):
                     snake.xVelocity=0;
                     snake.yVelocity=-game.unitSize;
                        break;
                    case(keyPressed==RIGHT && !goingLeft):
                    snake. xVelocity=game.unitSize;
                    snake.yVelocity=0;
                        break;
                    case(keyPressed==DOWN && !goingUp):
                    snake. xVelocity=0;
                    snake.yVelocity=game.unitSize;
                        break;
                }
    };
}


class Game{
    constructor(unitSize,running,score,highscore){
        this.unitSize=unitSize;
        this.running=running;
        this.score=score;
        this.highscore=highscore;
    }

    start(){

        game.running=true;
        scoreText.textContent=game.score;
        highscoreText.textContent=game.highscore;
        food.createFood();
        food.drawFood();
        game.nextTick();

    };

    nextTick(){

        if(game.running){
            setTimeout(()=>{
                board.clearBoard();
                food.drawFood();
                snake.move();
                snake.draw();
                game.checkGameOver();
                game.nextTick();

            },game.difficultyChecked());
        }
        else{
            board.displayGameOver();
        }

    };

    difficultyChecked(){

    if(document.getElementById('Easy').checked) {
        return 75;
      }else if(document.getElementById('Hard').checked) {
        return 45;
      }

    };

     checkGameOver(){
    //check if the snake goes out of the border
    switch(true){
        case(snake.body[0].x<0):
            game.running=false;
            break;
        case(snake.body[0].x>=board.gameWidth):
        game.running=false;
            break;
        case(snake.body[0].y<0):
        game.running=false;
            break;
        case(snake.body[0].y>=board.gameHeight):
        game.running=false;
            break;

    }
    //check if the snake hits itself
    for(let i=1;i<snake.body.length;i++){
        if(snake.body[i].x==snake.body[0].x && snake.body[i].y==snake.body[0].y)
        game.running=false;
    }
    };

    reset(){

    game.score=0;
    snake.xVelocity=game.unitSize;
    snake.yVelocity=0;
    snake.body=[
        {x:game.unitSize*4, y:0},
        {x:game.unitSize*3, y:0},
        {x:game.unitSize*2, y:0},
        {x:game.unitSize, y:0},
        {x:0, y:0}
    ];
    game.start();

    };
    }

class Board{
    constructor(gameWidth,gameHeight,background){
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.background=background;
    }
     clearBoard(){

            ctx.fillStyle=board.background;
            ctx.fillRect(0,0,board.gameWidth,board.gameHeight);

        }; //repainting the board

     displayGameOver(){

                ctx.font="50px MV Boli";
                ctx.fillStyle="#01cc65";
                ctx.textAlign="center";
                ctx.fillText("GAME OVER!!!",board.gameWidth/2,board.gameHeight/2)
                game.running=false;

            };
}


class Food{
    constructor(color,foodX,foodY){
        this.color=color;
        this.foodX=foodX;
        this.foodY=foodY;
    }
     randomFood(min,max){

                const randNum=Math.round((Math.random()*(max-min)+min)/game.unitSize)*game.unitSize
                return randNum;

            }

     createFood(){

                    food.foodX=food.randomFood(0,board.gameWidth-game.unitSize);
                    food.foodY=food.randomFood(0,board.gameWidth-game.unitSize);

                };//find random place to place a food item

     drawFood(){
                        ctx.fillStyle=food.color;
                        ctx.fillRect(food.foodX,food.foodY,game.unitSize,game.unitSize);
                };
}



let game=new Game(25,false,0,0)
let board=new Board(gameBoard.width,gameBoard.height,'#202020')

//initialization  the body of the snake
let body=[
    {x:game.unitSize*4, y:0},
    {x:game.unitSize*3, y:0},
    {x:game.unitSize*2, y:0},
    {x:game.unitSize, y:0},
    {x:0, y:0}
];


let snake=new Snake('#01cc65','#202020',25,0,body)
let food=new Food('red',0,0)


window.addEventListener("keydown",snake.changeDirection);
resetBtn.addEventListener("click",game.reset);
startBtn.addEventListener("click",game.start);

//Tell the user what to do to start the game
ctx.font="33px MV Boli";
ctx.fillStyle="#01cc65";
ctx.textAlign="center";
ctx.fillText("Press The Start  Button ",gameBoard.width/2,gameBoard.height/2)
