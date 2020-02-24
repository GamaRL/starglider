/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Nave
 */

class Nave {

    static level_info = [
        {
            max_speed: 8,
            color: 0xFF6A09,
            acc_length: 3,
            trigger_probability: 0.975,
            bullet_speed: 50,
            bullet_damage: 5,
            score: 10,
            distance_target: 20,
            vida: 100
        },
        {
            max_speed: 10,
            color: 0xFF124F,
            acc_length: 4,
            trigger_probability: 0.97,
            bullet_speed: 60,
            bullet_damage: 5,
            score: 15,
            distance_target: 15,
            vida: 150
        },
        {
            max_speed: 15,
            color: 0xFF0000,
            acc_length: 7,
            trigger_probability: 0.98,
            bullet_speed: 60,
            bullet_damage: 10,
            score: 25,
            distance_target: 50,
            vida: 50
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
    constructor(nave_img, id, level, player_position) {
        this.velocidad = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5).setLength(Nave.level_info[level].max_speed);

        this.vida = Nave.level_info[level].vida;

        this.img = nave_img;
        this.img.position.copy(new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5).setLength(50 - Math.random() * 5)
            .add(player_position));

        this.desfase = Math.random() * Math.PI / 2;
        this.img.name = id;

        this.level = level;

        this.img_radar = new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 32, 32),
            new THREE.MeshBasicMaterial({color: Nave.level_info[this.level].color})
        );
        60
        this.img_radar.position.copy(this.img.position);

        this.soundEffect = new Sound("laser_enemigo.mp3");
        this.soundDestroyEffect = new Sound("explosion.mp3");
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
        this.soundEffect.play();
        let velocity = new THREE.Vector3()
            .copy(this.img.position)
            .sub(player_position)
            .setLength(-Nave.level_info[this.level].bullet_speed)
            .add(new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).setLength(1));

        balas.push(new Bala(
            this.img.position,
            velocity,
            0xBD000E,
            new THREE.SphereBufferGeometry(0.02, 32, 32),
            Nave.level_info[this.level].bullet_damage
        ));
    }


    /*******************************************************
     * Método update: Actualiza la posición de la nave,
     *   así como su velocidad. De la misma manera,
     *   determina si la nave puede disparar o no
     * Parámetros:
     *  -dt (Number): Un diferencial de tiempo con base en el
     *   cual se determinan las variaciones del movimiento
     *  -player_position (Object): El vector de posición
     *   del jugador
     *  -balas (Array): Contiene las balas enemigas
     *********************************************************/
    update(dt, player_position, balas) {
        let acc = new THREE.Vector3()
            .copy(this.img.position)
            .sub(player_position)
            .negate()
            .setLength(Nave.level_info[this.level].acc_length);

        let distance = new THREE.Vector3().copy(player_position).sub(this.img.position).length();

        if (distance < 4) {
            acc.multiplyScalar(-7);
        }

        this.img.position.addScaledVector(this.velocidad, dt);
        this.velocidad.addScaledVector(acc, dt);

        if (this.velocidad.length() > Nave.level_info[this.level].max_speed) {
            this.velocidad.setLength(Nave.level_info[this.level].max_speed);
        }

        this.img.lookAt(player_position);
        if (this.level === 2) {
            this.img.rotateY(-1.5);
            // this.img.rotateY(this.desfase);
        } else {
            this.img.rotateX(-0.3);
            // this.img.rotateX(-this.desfase);
        }
        this.img_radar.position.copy(this.img.position);

        if (distance < Nave.level_info[this.level].distance_target && distance > 0.05 && Math.random() > Nave.level_info[this.level].trigger_probability) {
            this.disparar(balas, player_position);
        }
    }

    /**********************************
     * Método destroy
     * Simula la destrucción de la nave
     **********************************/
    destroy() {
        this.soundDestroyEffect.play(0.3);
        this.vida = 0;
        this.isDestroy = true;
    }
}
