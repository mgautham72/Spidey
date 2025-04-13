const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balloon = {
    x: Math.random() * (canvas.width - 100) + 50,
    y: 50,
    radius: 30,
    color: "red",
    popped: false
};

let arrow = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 10,
    height: 30,
    speed: 5,
    angle: 0,
    shot: false,
    direction: { x: 0, y: 0 }
};

// Draw the balloon
function drawBalloon() {
    if (!balloon.popped) {
        ctx.beginPath();
        ctx.arc(balloon.x, balloon.y, balloon.radius, 0, Math.PI * 2);
        ctx.fillStyle = balloon.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Draw the arrow
function drawArrow() {
    if (arrow.shot) {
        ctx.save();
        ctx.translate(arrow.x, arrow.y);
        ctx.rotate(arrow.angle);
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(-arrow.width / 2, -arrow.height / 2, arrow.width, arrow.height);
        ctx.restore();
    }
}

// Update arrow position
function updateArrowPosition() {
    if (arrow.shot) {
        arrow.x += arrow.direction.x * arrow.speed;
        arrow.y += arrow.direction.y * arrow.speed;

        // Check if arrow hits the balloon
        let dx = arrow.x - balloon.x;
        let dy = arrow.y - balloon.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < balloon.radius) {
            balloon.popped = true;
            resetGame();
        }

        // Reset if arrow moves off the screen
        if (arrow.x < 0 || arrow.x > canvas.width || arrow.y < 0 || arrow.y > canvas.height) {
            arrow.shot = false;
        }
    }
}

// Fire the arrow towards the mouse click
canvas.addEventListener('click', function(event) {
    if (!arrow.shot) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        let dx = mouseX - arrow.x;
        let dy = mouseY - arrow.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        // Normalize the direction vector
        arrow.direction.x = dx / distance;
        arrow.direction.y = dy / distance;

        // Calculate the angle of the arrow
        arrow.angle = Math.atan2(dy, dx);

        // Shoot the arrow
        arrow.shot = true;
    }
});

// Reset the game (new balloon after popping)
function resetGame() {
    setTimeout(() => {
        balloon = {
            x: Math.random() * (canvas.width - 100) + 50,
            y: 50,
            radius: 30,
            color: "red",
            popped: false
        };
        arrow.shot = false;
        arrow.x = canvas.width / 2;
        arrow.y = canvas.height - 50;
    }, 1000); // Reset after 1 second
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBalloon();
    drawArrow();
    updateArrowPosition();

    requestAnimationFrame(gameLoop);
}

gameLoop();
