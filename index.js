var hash = require("./hash");

exports.css = function (obj) {
  return Object.keys(obj)
    .map(function (key) {
      return [key, hash(obj[key])];
    })
    .reduce(function (obj, x) {
      obj[x[0]] = x[1];
      return obj;
    }, {});
};
