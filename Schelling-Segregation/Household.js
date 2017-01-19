var uuid = require("uuid");

function Household(symbol, comfort_threshold){
  this.symbol = symbol;
  this.comfort = comfort_threshold || 0.3;
  this.satisfaction = 0.5;
  this.uuid = uuid();
}

Household.prototype.get_satisfaction = function(){
  // Will depend on the neighbours.
  return this.satisfaction;
}

Household.prototype.toString = function(){
  return "Household("+this.uuid+")";
}

module.exports = Household;
