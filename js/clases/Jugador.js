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
        this.vida = 500;
        this.balas = [];
        this.camera = camera;
        this.nave_img = nave_img;

        this.barraVida = document.createElement("div");
        this.barraVida.setAttribute("id", "barraVida");
        this.soundEffect = new Sound("laser.mp3");
        document.getElementById("game_output").appendChild(this.barraVida);
    }

    disparar() {
        this.soundEffect.sonido();
        let disparador1 = new THREE.Vector3(1, 0, 0).unproject(this.camera);
        let disparador2 = new THREE.Vector3(-1, 0, 0).unproject(this.camera);

        //Las balas salen disparadas en la dirección en la que el jugador está jugando
        let velocity = new THREE.Vector3();
        this.camera.getWorldDirection(velocity);
        velocity.setLength(300);

        this.player.balas.push(new Bala(disparador1, velocity, 0x0BBD20));
        this.player.balas.push(new Bala(disparador2, velocity, 0x0BBD20));
    }

    /***************************************
     * Método update
     * Actualiza los atributos del jugador
     **************************************/
    update() {
        let look = new THREE.Vector3();
        this.camera.getWorldDirection(look);
        look.unproject(this.camera);

        this.nave_img.position.copy(this.camera.position);
        this.nave_img.lookAt(look);

        this.barraVida.style.width = (Math.floor(300 * this.vida / 500)) + "px";
        if (this.vida < 500)
            this.vida += 0.05;

        let r = (this.vida <= 250) ? 255 : Math.floor(255 * (1 - (this.vida - 250) / 250));
        let g = (this.vida >= 250) ? 255 : Math.floor(255 * (this.vida / 250));

        this.barraVida.style.backgroundColor = `rgb(${r}, ${g}, 0)`;
    }
}
