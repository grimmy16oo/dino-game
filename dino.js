//board
let boardWidth = 750;
let boardHeight = 250;
let context;        //used for drawing on convas

//dino
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {        //properties(,)
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}

//cactus
let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let catusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

//physics
let velocityX = -8;  //cactus moving left speed
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

window.onload = function()
{
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");   //used for drawing on canvas

    dinoImg = new Image();
    dinoImg.src="./img/dino copy.png";
    dinoImg.onload = function()
    {
        context.drawImage(dinoImg,dino.x,dino.y,dino.width,dino.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = "./img/cactus1 copy.png";

    cactus2Img = new Image();
    cactus2Img.src = "./img/cactus2 copy.png";

    cactus3Img = new Image();
    cactus3Img.src = "./img/cactus3 copy.png";

    requestAnimationFrame(update);
    setInterval(placeCactus,1000); //1000ms = 1s
    document.addEventListener("keydown",moveDino);
}

function update()
{
    if(gameOver)
    {
        return;
    }
    requestAnimationFrame(update);

    context.clearRect(0,0,board.width,board.height);

    //dino drawing
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY);   //apply gravity to current dino.y
    context.drawImage(dinoImg,dino.x,dino.y,dino.width,dino.height);
    //cactus drawing
    for(let i=0; i<cactusArray.length; i++)
    {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img,cactus.x,cactus.y,cactus.width,cactus.height);

        if(detectCollision(dino,cactus))
        {
            gameOver = true;
            dinoImg.src = "./img/dino-dead copy.png";
            dinoImg.onload = function()
            {
                context.drawImage(dinoImg,dino.x,dino.y,dino.width,dino.height);
            }
        }
    }

    //score
    context.fillStyle = "white";
    context.font = "20px courier";
    score++;
    context.fillText(score,5,20);
}

function moveDino(e)
{
    if(gameOver)
    {
        return;
    }
    if((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) //means in the groound
    {
        velocityY = -10;    //jump
    }
}

function placeCactus()
{
    if(gameOver)
    {
        return;
    }
    let cactus = {  //object
        img : null,
        x : cactusX,
        y : catusY,
        width : null,
        height : cactusHeight
    }

    let placeCactusChance = Math.random();      //0-0.9999... chance

    if(placeCactusChance > .90)     //10% chance to get cactus3
    {
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    }
    else if(placeCactusChance > .70)     //30% chance to get cactus2
    {
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }
    else if(placeCactusChance > .50)     //10%chance to get cactus1
    {
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }

    if(cactusArray.length > 5)
    {
        cactusArray.shift();        //remove the first element from the array so that array dosent constantly grow
    }
}

function detectCollision(a,b)
{
    return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;
}