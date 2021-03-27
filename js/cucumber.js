function random(from, to) {
    return Math.floor(Math.random() * (to - from) + from);
}

class Cucumber {
    constructor() {
        const imgCucumber = document.createElement('img');
        imgCucumber.onload = () => {
            this.img = imgCucumber;

            this.x = canvasGameplay.width;
            this.y = random(0, canvasGameplay.width-this.img.naturalHeight);

            const imgRatio = this.img.naturalWidth / this.img.naturalHeight;
            this.w = 100;
            this.h = this.w/imgRatio;
        };
        imgCucumber.src = 'images/pickle-rick.png';
    }

    draw() {
        if (!this.img) return;
        ctxGameplay.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    hits(cat) {
        return //add conditions when hit is met
    }
    
    //add animation to let cucumbers rotate

    // function to move each cucumber randomly in one direction
}