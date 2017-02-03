
function random_pick(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function factorify(Cls){
  return function(){ // factory
    var args = Array.from(arguments);
    return function(){ // Pseudo-constructor
      var newargs = Array.from(arguments);
      return new (Function.prototype.bind.apply(Cls, [null].concat(args).concat(newargs)))();
    }
  }
}

function NullFactory(){
  return null;
}

function clear_console(){
  process.stdout.write('\033c');
}

module.exports = {
  factorify: factorify,
  NullFactory: NullFactory,
  clear_console: clear_console,
  random_pick: random_pick
}
