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

const circle = {
    x:200,
    y:200,
    size:30,
    dx:5,
    dy:6
}

function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI*2)
    ctx.fillStyle = "purple"
    ctx.fill();
}

function update() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawCircle();
    circle.x += circle.dx;
    circle.y += circle.dy;

    //detect side walls
    if(circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
        circle.dx *= -1;
    }
    if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
        circle.dy *= -1;
    }
    requestAnimationFrame(update);
}

update();