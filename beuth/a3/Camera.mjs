/**
 * Created by Burak Günaydin (853872) at Beuth University.
 */
import util from './util.js';

class Camera {
	constructor(config) {
		this.fov = util.exists(config.fov, 90);
		this.ratio = util.exists(
			config.ratio,
			window.innerWidth / window.innerHeight
		);
		this.near = util.exists(config.near, 0.1);
		this.far = util.exists(config.far, 1000);

		this.position = util.exists(config.position, { x: 0, y: 5, z: 5 });
		this.rotation = util.exists(config.rotation, 0);
		this.focus = util.exists(config.focus, { x: 0, y: 0, z: 0 });

		this.inner = new THREE.PerspectiveCamera(
			this.fov,
			this.ratio,
			this.near,
			this.far
		);
		this.inner.position.x = this.position.x;
		this.inner.position.y = this.position.y;
		this.inner.position.z = this.position.z;
		this.inner.lookAt(
			new THREE.Vector3(this.focus.x, this.focus.y, this.focus.z)
		);
	}
}

export default Camera;
