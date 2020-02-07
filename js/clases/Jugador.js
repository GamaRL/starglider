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
        this.nave_img = nave_img;
        this.nave_img.position.set(0, 0, 0);
        this.escudo = new Escudo();

        this.barraVida = document.createElement("div");
        this.barraVida.setAttribute("id", "barraVida");
        this.misiles = [];
        document.getElementById("game_output").appendChild(this.barraVida);

        document.onkeypress = (evt) => {

            if (evt.keyCode === 112 && this.escudo.life === Escudo.max_life) {

                if (!this.escudo.isActivated()) {
                    this.escudo.activate();
                }
            }
        };
    }

    disparar() {
        let soundShutEffect = new Sound("laser.mp3");
        soundShutEffect.sonido();

        let velocity = new THREE.Vector3();
        this.camera.getWorldDirection(velocity);
        velocity.setLength(300);

        this.balas.push(
            new Bala(
                new THREE.Vector3(1, 0, 0).unproject(this.camera),
                velocity,
                0x0BBD20, ),
            new Bala(
                new THREE.Vector3(-1, 0, 0).unproject(this.camera),
                velocity,
                0x0BBD20, )
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
    }

    crashed(crash, damage) {
        if (crash && !this.escudo.isActivated()) {
            let soundCrash = new Sound("crash.mp3");
            soundCrash.sonido();
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

            if (this.vida <= 0) {
                this.vida = 0;
            }
        } else if (crash) {
            let soundCrashShield = new Sound("shieldcrash.mp3");
            soundCrashShield.sonido();
            this.escudo.underFire();
        }
    }
}
