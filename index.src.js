var common = require("./common"),
  process = common.process;

exports.css = process(function (id) {
  return id;
});
