/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 */

// window.onload = init;
let targets = [];
// let planets = [];
// let nave_img;
let loader = new THREE.GLTFLoader();
let models = [];
let muertos = 0;
var game;
loader.load('../statics/3Dmodels/nave.glb', function(gltf) {
    // models[1] = gltf.scene.children[2];
    let group = new THREE.Group();
    group.add(gltf.scene.children[2]);
    models[1] = group;
    models[1].scale.set(0.2, 0.2, 0.2);
    // models[1].rotateX(Math.PI/2);

    loader.load('../statics/3Dmodels/navebuena.glb', function (gltf) {
        console.log(gltf.scene.children);
        models[0] = gltf.scene.children[0];
        // models[0].scale.set(0.15, 0.15, 0.15);
        init();
    }, undefined, function (error) {
        console.error(error);
    });
});






function init() {

    game = new Juego("game_output", models);
    let target_number = 0;
    function onResize() {
        game.camera.aspect = window.innerWidth / window.innerHeight;
        game.camera.updateProjectionMatrix();
        game.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize',onResize, false);

    render();

    function render() {
        game.update();
        if (game.targets.length < 15) {
            game.maketargets(target_number++);
        }
        game.radar.render(game.camera);
        requestAnimationFrame(render);
    }
}
