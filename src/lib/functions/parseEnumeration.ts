import { JSONOutput } from 'typedoc';
import { ReflectionKind } from '../../lib/types/ReflectionKind';
import { parseSource, SourceData } from './parseSource';

export function parseEnumeration(reflection: JSONOutput.DeclarationReflection, packageName: string): ParseEnumerationOptions {
  console.log(reflection);

  if (reflection.kind !== ReflectionKind.Enum) throw new Error('The "kind" property of "reflection" was not an enumeration.');

  const { name, comment, sources, children } = reflection;
  const options: ParseEnumerationOptions = {
    name,

    codeblock: `enum ${name} {\n`
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
      case ReflectionKind.EnumMember:
        const { name, defaultValue, comment } = child;

        if (comment !== undefined) {
          if (comment.shortText !== undefined || comment.tags !== undefined) {
            options.codeblock += ` /**\n`;

            if (comment.shortText !== undefined) options.codeblock += `  * ${comment.shortText}\n`;
            if (comment.tags !== undefined) for (const { tag, text } of comment.tags) options.codeblock += `  * @${tag} ${text}`;

            options.codeblock += `  */\n`;
          }
        }

        options.codeblock += `  ${name} = ${defaultValue},${i === children.length - 1 ? '' : '\n\n'}`;

        break;

      default:
        console.log(`parseEnumeration: Unhandled child kind: ${child.kindString}(${child.kind})`);
    }
  }

  options.codeblock += '\n}';

  return options;
}

export interface ParseEnumerationOptions {
  name: string;

  codeblock: string;

  description?: string;

  source?: SourceData;
}
