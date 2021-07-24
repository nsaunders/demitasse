require("ts-node").register({
  transpileOnly: true,
});

const modules = ["./App.ts"].map(require.resolve);

module.exports = () => {

  require("demitasse").css = require("demitasse/extract").css;

  const code =
    modules
      .map(require)
      .map(({ styles }) => styles)
      .flatMap(Object.values)
      .join("\n");

  modules.forEach(key => {
    delete require.cache[key];
  });

  return { code, dependencies: modules };

};
