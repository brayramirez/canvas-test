export default class Trigonometry {
  constructor(sideA, sideB, sideC) {
    this.sideA = sideA;
    this.sideB = sideB;
    this.sideC = sideC;
  }

  //           (sideA ^2) + (sideB ^2) - (sideC ^2)
  // (cos-1) x _____________________________________
  //                     2(sideA)(sideB)
  angleOfC() {
    let dividend = Math.pow(this.sideA, 2) + Math.pow(this.sideB, 2) - Math.pow(this.sideC, 2),
      divisor = 2 * this.sideA * this.sideB;

    return Math.round(Math.acos(dividend / divisor) * 100) / 100;
  }
}
