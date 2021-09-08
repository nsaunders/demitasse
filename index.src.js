var common = require("./common"),
  process = common.process;

exports.css = process(function (groupName, groupHash, key) {
  return [groupName, groupHash, key]
    .filter(function (x) {
      return x;
    })
    .join("-");
});
