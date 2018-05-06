export default class MouseHelper {
  constructor(startPosition, endPosition) {
    this.startPosition = startPosition;
    this.endPosition = endPosition;
  }

  isTop() {
    return this.startPosition.y >= this.endPosition.y;
  }

  isBottom() {
    return this.startPosition.y < this.endPosition.y;
  }

  isLeft() {
    return this.startPosition.x > this.endPosition.x;
  }

  isRight() {
    return this.startPosition.x <= this.endPosition.x;
  }

  isMovementY() {
    return !this.isMovementX();
  }

  isMovementX() {
    return this.deltaX() >= this.deltaY();
  }

  deltaX() {
    return Math.abs(this.endPosition.x - this.startPosition.x);
  }

  deltaY() {
    return Math.abs(this.endPosition.y - this.startPosition.y);
  }
}
