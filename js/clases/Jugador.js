/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Jugador
 */

class Jugador {
    constructor(camera, nave_img) {
        this.vida = 100;
        this.balas = [];
        this.camera = camera;
        this.nave_img = nave_img;
    }

    update() {
        let look = new THREE.Vector3();
        this.camera.getWorldDirection(look);
        look.unproject(this.camera);
        this.nave_img.position.copy(this.camera.position);
        this.nave_img.lookAt(look);

    }
}
