/**
 * Project: starglider
 * Date: diciembre 2019
 * Author: undefined
 * Class: Bala
 */

class Bala {

    /*************************************************************
     * Parámetros:
     * -position (Vector3): Lugar de donde se dispara
     * -velocity (Vector3): Vector velocidad con el que se moverá
     * -color (number): Color del que será la bala (Se recomienda
     *   usar formato hexadecimal)
     * -geometry (Geometry): Geometría de THREE.js que se usará
     *   para representar la bala
     *************************************************************/
    constructor(position, velocity, color, geometry = new THREE.SphereBufferGeometry(0.08, 5, 5), damage=10) {
        this.velocity = new THREE.Vector3().copy(velocity);
        this.dibujo = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            color,
            wireframe: true
        }));
        this.dibujo.position.copy(position);
        this.vida = 3;
        this.damage = damage;
        game.scene.add(this.dibujo);
    }

    /********************************************************************
     * Método update: Se encarga de actualizar los atributos del objeto.
     * Parámetros:
     * -dt (Number): Un "diferencial de tiempo" con el
     *   que se deberán hacer los cálculos para el movimiento
     * -targets (Array): Contiene a objetos Object3D con los
     *   que puede colisionar
     ********************************************************************/
    update(dt, targets) {
        let intersects = this.cast_objects(this.velocity.length() * dt, targets);
        let crash_object;

        let velocity = this.velocity.clone();

        if (intersects.length > 0 && this.vida > 0) {
            this.vida = 0;
            crash_object = intersects[0].object.parent;
        } else {
            this.dibujo.position.addScaledVector(velocity,dt);
            this.vida -= dt;
        }

        return crash_object;
    }

    /**************************************************
     * Método cast_objects: Se encarga de verificar si
     * a cierta distancia hay algún objeto con el que
     * pueda colisionar
     * Parámetros:
     * -distance (number): Máxima distancia a la que
     *   verificar
     * -tagets (Array): Objetos con los que puede
     *   colisionar
     **************************************************/
    cast_objects(distance, targets) {
        let vel_norm = new THREE.Vector3();
        vel_norm.copy(this.velocity);
        vel_norm.normalize();
        let caster = new THREE.Raycaster(this.dibujo.position, vel_norm, 0, distance);

        return caster.intersectObjects(targets, true);
    }
}
