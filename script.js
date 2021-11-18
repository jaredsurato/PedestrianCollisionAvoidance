/*jshint esversion: 6 */

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight;

// //fillrect()

// ctx.fillRect(122,0,100,100);

// // ctx.strokeRect()
// ctx.strokeRect(100, 200, 150, 100);

// // clearRect()
// ctx.clearRect(100,150, 76, 75);

// // fillText()

// ctx.font = "30px Arial";
// ctx.fillStyle = "purple";
// ctx.fillText("Prototype text", 500, 500);

// //strokeText()
// ctx.strokeText("hello world", 300, 300)

//________---------____________----------_______

// PATHS
// ctx.beginPath();
// ctx.moveTo(50,50);
// ctx.lineTo(150, 50);
// ctx.lineTo(100, 200);
// ctx.lineTo(50,50);

// ctx.fillStyle = "orange";
// ctx.fill();

// ctx.beginPath();
// ctx.moveTo(200, 50);
// ctx.lineTo(150,200);
// ctx.lineTo(250,200);
// ctx.closePath();
// ctx.stroke();

// ctx.beginPath();
// ctx.rect(300, 50, 150, 100);
// ctx.fillStyle = "teal"
// ctx.fill();

// Archs (circles)
// const centerX = canvas.width / 2;
// const centerY = canvas.height / 2;

// ctx.beginPath();
// //draw head
// ctx.arc(centerX, centerY, 400, 0, Math.PI *2);
// //move to mouth
// ctx.moveTo(centerX + 200, centerY);
// //draw mouth
// ctx.arc(centerX, centerY, 200, 0, Math.PI);
// //move to left eye
// ctx.moveTo(centerX-120, centerY-160)
// //draw left eye
// ctx.arc(centerX - 160, centerY - 160, 40, 0, Math.PI*2)
// //move to right eye
// ctx.moveTo(centerX+200, centerY-160)
// //draw right eye
// ctx.arc(centerX + 160, centerY - 160, 40, 0, Math.PI*2)
// ctx.stroke();

const roadImage = document.getElementById("road");

const timer = {
  time:0,
  startTimer: false,
  temp: 0,
  reset: function(){
    timer.time = 0;
    timer.startTimer = false;
  },
  start: function(t){
    timer.startTimer = true;
    timer.temp = Date.now();
  },
  draw: function(){
    //Attempting to draw timer on canvas
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Time of Scenario: " + timer.time, 20, 30);
  },
  update: function(){
    timer.draw();
    if (timer.startTimer == true)
    {
      var elapsedTime = Date.now() - timer.temp;
      timer.time = (elapsedTime / 1000).toFixed(3);
    }
    else
    {
      timer.time = 0;
    }
  }
}

const car = {
    x:80,
    y:canvas.height/2,
    speed:0,
    width:200,
    height:100,
    steadyStateSpeed:4,
    reset:false,
    image: document.getElementById("car")
}

const pedestrian = {
    x: canvas.width - 50,
    y: canvas.height / 2 + 200,
    speed:0,
    size: 25,
    finalPosition: canvas.height/2 - 100,
    image: document.getElementById("pedestrian")
}

function drawCar() {
    // ctx.fillRect(car.x, car.y, car.width, car.height)
    // ctx.fillStyle = "purple"
    // ctx.fill();
    ctx.drawImage(car.image, car.x, car.y, car.width, car.height);
}

function drawPedestrian() {
    // ctx.beginPath();
    // ctx.arc(pedestrian.x, pedestrian.y, pedestrian.size, 0, Math.PI*2)
    // ctx.fill();
    ctx.drawImage(pedestrian.image, pedestrian.x, pedestrian.y, pedestrian.size, pedestrian.size);
}

// TODO UpdateCar function that keeps car between walls
function updateCar() {
    drawCar();
    car.x += car.speed;
    if(car.x > canvas.width) {
        car.x = car.width * -1;
    }
}

// TODO UpdatePedestrian function that keeps pedestrian between walls
function UpdatePedestrian() {
    drawPedestrian();
    pedestrian.y -= pedestrian.speed;
    if(pedestrian.y < pedestrian.finalPosition){
        pedestrian.speed = 0;
    }
}

// TODO add function so car can detect collision and slow down
function DetectPedestrian() {
  if (((car.y + car.height > pedestrian.y) && (pedestrian.y > car.y))
    && (pedestrian.x > car.x) &&(pedestrian.x - (car.x + car.width) < 150)){
    car.speed *= 0.96;
  }
  else {

    if (car.reset) {
      car.speed = 0;
    }
    else {
      if (car.speed < car.steadyStateSpeed){
        car.speed *= 1.05;
      }
    }
  }
}



function update() {

    starTime = Date.now();

    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.drawImage(roadImage, -10, canvas.height/2-100, canvas.width+25, 200)

    /*
    //Attempting to draw timer on canvas
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";

    var elapsedTime = Date.now() - startTime;
    ctx.fillText("Time of Scenario: " + (elapsedTime / 1000).toFixed(3), 20, 30);
    */

    DetectPedestrian();
    updateCar();
    UpdatePedestrian();
    timer.update();
    requestAnimationFrame(update);
}


// RESET STATES
function pedestrian_reset() {
  pedestrian.x = canvas.width - 50;
  pedestrian.y = canvas.height / 2 + 200;
  pedestrian.speed = 0;
}

function car_reset() {
  car.x = 80;
  car.y = canvas.height/2;
  car.reset = true;
}

// MAIN FUNCTION
$(document).ready(function() {

  $("button#scenario_1").click(function() {
    pedestrian.finalPosition = canvas.height/2 + 35
    car.reset = false;
    car.speed = 4;
    pedestrian.speed = 1;
  });

  $("#scenario_2").click(function() {
    pedestrian.finalPosition = canvas.height/2 + 101
    car.reset = false;
    car.speed = 4;
    pedestrian.speed = 1;
  });

  $("#scenario_3").click(function() {
    pedestrian.finalPosition = canvas.height/2 + 135
    car.reset = false;
    car.speed = 4;
    pedestrian.speed = 1;
  });

  $("#scenario_4").click(function() {
    pedestrian.finalPosition = canvas.height/2 + 170
    car.reset = false;
    car.speed = 4;
    pedestrian.speed = 1;
  });

  $("button.scenario").click(function(){
    timer.start();
  });

/*
  $("#scenario_5").click(function() {
    pedestrian.finalPosition = canvas.height/2 + 170
    car.reset = false;
    car.speed = 4;
    pedestrian.speed = 1;
  });

  $("#scenario_6").click(function() {
    pedestrian.finalPosition = canvas.height/2 + 170
    car.reset = false;
    car.speed = 4;
    pedestrian.speed = 1;
  });

  $("#scenario_7").click(function() {
    pedestrian.finalPosition = canvas.height/2 + 170
    car.reset = false;
    car.speed = 4;
    pedestrian.speed = 1;
  });
*/
  $("#reset").click(function() {
    car_reset();
    pedestrian_reset();
    timer.reset();
  });

  update();
});
