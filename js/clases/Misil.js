/**
 * Project: starglider
 * Date: febrero 2020
 * Author: undefined
 * Class: Misil
 */

class Misil {
    constructor(position, target, img) {
        // this.position = new THREE.Vector3().copy(position);
        this.img_misil = img;
        this.img_misil.position.copy(position);
        this.target = target;
        this.live = true;
    }

    update(dt) {
        let velocity = this.target.position.clone().sub(this.img_misil.position).setLength(20);
        this.img_misil.position.addScaledVector(velocity, dt);
        this.img_misil.lookAt(this.target.position);
        return this.isNear();
    }

    isNear() {
        return this.target.position.clone().sub(this.img_misil.position).length() < 1;
    }

    destroy() {
        this.live = false;
    }

}
