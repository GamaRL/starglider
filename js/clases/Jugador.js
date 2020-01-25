/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Jugador
 */

class Jugador {
    constructor(camera, nave_img) {
        this.vida = 500;
        this.balas = [];
        this.camera = camera;
        this.nave_img = nave_img;

        this.barraVida = document.createElement("div");
        this.barraVida.setAttribute("id", "barraVida");
        document.getElementById("game_output").appendChild(this.barraVida);
    }

    update() {
        let look = new THREE.Vector3();
        this.camera.getWorldDirection(look);
        look.unproject(this.camera);
        this.nave_img.position.copy(this.camera.position);
        this.nave_img.lookAt(look);

        this.barraVida.style.width = (300 * this.vida / 500) + "px";


    }
}
