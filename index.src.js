var common = require("./common"),
  hash = common.hash,
  process = common.process;

exports.css = function (obj) {
  return process(hash, obj);
};
