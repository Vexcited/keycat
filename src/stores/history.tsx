import { batch, createSignal } from "solid-js";

export interface KeyDown {
  enum: string;
  content?: string;
}

const [latestKey, setLatestKey] = createSignal<KeyDown>();
const [history, setHistory] = createSignal<KeyDown[]>([]);

export { latestKey, history };

export const pushKeyToHistory = (key: KeyDown) => {
  batch(() => {
    setLatestKey(key);
    setHistory((prev) => {
      if (prev.length > 10) prev.shift();
      return [...prev, key];
    });
  })
};
