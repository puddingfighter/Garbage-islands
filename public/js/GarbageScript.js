var GarbagesArray = [];
GarbagesArray = document.getElementsByClassName("garbages");
var points= 0;

function getGarbageId(id)
{ 
    var garbageClicked = id;
    for(i = 0; i <= GarbagesArray.length; i++)
    {
        if(GarbagesArray[i] == garbageClicked)
        {
            points++;
            GarbagesArray[i].remove();
            $("#points").text(points);
        }
    }
}

function startChat(){
    var chatContainer = document.getElementById("chat");
    chatContainer.innerText = "Friend"
    $("#chat").addClass("chat");
    console.log(chatContainer);

    

}



//Grid

var scene, camera, renderer;
var geometry, material, mesh;

//init();
grid2d();
animate();


function grid2d(){

  var scene = new vg.Scene({ 
    cameraPosition: {x:0, y:150, z:150}
  }, true); 
  
  var grid = new vg.HexGrid();
  
  grid.generate({
    size: 4
  });
  
  var board = new vg.Board(grid);
  
  board.generateTilemap();
  
  scene.add(board.group);
  scene.focusOn(board.group);
  renderer = new THREE.WebGLRenderer({canvas: document.getElementById("gameCanvas")});


}

function init() {

    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(100.0, -100.0, 500.0);
    camera.up.set(0, 0, 1);
    camera.lookAt(new THREE.Vector3(0,0,0));
    
    scene.add( new THREE.AmbientLight( 0x222222 ) );

          var light = new THREE.PointLight( 0xffffff );
          light.position.set(100,-100,500.0);
          scene.add( light );
  
    
     // Grab the param, if it exists
    function param(params, entry) {
      if (params.hasOwnProperty(entry)) {
        return params[entry];
      }
      
    } 
    
    /* Define some parameters */
    // Center to corner distance (radius, not including center tile)
    var map_radius = 20;
    
    function Tile(params) {
      this.fill = param(params, 'fill');
      // Center to corner distance
      this.radius = param(params, 'radius');
      // Edge to edge distance
      // width = 2 * radius * cos(30)
      this.width  = 2 * this.radius * 0.86603;
      // half width
      this.hwidth = this.width/2;
    }
    
    function Map(radius) {
      // Center to vertex, number of tiles
      this.radius = radius;
      this.tiles = {};
      
      this.getTile = function (q, r) {
        return this.tiles["q"+q+"-r"+r];
      }
      
      this.setTile = function (q, r, val) {
        this.tiles["q"+q+"-r"+r] = val;
      }
      
      this.generate = function() {
        // Tile radius in pixels
        var tile_radius = 50;
        
        for (var r = -this.radius; r <= this.radius; r++) {
          for (var q = -this.radius; q <= this.radius; q++) {

            //console.log("("+q+", "+ r+")");
            // If the absolute value of the sum of the coordinates is greater
            // than the radius, it is not included
            if (Math.abs(q+r) > this.radius) {
              this.setTile(q, r, 0); 
            } else {
              this.setTile(q, r, new Tile({radius: tile_radius, fill: '#00D2FF'}));
            }
          }
        }
        
        this.getTile(0, 0).fill = 'red';
      }
      
      // Three.js specific render function
      this.draw = function (layer) {
        
        // Full map diameter, center of corner tile to center of opposite 
        // corner tile (set in first iteration)
        var diameter = 0; 
        
        
        var attributes = {
          
        };
        
        var uniforms = {
          resolution: {
            type: 'v2',
            value: new THREE.Vector2(window.innerWidth, window.innerHeight)
          }
        };
        
        for (var r = -this.radius; r <= this.radius; r++) {
          for (var q = -this.radius; q <= this.radius; q++) {
            var tile = this.getTile(q, r);
            //console.log("("+q+", "+ r+")");
            
            if (tile.constructor.name !== "Tile") {
              continue;
            }
            
            if (diameter === 0) {
              diameter = (this.radius * 2 + 1) * tile.width;
            }
            
            var x = (q*tile.width);
            // This comes from a simplified version of:
            // stage.height()/2 + (tile.radius*Math.sin(30*Math.PI/180)+tile.radius)*r+2*tile.radius;
            var y = (1.5*r)*tile.radius;
            var offset = 0;
            if (r % 2 !== 0) {
              // positive or negative
              offset = (r?r<0?-1:1:0)*(Math.abs(r) - 1)*tile.hwidth + r%2*tile.hwidth; 
            } else {
              offset = r*tile.hwidth;
            }
            x += offset;
            
            var radius = tile.radius;
            var z = 100.0 * (Math.random()-0.5);
            
            var pts = [];
            pts.push(new THREE.Vector3(x+0, y+radius, z));
            pts.push(new THREE.Vector3(x+radius*0.866, y+radius*0.5, z));
            pts.push(new THREE.Vector3(x+radius*0.866, y-radius*0.5, z));
            pts.push(new THREE.Vector3(x+0, y-radius, z));
            pts.push(new THREE.Vector3(x-radius*0.866, y-radius*0.5, z));
            pts.push(new THREE.Vector3(x-radius*0.866, y+radius*0.5, z));
            
            var hex = new THREE.Shape(pts);

            geometry = new THREE.ShapeGeometry(hex);
            //geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, z ) );
            
           
            material = new THREE.MeshLambertMaterial( { color: 0x0000ff, wireframe: false } );
              //{ color: 0x008AB8 } );
            mesh = new THREE.Mesh( geometry, material );
      
            scene.add( mesh );
            
            // Add lines

            material1 = new THREE.MeshLambertMaterial( { color: 0xffff00} );

            
            var geometry = new THREE.Geometry();
            z = 0;
            
            geometry.vertices.push( new THREE.Vector3( x+0, y+radius, z ) );
            geometry.vertices.push( new THREE.Vector3( x+radius*0.866, y+radius*0.5, z ) );
            geometry.vertices.push( new THREE.Vector3( x+radius*0.866, y-radius*0.5, z ) );
            geometry.vertices.push( new THREE.Vector3( x+0, y-radius, z ) );
            geometry.vertices.push( new THREE.Vector3( x-radius*0.866, y-radius*0.5, z ) );
            geometry.vertices.push( new THREE.Vector3( x-radius*0.866, y+radius*0.5, z ) );
            geometry.vertices.push( new THREE.Vector3( x+0, y+radius, z ) );
            
            var line = new THREE.Line( geometry, material1 );
            scene.add( line );

          }
        }
        
        
        
            
        
      }
      
      // Generate the map tiles
      this.generate();
    }
    
    var map = new Map(map_radius);
    map.draw();
    


  }

  function animate() {

      requestAnimationFrame( animate );
      renderer.render( scene, camera );

  }



