import Coordinate from "./Coordinate";
import Shape from "./Shape";

export default class Polygon extends Shape {
  constructor(ctx, coordinate = new Coordinate(0, 0), radius = 25, numberOfSides = 5, color = "rgb(255, 255, 0)") {
    let width = radius * 2;

    super(ctx, coordinate, width, width, color);
    this.type = "Polygon";
    this.radius = radius;

    this.numberOfSides = numberOfSides;
    this.polygonAngle = 360 / this.numberOfSides;
  }

  _drawShape() {
    this.ctx.translate(this.radius, this.radius);

    for (let i = 0; i < this.numberOfSides; i++) {
      this.ctx.save();
      this.ctx.rotate((Math.PI / 180) * (i * this.polygonAngle));
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(0, -this.radius);
      this.ctx.rotate((Math.PI / 180) * (this.polygonAngle * 2));
      this.ctx.lineTo(0, -this.radius);
      this.ctx.fill();
      this.ctx.restore();
    }
    this.ctx.closePath();

    this.ctx.translate(-this.radius, -this.radius);
  }
}
