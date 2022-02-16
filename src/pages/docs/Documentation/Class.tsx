import { Navigate, useParams } from 'solid-app-router';
import { Component, createMemo, For, Show } from 'solid-js';
import { DocsPage } from '../../../components/DocsPage';
import { DynamicCodeblock } from '../../../components/DynamicCodeblock';
import { Markdown } from '../../../components/Markdown';
import { BREADCRUMB_ITEMS } from '../../../constants/breadcrumb-items';
import { MAPPED_API_DATA } from '../../../constants/mapped-api-data';
import { parseClass } from '../../../lib/functions/parseClass';

const ClassPage: Component = () => {
  const params = useParams();
  const packageName = createMemo(() => params.packageName);
  const className = createMemo(() => params.className);
  const reflection = createMemo(() => MAPPED_API_DATA[packageName()]?.classes.find((reflection) => reflection.name === className()));

  if (reflection() === undefined) return <Navigate href='/404' />;

  const parsed = createMemo(() => parseClass(reflection(), packageName()));

  return (
    <DocsPage
      name={`Class: ${parsed().name}`}
      breadcrumbItems={[
        ...BREADCRUMB_ITEMS.DOCUMENTATION(packageName()),
        { name: 'Classes' },
        { name: className(), href: `/docs/Documentation/${packageName()}/classes/${className()}` }
      ]}
    >
      <h1>Class: {parsed().displayName}</h1>

      <p>{parsed().description}</p>

      <Show
        when={parsed().tags.length > 0}
        children={parsed().tags.map(({ tag, text }) => (
          <Markdown>
            <h6>
              <code>@{tag}</code>
            </h6>

            <span>{text}</span>
          </Markdown>
        ))}
      />

      <Show
        when={parsed().constructor_ !== undefined}
        children={
          <Markdown class='pt-8'>
            <h2>Constructor</h2>

            <DynamicCodeblock language='typescript' codeblock={parsed().constructor_} />
          </Markdown>
        }
      />

      <Show
        when={parsed().examples.length > 0}
        children={
          <div class='pt-8'>
            <For
              each={parsed().examples}
              children={(example) => (
                <Markdown>
                  <h6>
                    <code>@example</code>
                  </h6>

                  <DynamicCodeblock language='javascript' codeblock={example} />

                  <hr />
                </Markdown>
              )}
            />
          </div>
        }
      />

      <Show
        when={parsed().properties.length > 0}
        children={
          <Markdown class='pt-16'>
            <h2>Properties</h2>

            {parsed().properties.map((property) => (
              <Markdown>
                <h4>{property.displayName}</h4>

                <p>{property.description}</p>

                <Show
                  when={property.tags.length > 0}
                  children={property.tags.map(({ tag, text }) => (
                    <Markdown>
                      <h6>
                        <code>@{tag}</code>
                      </h6>

                      <span>{text}</span>
                    </Markdown>
                  ))}
                />

                <DynamicCodeblock language='typescript' codeblock={property.codeblock} />

                <hr />
              </Markdown>
            ))}
          </Markdown>
        }
      />

      <Show
        when={parsed().methods.length > 0}
        children={
          <Markdown class='pt-16'>
            <h2>Methods</h2>

            {parsed().methods.map((method) => (
              <Markdown>
                <h4>{method.displayName}</h4>

                <p>{method.description}</p>

                <Show
                  when={method.tags.length > 0}
                  children={method.tags.map(({ tag, text }) => (
                    <Markdown>
                      <h6>
                        <code>@{tag}</code>
                      </h6>

                      <span>{text}</span>
                    </Markdown>
                  ))}
                />

                <DynamicCodeblock language='typescript' codeblock={method.codeblock} />

                <hr />

                <Show
                  when={method.examples.length > 0}
                  children={
                    <div class='pt-8'>
                      <For
                        each={method.examples}
                        children={(example) => (
                          <Markdown>
                            <h6>
                              <code>@example</code>
                            </h6>

                            <DynamicCodeblock language='javascript' codeblock={example} />

                            <hr />
                          </Markdown>
                        )}
                      />
                    </div>
                  }
                />
              </Markdown>
            ))}
          </Markdown>
        }
      />
    </DocsPage>
  );
};

export default ClassPage;
