/**
 * Created by Burak Günaydin (853872) at Beuth University.
 */
import util from './util.js';

const texturePath = './textures/';

class StellarBody {
	constructor(config) {
		this.parent = config.parent;
		this.name = util.exists(config.name, 'test');
		this.extension = util.exists(config.extension, 'map');
		this.filetype = util.exists(config.filetype, 'jpg');
		this.position = util.exists(config.position, { x: 0, y: 0, z: 0 });
		this.size = util.exists(config.size, 1);
		this.orbit = util.exists(config.orbit, { distance: 1, speed: 1 });
		this.type = util.exists(config.type, 'Planet');

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
				break;
			case 'Star':
				this.mesh.castShadow = false;

				this.light = new THREE.PointLight(0xfffff0, 2);
				this.light.castShadow = true;
				this.mesh.add(this.light);

				break;
		}
	}

	/**
	 *
	 */
	calculateOrbit = t => {};
}

export default StellarBody;
