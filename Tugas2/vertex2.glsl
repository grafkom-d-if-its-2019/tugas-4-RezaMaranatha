precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta;
uniform float scale;

void main() {
  fColor = vColor; 
  vec2 TransformedPos  = vec2(vPosition.x - 0.5, vPosition.y); 
  mat4 TMatrix = mat4(
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      -0.5, 0.5, 0.0, 1.0
  );
  mat4 RotateM = mat4(
      cos(theta), sin(theta), 0.0, 0.0-0.4,
      -sin(theta), cos(theta), 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
  );
  mat4 ScaleM = mat4(
      scale, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1, 0.0,
      0.0, 0.0, 0.0, 1.0
  );
  gl_Position = vec4(TransformedPos, 0.0, 1.0) * ScaleM + vec4(0.5, 0.0, 0.0, 0.0);
}
