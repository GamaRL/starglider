/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Mira
 */

class Mira {
    constructor(id_container) {
        this.img = document.createElement("img");
        this.img.setAttribute("id", "mira");
        this.img.setAttribute("src", "../statics/images/image.png");
        let container = document.getElementById(id_container);
        this.rotation = 0;
        container.appendChild(this.img);
    }

    checkTargets(targets, camera) {
        let pointer = new THREE.Vector3();
        camera.getWorldDirection(pointer);
        pointer.normalize();
        let caster = new THREE.Raycaster(camera.position, pointer, 0, 80);
        return caster.intersectObjects(targets, false);
    }

    update(targets, camera) {
        this.img.style.transform = "rotate(" + this.rotation + "deg)";
        if (this.rotation >= 360)
            this.rotation -= 360;
        this.rotation += 2;

        if (targets.length > 0) {
            if (this.checkTargets(targets, camera).length > 0) {
                this.img.classList.add("shoot")
            } else {
                this.img.classList.remove("shoot");
            }
        }
    }
}
