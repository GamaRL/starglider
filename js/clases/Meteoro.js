/**
 * Project: starglider
 * Date: febrero 2020
 * Author: undefined
 * Class: Meteoro
 */


class Meteoro {
    constructor(img, id) {
        this.img = img;
        this.score = Math.floor(100 * Math.random());
        this.vida = 500;
        this.img.position.copy(new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5).setLength(20));
        this.img.name = id;

        this.velocity = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).setLength(5 * Math.random() + 5);

        this.img_radar = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 32, 32),
            new THREE.MeshBasicMaterial({color: 0xFF0946})
        );

        this.img_radar.position.copy(this.img.position);
    }

    update(dt, player_position) {
        this.img.position.addScaledVector(this.velocity, dt);
        this.img_radar.position.copy(this.img.position);
        if (player_position.sub(this.img.position).length() > 100) {
            this.destroy();
        }
    }

    destroy() {
        this.vida = 0;
        this.isDestroy = true;
    }
}
