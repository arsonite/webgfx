/**
 * Created by Burak Günaydin (853872) at Beuth University.
 */
import util from './util.js';
import Vector from './Vector.mjs';

const texturePath = './textures/';

class StellarBody {
	constructor(config) {
		this.parent = util.exists(config.parent, null);
		this.name = util.exists(config.name, 'test');
		this.extension = util.exists(config.extension, 'map');
		this.filetype = util.exists(config.filetype, 'jpg');
		this.position = util.exists(config.position, new Vector(0, 0, 0));
		this.size = util.exists(config.size, 1);
		this.orbit = util.exists(config.orbit, { period: -1000, rotation: 0.05 });
		this.type = util.exists(config.type, 'Planet');

		if (this.parent !== null) {
			this.radius = util.exists(config.radius, null);
		}

		this.texture = new THREE.TextureLoader().load(
			`${texturePath}${this.name}_${this.extension}.${this.filetype}`
		);
		this.geometry = new THREE.SphereBufferGeometry(this.size, 100, 100);
		if (this.type === 'Star') {
			this.material = new THREE.MeshBasicMaterial({ map: this.texture });
		} else {
			this.material = new THREE.MeshPhongMaterial({ map: this.texture });
		}
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set(this.position.x, this.position.y, this.position.z);

		switch (this.type) {
			case 'Planet':
				this.mesh.castShadow = true;
				break;
			case 'Moon':
				this.mesh.castShadow = true;
				this.mesh.receiveShadow = true;
				break;
			case 'Star':
				this.mesh.castShadow = false;

				this.light = new THREE.PointLight(0xfffff0, 2);
				this.light.castShadow = true;
				this.mesh.add(this.light);

				break;
		}

		this.counter = 0;
	}

	/**
	 *
	 */
	update = () => {
		this.counter++;

		if (this.parent !== null) {
			this.calculateOrbit();
		}
		this.calculateRotation();
	};

	/**
	 *
	 */
	calculateOrbit = () => {
		let radius;
		if (this.radius !== null) {
			radius = this.radius;
		} else {
			radius = this.position.getDistance(this.parent.position);
		}

		let angle = ((this.counter * 360) / this.orbit.period / 360) * Math.PI * 2;

		this.position = new Vector(
			this.parent.position.x + Math.cos(angle) * radius,
			this.parent.position.y,
			this.parent.position.z + Math.sin(angle) * radius
		);

		this.mesh.position.set(this.position.x, this.position.y, this.position.z);
	};

	/**
	 *
	 */
	calculateRotation = () => {
		this.mesh.rotation.y += this.orbit.rotation;
	};

	/**
	 *
	 */
	addChild = child => {
		this.children.push();
	};
}

export default StellarBody;
