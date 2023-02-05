import App from "./components/App";

import { render } from "preact";

const host = document.createElement("div");
document.body.appendChild(host);

render(<App />, host);
