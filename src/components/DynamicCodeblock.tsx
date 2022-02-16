import hljs from 'highlight.js';
import { Component, createEffect } from 'solid-js';

export const DynamicCodeblock: Component<{ codeblock: string; language: string }> = (props) => {
  let code: HTMLElement;

  createEffect((previousCodeblock) => {
    if (previousCodeblock === props.codeblock) hljs.highlightElement(code);
    else code.innerHTML = hljs.highlight('typescript', props.codeblock).value;

    return props.codeblock;
  }, props.codeblock);

  return (
    <pre>
      <code class={`language-${props.language}`} ref={code}>
        {props.codeblock}
      </code>
    </pre>
  );
};
