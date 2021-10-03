import { css, toClassNames, toString } from "./index.mjs";
import { strict as assert } from "assert";

test("Extracting basic ruleset", function () {
  const actual = toString(css("simple-button", {
    background: "blue",
    color: "white",
  }));
  const expected = `.simple-button-qnye6s {
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
  const expected = `.link-kpvpel0 {
  text-decoration: none;
}
.link-kpvpel0:not(:disabled):hover {
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
  const expected = `.fancy-button-n54nb0z-surface {
  background: gray;
}
.fancy-button-n54nb0z-content {
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
  const expected = `.checkbox-kj82hoq-input {
  appearance: none;
  border: 1px solid black;
}
:checked + .checkbox-kj82hoq-label {
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
  const expected = `.error-lotcfg-assistive-text {
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
  const expected = `.sidebar-wz2sih {
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
  var s = css("black", { background: "black" });
  var className = toClassNames(s);
  assert.match(toString(s),new RegExp(`\\.${className}`));
});

test("Matching runtime class name for map ruleset", function () {
  var s = css("black", { text: { color: "white" } });
  var className = toClassNames(s).text;
  assert.match(toString(s), new RegExp(`\\.${className}`));
});

function test(label, run) {
  process.stdout.write(`${label}…`);
  run();
  process.stdout.write("OK!\n");
}
