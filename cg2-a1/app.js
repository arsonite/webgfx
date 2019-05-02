import Renderer from './render/renderer.js';
import Scene from './render/scene.js';

import Controller from './controller/controller.js';

import ParticleSystem from './particle/particleSystem.js';
import ParticleEmitter from './particle/emitter/particleEmitter.js';
import CircularEmitter from './particle/emitter/circularEmitter.js';

import util from './util.js';

// called when the index.html is loaded by the browser
window.onload = () => {
  console.log('200: Page loaded');

  // get our canvas
  let canvas = util.byid('canvas2d');
  if (!canvas) util.fatal('canvas not found...');
  const f = 1.0;
  canvas.height = canvas.offsetHeight * f;
  canvas.width = canvas.offsetWidth * f;
  window.onresize = () => {
    canvas.height = canvas.offsetHeight * f;
    canvas.width = canvas.offsetWidth * f;
  };

  // get the 2D rendering context from canvas element
  let context = canvas.getContext('2d');
  if (!context) util.fatal('could not create 2D rendering context...');

  /* ParticleEmitters and their respective configurations */
  let emitters = [];

  let standard = new ParticleSystem({
    emitter: new ParticleEmitter({
      coordinates: { x: 150, y: 150 },
      velocity: { vx: 1, vy: 1 },
      interval: 1,
      n: 1
    }),
    context: context,
    max_amount: 100,
    src: './res/snowflake.svg'
  });
  emitters.push(standard);

  let circular = new ParticleSystem({
    emitter: new CircularEmitter({
      coordinates: { x: 100, y: 500 },
      radius: 75,
      period: 100,
      interval: 1,
      n: 1
    }),
    context: context,
    max_amount: 1000
  });
  emitters.push(circular);

  // create and populate our scene
  let scene = new Scene();
  emitters.forEach(emitter => {
    scene.add([emitter]);
  });

  // stick the engine together
  let controller = new Controller(context, scene);
  let renderer = new Renderer(context, 'rgb(10, 20, 30)');

  // for fps measuring
  var before = 0;
  var fps = 0;

  let mainloop = function () {
    // integrate the scene
    if (!controller.paused) {
      scene.update();
    }

    // render next frame
    renderer.render(scene, controller);

    // hud fps
    context.font = '12pt Arial';
    context.fillStyle = '#FFF';
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
