// Main JavaScript file for the Mario Jump game.

const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const JUMP_DURATION = 500; // ms
const GAME_LOOP_INTERVAL = 10; // ms
const PIPE_COLLISION_THRESHOLD_X_MAX = 120; // px, pipe is to the left of this point
const PIPE_COLLISION_THRESHOLD_X_MIN = 0; // px, pipe is to the right of this point (pipe hasn't passed mario completely)
const MARIO_COLLISION_THRESHOLD_Y = 80; // px, mario is below this point
const GAME_OVER_MARIO_WIDTH = '75px';
const GAME_OVER_MARIO_MARGIN_LEFT = '50px';
const GAME_OVER_IMAGE_SRC = './img/game-over.png';

/**
 * Makes Mario jump.
 * Adds the 'jump' class to Mario for a specified duration.
 */
const jump = () => {
    mario.classList.add('jump');
    
    setTimeout(()=> {
        mario.classList.remove('jump');
    }, JUMP_DURATION);
}

/**
 * Checks if Mario has collided with the pipe.
 * @param {number} pipePosition - The current left offset of the pipe.
 * @param {number} marioPosition - The current bottom position of Mario.
 * @returns {boolean} True if a collision occurred, false otherwise.
 */
const checkCollision = (pipePosition, marioPosition) => {
    return pipePosition <= PIPE_COLLISION_THRESHOLD_X_MAX && 
           pipePosition > PIPE_COLLISION_THRESHOLD_X_MIN && 
           marioPosition < MARIO_COLLISION_THRESHOLD_Y;
};

/**
 * Handles the game over sequence.
 * Stops animations, sets game over styles, and changes Mario's image.
 * @param {number} pipePosition - The final left offset of the pipe.
 * @param {number} marioPosition - The final bottom position of Mario.
 */
const handleGameOver = (pipePosition, marioPosition) => {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;
    mario.src = GAME_OVER_IMAGE_SRC;
    mario.style.width = GAME_OVER_MARIO_WIDTH;
    mario.style.marginLeft = GAME_OVER_MARIO_MARGIN_LEFT;
};

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    // Convert style.bottom (e.g., "10px") to a number
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (checkCollision(pipePosition, marioPosition)) {
        handleGameOver(pipePosition, marioPosition);
        clearInterval(loop); // Stop the game loop
    }
}, GAME_LOOP_INTERVAL);

// Event listener for the 'keydown' event to trigger the jump action.
document.addEventListener('keydown', jump);
