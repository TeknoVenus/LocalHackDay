function genList(x, y, n){
  var array = Array(n);
  for (var i = 0; i < n; i++){
    array[i] = Math.round((Math.random()*y)-x);
  }
  return array;
}
