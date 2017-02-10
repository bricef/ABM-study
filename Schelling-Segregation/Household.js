var uuid = require("uuid");

function Household(symbol, comfort_threshold){
  this.symbol = symbol;
  this.comfort = comfort_threshold || 0.3;
  this.uuid = uuid();
}

Household.prototype.isSatisfied = function(neighbours){
  throw new Error("Not implemented");
}

Household.prototype.toString = function(){
  return "Household("+this.uuid+")";
}

module.exports = Household;
