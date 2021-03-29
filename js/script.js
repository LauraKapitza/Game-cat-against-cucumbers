//gameplay canvas
const canvasGameplay = document.getElementById('canvas-gameplay');
const ctxGameplay = canvasGameplay.getContext('2d');

//start button
const startBtn = document.getElementById('start-btn'); 

let cat;
let cucumber;
let cucumbers = []; //collecting cucumebrs as obstacles
let lasers = []; //collectin lasers created
let gameOver;
let points;
let frames = 0;
let raf;


function updateCucumbers() {
    if(frames % 50 === 0) {
        cucumber = new Cucumber();
        cucumbers.push(cucumber);
    };

    cucumbers.forEach(function(cucumber) {
        cucumber.x -= cucumber.speed; //moving cucumber from right to left
        if(cucumber.x < -cucumber.w) {
            const index = cucumbers.indexOf(cucumber);
            cucumbers.splice(index, 1); // removes cucumbers from array when leaving the gameplay canvas
        };
        cucumber.draw();
    });

    for(cucumber of cucumbers) {
        if (cucumber.hits(cat)) {
            gameOver = true;
        }
    }
}

function updateLaser() {
    lasers.forEach(function(laser) {
        laser.x += laser.speed; //moving laser from left to right
        
        if(laser.x > canvasGameplay.width) {
            const index = lasers.indexOf(laser);
            lasers.splice(index, 1); // removes cucumbers from array when leaving the gameplay canvas
        };
        if (lasers) {
            for (laser of lasers) {
                laser.draw();
            }
        }
    });    
}

//updates the gamplay canvas
function updateGameplay() {
    ctxGameplay.clearRect(0, 0, canvasGameplay.width, canvasGameplay.height);
    cat.y += cat.speed;
    cat.draw();
    updateCucumbers();
    updateLaser();
};


//Press keys to move tha cat or shoot
document.addEventListener('keydown', (e) => {
    if (!cat) return;
    switch(e.key) {
        case 'ArrowUp': cat.moveUp(); break;
        case 'ArrowDown': cat.moveDown(); break;
        case ' ': cat.shoot(); break;
    }
});

document.onkeyup = function() {
    cat.speed = 0;
}

// creates the animation loop to update the gameplay canvas
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
    cucumbers = []; //initialize empty array of cucumbers

    raf = requestAnimationFrame(animLoop);
};

//push start btn to start game
startBtn.addEventListener('click', () => {
    startBtn.setAttribute('class', 'hidden'); //hide start button
    startGame();
});