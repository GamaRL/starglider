class Historia {
    constructor(historyArray) {
        this.counter = 0;
        this.text = historyArray;
        this.timeEllapsed = 10;
        console.log(historyArray);
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
            this.timeEllapsed = 0;
            this.counter = (this.counter + 1) % this.text.length;
            this.lastChar = 0;
            this.historyBlock.innerText = "";
        }

        this.putText();
    }

}
