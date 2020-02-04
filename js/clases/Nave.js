/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Nave
 */

class Nave {

    static level_info = [
        {
            max_speed: 6,
            color: 0xFF6A09,
            trigger_probability: 0.975,
            bullet_speed: 50,
            bullet_damage: 5
        },
        {
            max_speed: 10,
            color: 0xFF124F,
            trigger_probability: 0.9725,
            bullet_speed: 60,
            bullet_damage: 10
        },
        {
            max_speed: 15,
            color: 0xFF0000,
            trigger_probability: 0.970,
            bullet_speed: 65,
            bullet_damage: 12
        }
    ];

    /***************************************************
     * Método constructor
     * Parámetros:
     * -position (Object): Posición inicial de la nave
     * -nave_img (Object): Modelo 3D que representará
     *  la nave en la escena
     * -radar (Object): Objeto radar con el que se
     *  monitoriará la posición de la nave
     ***************************************************/
    constructor(position, nave_img, radar, id, level) {
        this.velocidad = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5).setLength(6);

        this.vida = 50;
        this.nave_img = nave_img;
        this.nave_img.position.copy(position);
        this.desfase = Math.random() * Math.PI * 2;
        this.desfase_vel = (Math.random() - 0.5) * 0.02;
        this.nave_img.name = id;

        let img_radar_geom = new THREE.SphereGeometry(0.2, 32, 32);
        let img_radar_mat = new THREE.MeshBasicMaterial({color: 0xff00ff});
        this.img_radar = new THREE.Mesh(img_radar_geom, img_radar_mat);
        this.img_radar.position.copy(position);
        radar.scene.add(this.img_radar);

        this.soundEffect = new Sound("laser_enemigo.mp3");
        this.soundDestroyEffect = new Sound("explosion.mp3");
        this.level = level;
    }

    /**
     * Método disparar:
     * @param velocity
     * @param balas
     */

    disparar(balas, player_position) {
        this.soundEffect.sonido();
        let velocity = new THREE.Vector3()
            .copy(this.nave_img.position)
            .sub(player_position)
            .setLength(-50)
            .add(new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).setLength(0.01));

        balas.push(new Bala(
            this.nave_img.position,
            velocity,
            0xBD000E,
            new THREE.SphereBufferGeometry(0.02, 32, 32))
        );
    }

    update(dt, player_position, balas) {
        let acc = new THREE.Vector3()
            .copy(this.nave_img.position)
            .sub(player_position)
            .negate()
            .setLength(2);

        let distance = new THREE.Vector3().copy(player_position).sub(this.nave_img.position).length();

        if (distance < 4) {
            acc.multiplyScalar(-5);
        }

        this.nave_img.position.addScaledVector(this.velocidad, dt);
        this.velocidad.addScaledVector(acc, dt);

        if (this.velocidad.length() > 6) {
            this.velocidad.setLength(6);
        }

        this.nave_img.lookAt(player_position);
        this.nave_img.rotateZ(this.desfase);

        this.desfase += this.desfase_vel;
        this.nave_img.rotateX(0.2);
        this.img_radar.position.copy(this.nave_img.position);

        if (distance < 20 && distance > 0.05 && Math.random() > 0.975) {
            this.disparar(balas, player_position);
        }
    }

    destroy(scene, radar) {
        this.soundDestroyEffect.sonido();
    }
}
