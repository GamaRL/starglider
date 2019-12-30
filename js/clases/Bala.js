/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Bala
 */

class Bala {
    constructor(position, velocity) {
        this.velocity = new THREE.Vector3(velocity.x, velocity.y, velocity.z);
        this.dibujo = new THREE.Mesh(new THREE.SphereGeometry(0.1, 32, 32), new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        }));
        this.dibujo.position.set(position.x, position.y, position.z);
        this.vida = 3;
        game.scene.add(this.dibujo);
    }

    update(dt) {
        let intersects = this.cast_objects(this.velocity.length() * dt);
        let crash_object;

        let velocity = new THREE.Vector3(this.velocity.x, this.velocity.y, this.velocity.z);
        velocity.multiplyScalar(dt);

        if (intersects.length > 0) {
            this.vida = 0;
            crash_object = intersects[0].object;
            game.scene.remove(crash_object);
            console.log(crash_object);
        } else {

            this.dibujo.position.add(velocity);
            this.vida -= dt;
        }
        if (this.vida <= 0) {
            game.scene.remove(this.dibujo);
        }
        return crash_object;

    }

    cast_objects(distance) {
        let vel_norm = new THREE.Vector3();
        vel_norm.copy(this.velocity);
        vel_norm.normalize();
        let caster = new THREE.Raycaster(this.dibujo.position, vel_norm, 0, distance);

        return caster.intersectObjects(game.scene.children, false);

    }
}
