/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 */

window.onload = init;

let camera;
let renderer;
let scene;
let flyControls;
let time;
let targets = [];
let nave_img;

function config() {
    ////Instanciamos un nuevo objeto Scane////
    scene = new THREE.Scene();

    ////Instanciamos una cámara y se configura su posición////
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, -2);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    ////Instanciamos un renderer que nos permite crear escenas en 3D, configuramos su tamaño////
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x080034));

    //Se crea un canvas dentro de "game_output para dibujar ahí las escenas
    document.getElementById("game_output").appendChild(renderer.domElement);

    ////flyControls nos permitira simular el movimiento permitiendonos girar y trasladarnos////
    flyControls = new THREE.FlyControls(camera, document.querySelector("#game_output"));
    flyControls.movementSpeed = 0.5;
    flyControls.rollSpeed = Math.PI / 30;
    // flyControls.autoForward = true;
    flyControls.dragToLook = false;

    time = new THREE.Clock();
    var light = new THREE.PointLight(0xffff, 3, 100);
    light.position.set(0, 0, 0);
    light.lookAt(0, 0, 0);
    scene.add(light);

    let ax = new THREE.AxesHelper(100);
    scene.add(ax);
}

let balas = [];

function maketargets(nave_img) {
    for (let i = 0; i < 50; i++) {
        targets[i] = new Nave(new THREE.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5), new THREE.Vector3(), nave_img.clone());
        targets[i].nave_img.name = "target" + i;
    }
    console.log(scene);
}

function init() {
    config();
    let mira = new Mira();
    var loader = new THREE.GLTFLoader();

    loader.load('../statics/3Dmodels/nave.glb', function (gltf) {
        nave_img = gltf.scene.children[2];
        nave_img.scale.set(0.1, 0.1, 0.1);
        nave_img.rotation.set(0, 0, Math.PI / 2);
        console.log(nave_img);
        maketargets(nave_img);
    }, undefined, function (error) {
        console.error(error);
    });

    document.onkeypress = (evt) => {
        if (balas.length < 50 && evt.keyCode === 32) {
            let disparador = new THREE.Vector3(0, -0.3, 0);
            disparador.unproject(camera);
            let velocity = new THREE.Vector3(0, 0, 1);
            velocity.unproject(camera);

            velocity.sub(disparador).normalize();
            velocity.multiplyScalar(10);

            balas.push(new Bala(disparador, velocity));
        }
    };


    render();

    function render() {
        let delta = time.getDelta();
        mira.update();

        for (let i = 0; i < balas.length; i++) {
            var crash_object = balas[i].update(delta);

            if (crash_object) {
                scene.remove(crash_object);
                targets = targets.filter(target => target.name !== crash_object.name);
            }
        }
        balas = balas.filter(bala => bala.vida > 0);

        flyControls.update(delta);
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}
