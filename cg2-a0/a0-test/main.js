/*
 * Entry point of the demo.
 * The 'main' function gets executed when this module is loaded per script tag.
 */

import webglDemo from './webgldemo.js';
import Scene from './scene.js';
import Line from './line.js';
import util from './util.js';

let main = function() {
  try {
    /*
     *  Canvas 2D drawing example
     */

    console.log('Executing 2D canvas test.');
    let canvas = document.getElementById('canvas2d');
    let context2D = canvas.getContext('2d');

    // create a scene with a curve in it
    let scene = new Scene(context2D, '#EDEDED');
    let line = new Line(context2D, scene, [50, 100], [250, 100]);
    scene.add(line);

    // local function called whenever a form input field is changed
    // current closure contains line, surve, scene, etc.
    let checkbox = document.getElementById('showDraggers');

    let onCheckboxClicked = function() {
      line.showDraggers = !!checkbox.checked;
      scene.draw();
    };

    // update and draw the scene according to the input fields
    checkbox.onclick = onCheckboxClicked;
    onCheckboxClicked(); // initialize before first click

    /*
     *  WebGL / Texture test
     */

    console.log('Executing WebGL 3D / texture test.');
    webglDemo();
  } catch (err) {
    util.fatalError(err);
  }
};

main();
