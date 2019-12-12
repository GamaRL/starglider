/**
 * class vector3D
 * version 1.1
 * author undefined
 * date 12/11/2019
 * Nos permite implementar vectores en un espacio vectorial
 * R^3, así como realizar operaciones con ellos
 */

class vector3D {
    x;
    y;
    z;

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return;
    }

    add(vector) {
        /**
         * Se suma el vector que se pasa
         * de parámetro
         */
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
        return;
    }

    sub(vector) {
        /**
         * Le resta el vector que recibe
         * de parámetro
         */
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
        return;
    }

    scl(num) {
        /**
         * Multiplica el vector 
         * por un escalar num
         */
        this.x *= num;
        this.y *= num;
        this.z *= num;
        return;
    }

    getMag() {
        /**
         * Nos devuelve la magnitud
         * del vector
         */
        return Math.sqrt(this.x * 2 + this.y2 + this.z * 2);
    }

    setMag(num) {
        /**
         * Manteniedo la dirección y 
         * el sentido del vector se 
         * le asigna una nueva magnitud 
         */
        let scl = num / this.getMag();
        this.scl(scl);
        return;
    }

    static add(a, b) {
        /**
         * Retorna el vector resultante de
         * la suma de dos vectores
         */
        return new vector3D(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    static sub(a, b) {
        /**
         * Retorna el vector resultante de
         * la resta de dos vectores
         */
        return new vector3D(a.x - b.x, a.y - b.y, a.z - b.z);
    }
}