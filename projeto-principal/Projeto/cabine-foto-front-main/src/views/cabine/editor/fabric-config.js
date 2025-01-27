import { fabric } from "fabric";
fabric.textureSize = 4096;
fabric.initFilterBackend = function () {
  if (
    fabric.enableGLFiltering &&
    fabric.isWebglSupported &&
    fabric.isWebglSupported(fabric.textureSize)
  ) {
    console.log("max texture size: " + fabric.maxTextureSize);
    return new fabric.WebglFilterBackend({ tileSize: fabric.textureSize });
  } else if (fabric.Canvas2dFilterBackend) {
    return new fabric.Canvas2dFilterBackend();
  }
};

fabric.Canvas.prototype.getItem = function (id) {
  var object = null,
    objects = this.getObjects();

  for (var i = 0, len = this.size(); i < len; i++) {
    if (objects[i].id && objects[i].id === id) {
      object = objects[i];
      break;
    }
  }
  return object;
};
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = "white";
fabric.Object.prototype.cornerStyle = "circle";
fabric.Object.prototype.borderColor = "black";
fabric.Object.prototype.cornerStrokeColor = "black";

export default fabric;
