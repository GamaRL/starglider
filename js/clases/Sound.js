class Sound {
    constructor(nombres) {
        this.soundEffect = new Audio('../statics/media/' + nombres);
        this.soundEffect.loop = false;
    }

    play(volumen = 1) {
        this.soundEffect.volume = volumen;
        this.soundEffect.play();
    }
}
