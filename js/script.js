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
let lasers = []; //collectin lasers created

let cucumber;
let cucumbers = []; //collecting cucumbers as obstacles
let speedCucumber;
let canIncreaseSpeed;
let pointsDivisorForSpawning = 5 //no idea how to better name the variable
let pointsDivisorForIncreasingSpeed = 10; //no idea how to better name the variable

let lemon;
let lemons = [];
let speedLemon;

let gameOver;
let points;
let frames;
let spawnCucumberTimer = 60; // 1 second as game run at 60 frames per second
let spawnLemonTimer = spawnCucumberTimer*3; // 1 second as game run at 60 frames per second
let raf;


function updateCat() {
    cat.y += cat.speed;
    cat.draw();
}

function updateCucumber() {
    //increasig cucumbers' speed
    if (canIncreaseSpeed) {
        speedCucumber += 2;
        canIncreaseSpeed = false;
    }
    
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
    if(frames % spawnLemonTimer === 0) {
        lemon = new Lemon(speedLemon);
        lemons.push(lemon);
    };

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
                
                if (points != 0 && points % pointsDivisorForSpawning == 0 && spawnCucumberTimer > 2) {spawnCucumberTimer -= 2;}; //spawning more cucumbers when reaching a certain score

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
    } else {
        startBtn.setAttribute('class', 'none');

        //push start btn to start game
        startBtn.addEventListener('click', () => {
            startBtn.setAttribute('class', 'hidden'); //hide start button
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
    
    frames = 0;
    gameOver = false;
    points = 0;
    speedCucumber = 4;
    speedLemon = 4;
    canIncreaseSpeed = false;
    
    cat = new Cat(); //initiate a new cat
    cucumbers = []; //initialize empty array of cucumbers
    lemons = [];
    
    raf = requestAnimationFrame(animLoop);
};

//push start btn to start game
startBtn.addEventListener('click', () => {
    startBtn.setAttribute('class', 'hidden'); //hide start button
    startGame();
});