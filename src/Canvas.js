import Coordinate from "./Coordinate";
import Square from "./Square";
import Triangle from "./Triangle";
import Circle from "./Circle";
import Star from "./Star";

export default class Canvas {
  constructor(document, canvas) {
    this.document = document;
    this.canvas = canvas;
    this.storageKey = "canvasShapes";

    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext("2d");

    this.shapes = [];

    this.shouldRedraw = false;

    this.selectedShape = null;
    this.hoveredShapeId = null;
    this.selectedShapeId = null;

    this.move = false;
    this.resizeMode = false;
    this.resize = false;
    this.rotateMode = false;
    this.rotate = false;

    this.startCoordinates = null;

    this.shapeClasses = {
      "Square": Square,
      "Circle": Circle,
      "Star": Star,
      "Triangle": Triangle
    };

    this._addEvents();
  }

  _addEvents() {
    let addShapeButtons = this.document.getElementsByClassName("add-shape");
    for (let button of addShapeButtons) {
      let shape = button.dataset.shape;

      button.addEventListener("click", () => {
        this._addShape(shape);
      });
    }

    let removeShapeButton = this.document.getElementById("remove-shape");
    removeShapeButton.addEventListener("click", () => {
      this._removeShape();
    });

    this.document.addEventListener("keydown", (e) => {
      if (e.ctrlKey) this.resizeMode = true;
      if (e.shiftKey) this.rotateMode = true;
    });

    this.document.addEventListener("keyup", () => {
      this.rotateMode = false;
      this.resizeMode = false;
    });

    this.canvas.addEventListener("mousemove", (e) => {
      let transformType = null,
        region = e.region,
        mouseCoordinates = new Coordinate(e.clientX, e.clientY);

      if (this.selectedShape) {
        if (this.move) transformType = "move";
        if (this.resize) transformType = "resize";
        if (this.rotate) transformType = "rotate";

        if (transformType) {
          this.selectedShape.transform(this.startCoordinates, mouseCoordinates, transformType);
          this.shouldRedraw = true;
        }
      }
      else {
        if (this.hoveredShapeId !== region) this.shouldRedraw = true;
        this.hoveredShapeId = region;
      }
    });

    this.canvas.addEventListener("mousedown", (e) => {
      let region = e.region,
        mouseCoordinates = new Coordinate(e.clientX, e.clientY);

      if (this.selectedShapeId !== region) this.shouldRedraw = true;
      this.selectedShape = null;
      this.selectedShapeId = region;

      if (!this.selectedShapeId) return;

      this.hoveredShapeId = null;

      this.move = true;
      this.resize = false;
      this.rotate = false;

      this.selectedShape = this.shapes.find((shape) => {
        return shape.id === this.selectedShapeId;
      });

      this.startCoordinates =
        new Coordinate(
          mouseCoordinates.x - this.selectedShape.coordinate.x,
          mouseCoordinates.y - this.selectedShape.coordinate.y
        );

      if (this.rotateMode || this.resizeMode) {
        this.move = false;

        this.startCoordinates =
          new Coordinate(mouseCoordinates.x, mouseCoordinates.y);

        if (this.rotateMode) this.rotate = true;
        if (this.resizeMode) this.resize = true;
      }

      this.shouldRedraw = true;
    });

    this.canvas.addEventListener("mouseup", () => {
      this.move = false;
      this.resize = false;
      this.rotate = false;
    });
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  _removeShape() {
    if (!this.selectedShape) return;

    let index = this.shapes.indexOf(this.selectedShape);
    if (index < 0) return;

    this.shapes.splice(index, 1);
    this.shouldRedraw = true;
  }

  _addShape(shape) {
    let newShape = null;

    switch (shape) {
    case "square":
      newShape = new Square(this.ctx, new Coordinate(10, 100));
      break;
    case "triangle":
      newShape = new Triangle(this.ctx, new Coordinate(70, 100));
      break;
    case "circle":
      newShape = new Circle(this.ctx, new Coordinate(120, 100));
      break;
    case "star":
      newShape = new Star(this.ctx, new Coordinate(180, 100));
      break;
    }

    if (!newShape) return;

    newShape.draw();
    this.shapes.push(newShape);
    this.shouldRedraw = true;
  }

  _defaultShapes() {
    return [
      new Square(this.ctx, new Coordinate(10, 10)),
      new Triangle(this.ctx, new Coordinate(70, 10)),
      new Circle(this.ctx, new Coordinate(120, 10)),
      new Star(this.ctx, new Coordinate(180, 10))
    ];
  }

  _loadShapes() {
    let canvasShapes = localStorage.getItem("canvasShapes");

    if (!canvasShapes) return this._defaultShapes();

    let shapes = [],
      persistedShapes = JSON.parse(canvasShapes) || [];

    for (let persistedShape of persistedShapes) {
      let shape =
        new this.shapeClasses[persistedShape.type](
          this.ctx,
          persistedShape.coordinate
        );

      shape.scale = persistedShape.scale;
      shape.angle = persistedShape.angle;

      shapes.push(shape);
    }

    return shapes;
  }

  init() {
    this._clear();

    this.shapes = this._loadShapes();
    this.shouldRedraw = true;

    setInterval(() => {
      this.draw();
    }, 30);
  }

  draw() {
    if (!this.shouldRedraw) return;

    this._clear();

    for (let shape of this.shapes) {
      let isHovered = shape.id === this.hoveredShapeId,
        isSelected = shape.id === this.selectedShapeId;

      shape.draw(isSelected || isHovered);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.shapes));

    this.shouldRedraw = false;
  }
}
