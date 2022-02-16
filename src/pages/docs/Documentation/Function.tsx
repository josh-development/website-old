import { Navigate, useParams } from 'solid-app-router';
import { Component, createMemo, Show } from 'solid-js';
import { DocsPage } from '../../../components/DocsPage';
import { DynamicCodeblock } from '../../../components/DynamicCodeblock';
import { Markdown } from '../../../components/Markdown';
import { BREADCRUMB_ITEMS } from '../../../constants/breadcrumb-items';
import { MAPPED_API_DATA } from '../../../constants/mapped-api-data';
import { parseFunction } from '../../../lib/functions/parseFunction';

const FunctionPage: Component = () => {
  const params = useParams();
  const packageName = createMemo(() => params.packageName);
  const functionName = createMemo(() => params.functionName);
  const reflection = createMemo(() => MAPPED_API_DATA[packageName()]?.functions.find((reflection) => reflection.name === functionName()));

  if (reflection() === undefined) return <Navigate href='/404' />;

  const parsed = createMemo(() => parseFunction(reflection(), packageName()));

  return (
    <DocsPage
      name={`Function: ${parsed().name}`}
      breadcrumbItems={[
        ...BREADCRUMB_ITEMS.DOCUMENTATION(packageName()),
        { name: 'Functions' },
        { name: functionName(), href: `/docs/Documentation/${packageName()}/functions/${functionName()}` }
      ]}
    >
      <h1>Function: {parsed().name}</h1>

      <hr />

      <p>{parsed().description}</p>

      <DynamicCodeblock language='typescript' codeblock={parsed().codeblock} />

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

export default FunctionPage;
