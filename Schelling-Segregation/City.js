var Household = require("./Household")
//create a city object that encapsulates thecity data structure.

function random_pick(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

/*
 * function random_pick chooses the type of household at random, selecting x, y
 * or false. It does this by picking a random number from arr.length. In this
 * example the array has three values of x, y or false. The random number could
 * be any number from 0 to 3 (in this example). Firstly, we need a whole number
 * since the index of the array is a whole number. Secondly, we need to floor
 * the number rather than round it up as there is no index 3. So if the random
 * number comes back as 2.6 we will floor it to 2. If the array is [x,y,false]
 * it would pick false. Note: In the code below the values of the array are
 * actually functions.
 */

function generate_grid(x,y, choices){
  var grid = [];
  for (var i = 0; i < y; i++) {
    var row = [];
    for (var j = 0; j < x; j++) {
      var choice_fn = random_pick(choices)
      row.push(choice_fn());
    }
    grid.push(row);
  }
  return grid;
}

function print (stuff){
  process.stdout.write(stuff);
}

function City(x, y){
  this.width = x;
  this.height = y;
  this.residentFactories = [
    ()=> new Household("x"), // equivalent to function(){ return new Household("x"); }
    ()=> new Household("o"),
    ()=> false
  ];
  this.grid = generate_grid(x,y, this.residentFactories);
}

City.prototype.print_city = function () {
  //iterate through grid x and y
  //print a dot if false
  for (var y = 0; y <this.height; y++) {
     for (var x = 0; x <this.width; x++) {
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

/**
 * Will return an array of neighbours, which will not include vacant lots
 */
City.prototype.getNeighbours = function(address){
  throw new Error("Not implemented");
}

/*
 * give back an array with two numbers which will represent an empty plot within
 * my grid.
 */
City.prototype.getRandomEmptyPlot = function(){
  throw new Error("Not implemented");
}

/*
 * it takes the household at the current address and moves it to the new address.
 */
City.prototype.move = function(currentAddress, newAddress){
  throw new Error("Not implemented");
}

City.prototype.getHouseholdAtAddress = function(address){
  // address will be in the form of an array [x,y]
  var x = address[0];
  var y = address[1];
  return this.grid[y][x];
}

/**
 * The tick function will go through every resident of the city, ask them how
 * satisfied they are with their neighbours, and if the resident is dissatisfied,
 * it will move them to a new random empty lot in the city.
 */
City.prototype.tick = function(){
  for (var y = 0; y <this.height; y++) {
     for (var x = 0; x <this.width; x++) {
       var currentAddress = [x,y];
       var current_household = this.getHouseholdAtAddress(currentAddress); // address -> Household|false
       var neighbours = this.getNeighbours(currentAddress); // address -> [Households]
       var satisfied = current_household.isSatisfied(neighbours); // [Households] -> Boolean
       if (!satisfied) {
         //move current_household to a randomly selected empty plot
          var newAddress = this.getRandomEmptyPlot();
          this.move(currentAddress, newAddress);
       }
     }
   }
}

module.exports = City;
