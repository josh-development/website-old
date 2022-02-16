import { Link } from 'solid-app-router';
import { Component } from 'solid-js';
import { API } from '../../constants/api';
import { Container } from '../Container';
import { DocsPage } from '../DocsPage';
import { Markdown } from '../Markdown';
import { TypeAlias } from './TypeAlias';

export const DocumentationIndex: Component<{ name: string; api: API }> = (props) => {
  console.log(props.api.TYPE_ALIASES.length);

  return (
    <DocsPage name={`@joshdb/${props.name}`}>
      <Container>
        <Markdown>
          <h1>@joshdb/{props.name}</h1>

          <h2>Namespaces</h2>

          <ul>
            {props.api.NAMESPACES.map((namespace) => (
              <li>
                <Link href={`/docs/Documentation/${props.name}/namespaces/${namespace.name}`}>{namespace.name}</Link>
              </li>
            ))}
          </ul>

          <h2>Enums</h2>

          <ul>
            {props.api.ENUMS.map((enum_) => (
              <li>
                <Link href={`/docs/Documentation/${props.name}/enums/${enum_.name}`}>{enum_.name}</Link>
              </li>
            ))}
          </ul>

          <h2>Classes</h2>

          <ul>
            {props.api.CLASSES.map((class_) => (
              <li>
                <Link href={`/docs/Documentation/${props.name}/classes/${class_.name}`}>{class_.name}</Link>
              </li>
            ))}
          </ul>

          <h2>Interfaces</h2>

          <ul>
            {props.api.INTERFACES.map((interface_) => (
              <li>
                <Link href={`/docs/Documentation/${props.name}/interfaces/${interface_.name}`}>{interface_.name}</Link>
              </li>
            ))}
          </ul>

          <h2>Type Aliases</h2>

          {props.api.TYPE_ALIASES.map((typeAlias) => (
            <TypeAlias typeAlias={typeAlias} />
          ))}
        </Markdown>
      </Container>
    </DocsPage>
  );
};
