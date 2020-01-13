/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 */

// window.onload = init;
let targets = [];
let nave_img;
let loader = new THREE.GLTFLoader();

let muertos = 0;
loader.load('../statics/3Dmodels/nave.glb', function (gltf) {
    nave_img = gltf.scene.children[2];
    nave_img.scale.set(0.2, 0.2, 0.2);
    init();
}, undefined, function (error) {
    console.error(error);
});


function init() {

    game = new Juego("game_output", [nave_img]);
    game.maketargets();

    render();

    function render() {
        game.update();
        game.radar.render(game.camera);
        requestAnimationFrame(render);
    }
}
