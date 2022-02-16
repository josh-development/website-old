import { Link, Navigate, useParams } from 'solid-app-router';
import { Component, createMemo, Show } from 'solid-js';
import { TypeAlias } from '../../../components/docs/TypeAlias';
import { DocsPage } from '../../../components/DocsPage';
import { Markdown } from '../../../components/Markdown';
import { BREADCRUMB_ITEMS } from '../../../constants/breadcrumb-items';
import { MAPPED_API_DATA } from '../../../constants/mapped-api-data';
import { parseNamespace } from '../../../lib/functions/parseNamespace';

const NamespacePage: Component = () => {
  const params = useParams();
  const packageName = createMemo(() => params.packageName);
  const namespaceName = createMemo(() => params.namespaceName);
  const reflection = createMemo(() => MAPPED_API_DATA[packageName()]?.namespaces.find((reflection) => reflection.name === namespaceName()));

  if (reflection() === undefined) return <Navigate href='/404' />;

  const parsed = createMemo(() => parseNamespace(reflection(), packageName()));

  return (
    <DocsPage
      name={`Namespace: ${parsed().name}`}
      breadcrumbItems={[
        ...BREADCRUMB_ITEMS.DOCUMENTATION(packageName()),
        { name: 'Namespaces' },
        { name: namespaceName(), href: `/docs/Documentation/${packageName()}/namespaces/${namespaceName()}` }
      ]}
    >
      <h1>Namespace: {parsed().name}</h1>

      <Show
        when={parsed().interfaces.length > 0}
        children={
          <Markdown>
            <hr />

            <h2>Interfaces</h2>

            <ul>
              {parsed().interfaces.map((reflection) => (
                <li>
                  <Link href={`/docs/Documentation/${packageName()}/namespaces/${namespaceName()}/interfaces/${reflection}`}>{reflection}</Link>
                </li>
              ))}
            </ul>
          </Markdown>
        }
      />

      <Show
        when={parsed().enumerations.length > 0}
        children={
          <Markdown>
            <hr />

            <h2>Enumerations</h2>

            <ul>
              {parsed().enumerations.map((enumerationName) => (
                <li>
                  <Link href={`/docs/Documentation/${packageName()}/namespaces/${namespaceName()}/enumerations/${enumerationName}`}>
                    {enumerationName}
                  </Link>
                </li>
              ))}
            </ul>
          </Markdown>
        }
      />

      <Show
        when={parsed().typeAliases.length > 0}
        children={
          <Markdown>
            <hr />

            <h2>Type Aliases</h2>

            <div>
              {parsed().typeAliases.map((options) => (
                <TypeAlias typeAlias={options} />
              ))}
            </div>
          </Markdown>
        }
      />
    </DocsPage>
  );
};

export default NamespacePage;
