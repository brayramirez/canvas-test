export default class Coordinate {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  distance(coordinate) {
    return Math.round(Math.sqrt(
      Math.pow(coordinate.x - this.x, 2) +
      Math.pow(coordinate.y - this.y, 2)
    ) * 100) / 100;
  }

}
