function random(from, to) {
    return Math.floor(from + Math.random() * (to - from));
}

class Cucumber {
    constructor(speedCucumber) {
        const imgCucumber = document.createElement('img');
        imgCucumber.onload = () => {
            this.img = imgCucumber;

            const imgRatio = this.img.naturalWidth / this.img.naturalHeight;
            this.w = 100;
            this.h = this.w/imgRatio;

            this.x = canvasGameplay.width;
            this.y = random(0, canvasGameplay.height-(this.h/2));
        };
        imgCucumber.src = 'images/pickle-rick.png';
        
        this.speed = speedCucumber;
        this.tolerance = 5;
    }

    draw() {
        if (!this.img) return;
        ctxGameplay.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    playSound() {
        let audio = document.createElement('audio');
        audio.setAttribute('src', 'audio/bubbly.wav');
        audio.play();
    }

    hits(cat) {
        return (
            (cat.x + (cat.w - cat.tolerance) >= this.x && cat.x <= this.x + (this.w - this.tolerance))
            &&
            (cat.y <= this.y + (this.h-this.tolerance) && cat.y + (cat.h-cat.tolerance) >= this.y) 
        )
    }
}