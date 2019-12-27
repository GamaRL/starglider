/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Nave
 */

class Nave {
    constructor(position, grav_center, nave_img) {
        this.velocidad = new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, 0);
        let radius = new THREE.Vector3().copy(grav_center).sub(position);
        this.velocidad.y = -(this.velocidad.x*radius.x + this.velocidad.y*radius.y)/radius.z;
        this.velocidad.normalize().multiplyScalar(radius.length()**(1/2));
        // let mag_vel = (grav_center.sub(position).length) ** (1 / 2);
        console.log(this.velocidad);
        this.nave_img = nave_img;
        this.nave_img.position.set(position.x, position.y, position.z);
        scene.add(this.nave_img);
    }

    update(dt) {
        let acc = new THREE.Vector3(this.nave_img.position.x, this.nave_img.position.y, this.nave_img.position.z).sub(camera.position).normalize().negate();

        this.nave_img.position.addScaledVector(this.velocidad, dt);
        this.velocidad.addScaledVector(acc, dt);
    }
}
