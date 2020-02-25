/**
 * Project: starglider
 * Date: febrero 2020
 * Author: undefined
 * Class: Misil
 */

class Misil {
    constructor(position, target, img) {
        this.position = new THREE.Vector3().copy(position);
        this.img_misil = img;
        this.target = target;
    }

    update(dt) {
        let velocity = this.target.position.clone().sub(this.position).setLength(-10);
        this.img_misil.position.addScaledVector(velocity, dt);
    }

}
