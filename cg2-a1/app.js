import Renderer from './render/renderer.js';
import Scene from './render/scene.js';

import Controller from './controller/controller.js';

import ParticleSystem from './particle/particlesystem.js';
import ParticleEmitter from './particle/particleemitter.js';

import util from './util.js';

// called when the index.html is loaded by the browser
window.onload = () => {
  console.log('200: Page loaded');

  // get our canvas
  let canvas = util.byid('canvas2d');
  if (!canvas) util.fatal('canvas not found...');
  // get the 2D rendering context from canvas element
  let context = canvas.getContext('2d');
  if (!context) util.fatal('could not create 2D rendering context...');

  /* ParticleEmitters and their respective configurations */
  let circular = new ParticleSystem({
    emitter: new ParticleEmitter({
      position: { x: 400, y: 300 },
      velocity: { vx: 0, vy: 0 },
      circular: { rad: 50 },
      interval: 1,
    }),
    context: context,
    max_amount: 1000,
    type: 'img/path'
  });

  // create and populate our scene
  let scene = new Scene();
  scene.add([circular]);

  // stick the engine together
  let controller = new Controller(context, scene);
  let renderer = new Renderer(context, 'rgb(0, 0, 0)');

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
