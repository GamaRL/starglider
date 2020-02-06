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
            trigger_probability: 0.99,
            bullet_speed: 50,
            bullet_damage: 5
        },
        {
            max_speed: 10,
            color: 0xFF124F,
            trigger_probability: 0.995,
            bullet_speed: 60,
            bullet_damage: 10
        },
        {
            max_speed: 15,
            color: 0xFF0000,
            trigger_probability: 0.9975,
            bullet_speed: 65,
            bullet_damage: 12
        }
    ];

    /***************************************************
     * Método constructor
     * Parámetros:
     * - nave_img (Object): Modelo 3D que representará
     *    la nave en la escena
     * - id (String): Cadena única que identificará a
     *    la nave
     * - level (Number): Nivel de la nave
     ****************************************************/
    constructor(nave_img, id, level) {
        this.velocidad = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5).normalize();

        this.vida = 50;

        this.img = nave_img;
        this.img.position.copy(new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5).setLength(25 - Math.random() * 5));

        this.desfase = Math.random() * Math.PI * 2;
        this.desfase_vel = (Math.random() - 0.5) * 0.02;
        this.img.name = id;

        this.img_radar = new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 32, 32),
            new THREE.MeshBasicMaterial({color: 0xff00ff})
        );

        this.img_radar.position.copy(this.img.position);

        this.soundEffect = new Sound("laser_enemigo.mp3");
        this.soundDestroyEffect = new Sound("explosion.mp3");
        this.level = level;
    }

    /*******************************************************
     * Método disparar
     *   Genera una nueva bala que apunta hacia el jugador
     * Parámetros:
     * - balas (Array): Arreglo de balas a las que se agregará
     *    la nueva bala generada
     * -player_position (Object): Vector que contiene la
     *   posición del jugador (A quien se busca disparar)
     ********************************************************/
    disparar(balas, player_position) {
        this.soundEffect.sonido();
        let velocity = new THREE.Vector3()
            .copy(this.img.position)
            .sub(player_position)
            .setLength(-Nave.level_info[this.level].bullet_speed)
            .add(new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).setLength(5));

        balas.push(new Bala(
            this.img.position,
            velocity,
            0xBD000E,
            new THREE.SphereBufferGeometry(0.02, 32, 32))
        );
    }

    update(dt, player_position, balas) {
        let acc = new THREE.Vector3()
            .copy(this.img.position)
            .sub(player_position)
            .negate()
            .setLength(2);

        let distance = new THREE.Vector3().copy(player_position).sub(this.img.position).length();

        if (distance < 4) {
            acc.multiplyScalar(-5);
        }

        this.img.position.addScaledVector(this.velocidad, dt);
        this.velocidad.addScaledVector(acc, dt);

        if (this.velocidad.length() > Nave.level_info[this.level].max_speed) {
            this.velocidad.setLength(Nave.level_info[this.level].max_speed);
        }

        this.img.lookAt(player_position);
        this.img.rotateZ(this.desfase);

        this.desfase += this.desfase_vel;
        this.img.rotateX(0.2);
        this.img_radar.position.copy(this.img.position);

        if (distance < 20 && distance > 0.05 && Math.random() > Nave.level_info[this.level].trigger_probability) {
            this.disparar(balas, player_position);
        }
    }

    /**********************************
     * Método destroy
     * Simula la destrucción de la nave
     **********************************/
    destroy() {
        this.soundDestroyEffect.sonido();
    }
}
