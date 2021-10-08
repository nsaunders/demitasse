import { demi, cssExport, sheets } from "./index.mjs";
import { strict as assert } from "assert";

test("CSS output for single rule", function () {
  var actual = sheets(
    demi("simple-button", {
      background: "blue",
      color: "white",
    })[0]
  )["simple-button"];
  var expected = `.rvrc34 {
  background: blue;
  color: white;
}`;
  assert.equal(actual, expected);
});

test("CSS output for single rule with nesting", function () {
  var actual = sheets(
    demi("link", {
      textDecoration: "none",
      "&:not(:disabled)": {
        "&:hover": {
          textDecoration: "underline",
        },
      },
    })[0]
  )["link"];
  var expected = `.un7dwx {
  text-decoration: none;
}
.un7dwx:not(:disabled):hover {
  text-decoration: underline;
}`;
  assert.equal(actual, expected);
});

test("CSS output for record of rules", function () {
  var actual = sheets(
    demi("fancy-button", {
      surface: {
        background: "gray",
      },
      content: {
        color: "white",
      },
    })[0]
  )["fancy-button"];
  var expected = `.faavx5 {
  background: gray;
}
.gpb1nu {
  color: white;
}`;
  assert.deepEqual(actual, expected);
});

test("CSS output for record of rules with nesting", function () {
  var actual = sheets(
    demi("checkbox", {
      input: {
        appearance: "none",
        border: "1px solid black",
      },
      label: {
        ":checked + &": {
          textDecoration: "line-through",
        },
      },
    })[0]
  )["checkbox"];
  var expected = `.bjakbh {
  appearance: none;
  border: 1px solid black;
}
:checked + .rlobej {
  text-decoration: line-through;
}`;
  assert.deepEqual(actual, expected);
});

test("CSS output with normalized values", function () {
  var actual = sheets(
    demi("sidebar", {
      content: "",
      top: 0,
      bottom: 0,
      left: 0,
      width: 300,
      transitionDuration: 500,
      animationDuration: 750,
    })[0]
  )["sidebar"];
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

test("CSS output with keyframes", function () {
  var actual = sheets(
    demi("pulse", {
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
    })[0]
  )["pulse"];
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

test("CSS output matches class name on simple rule", function () {
  var d = demi("black", { background: "black" });
  assert.match(sheets(d[0])["black"], new RegExp(`\\.${d[1]}`));
});

test("CSS output matches class name on record of rules", function () {
  var d = demi("black", { text: { color: "white" } });
  assert.match(sheets(d[0]).black, new RegExp(`\\.${d[1].text}`));
});

test("CSS output matches class name on simple rule (with debug)", function () {
  var d = demi("foo-bar", { textDecoration: "underline" }, { debug: true });
  assert.match(sheets(d[0])["foo-bar"], new RegExp(`\\.${d[1]}`));
});

test("CSS output matches class name on record of rules (with debug)", function () {
  var d = demi(
    "foo-bar",
    { buzz: { textDecoration: "underline" } },
    { debug: true }
  );
  assert.match(sheets(d[0])["foo-bar"], new RegExp(`\\.${d[1].buzz}`));
});

test("class name with detail for simple rule (with debug)", function () {
  var s = demi("zip-zap", { color: "yellow" }, { debug: true });
  assert.match(s[1], /^zip\-zap/);
});

test("class name with detail for record of rules (with debug)", function () {
  var d = demi("zip-zap", { asdfFooBar: { color: "yellow" } }, { debug: true });
  assert.match(d[1].asdfFooBar, /^zip\-zap(.*)asdf\-foo\-bar$/);
});

test("css non-shared re-export", function () {
  var moduleId = "button";
  var containerBase = demi("container-base", { background: "red" });
  var button = demi(moduleId, { color: "black" });
  var css = cssExport(moduleId, containerBase[0].concat(button[0]));
  var output = sheets(css);
  assert.equal(Object.keys(output).length, 1);
  assert.match(output[moduleId], new RegExp(`\\.${containerBase[1]}`));
});

test("css common re-export", function () {
  var buttonModuleId = "button",
    inputModuleId = "input";

  var containerBase = demi("container-base", { background: "red" });

  var button = demi(buttonModuleId, { color: "black" });
  var buttonCSS = cssExport(buttonModuleId, containerBase[0].concat(button[0]));

  var input = demi(inputModuleId, { color: "black" });
  var inputCSS = cssExport(inputModuleId, containerBase[0].concat(input[0]));

  var output = sheets(buttonCSS.concat(inputCSS));
  assert.equal(Object.keys(output).length, 3);
  assert.doesNotMatch(
    output[buttonModuleId],
    new RegExp(`\\.${containerBase[1]}`)
  );
  assert.doesNotMatch(
    output[inputModuleId],
    new RegExp(`\\.${containerBase[1]}`)
  );
  assert.match(output["_common"], new RegExp(`\\.${containerBase[1]}`));
});

function test(label, run) {
  process.stdout.write(`${label}…`);
  run();
  process.stdout.write("OK!\n");
}
