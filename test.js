var extract = require("./extract");
var runtime = require("./");
var assert = require("assert/strict");

test("Extracting basic ruleset", function () {
  const actual = extract.css("simple-button", {
    background: "blue",
    color: "white",
  });
  const expected = `.simple-button-qnye6s {
  background: blue;
  color: white;
}`;
  assert.equal(actual, expected);
});

test("Extracting basic ruleset with nesting", function () {
  const actual = extract.css("link", {
    textDecoration: "none",
    "&:not(:disabled)": {
      "&:hover": {
        textDecoration: "underline",
      },
    },
  });
  const expected = `.link-kpvpel0 {
  text-decoration: none;
}
.link-kpvpel0:not(:disabled):hover {
  text-decoration: underline;
}`;
  assert.equal(actual, expected);
});

test("Extracting complex ruleset", function () {
  const actual = extract.css("fancy-button", {
    surface: {
      background: "gray",
    },
    content: {
      color: "white",
    },
  });
  const expected = {
    surface: `.fancy-button-n54nb0z-surface {
  background: gray;
}`,
    content: `.fancy-button-n54nb0z-content {
  color: white;
}`,
  };
  assert.deepEqual(actual, expected);
});

test("Extracting complex ruleset with nesting", function () {
  const actual = extract.css("checkbox", {
    input: {
      appearance: "none",
      border: "1px solid black",
    },
    label: {
      ":checked + &": {
        textDecoration: "line-through",
      },
    },
  });
  const expected = {
    input: `.checkbox-kj82hoq-input {
  appearance: none;
  border: 1px solid black;
}`,
    label: `:checked + .checkbox-kj82hoq-label {
  text-decoration: line-through;
}`,
  };
  assert.deepEqual(actual, expected);
});

test("Normalizing class names", function() {
  const actual = extract.css("error", {
    assistiveText: {
      color: "red",
    },
  });
  const expected = {
    assistiveText: `.error-lotcfg-assistive-text {
  color: red;
}`
  };
  return assert.deepEqual(actual, expected);
});

test("Normalizing values", function () {
  const actual = extract.css("sidebar", {
    content: "",
    top: 0,
    bottom: 0,
    left: 0,
    width: 300,
  });
  const expected = `.sidebar-xs63xsl {
  content: '';
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px;
}`;
  assert.equal(actual, expected);
});

test("Keyframes", function () {
  const actual = extract.css("pulse", {
    animationKeyframes: {
      "0%": {
        transform: "scale(1)",
      },
      "25%": {
        transform: "scale(1.25)",
      },
      "75%": {
        transform: "scale(0.75)",
      },
      "100%": {
        transform: "scale(1)",
      },
    },
  });
  const expected = `@keyframes pulse-ao0hgb {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.25);
  }
  75% {
    transform: scale(0.75);
  }
  100% {
    transform: scale(1);
  }
}
.pulse-ao0hgb {
  animation-name: pulse-ao0hgb;
}`;
  assert.equal(actual, expected);
});

test("Matching runtime class name for basic ruleset", function () {
  var className = runtime.css("black", { background: "black" });
  assert.match(
    extract.css("black", { background: "black" }),
    new RegExp(`\\.${className}`)
  );
});

test("Matching runtime class name for basic ruleset", function () {
  var className = runtime.css("black", { text: { color: "white" } }).text;
  assert.match(
    extract.css("black", { text: { color: "white" } }).text,
    new RegExp(`\\.${className}`)
  );
});

function test(label, run) {
  process.stdout.write(`${label}…`);
  run();
  process.stdout.write("OK!\n");
}
