/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Nave
 */

class Nave {
    constructor(position, grav_center, nave_img, radar) {
        this.velocidad = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5).setLength(2);

        this.desfase = (Math.random() - 0.5) * 4 * Math.PI;
        this.desfaseSpeed = (Math.random() - 0.5) / 0.5 * Math.random() / 100;

        this.vida = 50;
        this.nave_img = nave_img;
        this.nave_img.position.copy(position);
        game.scene.add(this.nave_img);

        let img_radar_geom = new THREE.SphereGeometry(0.1, 32, 32);
        let img_radar_mat = new THREE.MeshBasicMaterial({color: 0xff0000});
        this.img_radar = new THREE.Mesh(img_radar_geom, img_radar_mat);
        this.img_radar.position.copy(position);
        radar.scene.add(this.img_radar);
    }

    disparar(velocity, balas) {
        balas.push(new Bala(this.nave_img.position, velocity, 0xBD000E, new THREE.SphereBufferGeometry(0.01, 32, 32)));
    }

    update(dt, camera, balas) {
        let acc = new THREE.Vector3()
            .copy(this.nave_img.position)
            .sub(game.camera.position)
            .negate()
            .setLength(0.5);

        let distance = new THREE.Vector3().copy(camera.position).sub(this.nave_img.position).length();

        if (distance < 2.5) {
            acc.multiplyScalar(-3).cross(new THREE.Vector3(1,1,1));
        }

        this.nave_img.position.addScaledVector(this.velocidad, dt);
        this.velocidad.addScaledVector(acc, dt);
        this.nave_img.lookAt(camera.position);
        this.nave_img.rotation.z = this.desfase;
        this.desfase += this.desfaseSpeed;
        if (Math.abs(this.desfase) > 2 * Math.PI) {
            this.desfase = 0;
        }

        this.img_radar.position.copy(this.nave_img.position);

        if (distance < 20 && distance > 2 && Math.random() > 0.9) {
            let bala_velocity = new THREE.Vector3().copy(camera.position).sub(this.nave_img.position);
            bala_velocity.add(new THREE.Vector3(Math.random * 0.5 - 0.25, Math.random * 0.5 - 0.25, Math.random * 0.5 - 0.25));
            bala_velocity.normalize().multiplyScalar(50);
            this.disparar(bala_velocity, balas);
        }
    }


    destroy(scene, radar) {
        scene.remove(this.nave_img);
        radar.scene.remove(this.img_radar);
    }
}
