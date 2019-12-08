(function() {
  var canvas = document.getElementById("glcanvas");
  var gl = glUtils.checkWebGL(canvas);
  var program,program2;

  glUtils.SL.init({ callback:function() { main(); } });

  function main() {
      window.addEventListener('resize', resizer);

      // Get canvas element and check if WebGL enabled
      canvas = document.getElementById("glcanvas");
      gl = glUtils.checkWebGL(canvas);
  
      // Initialize the shaders and program
     var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
      vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex),
      fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);

      //R Full
      program = glUtils.createProgram(gl, vertexShader, fragmentShader);
      var thetaLoc = gl.getUniformLocation(program, 'theta'); 
      var transLoc = gl.getUniformLocation(program, 'trans');
      var theta = [10, 20, 0];
      var trans = [0, 0, 0]; 
      var X = 0.002;
      var Y = 0.002;
      var Z = 0.001;

      //cube
      program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);
      var perimCube = gl.getUniformLocation(program2, 'perim');
      var perimeter = [10, 10, 0];
     
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
      vertices3 = [];

      for (var i=0.0; i<=180; i+=1) {
        // degrees to radians
        var j = i * Math.PI / 180;
        // var z = x * Math.PI / 180;
        // X Y Z
        var vert3 = [
          0.5 + -0.1 + Math.sin(j)*0.3, 0.2 + Math.cos(j)*0.3,    0.0, 1.0, 0.0,
          0.5 + -0.1 + Math.sin(j)*0.22, 0.2 + Math.cos(j)*0.22,    1.0, 0.0, 0.0,
        ];
        vertices3 = vertices3.concat(vert3);
      }

      function drawcube(n){
          var cubeVertices = [
            //BAWAH
            -0.2,  -0.7,  0.7,      255, 255, 255,          
            0.5,  -0.7,  0.6,       255, 255, 255,          
            0.5,  -0.7,  0.6,       255, 255, 255,          
            0.5,  -0.7,  -0.7,      255, 255, 255,          
            0.5,  -0.7,  -0.7,      255, 255, 255,          
            -0.2,  -0.7,  -0.6,     255, 255, 255,          
            -0.2,  -0.7,  -0.6,     255, 255, 255,          
            -0.2,  -0.7,  0.7,      255, 255, 255,          
            // ATAS
            -0.2,  0.7,  0.7,       255,255, 255,          
            0.5,  0.7,  0.6,        255,255, 255,       
            0.5,  0.7,  0.6,        255,255, 255,         
            0.5,  0.7,  -0.7,       255,255, 255,          
            0.5,  0.7,  -0.7,       255,255, 255,          
            -0.2,  0.7,  -0.6,      255,255, 255,          
            -0.2,  0.7,  -0.6,      255,255, 255,          
            -0.2,  0.7,  0.7,       255,255, 255,          
            // //BELAKANG
            -0.2,  -0.7,  0.7,      255,255, 255,            
            -0.2,  0.7,  0.7,       255,255, 255,           
            0.5,  -0.7,  0.6,       255,255, 255,            
            0.5,  0.7,  0.6,        255,255, 255,            
            // //DEPAN
            0.5,  -0.7,  -0.7,      255,255, 255,            
            0.5,  0.7,  -0.7,       255,255, 255,           
            -0.2,  -0.7,  -0.6,     255,255, 255,            
            -0.2,  0.7,  -0.6,      255,255, 255             
        ];

        var VertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, VertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

        var vPosition = gl.getAttribLocation(program2,'vPosition');
        var vColor = gl.getAttribLocation(program2,'vColor');
        gl.vertexAttribPointer(
          vPosition,                          // variable yang memegang posisi atrbute di shader
          3,                                  // jumlah elemen per attribute
          gl.FLOAT,                           // tipe data attribut
          gl.FALSE,                           // default
          6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
          0                                   // offset dari posisi elemen di array
        );
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
          6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

        gl.enableVertexAttribArray(vPosition);
        gl.enableVertexAttribArray(vColor);
        gl.drawArrays(gl.LINES,0,n);
      }

      function drawshapes(type,vertices,n){
        var VertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, VertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        var vPosition = gl.getAttribLocation(program,'vPosition');
        var vColor = gl.getAttribLocation(program,'vColor');
        gl.vertexAttribPointer(
          vPosition,                       
          2,                                  // jumlah elemen per attribute
          gl.FLOAT,                           // tipe data attribut
          gl.FALSE,                           // default
          5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
          0                                   // offset dari posisi elemen di array
        );
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
          5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

          if(trans[0] >= 0.5*0.8 || trans[0] <= -0.2*0.8){
              X *= -1;
            }
            trans[0] += X;
      
            if(trans[1] >= 0.7*0.8 || trans[1] <= -0.7*0.8 ){
              Y *= -1;
            }
            trans[1] += Y;
      
            if(trans[2] >= 0.7*0.8 || trans[2] <= -0.6*0.8){
              Z *= -1;
            }
            trans[2] += Z;
      
            gl.uniform3fv(transLoc, trans);

  
        theta[1] += 0.186;
        gl.uniform3fv(thetaLoc, theta);

        gl.enableVertexAttribArray(vPosition);
        gl.enableVertexAttribArray(vColor);
        gl.drawArrays(type, 0, n);
      }
      
      function render(){
        gl.clearColor(0, 0, 0, 1);
        gl.colorMask(true,true,true,true);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);
        drawshapes(gl.TRIANGLE_STRIP,vertices, 4);
        drawshapes(gl.TRIANGLE_STRIP,vertices2, 4);
        drawshapes(gl.TRIANGLE_STRIP,vertices3, 362);

        gl.useProgram(program2);
        gl.uniform3fv(perimCube, perimeter);
        drawcube(24);

        requestAnimationFrame(render);
      }

      resizer();
      render();
  }
    function resizer() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
  
  })(window || this);
  