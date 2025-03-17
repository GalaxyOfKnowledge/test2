const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let spaceship = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5
};

let bullets = [];
let invaders = [];
let invaderSpeed = 1;

// Create invaders
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 10; j++) {
        invaders.push({
            x: 50 + j * 60,
            y: 30 + i * 60,
            width: 40,
            height: 40
        });
    }
}

function drawSpaceship() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

function drawBullets() {
    ctx.fillStyle = 'yellow';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

function drawInvaders() {
    ctx.fillStyle = 'red';
    invaders.forEach(invader => {
        ctx.fillRect(invader.x, invader.y, invader.width, invader.height);
    });
}

function moveSpaceship() {
    document.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft' && spaceship.x > 0) {
            spaceship.x -= spaceship.speed;
        } else if (event.key === 'ArrowRight' && spaceship.x < canvas.width - spaceship.width) {
            spaceship.x += spaceship.speed;
        }
    });
}

function shootBullet() {
    document.addEventListener('keydown', event => {
        if (event.key === ' ') {
            bullets.push({
                x: spaceship.x + spaceship.width / 2 - 2.5,
                y: spaceship.y,
                width: 5,
                height: 10,
                speed: 7
            });
        }
    });
}

function updateBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });
}

function moveInvaders() {
    invaders.forEach(invader => {
        invader.y += invaderSpeed;
    });
}

function checkCollision() {
    bullets.forEach((bullet, bulletIndex) => {
        invaders.forEach((invader, invaderIndex) => {
            if (
                bullet.x < invader.x + invader.width &&
                bullet.x + bullet.width > invader.x &&
                bullet.y < invader.y + invader.height &&
                bullet.y + bullet.height > invader.y
            ) {
                bullets.splice(bulletIndex, 1);
                invaders.splice(invaderIndex, 1);
            }
        });
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpaceship();
    drawBullets();
    drawInvaders();
    updateBullets();
    moveInvaders();
    checkCollision();
    requestAnimationFrame(gameLoop);
}

moveSpaceship();
shootBullet();
gameLoop();