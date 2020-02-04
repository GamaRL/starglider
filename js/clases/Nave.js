/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Nave
 */

class Nave {

    /***************************************************
     * Método constructor
     * Parámetros:
     * -position (Object): Posición inicial de la nave
     * -nave_img (Object): Modelo 3D que representará
     *  la nave en la escena
     * -radar (Object): Objeto radar con el que se
     *  monitoriará la posición de la nave
     ***************************************************/
    constructor(position, nave_img, radar) {
        this.velocidad = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5).setLength(6);

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
        this.soundEffect = new Sound("laser_enemigo.mp3");
        this.soundDestroyEffect = new Sound("explosion.mp3");
    }

    /**
     * Método disparar:
     * @param velocity
     * @param balas
     */

    disparar(balas, camera) {
        this.soundEffect.sonido();
        let velocity = new THREE.Vector3()
            .copy(this.nave_img.position)
            .sub(camera.position)
            .setLength(-50)
            .add(new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).setLength(0.5));

        balas.push(new Bala(
            this.nave_img.position,
            velocity,
            0xBD000E,
            new THREE.SphereBufferGeometry(0.01, 32, 32)));
    }

    update(dt, camera, balas) {
        let acc = new THREE.Vector3()
            .copy(this.nave_img.position)
            .sub(game.camera.position)
            .negate()
            .setLength(2);

        let distance = new THREE.Vector3().copy(camera.position).sub(this.nave_img.position).length();

        if (distance < 4) {
            acc.multiplyScalar(-5);
        }

        this.nave_img.position.addScaledVector(this.velocidad, dt);
        this.velocidad.addScaledVector(acc, dt);

        if (this.velocidad.length() > 6) {
            this.velocidad.setLength(6);
        }

        this.nave_img.lookAt(camera.position);
        this.nave_img.rotateZ(this.desfase);

        this.desfase += this.desfase_vel;
        this.nave_img.rotateX(0.2);
        this.img_radar.position.copy(this.nave_img.position);

        if (distance < 15 && distance > 0.1 && Math.random() > 0.98) {
            this.disparar(balas, camera);
        }
    }

    destroy(scene, radar) {
        this.soundDestroyEffect.sonido();
        scene.remove(this.nave_img);
        radar.scene.remove(this.img_radar);
    }
}
