var uuid = require("uuid");
var _ = require("lodash");

var utils = require("./utils")

function Household(symbol, city, address, comfort_threshold){
  this.symbol = symbol;
  this.city = city;
  this.address = address;
  this.threshold= comfort_threshold || 0.3;
  this.uuid = uuid();
}

Household.prototype.is_different = function(neighbour){
  return this.symbol === neighbour.symbol;
}

Household.prototype.tick = function(){
  var neighbours = this.city.get_neighbours(this.address);
  var fraction_different = _(neighbours).filter(this.is_different.bind(this)).size() / neighbours.length;
  // console.log("address: "+this.address+" neighbours:"+neighbours.length+" fraction:"+fraction_different);
  if(fraction_different > this.threshold){
    this.city.move(this.address, utils.random_pick(this.city.empty_lots()));
  }
}

Household.prototype.toString = function(){
  return "Household("+this.uuid+")";
}

Household.factory = utils.factorify(Household);

module.exports = Household;
