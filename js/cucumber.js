function random(from, to) {
    return Math.floor(from + Math.random() * (to - from));
}

class Cucumber {
    constructor() {
        const imgCucumber = document.createElement('img');
        imgCucumber.onload = () => {
            this.img = imgCucumber;

            const imgRatio = this.img.naturalWidth / this.img.naturalHeight;
            this.w = 100;
            this.h = this.w/imgRatio;

            this.x = canvasGameplay.width;
            this.y = random(0, canvasGameplay.height-(this.h/2));
            this.speed = 4;
        };
        imgCucumber.src = 'images/pickle-rick.png';

        this.tolerance = 10;
    }

    draw() {
        if (!this.img) return;
        ctxGameplay.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    hits(cat) {
        return (
            (cat.x + (cat.w-cat.tolerance) >= this.x && cat.x <= this.x + this.w)
            &&
            (cat.y <= this.y+this.h && cat.y + (cat.h-cat.tolerance) >= this.y) 
        )
    }
    
    //add animation to let cucumbers rotate

    // function to move each cucumber randomly in one direction
}