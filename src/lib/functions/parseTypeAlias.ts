import { JSONOutput } from 'typedoc';
import { ParseWithNameOptions } from '../../lib/types/ParseOptions';
import { ReflectionKind } from '../../lib/types/ReflectionKind';
import { parseSource, SourceData } from './parseSource';
import { parseType } from './parseType';
import { parseTypeLiteral } from './parseTypeLiteral';

export function parseTypeAlias(reflection: JSONOutput.DeclarationReflection, packageName: string): ParseTypeAliasOptions {
  if (reflection.kind !== ReflectionKind.TypeAlias) throw new Error('The "kind" property of "reflection" was not a type-alias.');

  const { name, comment, sources, type, typeParameter: typeParameters } = reflection;
  const options: ParseTypeAliasOptions = {
    name,

    codeblock: `type ${name}${typeParameters?.length > 0 ? `<${typeParameters.map((typeParameter) => typeParameter.name).join(', ')}>` : ''} = `
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

  switch (type.type) {
    case 'array':
      const { elementType } = type;

      options.codeblock += `${parseType(elementType)}[]`;

      break;

    case 'reflection':
      if (type.declaration !== undefined) {
        const { declaration } = type;

        switch (declaration.kind) {
          case ReflectionKind.TypeLiteral:
            const { codeblock, description } = parseTypeLiteral(declaration, options);

            options.codeblock = codeblock;
            options.description ??= description;

            break;

          default:
            options.codeblock = `parseTypeAlias(${declaration.kind}, 'declaration.kind')`;
        }
      }

      break;

    case 'union':
      const { types } = type;

      options.codeblock += types.map((type) => parseType(type)).join(' | ');

      break;

    case 'reference': {
      const { name, typeArguments } = type;

      options.codeblock += `${name}${
        typeArguments?.length > 0 ? `<${typeArguments.map((typeArgument) => parseType(typeArgument)).join(', ')}>` : ''
      }`;

      break;
    }

    default:
      options.codeblock = `parseTypeAlias(${type.type}, 'type.type')`;
  }

  return options;
}

export function isParseTypeAliasOptions(options: Record<PropertyKey, any>): options is ParseTypeAliasOptions {
  return 'codeblock' in options && 'description' in options && 'name' in options && 'source' in options;
}

export interface ParseTypeAliasOptions extends ParseWithNameOptions {
  source?: SourceData;
}
