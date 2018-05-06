import Coordinate from "./Coordinate";
import Polygon from "./Polygon";

export default class Star extends Polygon {
  constructor(ctx, coordinate = new Coordinate(0, 0), radius = 25, color = "rgb(255, 255, 0)") {
    super(ctx, coordinate, radius, 5, color);
    this.type = "Star";
  }
}
