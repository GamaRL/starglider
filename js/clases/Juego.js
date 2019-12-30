/**
 * Project: starglider
 * Date: dicuembre 2019
 * Author: undefined
 * Class: Juego
 */

class Juego {
    constructor(id_element) {
        ////Instanciamos un nuevo objeto Scane////
        this.scene = new THREE.Scene();

        ////Instanciamos una cámara y se configura su posición////
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 0);
        this.camera.lookAt(new THREE.Vector3(0, 2, 0));

        ////Instanciamos un renderer que nos permite crear escenas en 3D, configuramos su tamaño////
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(new THREE.Color(0x080034));

        //Se crea un canvas dentro de "game_output para dibujar ahí las escenas
        document.getElementById(id_element).appendChild(this.renderer.domElement);

        ////flyControls nos permitira simular el movimiento permitiendonos girar y trasladarnos////
        this.flyControls = new THREE.FlyControls(this.camera, document.querySelector("#" + id_element));
        this.flyControls.movementSpeed = 1;
        this.flyControls.rollSpeed = Math.PI / 12;
        this.flyControls.autoForward = true;
        this.flyControls.dragToLook = false;

        this.time = new THREE.Clock(); // time nos permitirá ver la variación de timpo "real" que habrá entre la ejecución de dos ciclos render

        var light = new THREE.PointLight(0xffff, 3, 100);
        light.position.set(0, 0, 0);
        light.lookAt(0, 0, 0);
        this.scene.add(light);

        this.mira = new Mira(id_element);

        this.player = new Jugador(this.camera);

        this.targets = [];

        document.onkeypress = (evt) => {
            if (this.player.balas.length < 70 && evt.keyCode === 32) {
                let disparador = new THREE.Vector3(0, -0.3, 0);
                disparador.unproject(this.camera);
                let velocity = new THREE.Vector3(0, 0, 1);
                velocity.unproject(this.camera);

                velocity.sub(disparador).normalize();
                velocity.multiplyScalar(150);

                this.player.balas.push(new Bala(disparador, velocity));
            }
        };
    }

    maketargets() {
        for (let i = 0; i < 50; i++) {
            let x = (Math.random() - 0.5) * 17 - 8;
            let y = (Math.random() - 0.5) * 17 - 8;
            let z = (Math.random() - 0.5) * 17 - 8;
            this.targets[i] = new Nave(
                new THREE.Vector3(x, y, z),
                game.camera.position,
                this.models[0].clone()
            );

            this.targets[i].nave_img.name = "target" + i;
        }
    }

    update() {
        let delta = this.time.getDelta();
        this.mira.update();

        for (let i = 0; i < this.player.balas.length; i++) {
            var crash_object = this.player.balas[i].update(delta);

            if (crash_object) {
                this.scene.remove(crash_object);
                this.targets = this.targets.filter(target => target.name !== crash_object.name);
                muertos++;
                console.log(muertos);
            }
        }

        for (let i = 0; i < this.targets.length; i++) {
            this.targets[i].update(delta, this.camera.position);
        }
        this.player.balas = this.player.balas.filter(bala => bala.vida > 0);

        this.flyControls.update(delta);
        this.renderer.render(this.scene, this.camera);
    }


}
