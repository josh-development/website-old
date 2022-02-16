import { Navigate, useParams } from 'solid-app-router';
import { Component, createMemo, Show } from 'solid-js';
import { DocsPage } from '../../../../components/DocsPage';
import { Markdown } from '../../../../components/Markdown';
import { BREADCRUMB_ITEMS } from '../../../../constants/breadcrumb-items';
import { MAPPED_API_DATA } from '../../../../constants/mapped-api-data';
import { parseEnumeration } from '../../../../lib/functions/parseEnumeration';
import { ReflectionKind } from '../../../../lib/types/ReflectionKind';

const EnumerationPage: Component = () => {
  const params = useParams();
  const packageName = createMemo(() => params.packageName);
  const namespaceName = createMemo(() => params.namespaceName);
  const enumerationName = createMemo(() => params.enumerationName);
  const reflection = createMemo(() => {
    const namespaceReflection = MAPPED_API_DATA[packageName()]?.namespaces.find((reflection) => reflection.name === namespaceName());

    if (namespaceReflection.children === undefined) return;

    return namespaceReflection.children.find((reflection) => reflection.name === enumerationName() && reflection.kind === ReflectionKind.Enum);
  });

  if (reflection() === undefined) return <Navigate href='/404' />;

  const parsed = createMemo(() => parseEnumeration(reflection(), packageName()));

  return (
    <DocsPage
      name={`Enumeration: ${namespaceName()}.${parsed().name}`}
      breadcrumbItems={[
        ...BREADCRUMB_ITEMS.DOCUMENTATION(packageName()),
        { name: 'Namespaces' },
        { name: namespaceName(), href: `/docs/Documentation/${packageName()}/namespaces/${namespaceName()}` },
        { name: 'Enumerations' },
        { name: enumerationName(), href: `/docs/Documentation/${packageName()}/namespaces/${namespaceName()}/enumerations/${enumerationName()}` }
      ]}
    >
      <h1>
        Enumeration: {namespaceName()}.{parsed().name}
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

export default EnumerationPage;
