module.exports = function (obj) {
  var x = JSON.stringify(obj);
  var hash = 0,
    i,
    chr;
  if (x.length === 0) {
    return hash;
  }
  for (i = 0; i < x.length; i++) {
    chr = x.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
};
