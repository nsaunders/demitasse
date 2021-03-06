export function cssRules(moduleId, rules, options) {
  return [
    [[moduleId, rules, options || {}]], // We want to be able to spread this into an existing array of CSS in order to combine with dependencies.
    toClassNames(moduleId, rules, options || {}),
  ];
}

export function demi() {
  return cssRules.apply(null, arguments);
}

export function cssExport(moduleId, cssArray) {
  return cssArray.map(function (css) {
    css[3] = moduleId;
    return css;
  });
}

export function sheets(cssArray) {
  return cssArray
    .map(function (args) {
      var moduleId = args[0];
      var rules = args[1];
      var options = args[2];
      var sheetId = args[3] || args[0];
      var f = process(function (id, rule) {
        return serializeCSS(cssModel("." + id, rule));
      }, options && options.debug);
      var serialized = f(moduleId, rules);
      return [
        sheetId,
        typeof serialized === "string"
          ? serialized
          : Object.values(serialized).join("\n"),
      ];
    })
    .reduce(function (acc, sheet) {
      var existing = acc.filter(function (x) {
        return x[1] === sheet[1];
      })[0];
      if (existing) {
        existing[0] = "_common";
        existing[2] += 1;
      } else {
        acc.push([sheet[0], sheet[1], 1]);
      }
      return acc;
    }, [])
    .sort(function (a, b) {
      var x = a[2];
      var y = b[2];
      return x > y ? -1 : x < y ? 1 : 0;
    })
    .reduce(function (outputs, sheet) {
      var existing = outputs[sheet[0]];
      if (!existing) {
        outputs[sheet[0]] = sheet[1];
      } else {
        outputs[sheet[0]] = existing + "\n" + sheet[1];
      }
      return outputs;
    }, {});
}

function toClassNames(moduleId, rules, options) {
  var f = process(function (id) {
    return id;
  }, options && options.debug);
  return f(moduleId, rules);
}

function process(f, debug) {
  return function (groupName, rules) {
    var groupHash = hash(rules);
    var keys = Object.keys(rules);
    var multi = keys.filter(function (key) {
      return (
        typeof rules[key] === "object" &&
        key[0] !== "@" &&
        key !== "animationKeyframes" &&
        !~key.indexOf("&")
      );
    }).length;
    if (!multi) {
      return f(
        debug
          ? [groupName, groupHash].join("-")
          : hash({ groupName: groupName, groupHash: groupHash }),
        rules
      );
    }
    return keys
      .map(function (key) {
        return [
          key,
          f(
            debug
              ? [
                  groupName,
                  groupHash,
                  key.replace(/[A-Z]/g, function (x) {
                    return "-" + x.toLowerCase();
                  }),
                ].join("-")
              : hash({
                  groupName: groupName,
                  groupHash: groupHash,
                  key: key,
                  rule: rules[key],
                }),
            rules[key]
          ),
        ];
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
  return ~unitless.indexOf(prop)
    ? value
    : value + (~prop.indexOf("Duration") ? "ms" : "px");
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
      if (key[0] === "@") {
        var inner = cssModel(acc, rule[key]);
        Object.keys(inner).forEach(function (k) {
          var tmp = {};
          tmp[key] = inner[k];
          inner[k] = Object.assign({}, obj[k], tmp);
        });
        return Object.assign({}, obj, inner);
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
      var o = JSON.parse(JSON.stringify(obj[key]));
      Object.keys(o).forEach(function (k) {
        if (k[0] === "@") {
          Object.assign(o, o[k]);
          delete o[k];
        }
      });
      if (o._tag === "keyframes") {
        return [
          "@keyframes ",
          key,
          " {",
          Object.keys(o)
            .filter(function (key) {
              return key !== "_tag";
            })
            .map(function (keyframeKey) {
              return [
                "\n  ",
                keyframeKey,
                " {\n    ",
                Object.keys(o[keyframeKey])
                  .map(function (prop) {
                    return prop + ": " + o[keyframeKey][prop] + ";";
                  })
                  .join(""),
                "\n  }",
              ].join("");
            })
            .join(""),
          "\n}",
        ].join("");
      }
      return Object.keys(obj[key])
        .map(function (k) {
          if (typeof obj[key][k] === "object") {
            return [obj[key][k], k];
          }
          var tmp = {};
          tmp[k] = obj[key][k];
          return [tmp];
        })
        .reduce(function (acc, x) {
          var existing = acc.filter(function (y) {
            return x[1] === y[1];
          })[0];
          if (existing) {
            Object.assign(existing[0], x[0]);
          } else {
            acc.push(x);
          }
          return acc;
        }, [])
        .map(function (x) {
          var indent = x[1] ? "  " : "";
          var rule =
            Object.keys(x[0]).reduce(function (acc, k) {
              return acc + "\n  " + indent + k + ": " + x[0][k] + ";";
            }, indent + key + " {") +
            "\n" +
            indent +
            "}";
          return x[1] ? x[1] + " {\n" + rule + "\n}" : rule;
        })
        .join("\n");
    })
    .join("\n");
}
