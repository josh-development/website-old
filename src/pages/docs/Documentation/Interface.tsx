import { Navigate, useParams } from 'solid-app-router';
import { Component, createMemo, Show } from 'solid-js';
import { DocsPage } from '../../../components/DocsPage';
import { Markdown } from '../../../components/Markdown';
import { BREADCRUMB_ITEMS } from '../../../constants/breadcrumb-items';
import { MAPPED_API_DATA } from '../../../constants/mapped-api-data';
import { parseInterface } from '../../../lib/functions/parseInterface';

const InterfacePage: Component = () => {
  const params = useParams();
  const packageName = createMemo(() => params.packageName);
  const interfaceName = createMemo(() => params.interfaceName);
  const reflection = createMemo(() => MAPPED_API_DATA[packageName()]?.interfaces.find((reflection) => reflection.name === interfaceName()));

  if (reflection() === undefined) return <Navigate href='/404' />;

  const parsed = createMemo(() => parseInterface(reflection(), packageName()));

  return (
    <DocsPage
      name={`Interface: ${parsed().name}`}
      breadcrumbItems={[
        ...BREADCRUMB_ITEMS.DOCUMENTATION(packageName()),
        { name: 'Interfaces' },
        { name: interfaceName(), href: `/docs/Documentation/${packageName()}/interfaces/${interfaceName()}` }
      ]}
    >
      <h1>Interface: {parsed().name}</h1>

      <hr />

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
    </DocsPage>
  );
};

export default InterfacePage;
