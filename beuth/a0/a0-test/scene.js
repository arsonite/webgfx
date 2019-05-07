import util from './util.js';

/**
 * @class Scene
 * a simple scene is a collection of things to be drawn,
 * plus a background color
 */

let Scene = function(context, bgFillStyle) {
  // remember the drawing context
  this.context = context;
  if (!context) throw new util.RuntimeError('Scene: no context provided', this);

  // remember background color
  this.bgFillStyle = bgFillStyle || '#DDDDDD';

  // list of objects that can be drawn
  this.drawableObjects = [];
};

let proto = Scene.prototype;

// add a drawable object to the scene
proto.add = function(drawableObject) {
  this.drawableObjects.push(drawableObject);
};

// call the specfied function for each object in the scene
proto.foreach = function(func) {
  for (let i = 0; i < this.drawableObjects.length; ++i) {
    func(this.drawableObjects[i]);
  }
};

// drawing the scene means first clearing the canvas
//   and then drawing each object
proto.draw = function() {
  let ctx = this.context;
  let width = ctx.canvas.width;
  let height = ctx.canvas.height;

  if (this.bgFillStyle === 'clear') {
    // clear canvas to the color of th eunderlying document
    ctx.clearRect(0, 0, width, height);
  } else {
    // clear canvas with specified background color
    ctx.fillStyle = this.bgFillStyle;
    ctx.fillRect(0, 0, width, height);
  }

  // loop over all drawable objects and call their draw() methods
  for (let i = 0; i < this.drawableObjects.length; ++i) {
    let obj = this.drawableObjects[i];
    obj.draw();
  }
};

// this module only exports the constructor for Scene objects
export default Scene;
