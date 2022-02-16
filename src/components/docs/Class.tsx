import { Component, createMemo, Show } from 'solid-js';
import { JSONOutput } from 'typedoc';
import { parseClass } from '../../functions/parsers/parseClass';
import { Container } from '../Container';
import { Markdown } from '../Markdown';

export const Class: Component<{ name: string; reflection: JSONOutput.DeclarationReflection }> = (props) => {
  const class_ = createMemo(() => {
    const class_ = parseClass(props.reflection);

    console.log(class_.constructor_.codeblock);

    return class_;
  });

  return (
    <Container>
      <Markdown>
        <h1>Class: {class_().name}</h1>

        <Show
          when={class_().constructor_ !== undefined}
          children={
            <Markdown>
              <pre>
                <code class='language-javascript'>{class_().constructor_.codeblock}</code>
              </pre>
            </Markdown>
          }
        />

        <p>{class_().description}</p>

        <Show
          when={class_().examples.length > 0}
          children={
            <>
              <h2>Examples</h2>

              {class_().examples.map((example) => (
                <Markdown>
                  <pre>
                    <code class='language-javascript'>{example}</code>
                  </pre>
                </Markdown>
              ))}
            </>
          }
        />
      </Markdown>
    </Container>
  );
};
