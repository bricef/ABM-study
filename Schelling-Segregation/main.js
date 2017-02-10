/*
 * Schelling's Segregation model (Thomas Schelling 1969)
 * in JavaScript
 */


var Household = require("./Household");
var City = require("./City");

// The COMFORT_THRESHOLD describes when households become
// uncomfortable enough to move. When more than COMFORT_THRESHOLD
// neighbours are different, the household will move away to a new
// position in the city
var COMFORT_THRESHOLD = 0.5;

var city = new City(15,15, COMFORT_THRESHOLD);

city.print_city();
city.tick();
console.log("=====================")
city.print_city();
