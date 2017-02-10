var Household = require("./Household")
//create a city object that encapsulates thecity data structure.

function random_pick(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function generate_grid(x,y, choices){
  var grid = [];
  for (var i = 0; i < y; i++) {
    var arr = [];
    for (var j = 0; j < x; j++) {
      var choice = random_pick(choices)
      arr.push(choice());
    }
    grid.push(arr);
  }
  return grid;
}

function print (stuff){
  process.stdout.write(stuff);
}

function City(x, y){
  this.x = x;
  this.y = y;
  this.residentFactories = [
    ()=> new Household("x"),
    ()=> new Household("o"),
    ()=> false
  ];
  this.grid = generate_grid(x,y, this.residentFactories);
}

City.prototype.print_city = function () {
  //iterate through grid x and y
  //print a dot if false
  var width = this.grid[0].length;
  var height = this.grid.length;

  for (var y = 0; y <height; y++) {
     for (var x = 0; x <width; x++) {
       var house = this.grid[y][x];
       if (!house) {
         print(" .");
       } else {
         print(" "+house.symbol);
       }
     }
     print ("\n");
  }
}


module.exports = City;
