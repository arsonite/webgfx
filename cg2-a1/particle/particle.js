/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */

/**
 *
 */
class Particle {
  constructor({ x, y }, { vx, vy }, lifetime = 100, size = 1, color = '#FFF') {
    this.position = { x, y };
    /* Sets horizontal and vertical velocity properties (can also be negative) */
    this.velocity = { vx, vy };

    /* Initialize maximum and current lifetime */
    this.MAX_LIFETIME = this.lifetime = lifetime;
    this.size = size;
    this.color = color;
  }

  update = (acc = 0) => {
    this.position.x += this.velocity.vx;
    this.position.y += this.velocity.vy;

    this.lifetime--;
  };

  render = context => {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI, false);
    context.fillStyle = this.color;
    context.fill();
  };
}

export default Particle;
