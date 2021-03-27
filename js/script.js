// global variables
let cat;
let cucumbers;
let gameOver;
let points;

const startBtn = document.getElementById('start-btn'); //start button

//gameplay canvas
const canvasGameplay = document.getElementById('canvas-gameplay');
const ctxGameplay = canvasGameplay.getContext('2d');

function updateGameplay() {
    ctxGameplay.clearRect(0, 0, canvasGameplay.width, canvasGameplay.height);
    cat.draw();
}


//TODO - function for game over

//Press keys to move tha cat or shoot
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp': cat.moveUp(); break;
        case 'ArrowDown': cat.moveDown(); break;
        case ' ': cat.shoot(); break;
    }
})
        
let raf;
let frames = 0;
function animLoop() {
    frames++;
    updateGameplay();
    
    if (!gameOver) {
        raf = requestAnimationFrame(animLoop);
    };
};       
        
//start the game
function startGame() {
    if (raf) {
        cancelAnimationFrame(animLoop)
    };

    gameover = false;
    points = 0;

    cat = new Cat(); //initiate a new cat

    requestAnimationFrame(animLoop);
}

//push start btn to start game
startBtn.addEventListener('click', () => {
    startBtn.setAttribute('class', 'hidden'); //hide start button
    startGame();
})

