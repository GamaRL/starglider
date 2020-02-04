class Historia {
    constructor(arre) {
        this.historiaAux= 1;
        this.text = [];
        this.f =0;
        this.Aux=1;
        for(this.i in arre){
            this.text[this.i] = arre[this.i];
        }
        this.historyBlock = document.createElement("div");
        this.historyBlock.setAttribute("id", "historia");
    }



    update(abs, rel){
        if(abs > this.historiaAux *15 && this.text.length>this.historiaAux){
            if(this.f < this.text[this.historiaAux].length){
                this.historyBlock.innerHTML += this.text[this.historiaAux].charAt(this.f);
                document.getElementsByTagName("body")[0].appendChild(this.historyBlock);
                this.f++;


            }else{
                if(abs > ((this.historiaAux +1) * 15) -1){
                    this.historiaAux++;
                    this.historyBlock.innerHTML = '';
                }
            }
        }else{
            this.f =0;
        }
    }

}