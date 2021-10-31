import {SNAKE_SPEED, update as updateSnake, draw as drawSnake, isSnakeIntersected, isSnakeOutsideGrid} from './snake.js';
import { update as updateFood, draw as drawFood} from './food.js';


let lastRenderTime = 0;
let gameOver = false;
const gameContainer = document.getElementById('container');


function main(currentTime) {
    if(gameOver) {
        return alert('You lose');
    }
    window.requestAnimationFrame(main);
    let secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if(secondsSinceLastRender < 1/SNAKE_SPEED) return; // No render if time isn't reach the speed
    
    lastRenderTime = currentTime;
    update();
    draw();
}

window.requestAnimationFrame(main);


function update() {
    updateSnake();
    updateFood();
    checkForFailureState();
}

function draw() {
    gameContainer.innerHTML = ''
    drawSnake(gameContainer);
    drawFood(gameContainer);
}

function checkForFailureState() {
    gameOver = isSnakeOutsideGrid() || isSnakeIntersected();
}