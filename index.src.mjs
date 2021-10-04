export function css(_groupName, _rules, _options) {
  return { _groupName, _rules, _options };
}

export function toString(css) {
  var f = process(function (id, rule) {
    return serializeCSS(cssModel("." + id, rule));
  }, css._options && css._options.debug);
  var serialized = f(css._groupName, css._rules);
  return typeof serialized === "string" ? serialized : Object.values(serialized).join("\n");
}

export function toClassNames(css) {
  var f = process(function (id) { return id; }, css._options && css._options.debug);
  return f(css._groupName, css._rules);
}

function process(f, debug) {
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
      return f(debug ? [groupName, groupHash].join("-") : hash({ groupName: groupName, groupHash: groupHash }), rules);
    }
    return keys
      .map(function (key) {
        return [key, f(debug ? [groupName, groupHash, key.replace(/[A-Z]/g, function(x) { return "-" + x.toLowerCase() ; })].join("-") : hash({ groupName: groupName, groupHash: groupHash, key: key, rule: rules[key] }), rules[key])];
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

function camelToSnake(p) {
  return p.replace(/([A-Z])/g, function (_, x) {
    return "-" + x.toLowerCase();
  });
}

function normalizeValue(value, prop) {
  if (value === "") {
    return "''";
  }
  if (typeof value !== "number" || value === 0) {
    return value;
  }
  var unitless = [
    "animationIterationCount",
    "borderImageOutset",
    "borderImageSlice",
    "borderImageWidth",
    "boxFlex",
    "boxFlexGroup",
    "boxOrdinalGroup",
    "columnCount",
    "columns",
    "flex",
    "flexGrow",
    "flexPositive",
    "flexShrink",
    "flexNegative",
    "flexOrder",
    "gridRow",
    "gridRowEnd",
    "gridRowSpan",
    "gridRowStart",
    "gridColumn",
    "gridColumnEnd",
    "gridColumnSpan",
    "gridColumnStart",
    "msGridRow",
    "msGridRowSpan",
    "msGridColumn",
    "msGridColumnSpan",
    "fontWeight",
    "lineHeight",
    "opacity",
    "order",
    "orphans",
    "tabSize",
    "widows",
    "zIndex",
    "zoom",
    "WebkitLineClamp",
    "fillOpacity",
    "floodOpacity",
    "stopOpacity",
    "strokeDasharray",
    "strokeDashoffset",
    "strokeMiterlimit",
    "strokeOpacity",
    "strokeWidth",
  ];
  return ~unitless.indexOf(prop) ? value : value + (~prop.indexOf("Duration") ? "ms" : "px");
}

function cssModel(acc, rule) {
  var rulesets = Object.keys(rule).reduce(function (obj, key) {
    if (typeof rule[key] === "object") {
      if (key === "animationKeyframes") {
        if (!obj[acc]) {
          obj[acc] = {};
        }
        var animationName = acc.substring(1).replace(/([^A-Za-z0-9])/g, "-");
        obj[acc]["animation-name"] = animationName;
        obj[animationName] = Object.assign({}, cssModel(null, rule[key]), {
          _tag: "keyframes",
        });
        return obj;
      }
      return Object.assign(
        {},
        obj,
        cssModel(key.replace(/&/g, acc), rule[key])
      );
    }
    if (!obj[acc]) {
      obj[acc] = {};
    }
    obj[acc][camelToSnake(key)] = normalizeValue(rule[key], key);
    return obj;
  }, {});

  return rulesets;
}

function serializeCSS(obj) {
  return Object.keys(obj)
    .reduce(function (existing, key) {
      if (obj[key]._tag === "keyframes") {
        return [key].concat(existing);
      }
      return existing.concat(key);
    }, [])
    .map(function (key) {
      if (obj[key]._tag === "keyframes") {
        return [
          "@keyframes ",
          key,
          " {",
          Object.keys(obj[key])
            .filter(function (key) {
              return key !== "_tag";
            })
            .map(function (keyframeKey) {
              return [
                "\n  ",
                keyframeKey,
                " {\n    ",
                Object.keys(obj[key][keyframeKey])
                  .map(function (prop) {
                    return prop + ": " + obj[key][keyframeKey][prop] + ";";
                  })
                  .join(""),
                "\n  }",
              ].join("");
            })
            .join(""),
          "\n}",
        ].join("");
      }
      return (
        key +
        " {" +
        Object.keys(obj[key])
          .map(function (prop) {
            return "\n  " + prop + ": " + obj[key][prop] + ";";
          })
          .join("") +
        "\n}"
      );
    })
    .join("\n");
}
