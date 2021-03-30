class Laser {
    constructor() {
        const imgLaser = document.createElement('img');

        imgLaser.onload = () => {
            this.img = imgLaser;

            const ratioImg = this.img.naturalWidth / this.img.naturalHeight;
            this.w = 100;
            this.h = this.w / ratioImg;

            this.x = cat.x + cat.w * .75;
            this.y = cat.y + cat.h/2;

            this.speed = 20;
        }
        imgLaser.src = 'images/laser.png';
    }

    draw() {
        if (!this.img) return;
        ctxGameplay.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    playSound() {
        let audio = document.createElement('audio');
        audio.setAttribute('src', 'audio/pewpew.wav');
        audio.play();
    }

    hits(cucumber) {
        return (
            (this.x + this.w >= cucumber.x && this.x <= cucumber.x + cucumber.w)
            &&
            (this.y <= cucumber.y+cucumber.h && this.y + this.h >= cucumber.y) 
        )
    }
}