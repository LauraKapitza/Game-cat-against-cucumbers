
class Lemon {
    constructor(speedLemon) {
        const imgLemon = document.createElement('img');

        imgLemon.onload = () => {
            this.img = imgLemon;

            const ratioImg = imgLemon.naturalWidth / imgLemon.naturalHeight;

            this.w = 100;
            this.h = this.w / ratioImg;

            this.x = canvasGameplay.width;
            this.y = random(0, canvasGameplay.height-(this.h));
        }
        imgLemon.src = 'images/lemon.png';

        this.speed = speedLemon;
        this.tolerance = 50;
        this.life = 3;
    }

    draw() {
        if (!this.img) return;
        ctxGameplay.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    playSound() {
        let audio = document.createElement('audio');
        audio.setAttribute('src', 'audio/boing.wav');
        audio.play();
    }

    hits(cat) {
        return (
            (cat.x + (cat.w-cat.tolerance) >= this.x && cat.x <= this.x + (this.w - this.tolerance))
            &&
            (cat.y <= this.y + (this.h - this.tolerance) && cat.y + (cat.h-cat.tolerance) >= this.y) 
        )
    }
}