/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Nave
 */

class Nave {
    constructor(position, grav_center, nave_img, radar) {
        this.velocidad = new THREE.Vector3(5*Math.random() - 2.5, 5*Math.random() - 2.5, 0);
        let radius = new THREE.Vector3().copy(grav_center).sub(position);
        this.velocidad.z = -(this.velocidad.x * radius.x + this.velocidad.y * radius.y) / radius.z;

        this.vida = 20;
        this.nave_img = nave_img;
        this.nave_img.position.copy(position);
        game.scene.add(this.nave_img);

        let img_radar_geom = new THREE.SphereGeometry(0.1, 32, 32);
        let img_radar_mat = new THREE.MeshBasicMaterial({color: 0x00ff00});
        this.img_radar = new THREE.Mesh(img_radar_geom, img_radar_mat);
        this.img_radar.position.copy(position);
        radar.scene.add(this.img_radar);
    }

    disparar(velocity, balas) {
        balas.push(new Bala(this.nave_img.position, velocity, 0xBD000E));
    }

    update(dt, camera, balas) {
        let acc = new THREE.Vector3()
            .copy(this.nave_img.position)
            .sub(game.camera.position)
            .negate()
            .normalize()
            .multiplyScalar(0.5);

        this.nave_img.position.addScaledVector(this.velocidad, dt);
        this.nave_img.lookAt(camera.position);
        this.velocidad.addScaledVector(acc, dt);

        this.img_radar.position.copy(this.nave_img.position);

        let distance = new THREE.Vector3().copy(camera.position).sub(this.nave_img.position).length();
        if (distance < 10 && distance > 5 && Math.random() > 0.95) {
            let bala_velocity = new THREE.Vector3().copy(camera.position).sub(this.nave_img.position);
            bala_velocity.add(new THREE.Vector3(Math.random*0.5 - 0.25, Math.random*0.5 - 0.25, Math.random*0.5 - 0.25));
            bala_velocity.normalize().multiplyScalar(150);
            this.disparar(bala_velocity, balas);
        }
    }

    destroy(scene, radar) {
        scene.remove(this.nave_img);
        radar.scene.remove(this.img_radar);
    }
}
