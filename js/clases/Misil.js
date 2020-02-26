/**
 * Project: starglider
 * Date: febrero 2020
 * Author: undefined
 * Class: Misil
 */

class Misil {
    /********************************************
     * Método constructor
     * Parámetros:
     * - position (Object): Vector que almacena
     *     la posición de partida del misil.
     * - target (Object): Objeto al que apunta
     *     el misil y al cual seguirá.
     * - img (Object): Modelo 3D que representará
     *     al misil en la escena.
     *********************************************/
    constructor(position, target, img) {
        this.img_misil = img;
        this.img_misil.position.copy(position);
        this.target = target;
        this.live = true;
    }

    /**************************************************
     * Médoto update: Actualiza la posición del misil
     *   de tal manera que siga a su objetivo
     * Parámetros:
     * - dt (Number): Diferencial de tiempo que se
     *     tomará para calcular su nueva posición
     * Return
     * - true si el misil está muy cerca de su
     *     objetivo y false si no lo está (Boolean)
     ***************************************************/
    update(dt) {
        let velocity = this.target.position.clone().sub(this.img_misil.position).setLength(20);
        this.img_misil.position.addScaledVector(velocity, dt);
        this.img_misil.lookAt(this.target.position);
        return this.isNear();
    }

    /*********************************************
     * Método isNear: Determina si el misil está
     *   muy cerca de su objetivo
     * Return:
     * - true o false
     *********************************************/
    isNear() {
        return this.target.position.clone().sub(this.img_misil.position).length() < 0.3;
    }

    /************************************************
     * Método destroy: Pone el atributo live en false
     ************************************************/
    destroy() {
        this.live = false;
    }

}
