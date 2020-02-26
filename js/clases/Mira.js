/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Mira
 */

class Mira {

    /*******************************************
     * Método constructor
     * -id_container (String): Nombre del id del
     *   elemento HTML que fungirá como mira
     ********************************************/
    constructor(id_container) {
        this.img = document.createElement("img");
        this.img.setAttribute("id", "mira");
        this.img.setAttribute("src", "../statics/images/image.png");
        let container = document.getElementById(id_container);
        this.rotation = 0;
        container.appendChild(this.img);
    }

    /*************************************************
     * Método checkTargets
     *   Verifica si en la dirección en la que apunta
     *   la cámara está algún objetivo
     * Parámetros:
     * - targets (Array): Contiene los posibles objetivos
     *   del jugador
     * - camera (Object): Cámara con la que está viendo
     *   el jugador
     * Return:
     * - Objetivo colisionado o undafined si no ha
     *   ocurrido una colisión
     **************************************************/
    checkTargets(targets, camera) {
        let pointer = new THREE.Vector3();
        camera.getWorldDirection(pointer);
        pointer.normalize();
        let caster = new THREE.Raycaster(camera.position, pointer, 0, 150);

        let intersects = caster.intersectObjects(targets, true);
        if (intersects.length > 0)
            return intersects[0].object.parent;
        else
            return undefined;
    }

    /******************************************************
     * Método update: Actualiza las propiedades de la mira.
     * Parámetros:
     * - targets: Posibles objetivos del jugador.
     * - camera: Cámara con la que el jugador está
     *   observando.
     *******************************************************/
    update(targets, camera) {
        this.img.style.transform = "rotate(" + this.rotation + "deg)";
        if (this.rotation >= 360)
            this.rotation -= 360;
        this.rotation += 2;

        let response = this.checkTargets(targets, camera);
        if (response) {
            this.img.classList.add("shoot");
        } else {
            this.img.classList.remove("shoot");
        }
        this.pointing = response;
    }
}
