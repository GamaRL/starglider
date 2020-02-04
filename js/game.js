/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 */

var arre = new Array();
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var history = JSON.parse(this.responseText);
        for(var i=0; i < history.text.length ; i++){
            arre[i]= history.text[i];
        }
    }
};

xmlhttp.open("GET", "../statics/archives/history.txt", true);
xmlhttp.send();

let targets = [];
let loader = new THREE.GLTFLoader();
let models = [];
let destroy = 0;
let soundEffects = [];
let text = [];
let game;

loader.load('../statics/3Dmodels/nave.glb', function(gltf) {
    // models[1] = gltf.scene.children[2];
    let group = new THREE.Group();
    group.add(gltf.scene.children[2]);
    models[1] = group;
    models[1].scale.set(0.03, 0.03, 0.03);

    loader.load('../statics/3Dmodels/navebuena.glb', function (gltf_) {
        models[0] = gltf_.scene.children[0];
        init();
    }, undefined, function (error) {
        console.error(error);
    });
});

function init() {

    game = new Juego("game_output", models, arre);

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

        if (game.targets.length < 6) {
            game.maketargets(target_number++);
        }
        game.radar.render(game.camera);
        requestAnimationFrame(render);
    }


}
