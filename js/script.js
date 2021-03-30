//gameplay canvas
const canvasGameplay = document.getElementById('canvas-gameplay');
const ctxGameplay = canvasGameplay.getContext('2d');

//start button
const startBtn = document.getElementById('start-btn'); 

//score
let digitOne = document.getElementById('digit-one');
let digitTwo = document.getElementById('digit-two');
let digitThree = document.getElementById('digit-three');
let digitFour = document.getElementById('digit-four');


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

    cucumbers.forEach(cucumber => {
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
    lasers.forEach(laser => {
        laser.x += laser.speed; //moving laser from left to right
        laser.draw();
        
        if(laser.x > canvasGameplay.width) {
            const index = lasers.indexOf(laser);
            lasers.splice(index, 1); // removes cucumbers from array when leaving the gameplay canvas
        };
    }); 
    
    //check for every laser if one hits a cucumber
    for(laser of lasers) {
        for (cucumber of cucumbers)
            if (laser.hits(cucumber)) {
                points += 1; //player gets a point - yeah
                cucumber.playSound();
                // removes cucumber from array after hit
                const indexCu = cucumbers.indexOf(cucumber);
                cucumbers.splice(indexCu, 1); 

                //removes laser from array after hit
                const indexLa = lasers.indexOf(laser);
                lasers.splice(indexLa, 1);
            }
    }
}

function updateScore() {
    let score = ('0000'+points).slice(-4); //create a four digit score

    //update numbers of DOM span elements
    digitOne.innerHTML = score[3];
    digitTwo.innerHTML = score[2];
    digitThree.innerHTML = score[1];
    digitFour.innerHTML = score[0];
}

//updates the gamplay canvas
function updateGameplay() {
    ctxGameplay.clearRect(0, 0, canvasGameplay.width, canvasGameplay.height);
    cat.y += cat.speed;
    cat.draw();
    updateCucumbers();
    updateLaser();
    updateScore();
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