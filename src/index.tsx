/* @refresh reload */
import "@unocss/reset/tailwind.css";
import "uno.css";

import { render } from "solid-js/web";
import { createKeyboardListeners } from "./api/keyboard";
import Messages from "./components/Messages";

render(() => <Messages />, document.getElementById("root") as HTMLDivElement);
createKeyboardListeners();
