import Coordinate from "./Coordinate";
import Shape from "./Shape";

export default class Circle extends Shape {
  constructor(ctx, coordinate = new Coordinate(0, 0), radius = 25, color = "rgb(0, 0, 200)") {
    let diameter = radius * 2;

    super(ctx, coordinate, diameter, diameter, color);
    this.type = "Circle";
    this.radius = radius;
  }

  _drawShape() {
    this.ctx.arc(this.radius, this.radius, this.radius, 0, Math.PI * 2, true);
    this.ctx.fill();
  }
}
