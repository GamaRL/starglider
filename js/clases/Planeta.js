/**
 * Project: starglider
 * Date: febrero 2020
 * Author: undefined
 * Class: Planeta
 */


class Planeta {
    constructor(img_file, position, size, scene) {
        function createMesh(geom, imageFile) {
            let texture = new THREE.TextureLoader().load("../statics/images/" + imageFile);
            let mat = new THREE.MeshLambertMaterial({opacity: 0.8});
            mat.map = texture;
            return new THREE.Mesh(geom, mat);
        }

        this.figure = createMesh(new THREE.SphereGeometry(size, 40, 40), img_file);
        this.figure.position.copy(position);
        this.movementSpeed = (Math.random() - 0.5) * 0.02;
        scene.add(this.figure);
    }

    update() {
        this.figure.rotation.y += this.movementSpeed;
    }
}
