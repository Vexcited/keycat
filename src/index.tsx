/* @refresh reload */
import { render } from "solid-js/web";
import { createKeyboardListeners } from "./api/keyboard";

render(() => <></>, document.getElementById("root") as HTMLDivElement);
createKeyboardListeners();
