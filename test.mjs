import { css, toClassNames, toString } from "./index.mjs";
import { strict as assert } from "assert";

test("toString on single rule", function () {
  var actual = toString(css("simple-button", {
    background: "blue",
    color: "white",
  }));
  var expected = `.rvrc34 {
  background: blue;
  color: white;
}`;
  assert.equal(actual, expected);
});

test("toString on single rule with nesting", function () {
  var actual = toString(css("link", {
    textDecoration: "none",
    "&:not(:disabled)": {
      "&:hover": {
        textDecoration: "underline",
      },
    },
  }));
  var expected = `.un7dwx {
  text-decoration: none;
}
.un7dwx:not(:disabled):hover {
  text-decoration: underline;
}`;
  assert.equal(actual, expected);
});

test("toString on record of rules", function () {
  var actual = toString(css("fancy-button", {
    surface: {
      background: "gray",
    },
    content: {
      color: "white",
    },
  }));
  var expected = `.faavx5 {
  background: gray;
}
.gpb1nu {
  color: white;
}`;
  assert.deepEqual(actual, expected);
});

test("toString on record of rules with nesting", function () {
  var actual = toString(css("checkbox", {
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
  var expected = `.bjakbh {
  appearance: none;
  border: 1px solid black;
}
:checked + .rlobej {
  text-decoration: line-through;
}`;
  assert.deepEqual(actual, expected);
});

test("toString normalizing values", function () {
  var actual = toString(css("sidebar", {
    content: "",
    top: 0,
    bottom: 0,
    left: 0,
    width: 300,
    transitionDuration: 500,
    animationDuration: 750,
  }));
  var expected = `.b5264e {
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

test("toString with keyframes", function () {
  var actual = toString(css("pulse", {
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
  var expected = `@keyframes v130c69 {
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

test("toString/toClassNames matching class name on simple rule", function () {
  var s = css("black", { background: "black" });
  var className = toClassNames(s);
  assert.match(toString(s),new RegExp(`\\.${className}`));
});

test("toString/toClassNames matching class name on record of rules", function () {
  var s = css("black", { text: { color: "white" } });
  var className = toClassNames(s).text;
  assert.match(toString(s), new RegExp(`\\.${className}`));
});

test("toString/toClassNames matching class name on simple rule", function () {
  var s = css("foo-bar", { textDecoration: "underline" }, { debug: true });
  var className = toClassNames(s);
  assert.match(toString(s), new RegExp(`\\.${className}`));
});

test("toString/toClassNames matching class name on record of rules", function () {
  var s = css("foo-bar", { buzz: { textDecoration: "underline" } }, { debug: true });
  var className = toClassNames(s).buzz;
  assert.match(toString(s), new RegExp(`\\.${className}`));
});

test("toClassNames including detail in debug mode with simple rule", function () {
  var s = css("zip-zap", { color: "yellow" }, { debug: true });
  assert.match(toClassNames(s), /^zip\-zap/);
});

test("toClassNames including detail in debug mode with record of rules", function () {
  var s = css("zip-zap", { asdfFooBar: { color: "yellow" } }, { debug: true });
  assert.match(toClassNames(s).asdfFooBar, /^zip\-zap(.*)asdf\-foo\-bar$/);
});

test("toString array of rules", function () {
  var s = [css("my-button", { background: "blue", color: "white" }), css("my-input", { boxShadow: "0 0 0 1px blue" })];
  assert.equal(toString(s), `.bjydbe {
  background: blue;
  color: white;
}
.zlkfo83 {
  box-shadow: 0 0 0 1px blue;
}`);
});

test("toString record of rules", function () {
  var s = {
    button: css("my-button", { background: "blue", color: "white" }),
    input: css("my-input", { boxShadow: "0 0 0 1px blue" })
  };
  var out = toString(s);
  assert.equal(out.button, `.bjydbe {
  background: blue;
  color: white;
}`);
  assert.equal(out.input, `.zlkfo83 {
  box-shadow: 0 0 0 1px blue;
}`);
});

test("toString record of array of rules", function () {
  var disc = css("disc", {
    shape: {
      borderRadius: 9999,
    },
    color: {
      background: "gray",
    },
  });

  var discButton = css("disc-button", {
    outline: "none",
  });

  var out = toString({ db: [disc, discButton] });

  assert.equal(out.db, `.j1dxve9 {
  border-radius: 9999px;
}
.a9il1gm {
  background: gray;
}
.fjtrgf {
  outline: none;
}`);
});

function test(label, run) {
  process.stdout.write(`${label}…`);
  run();
  process.stdout.write("OK!\n");
}
