import { Navigate, useParams } from 'solid-app-router';
import { Component, createMemo, Show } from 'solid-js';
import { DocsPage } from '../../../components/DocsPage';
import { DynamicCodeblock } from '../../../components/DynamicCodeblock';
import { Markdown } from '../../../components/Markdown';
import { BREADCRUMB_ITEMS } from '../../../constants/breadcrumb-items';
import { MAPPED_API_DATA } from '../../../constants/mapped-api-data';
import { parseEnumeration } from '../../../lib/functions/parseEnumeration';

const EnumerationPage: Component = () => {
  const params = useParams();
  const packageName = createMemo(() => params.packageName);
  const enumerationName = createMemo(() => params.enumerationName);
  const reflection = createMemo(() => MAPPED_API_DATA[packageName()]?.enumerations.find((reflection) => reflection.name === enumerationName()));

  if (reflection() === undefined) return <Navigate href='/404' />;

  const parsed = createMemo(() => parseEnumeration(reflection(), packageName()));

  return (
    <DocsPage
      name={`Enumeration: ${parsed().name}`}
      breadcrumbItems={[
        ...BREADCRUMB_ITEMS.DOCUMENTATION(packageName()),
        { name: 'Enumerations' },
        { name: enumerationName(), href: `/docs/Documentation/${packageName()}/enumerations/${enumerationName()}` }
      ]}
      disableHighlight
    >
      <h1>Enumeration: {enumerationName()}</h1>

      <hr />

      <p>{parsed().description}</p>

      <DynamicCodeblock language='typescript' codeblock={parsed().codeblock} />

      <Show
        when={parsed().source !== undefined}
        children={
          <Markdown disableHighlight>
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
