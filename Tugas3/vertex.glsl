precision mediump float;
attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform vec3 theta;
uniform vec3 trans;

void main() {
  fColor = vColor;
  vec3 angle = radians(theta);

  mat4 RotationM = mat4(
    cos(angle).y, 0.0, -sin(angle).y, 0.0,
    0.0, 1.0, 0.0, 0.0,
    sin(angle).y, 0.0, cos(angle).y, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
   
  mat4 TranslateM = mat4(
    1.0, 0.0, 0.0, trans.x,
    0.0, 1.0, 0.0, trans.y,
    0.0, 0.0, 1.0, trans.z,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 ScaleM = mat4(
    0.4, 0.0, 0.0, 0.0,
    0.0, 0.4, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  gl_Position = vec4(vPosition, 0.0, 1.0) * ScaleM * RotationM;
  gl_Position *=  TranslateM;
}