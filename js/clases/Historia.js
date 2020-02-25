class Historia {
    constructor(historyArray) {
        this.counter = 0;
        this.text = historyArray;
        this.timeEllapsed = 10;
        this.historyBlock = document.createElement("div");
        this.historyBlock.setAttribute("id", "history");
        this.lastChar = 0;
        document.getElementsByTagName("body")[0].appendChild(this.historyBlock);
    }

    putText() {
        if (this.lastChar < this.text[this.counter].length) {
            this.historyBlock.innerHTML += this.text[this.counter].charAt(this.lastChar);
            this.lastChar++;
        }
    }

    update(dt) {
        this.timeEllapsed += dt;

        if (this.timeEllapsed > 15) {
            this.soundEffect = new Sound("historia/output"+this.counter+".mp3");
            this.soundEffect.play();
            this.timeEllapsed = 0;
            this.counter = (this.counter + 1) % this.text.length;
            this.lastChar = 0;
            this.historyBlock.innerText = "";
        }

        this.putText();
    }

}
