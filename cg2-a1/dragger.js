/**
 * Initially created by Burak Günaydin (853872) at Beuth University
 */
class Dragger {
  constructor(position, radius) {
    this.position = position;
    this.radius = 15;
    this.hit = false;
  }

  render = context => {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#000';
    context.fill();
    context.lineWidth = this.radius / 3;
    context.strokeStyle = '#FFF';
    context.stroke();
  };

  update = () => {

  };

  isHit = pos => {
    const point = Math.pow(pos[0] - this.position.x, 2) + Math.pow(pos[1] - this.position.y, 2);

    this.hit = point < Math.pow(this.radius, 2);
    console.log(this.hit);
  };

  drag = newPosition => {
    if (this.hit) this.position = { x: newPosition[0], y: newPosition[1] };
  };
}

export default Dragger;
