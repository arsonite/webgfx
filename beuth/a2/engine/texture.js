
import util from '../util.js'

let _dummyTexture = new Uint8Array([255, 0, 0, 255])  // red


/*
 * A texture on GPU. Load process is automated to sane defaults.
 */
class Texture {
    constructor(gl, config) {
        util.log(`creating texture ${config.name}`)

        this.glTexture = gl.createTexture()
        
        // setup a dummy texture in case there is a problem with the real texture
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, _dummyTexture) 
        
        // load the real texture
        if (config.path) {
            this.glTexture.image = new Image()
            this.glTexture.onerror = () => {
                util.crit(`could not load texture image for ${config.name}`)
            }
            this.glTexture.image.onload = () => {
                util.log(`texture image for ${config.name} loaded`);
                this.setup(gl, config)
                config.onLoaded()
            }
            this.glTexture.image.src = config.path
        }
    }

    setup(gl, config) {
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.glTexture.image)
        if (config.useMipMap) {
            gl.generateMipmap(gl.TEXTURE_2D)
        }
        gl.bindTexture(gl.TEXTURE_2D, null)
    }
}


export default Texture
