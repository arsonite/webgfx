import util from './util.js';

/* An emitter knows only how much and where to spawn particles.
 */
class ParticleEmitter {
  constructor(config) {
    this.pos = config.pos;
    this.interval = config.interval;
  }

  /*
    update() sollte entscheiden, wann der Emitter Partikel in seinem zugewiesenem
    Partikelsystem erzeugt.
  */
  update = partSys => {
    this.emit(partSys);
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
    this.pos = this.pos;
    this.vel = { vx: util.rand(-1, 1), vy: util.rand(-1, 1) };
    this.acc = -1;
    // TODO: place a particle with the emitter settings
  };
}

export default ParticleEmitter;
