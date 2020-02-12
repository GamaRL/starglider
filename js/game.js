/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 */

let historyArray = [];
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let history = JSON.parse(this.responseText);
        history.text.forEach(phrase => {
            historyArray.push(phrase);
        });
    }
};

xmlhttp.open("GET", "../statics/archives/history.json", true);
xmlhttp.send();

let targets = [];
let loader = new THREE.GLTFLoader();
let models = [];
let destroy = 0;
let text = [];
let game;
let timeMeteoro = -20;

loader.load('../statics/3Dmodels/nave1.glb', model => {
    console.log(model.scene.children);
    models.push(new THREE.Group().add(model.scene.children[0]));


    loader.load('../statics/3Dmodels/nave2.glb', model => {
        models.push(model.scene.children[0]);
        loader.load('../statics/3Dmodels/nave3.glb', model => {
            models.push(new THREE.Group().add(model.scene.children[0]));
            loader.load('../statics/3Dmodels/nave.glb', model => {
                models.push(model.scene.children[2]);
                loader.load('../statics/3Dmodels/met1.glb', model => {
                    models.push(new THREE.Group().add(model.scene.children[0]));
                    loader.load('../statics/3Dmodels/met2.glb', model => {
                        models.push(new THREE.Group().add(model.scene.children[0]));
                        loader.load('../statics/3Dmodels/met3.glb', model => {
                            models.push(new THREE.Group().add(model.scene.children[0]));
                            loader.load('../statics/3Dmodels/met4.glb', model => {
                                models.push(new THREE.Group().add(model.scene.children[0]));
                                init();
                            }, undefined, error => console.log(error));
                        }, undefined, error => console.log(error));

                    }, undefined, error => console.log(error));

                }, undefined, error => console.log(error));

            }, undefined, error => console.log(error));

        }, undefined, error => console.log(error));

    }, undefined, error => console.log(error));

}, undefined, error => console.log(error));

function init() {

    game = new Juego("game_output", models, historyArray);

    let target_number = 0;

    function onResize() {
        game.camera.aspect = window.innerWidth / window.innerHeight;
        game.camera.updateProjectionMatrix();
        game.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onResize, false);

    render();

    function render() {
        game.update();

        if (game.targets[0].length < 5) {
            game.maketargets(target_number++, Nave, 0);
        }
        if (game.time.getElapsedTime() - timeMeteoro > 20) {
            game.maketargets(target_number++, Meteoro, 1);
            timeMeteoro += 20;
        }
        game.radar.render(game.camera);
        requestAnimationFrame(render);
    }


}
