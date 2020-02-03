/**
 * Project: starglider
 * Date: enero 2020
 * Author: undefined
 * Class: Escudo
 */

class Escudo {
    constructor() {
        // this.activated = false;
        this.life = 5;
        this.effect = document.createElement("div");
        this.effect.setAttribute("id", "shield");
        document.getElementsByTagName("body")[0].appendChild(this.effect);
        this.activate();
    }

    isActivated() {
        return this.activated;
    }

    activate() {
        this.activated = true;
        this.effect.classList.add("activated");
    }

    desactivate() {
        this.activated = false;
        this.effect.classList.remove("activated");
    }

    update() {
        if (this.activated) {
            this.life -= 1 / 60;
            if (this.life <= 0) {
                this.desactivate();
            }
        } else {
            if (this.life < 5)
                this.life += 1 / 120;
            else {
                if (this.life > 5)
                    this.life = 5;
            }
        }
    }
}
