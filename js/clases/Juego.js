/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Juego
 */

class Juego {
    /*********************************************
     *  Parámetros:
     * -id_element (String): Nos indica el id del
     *   elemento html div en donde se va a crear
     *   la escena.
     * -models (Array): Contiene los modelos 3D que
     *   se necesitan para jugar el juego.
     *   (Por ejemplo, las naves)
     *********************************************/

    constructor(id_element, models) {
        ////Instanciamos un nuevo objeto Scane////
        this.scene = new THREE.Scene();

        ////Instanciamos una cámara y se configura su posición////
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 0);
        this.camera.lookAt(new THREE.Vector3(0, 0, 10));

        ////Instanciamos un renderer que nos permite crear escenas en 3D, configuramos su tamaño////
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(new THREE.Color(0x0b0b23));

        //Se crea un canvas dentro de "game_output para dibujar ahí las escenas
        document.getElementById(id_element).appendChild(this.renderer.domElement);

        ////flyControls nos permitira simular el movimiento permitiendonos girar y trasladarnos////
        this.flyControls = new THREE.FlyControls(this.camera, document.querySelector("#" + id_element));
        this.flyControls.movementSpeed = 2;
        this.flyControls.rollSpeed = Math.PI / 9;
        this.flyControls.autoForward = true;
        this.flyControls.dragToLook = false;

        this.time = new THREE.Clock(); //Nos permite llevar la cuenta del tiempo en el juego

        var light = new THREE.PointLight(0xffffff, 3, 400);
        light.position.set(0, 0, 0);

        this.scene.add(light);

        this.mira = new Mira(id_element);
        this.radar = new Radar(id_element);

        this.models = models;

        let planet = createMesh(new THREE.SphereGeometry(130, 32, 32), "jupiter.jpg");

        planet.position.set(0, -200, 200);

        let mars = createMesh(new THREE.SphereGeometry(100, 32, 32), "mars.jpg");

        mars.position.set(0, 200, 200);

        let neptune = createMesh(new THREE.SphereGeometry(70, 32, 32), "neptuno.jpg");

        neptune.position.set(-300, -100, -200);

        this.planets = [];
        this.planets.push(planet);
        this.planets.push(mars);
        this.planets.push(neptune);
        this.scene.add(planet);
        this.scene.add(mars);
        this.scene.add(neptune);
        this.player = new Jugador(this.camera, this.models[0]);
        this.scene.add(this.player.nave_img);

        this.targets = []; //Guarda los enemigos que se van creando en el juego
        this.targets_objects = []; //Guarda el objeto Object3D con correspondiente a los enemigos
        this.balas_enemigas = []; //Guarda todas las balas enemigas

        this.drawStars();

        document.onkeydown = (evt) => {
            /************************************************
             * Se agrega un evento que nos permitirá disparar
             * al presionar la tecla de espacio
             ************************************************/
            if (evt.keyCode === 32) {
                let disparador1 = new THREE.Vector3(1, 0, 0).unproject(this.camera);
                let disparador2 = new THREE.Vector3(-1, 0, 0).unproject(this.camera);

                //Las balas salen disparadas en la dirección en la que el jugador está jugando
                let velocity = new THREE.Vector3();
                this.camera.getWorldDirection(velocity);
                velocity.setLength(500); //

                this.player.balas.push(new Bala(disparador1, velocity, 0x0BBD20));
                this.player.balas.push(new Bala(disparador2, velocity, 0x0BBD20));
            }
        };
    };



    drawStars() {
        /*Genera 100 estrellas aleatorias a una distancia aleatoria entre 250 y 750 metros del origen*/
        let s_geom = new THREE.SphereBufferGeometry(1, 32, 32);
        let s_mat = new THREE.MeshBasicMaterial({color: 0xffffff});

        for (let i = 0; i < 100; i++) {
            let s = new THREE.Mesh(s_geom, s_mat);

            let pos = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
            pos.normalize().multiplyScalar(Math.random() * 500 + 250);

            s.position.copy(pos);
            this.scene.add(s);
        }
    }

    maketargets(target_number) {
        let x = (Math.random() - 0.5) * 30;
        let y = (Math.random() - 0.5) * 30;
        let z = (Math.random() - 0.5) * 30;
        let new_target = new Nave(
            new THREE.Vector3(x, y, z).add(this.camera.position),
            this.camera.position,
            this.models[0].clone(),
            this.radar
        );

        this.targets.push(new_target);

        new_target.nave_img.name = "target" + target_number;
        this.targets_objects.push(new_target.nave_img);
    }


    update() {
        for(let i = 0; i<this.planets.length; i++){
            this.planets[i].rotation.y += 0.0009;
        }
        //Se obtiene el tempo que ha pasado desde la ultima ejecución de update()
        let delta = this.time.getDelta();

        this.mira.update();

        this.balas_enemigas.forEach(bala => {
            let crash = bala.update(delta, [this.player.nave_img]);
            if (crash)
                this.player.vida -= 10;
        });

        this.balas_enemigas = this.balas_enemigas.filter(bala => bala.vida > 0);

        //Se ejecuta un update para cada bala del jugador
        for (let i = 0; i < this.player.balas.length; i++) {

            //El método update de balas devuelve un crash_object en caso de haber colisionado
            var crash_object = this.player.balas[i].update(delta, this.targets_objects);

            if (crash_object) {
                //Se eliminan los objetivos que tengan vida menor a 0
                this.targets = this.targets.filter(
                    target => {
                        let response = true;
                        if (target.nave_img.name === crash_object.name) {
                            if (target.vida > 10) {
                                target.vida -= 10;
                            } else {
                                target.destroy(this.scene, this.radar);
                                muertos++;
                                console.log(muertos);
                                response = false;
                            }
                        }
                        return response;
                    });
            }
        }

        for (let i = 0; i < this.targets.length; i++) {
            this.targets[i].update(delta, this.camera.clone(), this.balas_enemigas);
        }

        //Se eliminan las balas que ya no tengan tiempo de vida
        this.player.balas = this.player.balas.filter(bala => bala.vida > 0);

        this.player.update();
        this.flyControls.update(delta);
        this.renderer.render(this.scene, this.camera);
    }
}

function createMesh(geom, imageFile) {
    let texture = THREE.ImageUtils.loadTexture("../statics/images/" + imageFile);
    let mat = new THREE.MeshPhongMaterial();
    mat.map = texture;
    return new THREE.Mesh(geom, mat);
}
