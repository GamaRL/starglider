class Sound {
    constructor(nombres) {
        let listener = new THREE.AudioListener();
        let audio = new THREE.Audio(listener);
        this.soundEffect = new Audio('../statics/media/' + nombres);
        this.soundEffect.loop = false;
    }

    play() {
        this.soundEffect.play();
    }
}
