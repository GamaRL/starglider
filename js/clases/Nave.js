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
            Math.random() - 0.5).normalize();

        this.vida = 100;
        this.nave_img = nave_img;
        this.nave_img.position.copy(position);
        this.desfase = Math.random() * Math.PI * 2;
        this.desfase_vel = (Math.random() - 0.5) * 0.02;
        game.scene.add(this.nave_img);

        let img_radar_geom = new THREE.SphereGeometry(0.2, 32, 32);
        let img_radar_mat = new THREE.MeshBasicMaterial({color: 0xff00ff});
        this.img_radar = new THREE.Mesh(img_radar_geom, img_radar_mat);
        this.img_radar.position.copy(position);
        radar.scene.add(this.img_radar);
    }

    disparar(velocity, balas) {
        this.soundEffect = new Sound("laser_enemigo.mp3");
        this.soundEffect.sonido();
        balas.push(new Bala(this.nave_img.position, velocity, 0xBD000E, new THREE.SphereBufferGeometry(0.01, 32, 32)));
    }

    update(dt, camera, balas) {
        let acc = new THREE.Vector3()
            .copy(this.nave_img.position)
            .sub(game.camera.position)
            .negate()
            .setLength(1.5);

        let distance = new THREE.Vector3().copy(camera.position).sub(this.nave_img.position).length();

        if (distance < 3) {
            acc.multiplyScalar(-4);
        }

        this.nave_img.position.addScaledVector(this.velocidad, dt);
        this.velocidad.addScaledVector(acc, dt);
        if (this.velocidad.length() > 8) {
            this.velocidad.setLength(8);
        }
        this.nave_img.lookAt(camera.position);
        this.nave_img.rotateZ(this.desfase);

        this.desfase += this.desfase_vel;
        this.nave_img.rotateX(0.2);
        this.img_radar.position.copy(this.nave_img.position);

        if (distance < 20 && distance > 0.5 && Math.random() > 0.95) {
            let bala_velocity = new THREE.Vector3().copy(camera.position).sub(this.nave_img.position);

            // bala_velocity.add(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).setLength(0.1));
            bala_velocity.setLength(300);
            this.disparar(bala_velocity, balas);
        }
    }


    destroy(scene, radar) {
        scene.remove(this.nave_img);
        radar.scene.remove(this.img_radar);
    }
}
