/**
 * Project: starglider
 * Date: enero 2020
 * Author: undefined
 * Class: Escudo
 */

class Escudo {
    static max_life = 10;

    /*********************
     * Método constructor
     *********************/
    constructor() {
        this.life = Escudo.max_life;
        this.effect = document.createElement("div");
        this.effect.setAttribute("id", "shield");
        document.getElementsByTagName("body")[0].appendChild(this.effect);

        this.icon = document.createElement("img");
        this.icon.setAttribute("src", "../statics/images/shield.png");
        this.icon.setAttribute("id", "shieldCharge");
        document.getElementsByTagName("body")[0].appendChild(this.icon);

        this.soundEffect = new Sound("escudo.mp3");
        this.activate();
    }

    /**************************************************
     * Método isActivated: Nos dice si el escudo está
     *   activado.
     * Return:
     * - Boolean
     **************************************************/
    isActivated() {
        return this.activated;
    }

    /****************************************
     * Método makeAnimation: Efecto de cuando
     *   se activa el escudo (Parpadeo)
     ****************************************/
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

    /************************************
     * Método activate: Activa el escudo
     ************************************/
    activate() {
        this.soundEffect.play();
        this.activated = true;
        this.icon.classList.remove("ready");
        this.makeAnimation();
    }

    /******************************************
     * Método desactivate: Desactiva el escudo
     ******************************************/
    desactivate() {
        while (this.effect.firstChild) {
            this.effect.removeChild(this.effect.firstChild);
        }
        this.soundEffect.play();


        this.soundEffect.play();
        this.activated = false;
        this.makeAnimation();
    }

    /****************************************
     * Método update: Actualiza el estado
     *   del escudo
     * Parámetros:
     * - dt (Number): Diferencial de tiempo
     *     para actualizar el escudo
     ****************************************/
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
                this.icon.classList.add("ready");
            }
        }
    }

    /*********************************************
     * Método underFire: Genera el efecto de borde
     *   rojo cuando no está activado el escudo
     *********************************************/
    underFire() {
        let newWave = document.createElement("img");
        newWave.setAttribute("src", "../statics/images/shieldblock.png");
        newWave.classList.add("waveShield");
        newWave.style.top = Math.random() * 40 + 30 + "%";
        newWave.style.left = Math.random() * 40 + 30 + "%";

        this.effect.appendChild(newWave);
    }

}
