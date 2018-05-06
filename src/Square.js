import Coordinate from "./Coordinate";
import Shape from "./Shape";

export default class Square extends Shape {
  constructor(ctx, coordinate = new Coordinate(0, 0), width = 50, color = "rgb(200, 0, 0)") {
    super(ctx, coordinate, width, width, color);
    this.type = "Square";
  }
}
