const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    {x: 10, y: 10}
];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let gameRunning = true;

Telegram.WebApp.ready();
Telegram.WebApp.expand();

function randomFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

function drawSnake() {
    ctx.fillStyle = 'lime';
    for (let segment of snake) {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function update() {
    if (!gameRunning) return;

    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    // Проверка стен и самоедения
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount ||
        snake.some(s => s.x === head.x && s.y === head.y)) {
        alert(`Игра окончена! Счёт: ${score}\nНажмите OK для рестарта.`);
        snake = [{x: 10, y: 10}];
        dx = dy = 0;
        score = 0;
        scoreElement.textContent = 'Счёт: 0';
        randomFood();
        return;
    }

    snake.unshift(head);

    // Еда
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = `Счёт: ${score}`;
        randomFood();
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawFood();
    drawSnake();

    update();
}

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft': if (dx !== 1) {dx = -1; dy = 0;} break;
        case 'ArrowUp': if (dy !== 1) {dx = 0; dy = -1;} break;
        case 'ArrowRight': if (dx !== -1) {dx = 1; dy = 0;} break;
        case 'ArrowDown': if (dy !== -1) {dx = 0; dy = 1;} break;
        case ' ': // Пробел для паузы
            gameRunning = !gameRunning;
            break;
    }
});

randomFood();
setInterval(draw, 150); // 150ms — скорость