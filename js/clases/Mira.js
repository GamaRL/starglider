/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Mira
 */

class Mira {
    constructor() {
        this.img = document.createElement("img");
        this.img.setAttribute("id", "mira");
        this.img.setAttribute("src", "../statics/images/mira.png")
        let container = document.getElementById("game_output");
        this.rotation = 0;
        container.appendChild(this.img);
    }

    update() {
        this.img.style.transform = "rotate(" + this.rotation + "deg)";
        if (this.rotation >= 360)
            this.rotation -= 360;
        this.rotation += 2;
    }
}
