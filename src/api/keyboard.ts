import { listen } from "@tauri-apps/api/event";

export const createKeyboardListeners = async (): Promise<void> => {
  // Only controls such as Ctrl, Shift, Alt, etc.
  await listen<string>("press:enum", ({ payload: key }) => {
    console.log("(enum) ->", key);
  })

  // Every keys.
  await listen<string>("release:enum", ({ payload: key }) => {
    console.log("(enum) <-", key);
  })

  // Only unicode characters.
  await listen<{ content: string, from_enum: string }>("press:raw", ({ payload: key }) => {
    console.log("(raw) ->", key);
  })
};
