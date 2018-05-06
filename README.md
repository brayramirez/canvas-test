# Canvas API Sample App

## Setup instructions
1. Clone repository
1. Run `npm install`
1. To run tests: `npm test`
1. To start app: `npm run start:dev`

## Technical Overview
a. Application architecture summary
   1. Webpack
      * for module bundler
   1. Jasmine
      * for testing
      * this has been selected since it is similar to RSpec in Ruby
      
b. Implementation notes
   1. class `Canvas.js`
      * handles canvas events, interactions and shape states
   1. class `Shape.js`
      * base class that all other shapes inherits from
      * contains drawing implementation of all shapes
      * contains the implementation for transformation: translation, rotation, scaling
   1. class `Square.js`
      * inherits from `Shape.js`
      * generates Square shapes
   1. class `Polygon.js`
      * inherits from `Shape.js`
      * base class for multi-sided shapes such as Triangles and 5-sided Stars, excluding Square
      * can be used to create other shapes by passing number of sides
   1. class `Triangle.js`
      * inherits from `Polygon.js`
      * generates Triangle shapes
   1. class `Star.js`
      * inherits from `Polygon.js`
      * generates 5-star Star shapes
   1. class `Trigonometry.js`
      * calculates angle given three sides of a triangle
   1. class `Coordinate.js`
      * holds x and y points
      * calculates the distance between two points
   1. class `MouseHelper.js`
      * determine mouse position and movements
      
c. Areas to improve or request for feedback
   1. Shape resizing
      * When resizing an already scaled shape, it reverts to its original size before scaling again
   1. Shape rotation
      * When rotating an already rotated shape, it reverts to its initial rotation first before rotating again
      * Issue with rotation direction, i.e:
        * when rotating counter-clockwise from the top-right of the shape, the rotation is still clockwise
        * when rotating clockwise from the top-right of the shape and when then mouse coordinates reaches the bottom-left of the shape
          the rotation changes to counter-clockwise
