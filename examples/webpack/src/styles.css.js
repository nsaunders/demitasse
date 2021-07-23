require("ts-node").register({
  transpileOnly: true,
});

const modules = ["./App.ts"].map(require.resolve);

module.exports = () => {
  require("demitasse").css = require("demitasse/extract").css;
  const code = modules.map(require).map(({ styles }) => styles).flatMap(Object.values).join("\n");
  modules.forEach(require("decache"));
  return { code, dependencies: modules };
};
