const canvas = document.getElementById("ballCanvas");
const ctx = canvas.getContext("2d");

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 30,
    dx: 4,
    dy: 4,
    color: "#FF5733",
    bounce: true
};

// Set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Function to update the ball's position
function updateBallPosition() {
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx; // Reverse the horizontal direction
    }

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy; // Reverse the vertical direction
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
}

// Detect tap (mouse click)
canvas.addEventListener('click', (event) => {
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    let dist = Math.sqrt(Math.pow(mouseX - ball.x, 2) + Math.pow(mouseY - ball.y, 2));

    if (dist < ball.radius) {
        ball.dx = (Math.random() - 0.5) * 10; // Randomize X speed
        ball.dy = (Math.random() - 0.5) * 10; // Randomize Y speed
    }
});

// Animate the ball
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    updateBallPosition();
    requestAnimationFrame(animate);
}

animate();
