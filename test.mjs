import { css, toClassNames, toString } from "./index.mjs";
import { strict as assert } from "assert";

test("Extracting basic ruleset", function () {
  const actual = toString(css("simple-button", {
    background: "blue",
    color: "white",
  }));
  const expected = `.rvrc34 {
  background: blue;
  color: white;
}`;
  assert.equal(actual, expected);
});

test("Extracting basic ruleset with nesting", function () {
  const actual = toString(css("link", {
    textDecoration: "none",
    "&:not(:disabled)": {
      "&:hover": {
        textDecoration: "underline",
      },
    },
  }));
  const expected = `.un7dwx {
  text-decoration: none;
}
.un7dwx:not(:disabled):hover {
  text-decoration: underline;
}`;
  assert.equal(actual, expected);
});

test("Extracting complex ruleset", function () {
  const actual = toString(css("fancy-button", {
    surface: {
      background: "gray",
    },
    content: {
      color: "white",
    },
  }));
  const expected = `.faavx5 {
  background: gray;
}
.gpb1nu {
  color: white;
}`;
  assert.deepEqual(actual, expected);
});

test("Extracting complex ruleset with nesting", function () {
  const actual = toString(css("checkbox", {
    input: {
      appearance: "none",
      border: "1px solid black",
    },
    label: {
      ":checked + &": {
        textDecoration: "line-through",
      },
    },
  }));
  const expected = `.bjakbh {
  appearance: none;
  border: 1px solid black;
}
:checked + .rlobej {
  text-decoration: line-through;
}`;
  assert.deepEqual(actual, expected);
});

test("Normalizing class names", function() {
  const actual = toString(css("error", {
    assistiveText: {
      color: "red",
    },
  }));
  const expected = `.zx0trp1 {
  color: red;
}`;
  return assert.deepEqual(actual, expected);
});

test("Normalizing values", function () {
  const actual = toString(css("sidebar", {
    content: "",
    top: 0,
    bottom: 0,
    left: 0,
    width: 300,
    transitionDuration: 500,
    animationDuration: 750,
  }));
  const expected = `.b5264e {
  content: '';
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  transition-duration: 500ms;
  animation-duration: 750ms;
}`;
  assert.equal(actual, expected);
});

test("Keyframes", function () {
  const actual = toString(css("pulse", {
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
  }));
  const expected = `@keyframes v130c69 {
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
.v130c69 {
  animation-name: v130c69;
}`;
  assert.equal(actual, expected);
});

test("Matching runtime class name for basic ruleset", function () {
  var s = css("black", { background: "black" });
  var className = toClassNames(s);
  assert.match(toString(s),new RegExp(`\\.${className}`));
});

test("Matching runtime class name for multi ruleset", function () {
  var s = css("black", { text: { color: "white" } });
  var className = toClassNames(s).text;
  assert.match(toString(s), new RegExp(`\\.${className}`));
});

test("Debug with basic ruleset", function () {
  var s = css("foo-bar", { textDecoration: "underline" }, { debug: true });
  var className = toClassNames(s);
  assert.match(toString(s), new RegExp(`\\.${className}`));
});

test("Debug with multi ruleset", function () {
  var s = css("foo-bar", { buzz: { textDecoration: "underline" } }, { debug: true });
  var className = toClassNames(s).buzz;
  assert.match(toString(s), new RegExp(`\\.${className}`));
});

function test(label, run) {
  process.stdout.write(`${label}…`);
  run();
  process.stdout.write("OK!\n");
}
