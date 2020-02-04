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
        this.nave_img.position.set(0, 0, 0);

        this.barraVida = document.createElement("div");
        this.barraVida.setAttribute("id", "barraVida");
        this.misiles = [];
        document.getElementById("game_output").appendChild(this.barraVida);
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
                0x0BBD20),
            new Bala(
                new THREE.Vector3(-1, 0, 0).unproject(this.camera),
                velocity,
                0x0BBD20)
        );
    }

    dispararMisil(target, model) {
        this.misiles.push(new Misil(new THREE.Vector3().copy(this.camera.position), target, model));
        game.scene.add(this.misiles.pop().img_misil);
    }

    /***************************************
     * Método update
     * Actualiza los atributos del jugador
     **************************************/
    update() {
        let look = new THREE.Vector3();
        this.camera.getWorldDirection(look);

        this.nave_img.position.copy(this.camera.position);
        this.nave_img.lookAt(look.unproject(this.camera));

        this.barraVida.style.width = (Math.floor(300 * this.vida / 500)) + "px";
        if (this.vida < 500)
            this.vida += 0.05;

        let r = (this.vida <= 250) ? 255 : Math.floor(255 * (1 - (this.vida - 250) / 250));
        let g = (this.vida >= 250) ? 255 : Math.floor(255 * (this.vida / 250));

        this.barraVida.style.backgroundColor = `rgb(${r}, ${g}, 0)`;
    }
}
