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
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.camera.position.set(0, 10, 0);
        this.camera.lookAt(new THREE.Vector3());
        // this.camera.lookAt(new THREE.Vector3(
        //     Math.random() - 0.5,
        //     Math.random() - 0.5,
        //     Math.random() - 0.5).setLength(10));

        ////Instanciamos un renderer que nos permite crear escenas en 3D, configuramos su tamaño////
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(new THREE.Color(0x000000));

        //Se crea un canvas dentro de "game_output para dibujar ahí las escenas
        document.getElementById(id_element).appendChild(this.renderer.domElement);

        ////flyControls nos permitira simular el movimiento permitiendonos girar y trasladarnos////
        this.flyControls = new THREE.FlyControls(this.camera, document.querySelector("#" + id_element));
        this.flyControls.movementSpeed = 1;
        this.flyControls.rollSpeed = Math.PI / 10;
        this.flyControls.autoForward = true;
        this.flyControls.dragToLook = false;

        this.escudo = new Escudo();


        this.maxSpeedActivated = false;

        this.time = new THREE.Clock(); //Nos permite llevar la cuenta del tiempo en el juego

        let light1 = new THREE.PointLight(0xffffff, 1.5, 1200);
        light1.position.set(0, 0, 500);

        let light2 = new THREE.PointLight(0xffffff, 1.5, 1200);
        light2.position.set(0, 0, -500);

        this.scene.add(light1);
        this.scene.add(light2);

        this.mira = new Mira(id_element);
        this.radar = new Radar(id_element);

        this.models = models;

        function createMesh(geom, imageFile) {
            let texture = new THREE.TextureLoader().load("../statics/images/" + imageFile);
            let mat = new THREE.MeshLambertMaterial({opacity: 0.8});
            mat.map = texture;
            return new THREE.Mesh(geom, mat);
        }

        let planet = createMesh(new THREE.SphereGeometry(100, 40, 40), "planetAmap.jpg");

        planet.position.set(0, -200, 200);

        let mars = createMesh(new THREE.SphereGeometry(70, 40, 40), "planetBmap.png");

        mars.position.set(0, 200, 200);

        let neptune = createMesh(new THREE.SphereGeometry(52, 42, 42), "neptunemap.jpg");

        neptune.position.set(-250, -0, -50);

        let venus = createMesh(new THREE.SphereGeometry(40, 42, 42), "planetCmap.jpg");

        venus.position.set(100, -100, -100);

        //let planetA = createMesh(new THREE.SphereGeometry(70, 42, 42), "planetAmap.jpg");

        //planetA.position.set(150, -30, 200);

        this.planets = [];

        this.planets.push(planet);
        this.planets.push(mars);
        this.planets.push(neptune);
        this.planets.push(venus);
        this.scene.add(planet);
        this.scene.add(mars);
        this.scene.add(neptune);
        this.scene.add(venus);
        this.player = new Jugador(this.camera, this.models[1]);
        this.scene.add(this.player.nave_img);

        this.targets = []; //Guarda los enemigos que se van creando en el juego
        this.targets_objects = []; //Guarda el objeto Object3D correspondiente a los enemigos
        this.balas_enemigas = []; //Guarda todas las balas enemigas

        this.drawStars(0xBD3673, 50);
        this.drawStars(0xBDA220, 200);
        this.drawStars(0x4B93BD, 100);
        this.drawStars(0x0B46BD, 10);
        this.drawStars(0xBD6405, 100);
        this.drawStars(0x9C3ABD, 500);
        this.drawStars(0xffffff, 800);


        document.onkeydown = (evt) => {
            /************************************************
             * Se agrega un evento que nos permitirá disparar
             * al presionar la tecla de espacio
             ************************************************/
            if (evt.keyCode === 32) {
                this.soundEffect = new Sound("laser.mp3");
                this.soundEffect.sonido();
                let disparador1 = new THREE.Vector3(1, 0, 0).unproject(this.camera);
                let disparador2 = new THREE.Vector3(-1, 0, 0).unproject(this.camera);

                //Las balas salen disparadas en la dirección en la que el jugador está jugando
                let velocity = new THREE.Vector3();
                this.camera.getWorldDirection(velocity);
                velocity.setLength(200); //

                this.player.balas.push(new Bala(disparador1, velocity, 0x0BBD20));
                this.player.balas.push(new Bala(disparador2, velocity, 0x0BBD20));
            }

            if (evt.keyCode === 87) {
                if (!this.maxSpeedActivated)
                    this.flyControls.movementSpeed = 10;
            }
        };

        document.onkeypress = (evt) => {

            if (evt.keyCode == 112 && this.escudo.life == Escudo.max_life) {

                if (!this.escudo.isActivated()) {
                    this.escudo.activate();
                    console.log(this.player.nave_img.position);
                    console.log(this.camera.position)
                }
            }
        };

        document.onkeyup = (evt) => {
            if (evt.keyCode === 87) {
                this.flyControls.movementSpeed = 1;
            }
        };

        window.addEventListener('resize', this.onResize, false)
    };


    async drawStars(color, number) {
        function generateSprite() {
            let canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
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

        let geom = new THREE.Geometry();
        let material = new THREE.PointsMaterial({
            size: 7,
            transparent: true,
            blending: THREE.AdditiveBlending,
            color,
            map: generateSprite()
        });
        for (let i = 0; i < number; i++) {
            let particle = new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).setLength(250 + Math.random() * 750);
            geom.vertices.push(particle);
        }
        let cloud = new THREE.Points(geom, material);
        this.scene.add(cloud);
    }

    async maketargets(target_number) {
        let position = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5);
        position.setLength(30 - Math.random() * 5);
        let new_target = new Nave(
            // position.add(this.camera.position),
            position,
            this.models[0].clone(),
            this.radar
        );

        this.targets.push(new_target);

        new_target.nave_img.name = "target" + target_number;
        this.targets_objects.push(new_target.nave_img);
    }


    update() {
        for (let i = 0; i < this.planets.length; i++) {
            this.planets[i].rotation.y += 0.001;
        }
        //Se obtiene el tempo que ha pasado desde la ultima ejecución de update()
        let delta = this.time.getDelta();

        this.mira.update(this.targets_objects, this.camera);

        this.balas_enemigas.forEach(bala => {
            let crash = bala.update(delta, [this.player.nave_img]);
            if (crash && !this.escudo.isActivated()) {
                this.player.vida -= 5;
                this.camera.rotation.z += (Math.random() / 2 + 0.5) / 20;
                setTimeout(function (camera) {
                    camera.rotation.z -= (Math.random() / 2 + 0.5) / 20;
                }, 100, this.camera);
                if (this.player.vida <= 0) {
                    this.player.vida = 0;
                }
            } else if (crash) {
                this.escudo.underFire();
            }
        });

        this.escudo.update(delta);

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
                                this.soundEffect = new Sound("explosion.mp3");
                                this.soundEffect.sonido();
                                target.destroy(this.scene, this.radar);
                                destroy++;
                                console.log(destroy);
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


