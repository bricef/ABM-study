/*
 * Schelling's Segregation model (Thomas Schelling 1969)
 * in JavaScript
 */


var Household = require("./Household", COMFORT_THRESHOLD);
var City = require("./City");

// The COMFORT_THRESHOLD describes when households become
// uncomfortable enough to move. When more than COMFORT_THRESHOLD
// neighbours are different, the household will move away to a new
// position in the city
var COMFORT_THRESHOLD = 0.3;


var individual = new Household("#000000");

var city = new City(15,15);

city.print_city();
