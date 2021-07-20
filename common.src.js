exports.hash = function (obj) {
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
  return hs.replace(/^[^a-z]/, () =>
    "abcdefghijklmnopqrstuvwxyz".charAt(Math.abs(h) % 26)
  );
};

exports.process = function (f, o) {
  var keys = Object.keys(o);
  if (
    keys.filter(function (k) {
      return typeof o[k] !== "object";
    }).length
  ) {
    return f(o);
  }
  return keys
    .map(function (k) {
      return [k, f(o[k])];
    })
    .reduce(function (obj, x) {
      obj[x[0]] = x[1];
      return obj;
    }, {});
};
