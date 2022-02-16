import { useParams } from 'solid-app-router';
import { Component, createMemo, Show } from 'solid-js';
import type { JSONOutput } from 'typedoc';
import { isParseTypeAliasOptions, parseTypeAlias, ParseTypeAliasOptions } from '../../lib/functions/parseTypeAlias';
import { Markdown } from '../Markdown';

export const TypeAlias: Component<{ typeAlias: ParseTypeAliasOptions | JSONOutput.DeclarationReflection }> = (props) => {
  const params = useParams();
  const packageName = createMemo(() => params.packageName);
  const parsed = createMemo(() => (isParseTypeAliasOptions(props.typeAlias) ? props.typeAlias : parseTypeAlias(props.typeAlias, packageName())));

  return (
    <Markdown>
      <h3 id={parsed().name.toLowerCase()}>{name}</h3>

      <p>{parsed().description}</p>

      <pre>
        <code class='language-typescript'>{parsed().codeblock}</code>
      </pre>

      <Show
        when={parsed().source !== undefined}
        children={
          <Markdown>
            <span>Defined at </span>
            <a href={parsed().source.url}>
              <code>
                {parsed().source.filePath}:{parsed().source.line}
              </code>
            </a>
          </Markdown>
        }
      />
    </Markdown>
  );
};
