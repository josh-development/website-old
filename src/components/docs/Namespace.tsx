import { Link } from 'solid-app-router';
import { Component, createEffect, createSignal, Show } from 'solid-js';
import { JSONOutput } from 'typedoc';
import { parseNamespace } from '../../functions/parsers/parseNamespace';
import { Container } from '../Container';
import { Markdown } from '../Markdown';

export const Namespace: Component<{ name: string; reflection: JSONOutput.DeclarationReflection }> = (props) => {
  const [namespace, setNamespace] = createSignal(parseNamespace(props.reflection));

  createEffect(() => {
    setNamespace(parseNamespace(props.reflection));
  });

  return (
    <Container>
      <Markdown>
        <h1>Namespace: {namespace().name}</h1>

        <Markdown class='mx-8'>
          <Show
            when={namespace().interfaces.length > 0}
            children={
              <>
                <h2>Interfaces</h2>

                <ul>
                  {namespace().interfaces.map((interface_) => (
                    <li>
                      <Link href={`/docs/Documentation/${namespace().name}/interfaces/${namespace().name}.${interface_}`}>{interface_}</Link>
                    </li>
                  ))}
                </ul>
              </>
            }
          />

          <Show
            when={namespace().enums.length > 0}
            children={
              <>
                <h2>Enums</h2>

                <ul>
                  {namespace().enums.map((enum_) => (
                    <li>
                      <Link href={`/docs/Documentation/${namespace().name}/enums/${namespace().name}.${enum_}`}>{enum_}</Link>
                    </li>
                  ))}
                </ul>
              </>
            }
          />

          <Show
            when={namespace().typeAliases.length > 0}
            children={
              <>
                <h2>Type Aliases</h2>

                {namespace().typeAliases.map((typeAlias) => {
                  const { name, codeblock, description } = typeAlias;

                  return (
                    <Markdown>
                      <h3 id={name.toLowerCase()} class='mt-4'>
                        {name}
                      </h3>

                      <pre>
                        <code class='language-typescript'>{codeblock}</code>
                      </pre>

                      <p>{description}</p>
                    </Markdown>
                  );
                })}
              </>
            }
          />
        </Markdown>
      </Markdown>
    </Container>
  );
};
