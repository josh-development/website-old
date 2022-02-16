import { JSONOutput } from 'typedoc';
import { ReflectionKind } from '../../lib/types/ReflectionKind';
import { parseSource, SourceData } from './parseSource';
import { parseType } from './parseType';
import { parseTypeParameter } from './parseTypeParameter';

export function parseInterface(reflection: JSONOutput.DeclarationReflection, packageName: string): ParseInterfaceOptions {
  console.log(reflection);

  if (reflection.kind !== ReflectionKind.Interface) throw new Error('The "kind" property of "reflection" was not an interface.');

  const { name, comment, sources, typeParameter: typeParameters, children } = reflection;
  const options: ParseInterfaceOptions = {
    name,

    codeblock: `interface ${name}${typeParameters?.length > 0 ? `<${typeParameters.map((reflection) => parseTypeParameter(reflection))}>` : ''} {\n`
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

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    switch (child.kind) {
      case ReflectionKind.Property:
        const { name, type, comment, flags } = child;

        if (comment !== undefined) {
          if (comment.shortText !== undefined || comment.tags !== undefined) {
            options.codeblock += ` /**\n`;

            if (comment.shortText !== undefined) options.codeblock += `  * ${comment.shortText}\n`;
            if (comment.tags !== undefined) for (const { tag, text } of comment.tags) options.codeblock += `  * @${tag} ${text}`;

            options.codeblock += `  */\n`;
          }
        }

        options.codeblock += `  ${name}${flags.isOptional ? '?:' : ':'} ${parseType(type)};${i === children.length - 1 ? '' : '\n\n'}`;

        break;

      default:
        console.log(`parseInterface: Unhandled child kind: ${child.kindString}(${child.kind})`);

        break;
    }
  }

  options.codeblock += `\n}`;

  return options;
}

export interface ParseInterfaceOptions {
  name: string;

  codeblock: string;

  description?: string;

  source?: SourceData;
}
