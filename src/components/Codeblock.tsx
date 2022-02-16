import { Component, createEffect, Show, useContext } from 'solid-js';
import { App } from '../App';

const CodeblockTitle: Component<{ name: string; type: CodeblockType; index: CodeblockIndex }> = (props) => {
  const [state, setState] = useContext(App.Context);

  createEffect(() => {
    localStorage.setItem(props.type, state().tabs[props.type].toString());
  });

  return (
    <span
      class={`px-4 py-2 cursor-pointer transition ease-in-out hover:bg-neutral-300 dark:hover:bg-slate-700 duration-300 focus:outline-none focus:ring-inset focus:ring-white ${
        state().tabs[props.type] === props.index
          ? 'text-emerald-500 border-b-2 border-emerald-500 rounded-md rounded-b-none'
          : 'hover:text-emerald-500 rounded-md'
      }`}
      onClick={() => setState((state) => ({ ...state, tabs: { ...state.tabs, [props.type]: props.index } }))}
    >
      {props.name}
    </span>
  );
};

export const CodeblockContent: Component<{ type: CodeblockType; index: CodeblockIndex }> = (props) => {
  const [state] = useContext(App.Context);

  return <Show when={state().tabs[props.type] === props.index} children={props.children} />;
};

export const Codeblock: Component<{ type: CodeblockType }> = (props) => {
  return (
    <>
      <div class='flex space-x-2 text-lg'>
        <Show
          when={props.type === 'NPM_YARN'}
          fallback={
            <>
              <CodeblockTitle name='TypeScript' type='TYPESCRIPT_ESM_COMMONJS' index={CodeblockIndex.TypeScript} />
              <CodeblockTitle name='ESM' type='TYPESCRIPT_ESM_COMMONJS' index={CodeblockIndex.ESM} />
              <CodeblockTitle name='CommonJS' type='TYPESCRIPT_ESM_COMMONJS' index={CodeblockIndex.CommonJS} />
            </>
          }
          children={
            <>
              <CodeblockTitle name='NPM' type={props.type} index={CodeblockIndex.NPM} />
              <CodeblockTitle name='Yarn' type={props.type} index={CodeblockIndex.Yarn} />
            </>
          }
        />
      </div>

      {props.children}
    </>
  );
};

export enum CodeblockIndex {
  TypeScript,

  ESM,

  CommonJS,

  NPM,

  Yarn
}

export type CodeblockType = 'TYPESCRIPT_ESM_COMMONJS' | 'NPM_YARN';

export const TYPESCRIPT_ESM_COMMONJS_INDEX = [CodeblockIndex.TypeScript, CodeblockIndex.ESM, CodeblockIndex.CommonJS];
export const NPM_YARN_INDEX = [CodeblockIndex.NPM, CodeblockIndex.Yarn];
