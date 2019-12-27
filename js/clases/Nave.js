/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Nave
 */

class Nave {
    constructor(position, velocidad, nave_img) {
        // this.position = position;
        // this.velocidad = velocidad;

        this.nave_img = nave_img;
        this.nave_img.position.set(position.x, position.y, position.z);
        // this.nave_img.copy(nave_img, true);
        // this.nave_img.position.set(position.x, position.y, position.z);
        // console.log(nave_img);
        scene.add(this.nave_img);
    }
}
