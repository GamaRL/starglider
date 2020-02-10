/**
 * Project: starglider
 * Date: febrero 2020
 * Author: undefined
 * Class: Planeta
 */


class Planeta {
    /**********************************************************
     * Métod constructor
     * Parámetros:
     *  -img_file (Object): Modelo 3D que representará
     *   al planeta en la escena
     *  -position (Object): Posición en la que se colocará el
     *   planeta
     ***********************************************************/
    constructor(img_file, position) {
        function createMesh(geom, imageFile) {
            let texture = new THREE.TextureLoader().load("../statics/images/" + imageFile);
            let mat = new THREE.MeshLambertMaterial({opacity: 0.8});
            mat.map = texture;
            return new THREE.Mesh(geom, mat);
        }

        this.figure = createMesh(new THREE.SphereGeometry(Math.random() * 40 + 50, 40, 40), img_file);
        this.figure.position.copy(position);
        this.movementSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
        this.figure.rotation.y += this.movementSpeed;
    }
}
