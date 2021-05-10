var canvas = document.getElementById("range");
var ctx = canvas.getContext("2d");
var ballRadius = 20;
var score = 0;
var x = getRandom(200,900);
var y = 400;
var dx = getRandom(1,3);
var dy = 2;
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = 450;//初始x座標
var rightPressed = false;
var leftPressed = false;
var rowBrickCount = 3;
var columnBrickCount = 5;
var brickWidth = 200;
var brickHeight = 50;
var brickDistance = 40;
var brickSetTop = 50;
var brickSetLeft = 40;
var bricks = [];//宣告brick陣列
for (var i = 0; i < columnBrickCount; i++) {
    bricks[i] = [];
    for (var j = 0; j < rowBrickCount; j++) {
        bricks[i][j] = { x: 0, y: 0, status:1 };
    }
}

document.addEventListener("keydown", keyDownControler, false);
//keydown:按下某個鍵時會觸發該事件。
document.addEventListener("keyup", keyUpControler, false);
//keyup:釋放某個鍵時將觸發該事件。

function keyDownControler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpControler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};
//畫球
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    /*arc(x, y, radius, startAngle, endAngle, anticlockwise)畫一個弧形
    本方法接受五個參數: x, y代表圓心座標點，radius代表半徑，startAngle, 
    endAngle分別代表沿著弧形曲線上的起始點與結束點的弧度，弧度測量是相對於x軸，anticlockwise為true代表逆時針作圖、false代表順時針作圖。*/
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
//畫球拍
function drawPaddle() {
    ctx.beginPath();
    ctx.fillStyle = "#050505";
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.closePath();
}
//畫磚塊
function drawBricks(){
    for(var i=0;i<columnBrickCount;i++){
        for(var j=0;j<rowBrickCount;j++){
            if(bricks[i][j].status==1){
                var brickX = (i*(brickWidth+brickDistance))+brickSetLeft;
                var brickY = (j*(brickHeight+brickDistance))+brickSetTop;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#F16B29";
                ctx.fill();
                ctx.closePath();
            }

        }
    }
}
//碰撞處理
function reboundDetection() {
    for (var i=0;i<columnBrickCount;i++) {
        for (var j=0;j<rowBrickCount;j++) {
            var brick = bricks[i][j];
            if (brick.status == 1) {
                if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
                    dy = -dy;
                    brick.status = 0;
                    score+=1;
                }
            }
        }
    }
}
//記分板
function scoreRecord(){
    ctx.beginPath();
    ctx.fillStyle = "#050505";
    ctx.font = "50px Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign="center";
    ctx.fillText("Your score: "+score, 500 , 400 );
    ctx.closePath();
}

function Run(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);//清除畫布
    drawBall();
    drawPaddle();
    drawBricks();
    reboundDetection();
    scoreRecord();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    else if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();//頁面自動刷新js版
            clearInterval(interval); //使用clearInterval（）來停止時間：
        }
    }

    else if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}

var interval = setInterval(Run, 10);
