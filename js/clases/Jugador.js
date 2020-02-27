/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Jugador
 */

class Jugador {

    /****************************************
     * Método constructor
     * -camera (Object): La cámara con la
     *  que el jugador está observando
     * -nave_img (Object): Group que contenga
     *  el modelo 3D de la nave del jugador
     ****************************************/
    constructor(camera, nave_img) {
        this.vida = 1000;
        this.puntaje = 0;
        this.balas = [];

        this.camera = camera;

        this.nave_img = nave_img.clone();
        this.nave_img.position.set(0, 0, 0);

        this.escudo = new Escudo();
        this.barraVida = document.createElement("div");
        this.numMisiles = 5;
        this.extraMisilCounter = 0;

        this.barraVida.setAttribute("id", "barraVida");
        document.getElementById("game_output").appendChild(this.barraVida);

        this.puntajeContador = document.createElement("div");
        this.puntajeContador.setAttribute("id", "puntajeContador");
        document.getElementById("game_output").appendChild(this.puntajeContador);
        this.addScore(0);

        this.numMisliesTag = document.createElement("div");
        this.numMisliesTag.setAttribute("id", "num_misiles");
        let divImage = document.createElement("img");
        divImage.setAttribute("src", "../statics/images/misil.png");
        this.numMisliesTag.appendChild(divImage);
        this.numMisliesTag.appendChild(document.createElement("div"));
        document.getElementById("game_output").appendChild(this.numMisliesTag);

        this.addMisilDispon(0);
        this.misiles = [];

        document.onkeypress = (evt) => {

            if (evt.keyCode === 112 && this.escudo.life === Escudo.max_life) {

                if (!this.escudo.isActivated()) {
                    this.escudo.activate();
                }
            }
        };
    }

    /**************************************************************
     * Método disparar: Ejecuta el disparo del jugador. Genera dos
     *   balas que se mueven en la direción en la que ve el jugador
     **************************************************************/
    disparar() {
        let soundShutEffect = new Sound("laser.mp3");
        soundShutEffect.play(0.3);

        let velocity = new THREE.Vector3();
        this.camera.getWorldDirection(velocity);
        velocity.setLength(100);

        this.balas.push(
            new Bala(
                new THREE.Vector3(1, 0, 0).unproject(this.camera),
                velocity,
                0x0BBD20,),
            new Bala(
                new THREE.Vector3(-1, 0, 0).unproject(this.camera),
                velocity,
                0x0BBD20,)
        );
    }

    /***************************************
     * Método update
     * Actualiza los atributos del jugador
     **************************************/
    update(dt) {
        let look = new THREE.Vector3();
        this.camera.getWorldDirection(look);

        this.nave_img.position.copy(this.camera.position);
        this.nave_img.lookAt(look.unproject(this.camera));

        this.barraVida.style.width = (Math.floor(400 * this.vida / 1000)) + "px";
        if (this.vida < 1000)
            this.vida += 0.1;

        let r = (this.vida <= 500) ? 255 : Math.floor(255 * (1 - (this.vida - 500) / 500));
        let g = (this.vida >= 500) ? 255 : Math.floor(255 * (this.vida / 500));
        this.escudo.update(dt);

        this.barraVida.style.backgroundColor = `rgb(${r}, ${g}, 0)`;
        this.extraMisilCounter += dt;

        if (this.extraMisilCounter > 15) {
            this.addMisilDispon(1);
            this.extraMisilCounter = 0;
        }
    }

    /*****************************************************
     * Método crashed: Determina si una bala enemiga ha
     *   colisionado con la nave del jugador.
     * Parámetros:
     *  -crash (Object): Cuerpo con el que ha colisionado.
     *  -damage (Number): Cantidad de vida que
     *    disminuirá del jugador
     *****************************************************/
    crashed(crash, damage) {
        if (crash && !this.escudo.isActivated()) {
            let soundCrash = new Sound("crash.mp3");
            soundCrash.play(0.15);
            this.vida -= damage;
            this.escudo.effect.classList.add("attak");

            let angle = (Math.random() / 2 + 0.5) / 20;

            this.camera.rotation.z += angle;
            setTimeout(function (camera, escudo) {
                camera.rotation.z -= angle;
                setTimeout(() => {
                    escudo.effect.classList.remove("attak");
                }, 200, escudo)
            }, 200, this.camera, this.escudo);

        } else if (crash) {
            let CrashShield = new Sound("shieldcrash.mp3");
            CrashShield.play(1);

            this.escudo.underFire();
        }
    }

    /***********************************************
     * Método dispararMisil: Genera un nuevo misil
     * Parámetros:
     ***********************************************/
    dispararMisil(img, pointing) {
        let position = this.nave_img.position.clone();
        let desfase = new THREE.Vector3();
        this.camera.getWorldDirection(desfase);

        position.addScaledVector(desfase, 1);
        let response = true;
        this.misiles.forEach(misil => {
            if (misil.target.name === pointing.name) response = false
        });
        if (response) {
            let newMisil = new Misil(position, pointing, img);
            this.misiles.push(newMisil);
        }
    }

    addScore(extraScore) {
        this.puntaje += extraScore;
        this.puntajeContador.innerText = this.puntaje;
    }

    clearMisiles(objects) {
        this.misiles = this.misiles.filter(misil => {
            return misil.live && !(objects.indexOf(misil.targets) >= 0);
        })
    }

    addMisilDispon(number) {
        let misilElement = document.querySelector("#num_misiles div");
        console.log(misilElement);
        this.numMisiles += number;
        let posibles = 5 + Math.floor(this.puntaje/100);
        if (this.numMisiles > posibles) this.numMisiles = posibles;
        misilElement.innerText = this.numMisiles;
    }

    hasMisiles() {
        return this.numMisiles > 0;
    }
}
