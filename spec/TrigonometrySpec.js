import Trigonometry from "../src/Trigonometry";

describe("Trigonometry", () => {
  describe("angleOfC", () => {
    let triangle1 = new Trigonometry(5, 7.07, 5), // Right angle
      triangle2 = new Trigonometry(10, 8, 5);

    it("returns the angle opposite of side C in a triangle", () => {
      expect(triangle1.angleOfC()).toEqual(0.79); // (pi / 180) * 45
      expect(triangle2.angleOfC()).toEqual(0.52);
    });
  });
});
