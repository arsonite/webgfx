import Dragger from './dragger.js';
import vec2 from './vec2.js';
import util from './util.js';

/**
 *  A simple line that can be dragged
 *  around by its endpoints.
 *  Parameters:
 *  - context: result of Canvas.getContext("2d")
 *  - scene:   Scene object for redrawing the canvas
 *  - point0 and point: vec2 objects representing the start and end point
 *  - lineStyle: object defining width and color attributes for line drawing
 */
let Line = function(context, scene, point0, point1, lineStyle) {
  console.log('creating line...');
  this.context = context || fatalError('Line2D: no context.');

  // draw style for drawing the line
  this.lineStyle = lineStyle || { width: '2', color: 'green' };

  // convert to vec2 just in case the points were given as arrays
  let p0 = new vec2(point0[0], point0[1]);
  let p1 = new vec2(point1[0], point1[1]);

  // store control points as an array of type vec2
  this.controlPoint = [p0, p1];

  // create draggers
  let draggerStyle = { radius: 4, color: 'green', width: 0, fill: true };
  this.showDraggers = true;
  this.draggers = [];
  this.draggers.push(
    new Dragger(context, scene, this.controlPoint[0], draggerStyle)
  );
  this.draggers.push(
    new Dragger(context, scene, this.controlPoint[1], draggerStyle)
  );
};

Line.prototype.draw = function() {
  // draw actual line
  this.context.beginPath();

  // set points to be drawn
  this.context.moveTo(this.controlPoint[0].x, this.controlPoint[0].y);
  this.context.lineTo(this.controlPoint[1].x, this.controlPoint[1].y);

  // set drawing style
  this.context.lineWidth = this.lineStyle.width;
  this.context.strokeStyle = this.lineStyle.color;

  // actually start drawing
  this.context.stroke();

  // draw draggers (on top)
  if (this.showDraggers) {
    for (let i = 0; i < this.draggers.length; ++i) {
      this.draggers[i].draw();
    }
  }
};

export default Line;
