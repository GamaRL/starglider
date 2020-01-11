/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Bala
 */

class Bala {
    constructor(position, velocity, color) {
        this.velocity = new THREE.Vector3().copy(velocity);
        this.dibujo = new THREE.Mesh(new THREE.SphereBufferGeometry(0.1, 4, 4), new THREE.MeshBasicMaterial({
            color,
            wireframe: true
        }));
        this.dibujo.position.copy(position);
        this.vida = 0.5;
        game.scene.add(this.dibujo);
    }

    update(dt, targets) {
        let intersects = this.cast_objects(this.velocity.length() * dt, targets);
        let crash_object;

        let velocity = new THREE.Vector3(this.velocity.x, this.velocity.y, this.velocity.z);
        velocity.multiplyScalar(dt);

        if (intersects.length > 0 && this.vida > 0.45) {
            this.vida = 0;
            crash_object = intersects[0].object;
        } else {
            this.dibujo.position.add(velocity);
            this.vida -= dt;
        }
        if (this.vida <= 0) {
            game.scene.remove(this.dibujo);
        }
        return crash_object;

    }

    cast_objects(distance, targets) {
        let vel_norm = new THREE.Vector3();
        vel_norm.copy(this.velocity);
        vel_norm.normalize();
        let caster = new THREE.Raycaster(this.dibujo.position, vel_norm, 0, distance);

        return caster.intersectObjects(targets, false);

    }
}
