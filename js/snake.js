import { getInputDirection } from "./input.js";

let newSegments = 0;
export const SNAKE_SPEED = 5;
let snakeBody = [
    {x:11, y:11},
];

export function update() {
    addSegments();
    let inputDirection = getInputDirection();
    for(let i = snakeBody.length-2; i>=0; i--) {
        snakeBody[i+1] = {...snakeBody[i]};
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(gameContainer) {
    snakeBody.forEach(segment => {
        let snakeElement = document.createElement('div');
        snakeElement.classList.add('snake');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        gameContainer.appendChild(snakeElement);
    });
}

export function onSnake(pos, {ignoreHead = false} = {}) {
    return snakeBody.some((s, index) => {
        if(ignoreHead && index == 0) {
            return false;
        }
        return equalPositions(pos,s);
    });
}

function equalPositions(pos1, pos2) {
    return pos1.x == pos2.x && pos1.y == pos2.y;
}

export function expandSnake(rate) {
    newSegments += rate;
}

export function isSnakeOutsideGrid() {
    return snakeBody[0].x <=0 || snakeBody[0].x > 21 || snakeBody[0].y <=0 || snakeBody[0].y > 21;
}

export function isSnakeIntersected() {
    return onSnake(snakeBody[0], {ignoreHead: true})
}

function addSegments() {
    for(let i=0; i<newSegments; i++) {
        snakeBody.push({...snakeBody[snakeBody.length-1]});
    }
    newSegments = 0;
}