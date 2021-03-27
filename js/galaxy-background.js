const canvasBoard = document.getElementById('canvas-board');
const ctxBoard = canvasBoard.getContext('2d');

//in-memory background img element
const galaxyImg = document.createElement('img');

const backgroundImg = {
    img: galaxyImg,
    x: 0,
    speed: -0.5,
    
    move: function() {
        this.x += this.speed;
        this.x %= galaxyImg.naturalWidth;
    },
    
    draw: function() {
        const ratioImg = galaxyImg.naturalWidth / galaxyImg.naturalHeight;
        const imgHeight = 600;
        
        ctxBoard.drawImage(this.img, this.x, 0, galaxyImg.naturalWidth, galaxyImg.naturalWidth/ratioImg);
        ctxBoard.drawImage(this.img, this.x + galaxyImg.naturalWidth, 0, galaxyImg.naturalWidth, galaxyImg.naturalWidth/ratioImg);
    },
};

function updateCanvasBoard() {
    ctxBoard.clearRect(0, 0, canvasBoard.width, canvasBoard.height);
    backgroundImg.move();
    backgroundImg.draw();
    
    requestAnimationFrame(updateCanvasBoard);
}

galaxyImg.onload = updateCanvasBoard; //start animation when galaxy image is loaded

galaxyImg.src = 'images/galaxy.jpg'; //start dowloading the galaxy image