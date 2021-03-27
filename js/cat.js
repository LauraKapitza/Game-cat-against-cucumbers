class Cat {
    constructor() {
        const catImg = document.createElement('img');
        catImg.onload = () => {
            this.img = catImg;
            
            const ratioImg = catImg.naturalWidth / catImg.naturalHeight;
            this.w = 100;
            this.h = this.w / ratioImg;

            this.x = canvasGameplay.width/8 - this.w/8;
            this.y = 250 - this.h;
            this.speed = 10;
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
            return;
        } else {
            this.y -= this.speed;
        }
    }

    //move cat to the bottom
    moveDown() {
        if (this.y > canvasGameplay.height) {
            return;
        } else {
            this.y += this.speed;
        }
    }

    //function to shoot
    shoot() {
        //add logic to let the cat shoot
    }
}