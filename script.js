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
const alertImage = document.getElementById("alert")

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
  },
  check: function(t){
    if (timer.time > t)
    {
      return true;
    }
    return false;
  }
}

const car = {
    x:80,
    y:canvas.height/2 + 15,
    speed:0,
    width:180,
    height:90,
    steadyStateSpeed:4,
    reset:false,
    image: document.getElementById("car")
}

const pedestrian = {
    x: car.x + car.width + 1575,
    y: canvas.height / 2 + 350,
    speed:0,
    size: 22.5,
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

function playSound() {
  count = 0;

  while (count == 0){
    var audio3 = new Audio("alarm.mp3")
    audio3.play();
    count += 1;
  }
}

count = 0;
// TODO add function so car can detect collision and slow down
function DetectPedestrian() {
  if (((car.y + car.height + 24 > pedestrian.y) && (pedestrian.y > car.y - 24))
    && (pedestrian.x > car.x) &&(pedestrian.x - (car.x + car.width) < 250)){
    car.speed *= 0.975;
    ctx.drawImage(alertImage, 80, canvas.height/2+200, 200, 190)

    while (count == 0){
      var audio3 = new Audio("alarm.wav")
      audio3.play();
      count += 1;
    }
  }
  else {
    count = 0;
    if (car.reset) {
      car.speed = 0;
    }
    else {
      if (car.speed < car.steadyStateSpeed){
        car.speed *= 1.02;
      }
    }
  }
  if (((car.y + car.height + 46 > pedestrian.y) && (pedestrian.y > car.y - 46))
  && (pedestrian.x > car.x) &&(pedestrian.x - (car.x + car.width) < 300)){
    ctx.drawImage(alertImage, 80, canvas.height/2+200, 200, 190)
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
  pedestrian.x = car.x + car.width + 1575;
  pedestrian.y = canvas.height / 2 + 350;
  pedestrian.speed = 0;
}

function car_reset() {
  car.x = 80;
  car.y = canvas.height/2 + 15;
  car.reset = true;
}

function total_reset() {
  car_reset();
  pedestrian_reset();
  timer.reset();
}

// MAIN FUNCTION
$(document).ready(function() {

  $("button#scenario_1").click(function() {
    total_reset();
    console.log(pedestrian.x)
    pedestrian.finalPosition = canvas.height/2 + 35
    car.reset = false;
    car.speed = 5;
    pedestrian.speed = 1;
  });

  $("#scenario_2").click(function() {
    total_reset();
    pedestrian.finalPosition = canvas.height/2 + 130
    car.reset = false;
    car.speed = 5;
    pedestrian.speed = 1;
  });

  $("#scenario_3").click(function() {
    total_reset();
    pedestrian.finalPosition = canvas.height/2 + 170
    car.reset = false;
    car.speed = 5;
    pedestrian.speed = 1;
  });

  $("#scenario_4").click(function() {
    total_reset();
    pedestrian.finalPosition = canvas.height/2 + 260
    car.reset = false;
    car.speed = 5;
    pedestrian.speed = 1;
  });

  $("#scenario_5").click(function() {
    total_reset();
    pedestrian.y = car.y + 35;
    car.reset = false;
    car.speed = 5;
    console.log(timer.time)
    setTimeout(() => {
      pedestrian.finalPosition = canvas.height/2 - 170
      pedestrian.speed = 1;
    }, 1500);
    
  });

  $("#scenario_6").click(function() {
    total_reset();
    pedestrian.y = car.y + 125;
    car.reset = false;
    car.speed = 5;
    console.log(timer.time)
    setTimeout(() => {
      pedestrian.finalPosition = canvas.height/2 - 170
      pedestrian.speed = 1;
    }, 1800);
  });

  $("#scenario_7").click(function() {
    total_reset();
    pedestrian.y = car.y + 215;
    car.reset = false;
    car.speed = 5;
    console.log(timer.time)
    setTimeout(() => {
      pedestrian.finalPosition = canvas.height/2 - 170
      pedestrian.speed = 1;
    }, 1100);
  });

  $("#scenario_8").click(function() {
    total_reset();
    pedestrian.y = canvas.height/2 + 35;
    car.reset = false;
    car.speed = 5;
    pedestrian.speed = 0;
  });

  $("#scenario_9").click(function() {
    total_reset();
    pedestrian.y = canvas.height/2 + 130
    car.reset = false;
    car.speed = 5;
    pedestrian.speed = 0;
  });

  $("#scenario_10").click(function() {
    total_reset();
    pedestrian.y = canvas.height/2 + 215
    car.reset = false;
    car.speed = 5;
    pedestrian.speed = 0;
  });

  $("button.scenario").click(function(){
    timer.start();
  });

  $("#reset").click(function() {
    car_reset();
    pedestrian_reset();
    timer.reset();
  });

  update();
});
