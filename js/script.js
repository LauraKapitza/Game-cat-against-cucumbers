//gameplay canvas
const canvasGameplay = document.getElementById('canvas-gameplay');
const ctxGameplay = canvasGameplay.getContext('2d');

//start and restart button
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const gameEnd = document.getElementById('game-over-container');

//score
let digitOne = document.getElementById('digit-one');
let digitTwo = document.getElementById('digit-two');
let digitThree = document.getElementById('digit-three');
let digitFour = document.getElementById('digit-four');


let cat;
let lasers = []; //collectin lasers created

let cucumber;
let cucumbers = []; //collecting cucumbers as obstacles
let speedCucumber;
let canIncreaseSpeed;
let spawnCucumberTimer; 
let pointsDivisorForSpawning = 5; //to determine when more cucumbers will be created
let pointsDivisorForIncreasingSpeed = 10; //to determine when cucumbers will be faster

let lemon;
let lemons = []; //collecting lemons as obstacles
let speedLemon;

let keyArrowUp;
let keyArrowDown;
let keySpace;
let canShootTimer = 14;
let canShoot = false;

let gameOver;
let points;
let frames;
let raf; //request qnimation frame


function updateCat() {
    if (keyArrowUp) cat.moveUp(); //move cat while keyArrowUp is true
    if (keyArrowDown) cat.moveDown(); //move cat while keyArrowDown is true
    //time between two lasers
    if (frames % canShootTimer == 0) {
        canShoot = true;
    }
    //condition when cat can shoot
    if (keySpace && canShoot) {
        cat.shoot();
        canShoot = false;
    }       

    //update vertical positioning with the speed value
    cat.y += cat.speed;
    cat.draw();
}

function updateCucumber() {
    //increasig cucumbers' speed
    if (canIncreaseSpeed) {
        speedCucumber += 1;
        canIncreaseSpeed = false;
    }
    
    //creating a cucumber after a specific frame number
    if(frames % spawnCucumberTimer === 0) {
        cucumber = new Cucumber(speedCucumber);
        cucumbers.push(cucumber);
    };

    cucumbers.forEach(cucumber => {
        cucumber.x -= cucumber.speed; //moving cucumber from right to left
        if(cucumber.x < -cucumber.w) {
            const index = cucumbers.indexOf(cucumber);
            cucumbers.splice(index, 1); // removes cucumber from array when leaving the gameplay canvas
        };
        cucumber.draw(); //draw the cucumber
    });

    //game over if cucumber hits cat
    for(cucumber of cucumbers) {
        if (cucumber.hits(cat)) {
            gameOver = true;
        }
    }
};

function updateLemon() {
    lemons.forEach(lemon => {
        lemon.x -= lemon.speed; //moving lemon from right to left
        if(lemon.x < -lemon.w) {
            const index = lemons.indexOf(lemon);
            lemons.splice(index, 1); // removes lemon from array when leaving the gameplay canvas
        };
        lemon.draw(); //draw the lemon
    });

    //game over if lemon hits cat
    for(lemon of lemons) {
        if (lemon.hits(cat)) {
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
                cucumber.playSound(); //play sound of cucumber shot

                //increasing speed of cucumbers when reaching a certain score
                if (points != 0 && points % pointsDivisorForIncreasingSpeed == 0) {
                    canIncreaseSpeed = true;
                    lemon = new Lemon(speedLemon);
                    lemons.push(lemon);
                }; 
                
                if (points != 0 && points % pointsDivisorForSpawning == 0 && spawnCucumberTimer > 4) {
                    spawnCucumberTimer -= 4; //spawning more cucumbers when reaching a certain score
                }; 

                // removes cucumber from array after hit
                const indexCu = cucumbers.indexOf(cucumber);
                cucumbers.splice(indexCu, 1); 

                removeLaser();
            }           
    }

    //check for every laser if one hits a lemon
    for(laser of lasers) {
        for (lemon of lemons)
            if (laser.hits(lemon)) {
                lemon.life--;
                if (lemon.life === 0) {
                    points += 5; //player gets a point - yeah
                    lemon.playSound(); //play sound of lemon shot
    
                    // removes lemon from array after hit
                    const indexLemon = lemons.indexOf(lemon);
                    lemons.splice(indexLemon, 1); 
                }

                removeLaser();
            }           
    }
};

function removeLaser() {
    //removes laser from array after hit
    const indexLaser = lasers.indexOf(laser);
    lasers.splice(indexLaser, 1);    
}

function updateScore() {
    let score = ('0000'+points).slice(-4); //create a four digit score

    //update numbers of DOM span elements
    digitOne.innerHTML = score[3];
    digitTwo.innerHTML = score[2];
    digitThree.innerHTML = score[1];
    digitFour.innerHTML = score[0];
};

//updates the gamplay canvas
function updateGameplay() {
    ctxGameplay.clearRect(0, 0, canvasGameplay.width, canvasGameplay.height);
    updateCat();
    updateCucumber();
    updateLemon();
    updateLaser();
    updateScore();
};

//Press keys to move tha cat or shoot
document.addEventListener('keydown', (e) => {
    if (!cat) return;
    switch(e.key) {
        case 'ArrowUp': keyArrowUp = true; break;
        case 'ArrowDown': keyArrowDown = true; break;
        case ' ': keySpace = true; break;
    }
});

document.addEventListener('keyup', (e) => {
    if (!cat) return;
    switch(e.key) {
        case 'ArrowUp': keyArrowUp = false; cat.speed = 0; break;
        case 'ArrowDown': keyArrowDown = false; cat.speed = 0; break;
        case ' ': keySpace = false; break;
    }
});

// creates the animation loop to update the gameplay canvas
function animLoop() {
    frames++;
    updateGameplay();
    
    if (!gameOver) {
        raf = requestAnimationFrame(animLoop);
    } else {
        gameEnd.setAttribute('class', 'none');

        //push restart btn to restart game
        restartBtn.addEventListener('click', () => {
            gameEnd.setAttribute('class', 'hidden'); //hide game over container
            startGame();
        });
        
    };
};       

//start the game
function startGame() {
    if (raf) {
        cancelAnimationFrame(raf);
    };

    ctxGameplay.clearRect(0, 0, canvasGameplay.width, canvasGameplay.height);
    
    //initialiye variables for the game
    frames = 0;
    gameOver = false;
    points = 0;
    speedCucumber = 4;
    speedLemon = 6;
    canIncreaseSpeed = false;
    spawnCucumberTimer = 60; // 1 second as game run at 60 frames per second
    keyArrowUp = false;
    keyArrowDown = false;
    keySpace = false;
    
    cat = new Cat(); //initiate a new cat
    cucumbers = []; //initialize empty array of cucumbers
    lemons = []; //initialize empty array of lemons
    lasers = []; //initialize empty array of lasers
    
    raf = requestAnimationFrame(animLoop);
};

//push start btn to start game
startBtn.addEventListener('click', () => {
    startBtn.setAttribute('class', 'hidden'); //hide start button
    startGame();
});