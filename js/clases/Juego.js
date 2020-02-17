/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Juego
 */

class Juego {
    /*********************************************
     *  Método constructor
     *  Parámetros:
     * - id_element (String): Nos indica el id del
     *    elemento html div en donde se va a crear
     *    la escena.
     * - models (Array): Contiene los modelos 3D que
     *    se necesitan para jugar el juego.
     *    (Por ejemplo, las naves)
     *********************************************/
    constructor(id_element, models, historyArray) {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.camera.position.set(0, 0, 0);

        this.camera.lookAt(new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5).setLength(10));

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(new THREE.Color(0x000000));

        document.getElementById(id_element).appendChild(this.renderer.domElement);

        this.flyControls = new THREE.FlyControls(this.camera, document.querySelector("#" + id_element));
        this.flyControls.movementSpeed = 1.5;
        this.flyControls.rollSpeed = Math.PI / 6;
        this.flyControls.autoForward = true;
        this.flyControls.dragToLook = true;

        this.historia = new Historia(historyArray);

        this.maxSpeedActivated = false;

        this.time = new THREE.Clock();

        let light1 = new THREE.PointLight(0xffffff, 1.5, 1200);
        light1.position.set(0, 0, 500);

        let light2 = new THREE.PointLight(0xffffff, 1.5, 1200);
        light2.position.set(0, 0, -500);

        this.scene.add(light1);
        this.scene.add(light2);

        this.mira = new Mira(id_element);
        this.radar = new Radar(id_element);

        this.models = models;

        this.choosePlanets();

        this.player = new Jugador(this.camera, this.models[3]);
        this.scene.add(this.player.nave_img);

        this.targets = [[], []]; //Guarda los enemigos que se van creando en el juego
        this.targets_objects = [[], []]; //Guarda el objeto Object3D correspondiente a los enemigos
        this.balas_enemigas = []; //Guarda todas las balas enemigas

        this.drawStars(0xBD3673, 50);
        this.drawStars(0xBDA220, 200);
        this.drawStars(0x4B93BD, 100);
        this.drawStars(0x0B46BD, 10);
        this.drawStars(0xBD6405, 100);
        this.drawStars(0x9C3ABD, 500);
        this.drawStars(0xffffff, 800);

        this.soundTheme = new Sound("theme.mp3");

        document.onkeydown = (evt) => {
            /************************************************
             * Se agrega un evento que nos permitirá disparar
             * al presionar la tecla de espacio
             ************************************************/
            if (evt.keyCode === 32) {
                this.soundTheme.play();
                this.player.disparar();
            }

            if (evt.keyCode === 87) {
                if (!this.maxSpeedActivated)
                    this.flyControls.movementSpeed = 10;
            }
        };

        document.onkeyup = (evt) => {
            if (evt.keyCode === 87) {
                this.flyControls.movementSpeed = 1.5;
            }
        };

        window.addEventListener('resize', this.onResize, false)
    };

    /*******************************************
     * Método choosePlanets
     *   Nos permite elegir texturas aleatorias
     *   y posisciona los cuatro planetas en la
     *   escena.
     *******************************************/
    async choosePlanets() {
        function chooseNumber() {
            return Math.ceil(Math.random() * 4);
        }

        let folders = ["Clouds", "Gaseous", "Habitable", "Inhospitable", "Terrestrial"];
        let positions = [
            new THREE.Vector3(200, -100, 200),
            new THREE.Vector3(200, -100, -200),
            new THREE.Vector3(-200, -100, 200),
            new THREE.Vector3(-200, -100, -200),
            new THREE.Vector3(0, 250, 0)
        ];
        this.planets = [];
        folders.forEach(folder => {
            let newPlanet = new Planeta(
                folder + "/" + folder + chooseNumber() + ".png",
                positions.pop());
            this.planets.push(newPlanet);
            this.scene.add(newPlanet.figure);
        });

    }

    /*******************************************************************
     * Método drawStars
     *   Hace un sprite con estrellas aleatorias y lo agrega a la escena
     * Parámetros:
     * - color (Number): Valor del color en hexadecimal
     * - number (Number): Número de estrellas a dibujar
     *******************************************************************/
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

    /****************************************************
     * Método chooseEnemyLevel
     *   Elige el nivel de los enemigos de tal manera que
     *   con el tiempo vaya aumentando
     * Return:
     * - level (Number)
     ****************************************************/
    chooseEnemyLevel() {
        let fx = this.player.puntaje * 1.5 + 20;
        console.log(fx);
        if (fx > 200)
            return 2;
        if (fx > 100)
            return 1;
        if (fx > 0)
            return 0;
    }

    /*************************************************************
     * Método makeTargets
     *   Genera un nuevo enemigo una posición aleatoria
     * Parámetros:
     * - target_number (Number): Número de naves enemigas generadas
     *    a través del juego ingrementado en una unidad
     **************************************************************/
    async maketargets(target_number, constructor, arrayIndex) {
        let img;
        let level;
        if (arrayIndex === 1) {
            img = this.models[4 + Math.floor((Math.random() - 0.01) * 4)].clone();
        } else {
            level = this.chooseEnemyLevel();
            img = this.models[level].clone();
        }

        let new_target = new constructor(
            img,
            "target" + target_number,
            level,
            this.player.nave_img.position.clone()
        );

        this.targets[arrayIndex].push(new_target);
        this.targets_objects[arrayIndex].push(new_target.img);

        this.scene.add(new_target.img);
        this.radar.scene.add(new_target.img_radar);
    }

    /*********************************************
     * Método removeBalas: Elimina todas aquellas
     *   balas que no tengan más vida
     * Parámetros:
     * - balas (Array): Arreglo con las las balas
     *    que deseamos "purgar"
     *********************************************/
    removeBalas(balas) {
        return balas.filter(bala => {
            if (bala.vida <= 0) {
                this.scene.remove(bala.dibujo);
                return false
            } else {
                return true
            }
        });
    }


    /*****************************************************
     * Método update: se encarga de actualizar todos
     *   los componentes del juego cada vez que se ejecuta
     *****************************************************/
    update() {
        this.planets.forEach(planet => {
            planet.update();
        });

        let delta = this.time.getDelta();

        this.historia.update(delta);

        this.balas_enemigas.forEach(bala => {
            let crash = bala.update(delta, [this.player.nave_img]);
            this.player.crashed(crash, bala.damage);
        });

        this.player.balas.forEach(bala => {

            let crash_object = bala.update(delta, this.targets_objects[0]);
            crash_object = (!crash_object) ? bala.update(delta, this.targets_objects[1]) : crash_object;

            if (crash_object) {
                this.targets.forEach(target_array => {
                    target_array.forEach(target => {
                        if (target.img.name === crash_object.name) {
                            if (target.vida > 10) {
                                target.vida -= bala.damage;
                            } else if (!target.isDestroy) {
                                target.destroy();
                                if (target.level !== undefined)
                                    this.player.addScore(Nave.level_info[target.level].score);
                                else
                                    this.player.addScore(target.score);
                                console.log(this.player.puntaje);
                            }
                        }
                    });
                })
            }
        });

        this.mira.update(this.targets_objects[0].concat(this.targets_objects[1]), this.camera);

        let targetsUpdate = [];
        this.targets.forEach(targetArray => {
            targetArray.forEach(target => {
                target.update(delta, this.camera.position.clone(), this.balas_enemigas);
            });

            targetsUpdate.push(targetArray.filter(target => {
                if (target.isDestroy) {
                    this.scene.remove(target.img);
                    this.radar.scene.remove(target.img_radar);
                    return false;
                } else {
                    return true;
                }
            }));
        });

        this.targets = targetsUpdate;

        this.player.balas = this.removeBalas(this.player.balas);
        this.balas_enemigas = this.removeBalas(this.balas_enemigas);

        this.player.update(delta);

        this.flyControls.update(delta);
        this.renderer.render(this.scene, this.camera);
    }

    playerIsAlive() {
        return this.player.vida > 0;
    }

    endGame() {
        let modal = document.getElementById("modal");
        modal.style.display = "block";

        let data = {puntaje: this.player.puntaje};
        $.ajax({
            url: "../php/puntajeInfo.php",
            data,
            type: "post",
            dataType: "json",
            success: response => {
                console.log(response);
                $(".n_resultado").html(`<span>${response[0][0]}</span>${response[0][1]}`);
                $(".b_resultado").html(`<span>${response[1][0]}</span>${response[1][1]}`);
            },
            error: error => {
                console.log(error);
            }
        })
    }
}


