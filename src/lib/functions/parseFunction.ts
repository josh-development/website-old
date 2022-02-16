import { JSONOutput } from 'typedoc';
import { ReflectionKind } from '../types/ReflectionKind';
import { parseCallSignature } from './parseCallSignature';
import { parseSource, SourceData } from './parseSource';

export function parseFunction(reflection: JSONOutput.DeclarationReflection, packageName: string): ParseFunctionOptions {
  console.log(reflection);

  if (reflection.kind !== ReflectionKind.Function) throw new Error('The "kind" property of "reflection" was not a function.');

  const { name, comment, sources, signatures } = reflection;
  const options: ParseFunctionOptions = {
    name,

    codeblock: `function ${name}`
  };

  if (comment !== undefined) options.description = comment.shortText;
  if (sources !== undefined) {
    const [source] = sources;

    options.source = parseSource({
      repository: packageName,
      filePath: source.fileName.replace(new RegExp(`projects/${packageName}/`), ''),
      line: source.line
    });
  }

  if (signatures !== undefined) {
    const [signature] = signatures;

    options.codeblock += parseCallSignature(signature, true);
  }

  return options;
}

export interface ParseFunctionOptions {
  name: string;

  codeblock: string;

  description?: string;

  source?: SourceData;
}
