(function() {

  glUtils.SL.init({ callback: function() { main(); }});
  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
   
    // resizer();

    var vertices = [
      0.5 + -0.15, -0.5,    1.0, 0.0, 0.0,
      0.5 + -0.15, +0.5,    0.0, 1.0, 0.0,
      0.5 + -0.1, -0.5,     0.0, 0.0, 1.0,
      0.5 + -0.1, +0.5,      1.0, 0.0, 1.0,
    ];
    var vertices2 = [
      0.5 + 0.0, -0.082,     1.0, 0.0, 0.0,
      0.5 + 0.2, -0.5,      0.0, 1.0, 0.0,
      0.5 + 0.05, -0.06,    0.0, 0.0, 1.0,
      0.5 + 0.26, -0.5,      1.0, 1.0, 0.0
    ];
    var line2 = [
      0.0, -0.082,  1.0, 0.0, 0.0,
      0.2, -0.5,    0.0, 1.0, 0.0,
      0.26, -0.5,    0.0, 0.0, 1.0,
      0.05, -0.06,   0.0, 1.0, 1.0,
      // -0.5, 0.5,      1.0, 0.0, 0.0,
      // 0.0, 0.5,       1.0, 0.0, 0.0,
      // 0.5,-0.5,        1.0, 0.0, 0.0
    ];

    var line3 = [
      -0.1, +0.5,     1.0, 0.0, 0.0,
      -0.15, +0.5,    0.0, 1.0, 0.0,
      -0.15, -0.5,    0.0, 0.0, 1.0,
      -0.1, -0.5,     1.0, 1.0, 0.0,
      -0.1, -0.1,     1.0, 0.0, 1.0,
    ];  
    var line5 = [
      -0.1, +0.42,    1.0, 0.0, 0.0,
      -0.1, -0.02,    0.0, 0.0, 1.0,   
    ];

    vertices3 = [],
    vertices4 = [],
    vertices5 = [],
    vertices6 = [];

    for (var x=0.0; x<=150; x+=1) {
      // degrees to radians
      var z = x * Math.PI / 180;
      // var z = x * Math.PI / 180;
      // X Y Z
      var vert1 = [
        -0.1 + Math.sin(z)*0.3,
        0.2 + Math.cos(z)*0.3,    1.0, 0.0, 0.0
      ];
      // vertices = vertices.concat(line01);
      vertices5 = vertices5.concat(vert1);
    }
    for (var y=160; y<=180; y+=1) {
      // degrees to radians
      var w = y * Math.PI / 180;
      // var z = x * Math.PI / 180;
      // X Y Z
      var vert6 = [
        -0.1 + Math.sin(w)*0.3,
        0.2 + Math.cos(w)*0.3,    0.0, 1.0, 0.0
      ];
      // vertices = vertices.concat(line01);
      vertices6 = vertices6.concat(vert6);
    }

    for (var i=0.0; i<=180; i+=1) {
      // degrees to radians
      var j = i * Math.PI / 180;
      // var z = x * Math.PI / 180;
      // X Y Z
      var vert2 = [
        -0.1 + Math.sin(j)*0.22,
        0.2 + Math.cos(j)*0.22,     0.0, 0.0, 1.0
      ];

      var vert3 = [
        0.5 + -0.1 + Math.sin(j)*0.3, 0.2 + Math.cos(j)*0.3,    0.0, 1.0, 0.0,
        0.5 + -0.1 + Math.sin(j)*0.22, 0.2 + Math.cos(j)*0.22,    1.0, 0.0, 0.0,
      ];
      vertices4 = vertices4.concat(vert2);
      vertices3 = vertices3.concat(vert3);
    }

    function drawShapes(type,vertices,n) {
      var vertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
      
      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');
      gl.vertexAttribPointer(
        vPosition, //variabel pemegang posisi atribut di shader
        2,          // jumlah elemen per atribut
        gl.FLOAT,   // tipe data atribut
        gl.FALSE,   
        5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
        0
      );
      gl.vertexAttribPointer(
        vColor, 
        3, 
        gl.FLOAT, 
        gl.FALSE, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        2 * Float32Array.BYTES_PER_ELEMENT
      );
      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);
  
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      gl.drawArrays(type, 0, n);
    }
   
    var thetaUniformLocation = gl.getUniformLocation(program, 'theta');
    var theta = 0;
    var scaleX = gl.getUniformLocation(program2, 'scale');
    var scale = 1;
    var flag = 1;

    //R Outline
    function render() {
      gl.useProgram(program);
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      theta +=0.0186;
      gl.uniform1f(thetaUniformLocation,theta);

      drawShapes(gl.LINE_STRIP, line2, 4);
      drawShapes(gl.LINE_STRIP, line3, 5);
      drawShapes(gl.LINE_STRIP, line5, 2);
      drawShapes(gl.LINE_STRIP, vertices4, 181);
      drawShapes(gl.LINE_STRIP, vertices5, 151);
      drawShapes(gl.LINE_STRIP, vertices6, 21);
      requestAnimationFrame(render);
    }
    //R Full
    function render2() {
      gl.useProgram(program2);

      if (scale >= 1) flag = -1;
      else if (scale <= -1) flag = 1;
      scale += 0.0186 * flag;

      gl.uniform1f(scaleX, scale);

      drawShapes(gl.TRIANGLE_STRIP, vertices, 4);
      drawShapes(gl.TRIANGLE_STRIP, vertices2, 4);
      drawShapes(gl.TRIANGLE_STRIP, vertices3, 362);

      requestAnimationFrame(render2);
    }
    function resizer() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
    render();
    render2();
  }
})();