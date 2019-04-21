import util from './util.js';

const _ = undefined;

/* An emitter knows only how much and where to spawn particles.
 */
class ParticleEmitter {
  constructor(config) {
    this.coord = config.coord !== _ ? config.coord : { x: 400, y: 300 };
    this.interval = config.interval !== _ ? config.interval : 1;
    this.circular = config.circular !== _ ? config.circular : _;

    this.counter = 0;
  }

  /*
    Ein ParticleSystem erhält einen ParticleEmitter und Informationen über die Particle,
    die es enthält. Der ParticleEmitter kümmert sich ausschließlich um das Platzieren
    neuer Particle, während das ParticleSystem sich um den Lebenszyklus der Particle
    kümmert. Das Erscheinungbild steuern die Particle selbst.
  */

  /*
    update() sollte entscheiden, wann der Emitter Partikel in seinem zugewiesenem
    Partikelsystem erzeugt.
  */
  update = partSys => {
    this.counter++;
    if (this.counter % this.interval === 0) this.emit(partSys);
  };

  emit = partSys => {
    this.place(partSys);
    partSys.create(10);
  };

  /*
    Die place() Methode ist das Herzstück eines Emitters. Hier sollte ausgerechnet
    werden, wo sich ein neu erzeugtes Partikel befinden wird (und welche
    Startgeschwindigkeit es hat).
  */
  place = partSys => {
    if (this.circular !== _) {
      let randAngle = Math.random() * Math.PI * 2; // Calculates a random circular angle
      this.pos = {
        x: this.coord.x + Math.cos(randAngle) * this.circular.rad,
        y: this.coord.y + Math.sin(randAngle) * this.circular.rad
      };

      this.vel = { vx: 0, vy: 0 };
      return;
    }
    this.pos = this.coord;
    this.vel = { vx: util.rand(-1, 1), vy: util.rand(-1, 1) };
    this.acc = -1;
    // TODO: place a particle with the emitter settings
  };
}

export default ParticleEmitter;
