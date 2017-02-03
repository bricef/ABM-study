var _ = require("lodash");

var utils = require("./utils");

function print (stuff){
  process.stdout.write(stuff);
}

function City(x, y, citizens){
  this.x = x;
  this.y = y;
  this.citizens = citizens;
  this.population = [];
  this.grid = this.generate_grid();
}

City.prototype.toString = function(){
  return "City"
}

City.prototype.get_satisfaction = function(){
  return this.satisfaction;
}

City.prototype.proportional_selection = function(){
  var total = _(this.citizens).map(_.first).sum();
  var selector = Math.random()*total;
  var acc = 0;
  var selected = null;
  this.citizens.some(function(pair){
    if(!selected && selector <= pair[0]+acc){
      selected = pair[1];
      return true;
    }
    acc += pair[0];
  });
  return selected;
}

City.prototype.tick = function(){
  var self = this;
  // for all households that are below threshold, move to new pos.
  this.for_lots(function(address, occupant){
    if(occupant){
      occupant.tick();
    }
  });
}

City.prototype.generate_grid = function(){
  var grid = [];
  for (var i = 0; i < this.y; i++) {
    var arr = [];
    for (var j = 0; j < this.x; j++) {
      var new_citizen = this.proportional_selection(this.citizens)(this, [j,i]);
      this.population.push(new_citizen)
      arr.push(new_citizen);
    }
    grid.push(arr);
  }
  return grid;
}

City.prototype.get_neighbours = function (address) {
  var self = this;
  var offsets = [
    [0,1],
    [1,0],
    [1,1],
    [-1,1],
    [1,-1],
    [-1,0],
    [0,-1],
    [-1,-1]
  ];
  var neighbours = _(offsets)
    .map(function(offset){
      return self.wrap([address[0]+offset[0],address[1]+offset[1]]);
    })
    .map(function(address){
      return self.get_address(address);
    })
    .filter()
    .value();
  return neighbours;
}

City.prototype.get_address = function(address){
  var elem = this.grid[address[1]][address[0]];
  return elem;
}

City.prototype.toString = function(){
  return "City, "+this.x+" x "+this.y+")";
}

City.prototype.wrap = function(address){
  var x = address[0];
  var y = address[1];
  var xmax = this.x-1;
  var ymax = this.y-1;
  return [
    (x>=0)?x%xmax:this.x+x,
    (y>=0)?y%ymax:this.y+y
  ];
}

City.prototype.empty_lots = function () {
  var lots = [];
  this.for_lots(function(address, occupant){
    if(!occupant){lots.push(address);}
  })
  return lots;
}
City.prototype.move = function (from, to) {
  console.log("Moving!", from, to, this.grid[from[1]][from[0]], this.grid[to[1]][to[0]]);
  if(this.grid[to[1]][to[0]]){
    throw new Error("Can't move to an address with occupants!");
  }
  var household = this.grid[from[1]][from[0]];
  this.grid[from[1]][from[0]] = null;
  this.grid[to[1]][to[0]] = household;

}

City.prototype.for_lots = function(for_lot, for_row, for_city){
  var width = this.grid[0].length;
  var height = this.grid.length;
  for (var y = 0; y <height; y++) {
     for (var x = 0; x <width; x++) {
       if(for_lot){
         for_lot([x,y], this.grid[y][x]);
       }
     }
     if(for_row){
       for_row(y);
     }
  }
  if(for_city){
    for_city();
  }
}

City.prototype.print_city = function () {
  this.for_lots(
    function(address, occupant){
      if (occupant) {
        print(" "+occupant.symbol);
      } else {
        print(" .");
      }
    },
    function(row){
      print ("\n");
    },
    function(){
      print ("\n");
    });
}


module.exports = City;
