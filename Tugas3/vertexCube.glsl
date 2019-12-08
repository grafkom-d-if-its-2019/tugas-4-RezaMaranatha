precision mediump float;

attribute vec3 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform vec3 perim;

void main() {
  fColor = vColor;
  vec3 perimeter = radians(perim);

  mat4 EdgeX = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, cos(perimeter).x, sin(perimeter).x, 0.0,
    0.0, -sin(perimeter).x, cos(perimeter).x, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 EdgeY = mat4(
    cos(perimeter).y, 0.0, -sin(perimeter).y, 0.0,
    0.0, 1.0, 0.0, 0.0,
    sin(perimeter).y, 0.0, cos(perimeter).y, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 EdgeZ = mat4(
    cos(perimeter).z, sin(perimeter).z, 0.0, 0.0,
    -sin(perimeter).z, cos(perimeter).z, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  gl_Position = vec4(vPosition, 1.0) * EdgeZ * EdgeY * EdgeX ;
}