import { listen } from "@tauri-apps/api/event";
import { pushKeyToHistory } from "../stores/history";

/** Prevents listening again and again. */
let listening = false;

export const createKeyboardListeners = async (): Promise<void> => {
  if (listening) return;
  listening = true;
  
  // Only controls such as Ctrl, Shift, Alt, etc.
  await listen<string>("press:enum", ({ payload }) => {
    pushKeyToHistory({ enum: payload });
  })
  
  // Every keys.
  await listen<string>("release:enum", ({ payload }) => {
    // pushKeyToHistory({ enum: payload });
  })

  // Only unicode characters.
  await listen<{ content: string, from_enum: string }>("press:raw", ({ payload }) => {
    pushKeyToHistory({ enum: payload.from_enum, content: payload.content });
  })
};
