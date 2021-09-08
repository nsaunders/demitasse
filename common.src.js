exports.process = process;

function process(f) {
  return function (groupName, rules) {
    var groupHash = hash(rules);
    var keys = Object.keys(rules);
    var multi = keys.filter(function (key) {
      return (
        typeof rules[key] === "object" &&
        key !== "animationKeyframes" &&
        !~key.indexOf("&")
      );
    }).length;
    if (!multi) {
      return f([groupName, groupHash].join("-"), rules);
    }
    return keys
      .map(function (key) {
        return [key, f([groupName, groupHash, key.replace(/[A-Z]/g, function(x) { return "-" + x.toLowerCase() ; })].join("-"), rules[key])];
      })
      .reduce(function (obj, rule) {
        obj[rule[0]] = rule[1];
        return obj;
      }, {});
  };
}

function hash(obj) {
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
}
