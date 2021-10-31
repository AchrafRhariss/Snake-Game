import {onSnake, expandSnake} from "./snake.js";
import {randomGridPosition} from './grid.js';

let food = getRandomFoodPosition();
let EXPANSION_RATE = 1;


export function update() {
    if(onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition();
    }
}

export function draw(gameContainer) {
    
    let foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    gameContainer.appendChild(foodElement);
}

function getRandomFoodPosition() {
    let randomPosition;
    while(randomPosition == null || onSnake(randomPosition)) {
        randomPosition = randomGridPosition();
    }

    return randomPosition;
}

