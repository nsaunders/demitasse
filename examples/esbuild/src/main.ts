import { createElement } from "react";
import { render } from "react-dom";
import { Example } from "./Example"; 

const host = document.createElement("main");
document.body.appendChild(host);
render(createElement(Example), host);
