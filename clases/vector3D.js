/*
* @class vector3D
* @version 1.0
* @author Gamaliel Ríos Lira
* @date 04/12/2019
* Nos permite implementar vetores en 3D, así como realizar
* operaciones con ellos.
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
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
    return;
  }

  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
    return;
  }

  scl(num) {
  /*
  * @param {number}
  * Multiplica el vector por un escalar
  */
    this.x *= num;
    this.y *= num;
    this.z *= num;
    return;
  }

  getMag() {
    return Math.sqrt(this.x*2 + this.y2 + this.z*2);
  }

  setMag(num) {
    let scl = num / this.getMag();
    this.scl(scl);
    return;
  }

  static add(a,b) {
    return new vector3D(a.x + b.x, a.y + b.y, a.z + b.z);
  }

  static sub(a,b) {
    return new vector3D(a.x - b.x, a.y - b.y, a.z - b.z);
  }
}
