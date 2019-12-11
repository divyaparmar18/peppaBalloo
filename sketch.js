var blueShoeImg, balloon_redImg, yellowShoeImg, redShoeImg;
var balloon_blueImg, balloon_yellowImg, burstColor;

var gameState = "start";


var random_cap_color, balloon_color;
var balloon_yellow, balloon_blue, balloon_red;
var shape;
var score;


function preload() {
    blueShoeImg = loadImage("peppa_blue2png");
    yellowShoeImg = loadImage("peppa_yellow.png");
    redShoeImg = loadImage("peppa_red.png");
    balloon_blueImg = loadImage("blue.png");
    balloon_redImg = loadImage("red.png");
    balloon_yellowImg = loadImage("yello.png");
    burstSound = loadSound("burst.mp3");
}

function setup() {
    createCanvas(600, 400);

    shape = createSprite(200, 200);
    shape.addImage("shape", blueShoeImg);
    shape.scale = 0.3;

    blueBalloon = createSprite(Math.round(random(20, 580)));
    blueBalloon.addImage("blueBalloon", balloon_blueImg);
    blueBalloon.velocityY = 1;
    blueBalloon.scale = 0.3;

    redBalloon = createSprite(Math.round(random(20, 580)));
    redBalloon.addImage("redBalloon", balloon_redImg);
    redBalloon.scale = 0.5;
    redBalloon.velocityY = 1;


    yellowBalloon = createSprite(Math.round(random(20, 580)));
    yellowBalloon.addImage("yellowBalloon", balloon_yellowImg);
    yellowBalloon.scale = 0.5;
    yellowBalloon.velocityY = 1;


    score = 0;
}

function draw() {
    background("#6699ff");

    if (gameState === "start") {
        var shape_cap_color = [blueShoeImg, redShoeImg, yellowShoeImg];
        var color = ["blue", "red", "yellow"];
        var index = Math.round(random(0, shape_cap_color.length - 1));
        burstColor = color[index];
        random_cap_color = shape_cap_color[index];
        gameState = "play";
    }
    if (gameState === "play") {
        shape.x = World.mouseX;
        shape.y = World.mouseY;
    }
    if (shape.isTouching(redBalloon)) {
        if (frameCount % 10 === 0) {
            balloon_color = "red";
            redBalloon.destroy();
            burstSound.play();
            redBalloon = createSprite(Math.round(random(20, 580), Math.round(random(-400, 0))));
            redBalloon.addImage("redBalloon", balloon_redImg);
            redBalloon.scale = 0.5;
            redBalloon.velocityY = 1;
        }
    } else if (shape.isTouching(yellowBalloon)) {
        if (frameCount % 10 === 0) {
            balloon_color = "yellow";
            burstSound.play();
            yellowBalloon.destroy();
            yellowBalloon = createSprite(Math.round(random(20, 580), Math.round(random(-400, 0))));
            yellowBalloon.scale = 0.5;
            yellowBalloon.addImage("yellowBalloon", balloon_yellowImg);
            yellowBalloon.velocityY = 1;
        }
    } else if (shape.isTouching(blueBalloon)) {
        if (frameCount % 10 === 0) {
            balloon_color = "blue";
            blueBalloon.destroy();
            burstSound.play();
            blueBalloon = createSprite(Math.round(random(20, 580), Math.round(random(-400, 0))));;
            blueBalloon.addImage("blueBalloon", balloon_blueImg);
            blueBalloon.scale = 0.3;
            blueBalloon.velocityY = 1;
        }
    }
    if (redBalloon.y > 400) {
        redBalloon.x = Math.round(random(20, 390));
        redBalloon.y = 0;
    } else if (yellowBalloon.y > 400) {
        yellowBalloon.x = Math.round(random(20, 390));
        yellowBalloon.y = 0;
    } else if (blueBalloon.y > 400) {
        blueBalloon.x = Math.round(random(20, 390));
        blueBalloon.y = 0;
    }

    shape.addImage("shape", random_cap_color);


    if (balloon_color === burstColor) {
        gameState = "start";
        score = score + 1;
        balloon_color = "";

    }
    if (balloon_color !== burstColor && balloon_color !== "") {
        score = 0;
    }
    if (score === 5) {
        gameState = "end";
    }
    textSize(20);
    fill("black")
    text("Score = " + score, 0, 15);

    if (gameState === "end") {
        fill("black")
        textSize(50);
        text("You Won", 100, 190);
    }
    textSize(20);
    fill("black")
    text("Pop the balloons that match the color of Peppa pig's Shoes", 10, 380);

    drawSprites();

}