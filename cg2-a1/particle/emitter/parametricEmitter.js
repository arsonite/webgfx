/**
 * Created by Martin Puse (C) at Beuth University
 */
import ParticleEmitter from './particleEmitter.js';

import Point from '../../util/point.js';

const _ = undefined;

/**
 *
 */
class ParametricEmitter extends ParticleEmitter {
  constructor(config) {
    super(config);

    this.f = config.f;
    this.g = config.g;

    this.tRange = config.tRange;
    this.period = config.period;

    this.updateDistances();
  }

  /**
   * Parametric functions
   */
  u(t) {
    return this.coordinates[0].x + this.coordinates[0].x * this.f(t);
  }
  v(t) {
    return this.coordinates[0].y + this.coordinates[0].y * this.g(t);
  }
  /* Rotating the parametric curve by determined angle
   * https://www.youtube.com/watch?v=BPgq2AudoEo - How to Rotate any Curve by any Angle
   */
  /*
  u(t, a) {
    return t * Math.cos(a) - this.f(t) * Math.sin(a);
  }
  v(t, a) {
    return t * Math.sin(a) + this.g(t) * Math.cos(a);
  }
  */

  /**
   *
   */
  calculateParametricCurve = n => {
    this.curve = [];
    let tMin = this.tRange[0];
    let tMax = this.tRange[1];
    let t = tMin;
    for (let i = 0; i < n; i++) {
      let delta = (tMax - tMin) / n;
      //this.curve[i] = new Point(this.u(t, this.angle), this.v(t, this.angle));
      this.curve[i] = new Point(this.u(t), this.v(t));
      t = tMin + i * delta;
    }
  };

  /**
   * Updates the distances to reflect change of dragger movements
   */
  updateDistances = () => {
    this.distances = [];
    this.MAX_DISTANCE = 0;
    this.coordinates.forEach((coordinate, i) => {
      if (i + 1 >= this.coordinates.length) return;
      let nextPoint = this.coordinates[i + 1];
      let distance = coordinate.getDistance(nextPoint);
      this.distances.push(distance);
      this.MAX_DISTANCE += distance;
    });

    this.angle = this.coordinates[1].getAngle(this.coordinates[0]);

    this.calculateParametricCurve(100);
  };

  update = partSys => {
    this.draggers.forEach((dragger, i) => {
      this.coordinates[i].x = dragger.position.x;
      this.coordinates[i].y = dragger.position.y;
    });

    this.updateDistances();

    this.counter++;
    if (this.counter % this.interval === 0) this.emit(partSys);
  };

  render = (context, debug) => {
    if (!debug) return;

    for (let i = 1; i < this.curve.length; i++) {
      context.beginPath();
      context.moveTo(this.curve[i - 1].x, this.curve[i - 1].y);
      context.lineTo(this.curve[i].x, this.curve[i].y);
      context.lineWidth = 1;
      context.stroke();
    }
  };

  place = () => {
    let t;
    if (this.period === _) {
      t = Math.random();
    } else {
      t = (this.counter * 100) / this.period / 100;
    }
    if (t >= 1.0) this.counter = 0; // Resets the counter when 100%/1.0 is reached
    t = t * (this.tRange[1] - this.tRange[0]);

    //this.position = new Point(this.u(t, this.angle), this.v(t, this.angle));
    this.position = new Point(this.u(t), this.v(t));
  };
}
export default ParametricEmitter;
