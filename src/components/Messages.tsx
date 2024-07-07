import { batch, createEffect, createSignal, For, on, type Component } from "solid-js";
import { latestKey } from "../stores/history";
import Message from "./Message";

const Messages: Component = () => {
  const [messages, setMessages] = createSignal<string[]>([]);
  const [currentMessage, setCurrentMessage] = createSignal("");

  createEffect(on(latestKey, (keyDown) => {
    if (typeof keyDown === "undefined") return;
    
    // if we have a letter, then add it
    if (typeof keyDown.content === "string") {
      setCurrentMessage(prev => prev + keyDown.content);
    }
    else {
      switch (keyDown.enum) {
        // make a new message when pressing enter
        case "Return":
          // make sure the message is not empty
          if (currentMessage() === "") break;

          batch(() => {
            setMessages(prev => [...prev, currentMessage()]);
            setCurrentMessage("");
          })
          break;
        // remove the last character when pressing backspace
        case "Backspace":
          setCurrentMessage(prev => prev.slice(0, -1));
          break;
      }
    }
  }));

  return (
    <div class="flex flex-col justify-end max-w-[50%] h-screen gap-4 p-16">
      <For each={messages()}>
        {message => <Message message={message} />}
      </For>

      <Message message={currentMessage()} />
    </div>
  )
};

export default Messages;
