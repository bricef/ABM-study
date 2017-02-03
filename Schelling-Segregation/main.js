/*
 * Schelling's Segregation model (Thomas Schelling 1969)
 * in JavaScript
 */
var sleep = require("sleep");

var utils = require("./utils")
var Household = require("./Household");
var City = require("./City");

// The COMFORT_THRESHOLD describes when households become
// uncomfortable enough to move. When more than COMFORT_THRESHOLD
// neighbours are different, the household will move away to a new
// position in the city
var COMFORT_THRESHOLD = 0.3;


var individual = new Household("#000000", COMFORT_THRESHOLD);

var city = new City(15,10, [
  [1, Household.factory("x")],
  [1, Household.factory("o")],
  [2, utils.NullFactory]
]);

city.print_city();
for(var i = 0; i < 100000; i++){
  city.tick()
  if(i%100 == 0){
    utils.clear_console();
    city.print_city();
  }
}
city.print_city();
