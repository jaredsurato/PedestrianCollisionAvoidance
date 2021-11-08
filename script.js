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

const car = {
    x:0,
    y:canvas.width/2,
    speed:4,
    width:50,
    height:25,
}

const pedestrian = {
    x: canvas.width - 50,
    y: canvas.height / 2 + 100,
    speed:1,
    size: 6.25
}

function drawCar() {
    ctx.fillRect(car.x, car.y, car.width, car.height)
    ctx.fillStyle = "purple"
    ctx.fill();
}

function drawPedestrian() {
    ctx.beginPath();
    ctx.arc(pedestrian.x, pedestrian.y, pedestrian.size, 0, Math.PI*2)
    ctx.fill();
}

// TODO UpdateCar function that keeps car between walls
function updateCar() {
    drawCar();
    car.x += car.speed;
    if(car.x + car.width > canvas.width || car.x < 0) {
        car.x = 0;
    }
}

// TODO UpdatePedestrian function that keeps pedestrian between walls
function UpdatePedestrian() {
    drawPedestrian();
    pedestrian.y -= pedestrian.speed;
    if(pedestrian.y < canvas.height / 2 - 100){
        pedestrian.y = canvas.height / 2 + 100
    }
}
// TODO draw scenery like road, sidewalk and grass

// TODO add images for each item (car, pedestrian)

function update() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    updateCar();
    UpdatePedestrian();

    requestAnimationFrame(update);
}

update();