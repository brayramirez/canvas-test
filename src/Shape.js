import Coordinate from "./Coordinate";
import Trigonometry from "./Trigonometry";
import MouseHelper from "./MouseHelper";

export default class Shape {
  constructor(ctx, coordinate = new Coordinate(0, 0), width = 50, height = 50, color = "rgb(0, 0, 0)") {
    this.type = "Shape";
    this.id = `${Date.now().toString()}-${Math.round(Math.random() * 1000000)}`;

    this.ctx = ctx;

    this.coordinate = coordinate;
    this.width = width;
    this.height = height;

    this.scale = 1;
    this.angle = null;

    this.offset = 10;

    this.unSelectedColor = "rgb(169, 169, 169)";
    this.color = color;
  }

  _scaledWidth() {
    return this.width * this.scale;
  }

  _scaledHeight() {
    return this.height * this.scale;
  }

  _centerCoordinate() {
    return new Coordinate(
      this.coordinate.x + (this._scaledWidth() / 2),
      this.coordinate.y + (this._scaledHeight() / 2)
    );
  }

  _defaultSetup() {
    this.ctx.translate(this.coordinate.x, this.coordinate.y);
    this.ctx.scale(this.scale, this.scale);
  }

  _drawShape() {
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.fill();
  }

  _rotateShape() {
    if (!this.angle) return;

    this.ctx.translate(this._centerCoordinate().x, this._centerCoordinate().y);
    this.ctx.rotate(this.angle);
    this.ctx.translate(
      this._centerCoordinate().x * -1,
      this._centerCoordinate().y * -1
    );
  }

  _setColor(isSelected) {
    let color = this.unSelectedColor;
    if (isSelected) color = this.color;

    this.ctx.fillStyle = color;
  }

  _move(startCoordinates, endCoordinates) {
    this.coordinate.x = endCoordinates.x - startCoordinates.x;
    this.coordinate.y = endCoordinates.y - startCoordinates.y;
  }

  _resize(startCoordinates, endCoordinates) {
    let scale = this.scale;

    let originToStart = new MouseHelper(this.coordinate, startCoordinates),
      originToEnd = new MouseHelper(this.coordinate, endCoordinates),
      startToEnd = new MouseHelper(startCoordinates, endCoordinates);

    if (startToEnd.isMovementY()) {
      scale = originToEnd.deltaY() / originToStart.deltaY();
    }

    if (startToEnd.isMovementX()) {
      scale = originToEnd.deltaX() / originToStart.deltaX();
    }

    // Set thresholds
    if (scale < 0.25) scale = 0.25;
    if (scale > 10) scale = 10;

    this.scale = scale;
  }

  _rotate(startCoordinates, endCoordinates) {
    let centerCoordinate =
        new Coordinate(
          this.coordinate.x + (this._scaledWidth() / 2),
          this.coordinate.y + (this._scaledHeight() / 2)
        ),
      centerToRotate = centerCoordinate.distance(startCoordinates),
      centerToMouse = centerCoordinate.distance(endCoordinates),
      rotateToMouse = startCoordinates.distance(endCoordinates),
      trigonometry =
        new Trigonometry(centerToRotate, centerToMouse, rotateToMouse);

    this.angle = trigonometry.angleOfC();
  }

  draw(isSelected) {
    this.ctx.save();

    this._rotateShape();
    this._defaultSetup();
    this._setColor(isSelected);
    this.ctx.beginPath();
    this._drawShape();
    this.ctx.addHitRegion({id: this.id});

    this.ctx.restore();
  }

  transform(startCoordinates, mouseCoordinates, transformType) {
    switch(transformType) {
    case "move":
      this._move(startCoordinates, mouseCoordinates);
      break;
    case "resize":
      this._resize(startCoordinates, mouseCoordinates);
      break;
    case "rotate":
      this._rotate(startCoordinates, mouseCoordinates);
      break;
    }
  }
}
