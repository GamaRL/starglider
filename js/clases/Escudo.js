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
        this.soundEffect = new Sound("escudo.mp3");
        this.activate();
    }

    isActivated() {
        return this.activated;
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
        this.soundEffect.sonido();
        this.activated = true;
        this.makeAnimation();
    }

    desactivate() {
        while (this.effect.firstChild) {
            this.effect.removeChild(this.effect.firstChild);
        }
        this.soundEffect.sonido();


        this.soundEffect.sonido();
        this.activated = false;
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
