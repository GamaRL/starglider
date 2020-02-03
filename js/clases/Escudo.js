/**
 * Project: starglider
 * Date: enero 2020
 * Author: undefined
 * Class: Escudo
 */

class Escudo {
    static max_life = 10;

    constructor() {
        // this.activated = false;
        this.life = Escudo.max_life;
        this.effect = document.createElement("div");
        this.effect.setAttribute("id", "shield");
        document.getElementsByTagName("body")[0].appendChild(this.effect);
        this.activate();
        console.log(Escudo.max_life);
    }

    isActivated() {
        return this.activated;
    }

    sound() {
        this.soundEffect = new Sound("escudo.mp3");
        this.soundEffect.sonido();
    }

    activate() {
        this.sound();
        this.activated = true;
        this.effect.classList.add("activated");
    }

    desactivate() {
        while (this.effect.firstChild) {
            this.effect.removeChild(this.effect.firstChild);
        }

        this.sound();
        this.activated = false;
        this.effect.classList.remove("activated");
    }

    update(dt) {
        if (this.activated) {
            this.life -= dt;
            if (this.life <= 0) {
                this.desactivate();
            }
        } else {
            if (this.life < Escudo.max_life)
                this.life += dt / 2;
            else {
                if (this.life > Escudo.max_life)
                    this.life = Escudo.max_life;
            }
        }
    }

    underFire() {
        let newWave = document.createElement("div");
        newWave.classList.add("waveShield");
        newWave.style.top = Math.random()*40+30 + "%";
        newWave.style.left = Math.random()*40+30 + "%";
        this.effect.appendChild(newWave);

    }
}
