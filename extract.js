var common = require("./common"),
  process = common.process;

exports.css = process(function (id, rule) {
  return serializeCSS(cssModel("." + id, rule));
});

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
  return ~unitless.indexOf(prop) ? value : value + "px";
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
