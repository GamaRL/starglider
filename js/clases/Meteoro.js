/**
 * Project: starglider
 * Date: febrero 2020
 * Author: undefined
 * Class: Meteoro
 */


class Meteoro {
    /*********************************************
     * Método constructor
     *  -img (Object): Modelo 3D que representará
     *   al metorito en la escena
     *  -id (Number): Número de objetivo que
     *   ha sido creado
     *********************************************/
    constructor(img, id) {
        this.img = img;
        this.score = Math.floor(100 * Math.random());
        this.vida = 500;
        this.img.position.copy(new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5).setLength(20));
        this.img.name = id;

        this.velocity = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).setLength(5 * Math.random() + 5);

        this.img_radar = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 32, 32),
            new THREE.MeshBasicMaterial({color: 0xFF0946})
        );

        this.img_radar.position.copy(this.img.position);
    }


    /***************************************************
     * Método update: Actualiza las variables de
     *   posición y velocidad del meteorito. De
     *   igual manera detecta si el objeto se ha
     *   alejado demasiado del jugador para que
     *   desaparezca.
     * Parámetros:
     *  -dt (Number): Diferencial de tiempo con base en
     *   el que se calcularán las variaciones.
     *  -player_position (Object): Posición del jugador
     ****************************************************/
    update(dt, player_position) {
        this.img.position.addScaledVector(this.velocity, dt);
        this.img_radar.position.copy(this.img.position);
        if (player_position.sub(this.img.position).length() > 100) {
            this.destroy();
        }
    }

    /*******************************************
     * Método destroy: Debe invocarse cuando el
     * meterito haya sido destruido
     *******************************************/
    destroy() {
        this.vida = 0;
        this.isDestroy = true;
    }
}
