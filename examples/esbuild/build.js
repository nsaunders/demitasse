const serve = process.argv.includes("--serve");

require("ts-node").register({
  transpileOnly: true,
  compilerOptions: { module: "commonjs" },
});

require("demitasse").css = require("demitasse/extract").css;

const stylesPath = require.resolve("./src/styles.ts");

const clients = [];

const outdir = "dist";

require("esbuild")
  .build({
    entryPoints: ["./src/main.ts", "./src/styles.css"],
    bundle: true,
    minify: !serve,
    outdir,
    banner: {
      js: serve
        ? "new EventSource('/events').onmessage = function() { location.reload() };"
        : "",
    },
    watch: serve && {
      onRebuild(err) {
        if (err) {
          console.error(err);
        }
        else {
          clients.forEach(({ response }) => {
            response.write(`data: ${Date.now()}\n\n`);
          });
        }
      }
    },
    plugins: [
      {
        name: "styles",
        setup(build) {
          const namespace = "virtual";

          build.onResolve({ filter: /\/src\/styles\.css$/ }, ({ path }) => ({
            path,
            namespace,
          }));

          build.onLoad({ filter: /\/src\/styles\.css$/, namespace }, () => {
            const contents =
              Object
                .values(require(stylesPath))
                .flatMap(x => {
                  switch (typeof x) {
                    case "object":
                      return Object.values(x);
                    case "string":
                      return [x];
                    default:
                      return [];
                  }
                })
                .join("\n");

            module
              .children
              .filter(({ filename }) => filename.endsWith("/styles.ts"))
              .flatMap(({ children }) => children)
              .map(({ filename }) => filename)
              .concat(stylesPath)
              .forEach(key => {
                delete require.cache[key];
              });

            return {
              contents,
              loader: "css",
            };
          });
        },
      },
    ],
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

if (serve) {
  const fs = require("fs");
  const path = require("path");

  require("http")
    .createServer((request, response) => {
      const { url, method } = request;

      if (method === "GET" && url === "/events") {
        response.writeHead(
          200,
          {
            "content-type": "text/event-stream",
            connection: "keep-alive",
            "cache-control": "no-cache",
          }
        );

        const clientId = Date.now();

        clients.push({ id: clientId, response });

        request.on("close", () => {
          clients.splice(clients.findIndex(({ id }) => id === clientId), 1);
        });

        return;
      }

      const filePath = path.join(path.resolve(__dirname, outdir), url === "/" ? "index.html" : url);

      fs.access(filePath, fs.constants.R_OK, err => {
        if (err) {
          response.writeHead(404, { "content-type": "text/plain" });
          response.write("Not found\n");
          return response.end();
        }
        response.writeHead(200, { "content-type": mimeType(filePath) });
        return fs
          .createReadStream(filePath)
          .pipe(response);

        function mimeType(path) {
          switch ((path.match(/\.([a-z]+)$/) || [])[1]) {
            case "css":
              return "text/css";
            case "js":
              return "text/javascript";
            case "html":
              return "text/html";
            default:
              return "application/octet-stream";
          }
        }
      });
    })
    .listen(8080);
}
