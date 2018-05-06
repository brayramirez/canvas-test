import Coordinate from "../src/Coordinate";

describe("Coordinate", () => {
  let originCoordinate = new Coordinate(0, 0);

  describe("distance", () => {
    it("returns the distance between to points", () => {
      expect(originCoordinate.distance(new Coordinate(0, 10))).toEqual(10);
      expect(originCoordinate.distance(new Coordinate(10, 0))).toEqual(10);
      expect(originCoordinate.distance(new Coordinate(10, 10))).toEqual(14.14);
    });
  });
});
