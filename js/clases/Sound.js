class Sound {
    constructor(nombres){
        this.listener = new THREE.AudioListener();
        this.audio = new THREE.Audio( this.listener );
        this.sound = new Audio( '../statics/media/' + nombres );
        this.sound.loop = false;
    }
    sonido(){
        this.sound.play();
        console.log("play");
    }
}