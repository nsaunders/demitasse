import "./css";
import App from "./components/App";
import { createRoot } from "react-dom/client";

const host = document.createElement("div");
document.body.appendChild(host);

const root = createRoot(host);

root.render(<App />);
