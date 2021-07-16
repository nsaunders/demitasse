module.exports = function (obj) {
  var x = JSON.stringify(obj);
  var h = 0,
    i,
    chr;
  if (x.length === 0) {
    return h;
  }
  for (i = 0; i < x.length; i++) {
    chr = x.charCodeAt(i);
    h = (h << 5) - h + chr;
    h |= 0;
  }
  var hs = h.toString(36);
  return hs.replace(
    /^[^a-z]/,
    () => "abcdefghijklmnopqrstuvwxyz".charAt(Math.abs(h) % 26),
  );
};
