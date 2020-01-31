/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Radar
 */


class Radar {
    /*******************************************
     * Función constructor()
     * Parámetros:
     * -id_container (String): Nos dice en qué
     *  elemento html se pondrá la imagen
     *******************************************/
    constructor(id_container) {
        let container = document.getElementById(id_container);
        this.img = document.createElement("div");
        this.img.classList.add("radar");
        container.appendChild(this.img);

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(50, this.img.clientWidth / this.img.clientHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 0);
        this.camera.lookAt(new THREE.Vector3(0, 0, 1));

        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.setSize(this.img.clientWidth, this.img.clientHeight);
        this.renderer.setClearColor(0x257896, 0.5);

        this.img.appendChild(this.renderer.domElement);
    }

    render(camera) {
        this.camera = camera.clone();
        let new_pos = new THREE.Vector3();
        this.camera.getWorldDirection(new_pos);
        this.camera.position.sub(new_pos.multiplyScalar(15));
        this.renderer.render(this.scene, this.camera);
    }

}
