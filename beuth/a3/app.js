/*
 * 3DWebGraphics Aufgabe 3
 * (C)opyright Martin Puse, mpuse@beuth-hochschule.de
 */

window.onload = function() {
<<<<<<< HEAD
	// setup the renderer
	let renderer; /* TODO */

	// create a scene
	let scene; /* TODO */
	let axesHelper = new THREE.AxesHelper(2);
	scene.add(axesHelper);

	// create a camera
	let camera; /* TODO */
	let radius = 10;

	// setup simulation
	let delta = 1 / 60;
	let time = -delta;

	let update = function() {
		time += delta;

		camera.position.x = radius * Math.sin(time);
		camera.position.z = radius * Math.cos(time);
		camera.lookAt(new THREE.Vector3(0, 0, 0));
	};

	// simulation loop
	let render = function() {
		requestAnimationFrame(render);

		update();
		renderer.render(scene, camera);
	};

	// go
	render();
};
=======

    // setup the renderer
    let renderer /* TODO */

    // create a scene
    let scene /* TODO */
    let axesHelper = new THREE.AxesHelper(2)
    scene.add(axesHelper)

    // create a camera
    let camera /* TODO */
    let radius = 10

    // setup simulation
    let delta = 1 / 60
    let time = -delta

    let update = function() {
        time += delta

        camera.position.x = radius * Math.sin(time)
        camera.position.z = radius * Math.cos(time)
        camera.lookAt(new THREE.Vector3(0, 0, 0))
    }

    // simulation loop
    let render = function() {
        requestAnimationFrame(render)
        
        update()
        renderer.render(scene, camera)
    }

    // go
    render()
}
>>>>>>> 576efb8a1e8498fbce68fce23ac6eda9a52b3c80
