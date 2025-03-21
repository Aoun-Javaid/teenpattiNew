precision mediump float;

uniform vec2 resolution; // Screen resolution
uniform float scrollFactor; // Scroll factor passed from JavaScript
varying vec2 vTextureCoord;

// Static colors for testing
vec3 color1 = vec3(0.282, 0.705, 0.858);  // Sky Blue
vec3 color2 = vec3(0.008, 0.125, 0.345);  // Dark Blue

void main(void) {
  // Test with a fixed scrollFactor and color mix
  vec3 color = mix(color1, color2, scrollFactor);  // Smoothly transition from sky blue to dark blue

  gl_FragColor = vec4(color, 1.0);
}
