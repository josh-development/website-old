import { Navigate, useParams } from 'solid-app-router';
import { Component, createMemo, Show } from 'solid-js';
import { DocsPage } from '../../../../components/DocsPage';
import { Markdown } from '../../../../components/Markdown';
import { BREADCRUMB_ITEMS } from '../../../../constants/breadcrumb-items';
import { MAPPED_API_DATA } from '../../../../constants/mapped-api-data';
import { parseInterface } from '../../../../lib/functions/parseInterface';
import { ReflectionKind } from '../../../../lib/types/ReflectionKind';

const InterfacePage: Component = () => {
  const params = useParams();
  const packageName = createMemo(() => params.packageName);
  const namespaceName = createMemo(() => params.namespaceName);
  const interfaceName = createMemo(() => params.interfaceName);
  const reflection = createMemo(() => {
    const namespaceReflection = MAPPED_API_DATA[packageName()]?.namespaces.find((reflection) => reflection.name === namespaceName());

    if (namespaceReflection.children === undefined) return;

    return namespaceReflection.children.find((reflection) => reflection.name === interfaceName() && reflection.kind === ReflectionKind.Interface);
  });

  if (reflection() === undefined) return <Navigate href='/404' />;

  const parsed = createMemo(() => parseInterface(reflection(), packageName()));

  return (
    <DocsPage
      name={`Interface: ${namespaceName()}.${parsed().name}`}
      breadcrumbItems={[
        ...BREADCRUMB_ITEMS.DOCUMENTATION(packageName()),
        { name: 'Namespaces' },
        { name: namespaceName(), href: `/docs/Documentation/${packageName()}/namespaces/${namespaceName()}` },
        { name: 'Interfaces' },
        { name: interfaceName(), href: `/docs/Documentation/${packageName()}/namespaces/${namespaceName()}/interfaces/${interfaceName()}` }
      ]}
    >
      <h1>
        Interface: {namespaceName()}.{parsed().name}
      </h1>

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
