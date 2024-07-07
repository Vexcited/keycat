import { Show, type Component } from "solid-js";

const Message: Component<{ message: string }> = (props) => {
  return (
    <Show when={props.message !== ""}>
      <div class="bg-blue rounded-md px-4 py-2 text-white w-fit">
        <p>{props.message}</p>
      </div>
    </Show>
  );
};

export default Message;
