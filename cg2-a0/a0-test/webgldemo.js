/**
 *
 *  This is Lesson 5 from learningwebgl.com, wrapped into a module
 *  for testing purposes
 */
import {
    MatrixArray,
    setMatrixArrayType,
    determineMatrixArrayType,
    glMath,
    vec2,
    vec3,
    vec4,
    mat2,
    mat3,
    mat4,
    quat4
} from '../lib/gl-matrix-1.3.7.js'

// these used to be global, now they are wrapped inside this module
let gl;
let shaderProgram;
let neheTexture;
let projectionMatrix = mat4.create();
let modelViewMatrix = mat4.create();
let modelViewMatrixStack = [];
let cubeVertexPositionBuffer;
let cubeVertexTextureCoordBuffer;
let cubeVertexIndexBuffer;
let xRot = 0;
let yRot = 0;
let zRot = 0;
let lastTime = 0;

let initGL = function(canvas) {
    try {
        gl = canvas.getContext('experimental-webgl');
        gl.viewportWidth  = canvas.width;
        gl.viewportHeight = canvas.height;
    }
    catch(e) {}
    
    if (!gl) {
        alert('Could not initialise WebGL, sorry :-(');
    }
}


let getShader = function(gl, id) {
    let shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    let code = '';
    let child = shaderScript.firstChild;
    while (child) {
        if (child.nodeType === 3) {
            code += child.textContent;
        }
        child = child.nextSibling;
    }

    let shader;
    switch (shaderScript.type) {
        case 'x-shader/x-vertex'   : shader = gl.createShader(gl.VERTEX_SHADER); break;
        case 'x-shader/x-fragment' : shader = gl.createShader(gl.FRAGMENT_SHADER); break;
        default:
            return null;
    }
    gl.shaderSource(shader, code);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}


let initShaders = function() {
    let vertexShader   = getShader(gl, 'shader-vs');
    let fragmentShader = getShader(gl, 'shader-fs');

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Could not initialise shaders');
    }

    gl.useProgram(shaderProgram);

    shaderProgram.projectionMatrixUniform = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
    shaderProgram.modelViewMatrixUniform  = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
    shaderProgram.samplerUniform          = gl.getUniformLocation(shaderProgram, 'uSampler');

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
}


let handleLoadedTexture = function(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
}


let initTexture = function() {
    neheTexture = gl.createTexture();
    neheTexture.image = new Image();
    neheTexture.image.onload = function () {
        handleLoadedTexture(neheTexture)
    }

    neheTexture.image.src = 'webgl.png';
}


let mvPushMatrix = function() {
    let copy = mat4.create();
    mat4.set(modelViewMatrix, copy);
    modelViewMatrixStack.push(copy);
}

let mvPopMatrix = function() {
    if (modelViewMatrixStack.length === 0) {
        throw 'Invalid popMatrix!';
    }
    modelViewMatrix = modelViewMatrixStack.pop();
}

let degToRad = function(degrees) {
    return degrees * Math.PI / 180;
}

let initBuffers = function() {
    cubeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    let vertices = [
        // front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        // back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,
        // top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,
        // bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,
        // right face
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,
        // left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    cubeVertexPositionBuffer.itemSize = 3;
    cubeVertexPositionBuffer.numItems = 24;

    cubeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    let textureCoords = [
      // front face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      // back face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      // top face
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      // bottom face
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      // right face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      // left face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    cubeVertexTextureCoordBuffer.itemSize = 2;
    cubeVertexTextureCoordBuffer.numItems = 24;

    cubeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    let cubeVertexIndices = [
        0, 1, 2,      0, 2, 3,    // front face
        4, 5, 6,      4, 6, 7,    // back face
        8, 9, 10,     8, 10, 11,  // top face
        12, 13, 14,   12, 14, 15, // bottom face
        16, 17, 18,   16, 18, 19, // right face
        20, 21, 22,   20, 22, 23  // left face
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    cubeVertexIndexBuffer.itemSize = 1;
    cubeVertexIndexBuffer.numItems = 36;
}


let drawScene = function() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // make a perspective projection
    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, projectionMatrix);

    // move the camera a bit back to see the cube
    mat4.identity(modelViewMatrix);
    mat4.translate(modelViewMatrix, [0.0, 0.0, -5.0]);

    // let the camera rotate around the cube (you thought the cube is rotating? :)
    mat4.rotate(modelViewMatrix, degToRad(xRot), [1, 0, 0]);
    mat4.rotate(modelViewMatrix, degToRad(yRot), [0, 1, 0]);
    mat4.rotate(modelViewMatrix, degToRad(zRot), [0, 0, 1]);

    // bind all buffers for rendering
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);

    // bind the texture and connect it to the shader
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, neheTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);

    // set the camera uniforms
    gl.uniformMatrix4fv(shaderProgram.projectionMatrixUniform, false, projectionMatrix);
    gl.uniformMatrix4fv(shaderProgram.modelViewMatrixUniform, false, modelViewMatrix);

    // let opengl render
    gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}


let animate = function() {
    let timeNow = new Date().getTime();
    if (lastTime !== 0) {
        let elapsed = timeNow - lastTime;

        xRot += (90 * elapsed) / 1000.0;
        yRot += (90 * elapsed) / 1000.0;
        zRot += (90 * elapsed) / 1000.0;
    }
    lastTime = timeNow;
}


let tick = function() {
    window.requestAnimationFrame(tick);
    drawScene();
    animate();
}


/*
 * the 'main' function to start the WebGL demo 
 * all the local attributes declared in this module
 * are private attributes in the closure of this function
 */
let runDemo = function() {
    let canvas = document.getElementById('canvas3d');
    initGL(canvas);
    initShaders();
    initBuffers();
    initTexture();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    tick();
};

export default runDemo;
