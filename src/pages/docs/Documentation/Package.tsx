import { Link, Navigate, useParams } from 'solid-app-router';
import { Component, createMemo, Show } from 'solid-js';
import { TypeAlias } from '../../../components/docs/TypeAlias';
import { DocsPage } from '../../../components/DocsPage';
import { Markdown } from '../../../components/Markdown';
import { BREADCRUMB_ITEMS } from '../../../constants/breadcrumb-items';
import { MAPPED_API_DATA } from '../../../constants/mapped-api-data';
import { APIData } from '../../../lib/structures/APIData';

const PackagePage: Component = () => {
  const params = useParams();
  const packageName = createMemo(() => params.packageName);
  const api = createMemo<APIData>(() => MAPPED_API_DATA[packageName()]);

  if (api() === undefined) return <Navigate href='/404' />;

  return (
    <DocsPage name={`@joshdb/${packageName()}`} breadcrumbItems={[...BREADCRUMB_ITEMS.DOCUMENTATION(packageName())]}>
      <h1>Package: {api().displayName}</h1>

      <hr />

      <Show
        when={api().namespaces.length > 0}
        children={
          <Markdown>
            <h2>Namespaces</h2>

            <ul>
              {api().namespaces.map((reflection) => (
                <li>
                  <Link href={`/docs/Documentation/${packageName()}/namespaces/${reflection.name}`}>{reflection.name}</Link>
                </li>
              ))}
            </ul>
          </Markdown>
        }
      />

      <Show
        when={api().classes.length > 0}
        children={
          <Markdown>
            <h2>Classes</h2>

            <ul>
              {api().classes.map((reflection) => (
                <li>
                  <Link href={`/docs/Documentation/${packageName()}/classes/${reflection.name}`}>{reflection.name}</Link>
                </li>
              ))}
            </ul>
          </Markdown>
        }
      />

      <Show
        when={api().enumerations.length > 0}
        children={
          <Markdown>
            <h2>Enumerations</h2>

            <ul>
              {api().enumerations.map((reflection) => (
                <li>
                  <Link href={`/docs/Documentation/${packageName()}/enumerations/${reflection.name}`}>{reflection.name}</Link>
                </li>
              ))}
            </ul>
          </Markdown>
        }
      />

      <Show
        when={api().functions.length > 0}
        children={
          <Markdown>
            <h2>Functions</h2>

            <ul>
              {api().functions.map((reflection) => (
                <li>
                  <Link href={`/docs/Documentation/${packageName()}/functions/${reflection.name}`}>{reflection.name}</Link>
                </li>
              ))}
            </ul>
          </Markdown>
        }
      />

      <Show
        when={api().typeAliases.length > 0}
        children={
          <Markdown>
            <h2>Interfaces</h2>

            <ul>
              {api().interfaces.map((reflection) => (
                <li>
                  <Link href={`/docs/Documentation/${packageName()}/interfaces/${reflection.name}`}>{reflection.name}</Link>
                </li>
              ))}
            </ul>
          </Markdown>
        }
      />

      <Show
        when={api().typeAliases.length > 0}
        children={
          <Markdown>
            <h2>Type Aliases</h2>

            {api().typeAliases.map((reflection) => (
              <TypeAlias typeAlias={reflection} />
            ))}
          </Markdown>
        }
      />
    </DocsPage>
  );
};

export default PackagePage;
