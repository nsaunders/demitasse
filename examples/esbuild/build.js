const serve = process.argv.includes("--serve");

require("ts-node").register({
  transpileOnly: true,
});

require("demitasse").css = require("demitasse/extract").css;

const clients = [];

const outdir = "dist";

require("esbuild")
  .build({
    entryPoints: ["./src/index.ts", "./src/styles.css"],
    bundle: true,
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
            const modules = ["./src/App.ts"].map(require.resolve);

            const contents = modules
              .map(require)
              .map(({ styles }) => styles)
              .flatMap(Object.values)
              .join("\n");

            modules.forEach(key => {
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
