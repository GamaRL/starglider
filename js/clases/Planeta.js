/**
 * Project: starglider
 * Date: febrero 2020
 * Author: undefined
 * Class: Planeta
 */


class Planeta {
    /**********************************************************
     * Método constructor
     * Parámetros:
     *  -img_file (Object): Modelo 3D que representará
     *   al planeta en la escena
     *  -position (Object): Posición en la que se colocará el
     *   planeta
     ***********************************************************/
    constructor(img_file, position, img_effect) {
        function createMesh(geom, imageFile, cloud = false, back) {
            if(cloud){
                let texture = new THREE.TextureLoader().load("../statics/images/" + imageFile);
                let mat = new THREE.MeshLambertMaterial({opacity: 0.8, transparent: cloud});
                if(back){
                    mat.side = THREE.BackSide;
                }
                mat.map = texture;
                var mesh = new THREE.Mesh(geom, mat);
            }else{
                var planetTexture = new THREE.TextureLoader().load("../statics/images/" + imageFile);
                var normalTexture = new THREE.TextureLoader().load("../statics/images/" + imageFile);

                var planetMaterial = new THREE.MeshPhongMaterial({map: planetTexture, bumpMap: normalTexture});
                var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [planetMaterial]);

            }

            return mesh;

        }
        let random = Math.random();
        this.cloud = createMesh(new THREE.SphereGeometry( random * 60 + 140, 40, 40), img_effect, true, false);
        this.backcloud = createMesh(new THREE.SphereGeometry(random * 60 + 140, 40, 40), img_effect, true, true );
        this.figure = createMesh(new THREE.SphereGeometry(random * 60 + 130, 40, 40), img_file, false, false);
        this.figure.position.copy(position);
        this.cloud.position.copy(position);
        this.backcloud.position.copy(position);
        this.movementSpeed = (Math.random() - 0.5) * 0.005;
    }

    update() {
        this.figure.rotation.y += this.movementSpeed;
        this.cloud.rotation.y += this.movementSpeed;
        this.backcloud.rotation.y += this.movementSpeed;

    }
}
