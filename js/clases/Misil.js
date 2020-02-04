/**
 * Project: starglider
 * Date: febrero 2020
 * Author: undefined
 * Class: Misil
 */

class Misil {
    constructor(position, target, img) {
        this.position = new THREE.Vector3().copy(position);
        this.velocity = new THREE.Vector3();
        this.img_misil = img;
        this.target = target;
        console.log("Nuevo Misil");
    }

    update(dt) {
        let acc = new THREE.Vector3()
            .copy(this.target.position)
            .sub(this.img_misil.position);

        this.velocity.addScaledVector(acc, dt);
        this.img_misil.position.addScaledVector(this.velocity, dt);
    }


}
