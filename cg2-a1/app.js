import Renderer from './render/renderer.js';
import Scene from './render/scene.js';

import Controller from './controller/controller.js';

import ParticleSystem from './particle/particleSystem.js';
import ParticleEmitter from './particle/particleEmitter.js';
import CircularEmitter from './particle/circularEmitter.js';

import util from './util.js';

// called when the index.html is loaded by the browser
window.onload = () => {
  console.log('200: Page loaded');

  // get our canvas
  let canvas = util.byid('canvas2d');
  if (!canvas) util.fatal('canvas not found...');
  canvas.height = canvas.offsetHeight;
  canvas.width = canvas.offsetWidth;

  window.onresize = () => {
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
  }

  // get the 2D rendering context from canvas element
  let context = canvas.getContext('2d');
  if (!context) util.fatal('could not create 2D rendering context...');

  /* ParticleEmitters and their respective configurations */
  let emitters = [];

  let standard = new ParticleSystem({
    emitter: new ParticleEmitter({
      coordinates: { x: 150, y: 150 },
      velocity: { x: 1, y: 1 },
      interval: 1,
      n: 10
    }),
    context: context,
    max_amount: 1000,
    type: 'img/path'
  });
  //emitters.push(standard);

  let circular = new ParticleSystem({
    emitter: new CircularEmitter({
      coordinates: { x: 600, y: 400 },
      random: false,
      radius: 75,
      period: 150,
      interval: 1,
      n: 10
    }),
    context: context,
    max_amount: 1000
  });
  emitters.push(circular);

  let spiral = new ParticleSystem({
    emitter: new CircularEmitter({
      coordinates: { x: 400, y: 300 },
      velocity: { x: 1, y: 1 },
      random: false,
      radius: 100,
      period: 100,
      interval: 1,
      n: 10
    }),
    context: context,
    max_amount: 1000
  });
  //emitters.push(spiral);

  // create and populate our scene
  let scene = new Scene();
  emitters.forEach(emitter => {
    scene.add([emitter]);
  })

  // stick the engine together
  let controller = new Controller(context, scene);
  let renderer = new Renderer(context, 'rgb(10, 20, 30)');

  // for fps measuring
  var before = 0;
  var fps = 0;
  let delta;

  let mainloop = function () {
    // integrate the scene
    if (!controller.paused) {
      scene.update();
    }

    // render next frame
    renderer.render(scene, controller);

    // hud fps
    context.font = '12pt Arial';
    context.fillStyle = 'white';
    context.fillText(`fps: ${fps}`, 10, 25);

    // let the browser do the fps thing
    requestAnimationFrame(() => {
      // measure fps
      let now = performance.now();
      fps = Math.trunc(1 / ((now - before) * 0.001));
      before = now;

      mainloop();
    });
  };

  // start
  mainloop();
};
