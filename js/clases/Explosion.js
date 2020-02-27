/**
 * Project: starglider
 * Date: febrero 2020
 * Author: undefined
 * Class: Explosion
 */

class Explosion {

    static textures = [
        new THREE.TextureLoader().load("../statics/images/exp1.png"),
        new THREE.TextureLoader().load("../statics/images/exp2.png"),
        new THREE.TextureLoader().load("../statics/images/exp3.png"),
        new THREE.TextureLoader().load("../statics/images/exp4.png"),
        new THREE.TextureLoader().load("../statics/images/exp5.png"),
        new THREE.TextureLoader().load("../statics/images/exp6.png"),
        new THREE.TextureLoader().load("../statics/images/exp7.png"),
        new THREE.TextureLoader().load("../statics/images/exp8.png"),
        new THREE.TextureLoader().load("../statics/images/exp9.png"),
        new THREE.TextureLoader().load("../statics/images/exp10.png"),
        new THREE.TextureLoader().load("../statics/images/exp11.png"),
        new THREE.TextureLoader().load("../statics/images/exp12.png"),
        new THREE.TextureLoader().load("../statics/images/exp13.png"),
        new THREE.TextureLoader().load("../statics/images/exp14.png"),
        new THREE.TextureLoader().load("../statics/images/exp15.png"),
        new THREE.TextureLoader().load("../statics/images/exp16.png")
    ];

    constructor(position, number) {
        this.effect = new THREE.Group();
        this.effect.position.set(position.x, position.y, position.z);

        this.live = true;

        this.particles = [];
        for (let i = 0; i < number; i++) {
            let particle = new THREE.Sprite(
                new THREE.SpriteMaterial({
                        opacity: 1,
                        color: 0xffffff,
                        transparent: true,
                        map: Explosion.textures[Math.floor(Math.random() * 16)]
                    }
                ));
            let size = (Math.random() + 1) / 4;
            particle.scale.set(size, size, size);
            let velocity = new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).setLength(3 * Math.random() + 1);
            this.effect.add(particle);
            this.particles.push({particle, velocity});
        }
        this.time = 0;
    }

    update(dt) {
        this.particles.forEach(particle => {
            particle.particle.position.addScaledVector(particle.velocity, dt);
        });

        this.time += dt;
        if (this.time > 0.5)
            this.destroy();
        return this.live;
    }

    generateSprite() {
        let canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;

        let context = canvas.getContext('2d');
        let gradient = context.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2);

        gradient.addColorStop(0.0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(255,255,255,.8)');
        gradient.addColorStop(0.5, 'rgba(255,255,255,.05)');
        gradient.addColorStop(0.8, 'rgba(255,255,255,.01)');
        gradient.addColorStop(1.0, 'rgba(255,255,255,0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        let texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    destroy() {
        this.live = false;
    }
}
