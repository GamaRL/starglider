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
        this.camera.lookAt(new THREE.Vector3(0, 0, 1));

        ////Instanciamos un renderer que nos permite crear escenas en 3D, configuramos su tamaño////
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(new THREE.Color(0x080034));

        //Se crea un canvas dentro de "game_output para dibujar ahí las escenas
        document.getElementById(id_element).appendChild(this.renderer.domElement);

        ////flyControls nos permitira simular el movimiento permitiendonos girar y trasladarnos////
        this.flyControls = new THREE.FlyControls(this.camera, document.querySelector("#" + id_element));
        // this.flyControls.movementSpeed = 0.5;
        this.flyControls.rollSpeed = Math.PI / 10;
        this.flyControls.autoForward = true;
        this.flyControls.dragToLook = false;

        this.time = new THREE.Clock();
        // time nos permitirá ver la variación de
        // tiempo "real" que habrá entre la ejecución
        // de dos ciclos render

        var light = new THREE.PointLight(0xffff, 1, 100);
        light.position.set(0, 0, 0);
        light.lookAt(0, 20, 0);
        this.scene.add(light);

        this.mira = new Mira(id_element);
        this.radar = new Radar(id_element);

        this.player = new Jugador(this.camera);

        this.targets = []; //Guarda las objetos tipo Nave que se vayan creando en la escena
        this.targets_objects = []; //Guarda los las imégenes que se van creando en la escena. Será un subconjunto de targets

        this.balas_enemigas = [];

        document.onkeypress = (evt) => {
            if (this.player.balas.length < 70 && evt.keyCode === 32) {
                let disparador = new THREE.Vector3(0, -0.3, 0);
                disparador.unproject(this.camera);

                let velocity = new THREE.Vector3();
                this.camera.getWorldDirection(velocity).normalize();
                velocity.multiplyScalar(150);

                this.player.balas.push(new Bala(disparador, velocity, 0x0EBDB8));
            }
        };
    };

    maketargets() {
        for (let i = 0; i < 20;    i++) {
            let x = (Math.random() - 0.5) * 17;
            let y = (Math.random() - 0.5) * 17;
            let z = (Math.random() - 0.5) * 17;
            this.targets[i] = new Nave(
                new THREE.Vector3(x, y, z),
                this.camera.position,
                this.models[0].clone(),
                this.radar
            );

            this.targets[i].nave_img.name = "target" + i;
            this.targets_objects.push(this.targets[i].nave_img);
        }
    }

    update() {
        let delta = this.time.getDelta();
        this.mira.update();

        this.balas_enemigas.forEach(bala => {
            bala.update(delta, []);
        });
        this.balas_enemigas = this.balas_enemigas.filter(bala => bala.vida > 0);


        for (let i = 0; i < this.player.balas.length; i++) {
            var crash_object = this.player.balas[i].update(delta, this.targets_objects);

            if (crash_object) {
                this.targets = this.targets.filter(
                    target => {
                        let response = true;
                        if (target.nave_img.name === crash_object.name) {
                            if (target.vida > 10)
                                target.vida -= 10;
                            else {
                                target.destroy(this.scene, this.radar);
                                muertos++;
                                console.log(muertos);
                                response = false;
                            }
                        }
                        return response;
                    });
                // console.log(this.targets.length);
            }
        }

        for (let i = 0; i < this.targets.length; i++) {
            this.targets[i].update(delta, this.camera, this.balas_enemigas);
        }
        this.player.balas = this.player.balas.filter(bala => bala.vida > 0);

        this.flyControls.update(delta);
        this.renderer.render(this.scene, this.camera);
    }


}
