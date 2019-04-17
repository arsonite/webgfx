/*
 * Collection of useful "global" utility functions.
 * Author: Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * (C)opyright 2011-2012 by Hartmut Schirmacher, all rights reserved. 
 * changes by Martin Puse
 */

/** 
 *  Error object to be thrown for custom runtime errors 
 */
let RuntimeError = function(msg, obj) {
    var err = new Error(msg);
    err.name = "Runtime error"; 
    err.msg  = msg || "unknown error";
    err.obj  = obj;
    return err;
}

/** 
 *   Display the message / object related to a fatal error
 *   and re-throw the error for the browser to act accordingly.
 *   Thx to Henrik Tramberend for an example of this.
 */
let fatalError = function(err) {
    // show error on the console
    window.console.log(err.msg);

    // if there is an object associated with the error,
    // show it on the console for inspection
    if (err.obj) {
        window.console.log(err.obj);
    }

    // rethrow the error for the browser / debugger
    throw err;  
};
  
        
/** return the [x,y] position within the HTML canvas element.
    **Please note** that this will only work if the positioning 
    of the canvas element has been set to "relative"!
*/
let canvasPosition = function(event) {
    return [event.layerX, event.layerY];
};
    
/* interface defined by this module */
export default { 
    fatalError,
    canvasPosition,
    RuntimeError
};
