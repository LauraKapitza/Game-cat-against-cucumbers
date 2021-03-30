class Cat {
    constructor() {
        const catImg = document.createElement('img');
        catImg.onload = () => {
            this.img = catImg;
            
            const ratioImg = catImg.naturalWidth / catImg.naturalHeight;
            this.w = 75;
            this.h = this.w / ratioImg;

            this.x = canvasGameplay.width/8 - this.w/8;
            this.y = 250 - this.h;
            this.speed = 0;

            this.tolerance = 10;
        }
        catImg.src = "images/cat.png";
    }
    
    //draw the cat image
    draw() {
        if (!this.img) return; //no drawing if the image is not loaded yet
        ctxGameplay.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    //move cat to the top
    moveUp() {
        if (this.y < 0) {
            this.y = canvasGameplay.height-this.h;
        } else {
            this.speed -= 2;
        }
    }

    //move cat to the bottom
    moveDown() {
        if (this.y > canvasGameplay.height-this.h) {
            this.y = 0;
        } else {
            this.speed += 2;
        }

    }

    //function to shoot
    shoot() {
        let laser = new Laser();
        lasers.push(laser);
    }
}