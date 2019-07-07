/**
 * Created by Burak Günaydin (853872) at Beuth University.
 */
import util from './util.js';

const texturePath = './textures/';

class StellarBody {
	constructor(config) {
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
		this.material = new THREE.MeshBasicMaterial({ map: this.texture });
		this.mesh = new THREE.Mesh(this.geometry, this.material);

		switch (this.type) {
			case 'Planet':
				break;
			case 'Moon':
				break;
			case 'Star':
				let starlight = new THREE.PointLight(0xffff00, 1);
				starlight.castShadow = true;
				this.mesh.add(starlight);
				break;
		}
	}

	/**
	 *
	 */
	calculateOrbit = t => {};
}

export default StellarBody;
