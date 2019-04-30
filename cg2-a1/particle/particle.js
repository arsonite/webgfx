/**
 * Initially created by Martin Puse (C) at Beuth University
 * Extended and built upon by Burak Günaydin (853872)
 */

/**
 * 
 */
class Particle {
  constructor(position, velocity, lifetime = 100, size = 1, color = '#FFF') {
    this.position = position;
    /* Sets horizontal and vertical velocity properties (can also be negative) */
    this.velocity = velocity;

    /* Initialize maximum and current lifetime */
    this.MAX_LIFETIME = this.lifetime = lifetime;
    this.size = size;
    this.color = color;
  }

  update = (acc = 0) => {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.lifetime--;
  };

  render = context => {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.size, this.size);
  };
}

export default Particle;
