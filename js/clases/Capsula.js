/**
 * Project: starglider
 * Date: febrero 2020
 * Author: undefined
 * Class: Capsula
 */

class Capsula {
    constructor(position, model, player_position) {
        this.model = model;
        this.model.position.copy(position);
        this.velocity = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).setLength(30);
        this.live = true;
    }

    update(dt) {
        this.model.position.addScaledVector(this.velocity, dt);

        this.model.rotateZ(Math.PI/2 * dt);
        if (this.model.position.length() > 1000)
            this.destroy();
        return this.isAlive();
    }

    isAlive() {
        return this.live;
    }

    destroy() {
        this.live = false;
    }
}
