import Coordinate from "./Coordinate";
import Polygon from "./Polygon";

export default class Triangle extends Polygon {
  constructor(ctx, coordinate = new Coordinate(0, 0), radius = 25, color = "rgb(0, 200, 0)") {
    super(ctx, coordinate, radius, 3, color);
    this.type = "Triangle";
  }
}
