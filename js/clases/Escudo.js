/**
 * Project: starglider
 * Date: enero 2020
 * Author: undefined
 * Class: Escudo
 */

class Escudo {
    static max_life = 10;

    constructor() {
        this.life = Escudo.max_life;
        this.effect = document.createElement("div");
        this.effect.setAttribute("id", "shield");
        document.getElementsByTagName("body")[0].appendChild(this.effect);
        // this.activate();
    }

    isActivated() {
        return this.activated;
    }

    sound() {
        this.soundEffect = new Sound("escudo.mp3");
        this.soundEffect.sonido();
    }

    changeClass(number) {
        if (this.effect.classList.contains("activated"))
            this.effect.classList.remove("activated")
        else
            this.effect.classList.add("activated");
        if (number > 0)
            setTimeout(this.changeClass, 200, --number)
    }

    makeAnimation() {

        setTimeout(effect => {
            if (effect.classList.contains("activated"))
                effect.classList.remove("activated")
            else
                effect.classList.add("activated");
            setTimeout(effect => {
                if (effect.classList.contains("activated"))
                    effect.classList.remove("activated")
                else
                    effect.classList.add("activated");
                setTimeout(effect => {
                    if (effect.classList.contains("activated"))
                        effect.classList.remove("activated")
                    else
                        effect.classList.add("activated");
                }, 200, effect);
            }, 200, effect)
        }, 200, this.effect);
    }

    activate() {
        this.sound();
        this.activated = true;
        // this.effect.classList.add("activated");
        this.makeAnimation();
    }

    desactivate() {
        while (this.effect.firstChild) {
            this.effect.removeChild(this.effect.firstChild);
        }

        this.sound();
        this.activated = false;
        // this.effect.classList.remove("activated");
        this.makeAnimation();
    }

    update(dt) {
        if (this.activated) {
            this.life -= dt;
            if (this.life <= 0) {
                this.desactivate();
            }
        } else {
            if (this.life < Escudo.max_life)
                this.life += dt;
            else {
                if (this.life > Escudo.max_life)
                    this.life = Escudo.max_life;
            }
        }
    }

    underFire() {
        let newWave = document.createElement("div");
        newWave.classList.add("waveShield");
        newWave.style.top = Math.random() * 40 + 30 + "%";
        newWave.style.left = Math.random() * 40 + 30 + "%";
        this.effect.appendChild(newWave);

    }
}
