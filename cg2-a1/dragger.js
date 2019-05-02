/**
 * Initially created by Burak Günaydin (853872) at Beuth University
 */

const _ = undefined;
const colors = ['#F00', '#0F0'];

class Dragger {
  constructor(position) {
    this.position = position;
    this.radius = 10;
    this.hit = false;
    this.color = colors[0];
  }

  render = context => {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = this.color;
    context.fill();
    context.lineWidth = this.radius / 2;
    context.strokeStyle = '#FFF';
    context.stroke();
  };

  update = () => { };

  isHit = pos => {
    /* Formular to determine if point is within circle of dragger: Point is within circle if (x - a)^2 + (y - b)^2 < r^2 */
    const point = Math.pow(pos[0] - this.position.x, 2) + Math.pow(pos[1] - this.position.y, 2);
    this.hit = point < Math.pow(this.radius, 2);
  };

  drag = newPosition => {
    if (this.hit) {
      this.position = {
        x: newPosition[0], y: newPosition[1]
      };
      this.color = colors[1];
      return;
    }
    this.color = colors[0];
  };
}

export default Dragger;
