var common = require("./common"),
  hash = common.hash,
  process = common.process;

exports.css = function (obj) {
  return process(function (o) {
    return serialize("." + hash(o), o);
  }, obj);
};

function serialize(sel, obj) {
  var rules = flatten(sel, obj).reduce(function (rules, x) {
    rules[x[0]] = rules[x[0]] || {};
    rules[x[0]][x[1]] = x[2];
    return rules;
  }, {});

  var css = Object.keys(rules)
    .map(function (sel) {
      return sel + " {\n" + decls(rules[sel]) + "\n}";
    })
    .join("\n");

  return css;

  function decls(obj) {
    return Object.keys(obj).reduce(function (css, prop) {
      return (
        (css ? css + "\n" : "") +
        "  " +
        prop.replace(/([A-Z])/g, function (_, x) {
          return "-" + x.toLowerCase();
        }) +
        ": " +
        normalizeValue(obj[prop], prop) +
        ";"
      );
    }, "");

    function normalizeValue(value, prop) {
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
  }

  function flatten(sel, obj) {
    return Object.keys(obj).reduce(function (rules, x) {
      if (typeof obj[x] === "object") {
        return rules.concat(flatten(combineSel(sel, x), obj[x]));
      }
      return rules.concat([[sel, x, obj[x]]]);
    }, []);
  }

  function combineSel(parent, child) {
    return child.replace(/&/g, parent);
  }
}
