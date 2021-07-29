const fs = require("fs/promises");
const path = require("path");

require("ts-node").register({
  transpileOnly: true,
});

require("demitasse").css = require("demitasse/extract").css;

const sheets =
  Object
    .entries(require("./src/styles.ts"))
    .map(([name, content]) => [
      name,
      (x => {
        switch (typeof x) {
          case "string":
            return x;
          case "object":
            return Object.values(x).join("\n");
          default:
            return null;
        }
      })(content)
    ]);

const outDir = path.join(__dirname, "css");

const main = async () => {
  try {
    await fs.rm(outDir, { recursive: true });
  }
  catch (_) {
    // This is fine.
  }

  await fs.mkdir(outDir);

  await Promise.all([
      ...sheets,
      ["index", sheets.map(([_, x]) => x).join("\n")],
    ].map(([name, css]) =>
      fs.writeFile(path.join(__dirname, "css", `${name}.css`), css)
    ),
  );
  
  console.log("Successfully wrote CSS files.");
};

main().catch(err => console.error(err));
