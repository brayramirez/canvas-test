import Canvas from "./src/Canvas";

document.addEventListener("DOMContentLoaded", () => {
  let canvasContainer = document.getElementById("canvas-container");
  let canvas = new Canvas(document, canvasContainer);

  canvas.init();
});

