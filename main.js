// Snake Game JavaScript Code

const board = document.getElementById("gameCanvas");
const context = board.getContext("2d");

const cube = 25;
let snakeX, snakeY, snake, treat, score, direction, game;

// Display and button elements
const scoreDisplay = document.getElementById("scoreDisplay");
const startButton = document.getElementById("startButton");

// Start game button listener
startButton.addEventListener("click", startGame);

// Start or restart the game
function startGame() {
  // Reset variables
  snakeX = 200;
  snakeY = 200;
  snake = [{ x: snakeX, y: snakeY }];
  score = 0;
  direction = "right";

  treat = {
    x: Math.floor((Math.random() * board.width) / cube) * cube,
    y: Math.floor((Math.random() * board.height) / cube) * cube,
  };

  scoreDisplay.textContent = "Score: " + score;

  // Clear old game loop if running
  if (game) clearInterval(game);
  game = setInterval(draw, 100);
}

// Handle arrow key movement
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "down") direction = "up";
  else if (event.key === "ArrowDown" && direction !== "up") direction = "down";
  else if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
  else if (event.key === "ArrowRight" && direction !== "left") direction = "right";
});

// Main game function
function draw() {
  // Clear the board
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  // Move snake
  if (direction === "right") snakeX += cube;
  else if (direction === "left") snakeX -= cube;
  else if (direction === "up") snakeY -= cube;
  else if (direction === "down") snakeY += cube;

  // Add new head
  snake.unshift({ x: snakeX, y: snakeY });

  // Check if snake eats treat
  if (snakeX === treat.x && snakeY === treat.y) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    // New treat position
    treat = {
      x: Math.floor((Math.random() * board.width) / cube) * cube,
      y: Math.floor((Math.random() * board.height) / cube) * cube,
    };
  } else {
    snake.pop();
  }

  // Draw treat
  context.fillStyle = "red";
  context.fillRect(treat.x, treat.y, cube, cube);

  // Draw snake
  context.fillStyle = "lime";
  snake.forEach((part) => {
    context.fillRect(part.x, part.y, cube, cube);
  });

  // Collision with wall
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= board.width ||
    snakeY >= board.height
  ) {
    gameOver();
  }

  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (snakeX === snake[i].x && snakeY === snake[i].y) {
      gameOver();
    }
  }
}

// Game Over function
function gameOver() {
  clearInterval(game);
  alert("Game Over! Final score: " + score);
}