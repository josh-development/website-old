import { JSONOutput } from 'typedoc';
import { ParseWithNameOptions } from '../../lib/types/ParseOptions';
import { ReflectionKind } from '../../lib/types/ReflectionKind';
import { parseTypeAlias } from './parseTypeAlias';

export function parseNamespace(reflection: JSONOutput.DeclarationReflection, packageName: string): NamespaceParseOptions {
  const { kind, name, comment, children } = reflection;

  if (kind !== ReflectionKind.Namespace) throw new Error('The "kind" property of "reflection" was not a namespace.');

  const options: NamespaceParseOptions = {
    name,

    interfaces: [],

    enumerations: [],

    typeAliases: []
  };

  for (const child of children)
    switch (child.kind) {
      case ReflectionKind.TypeAlias:
        options.typeAliases.push(parseTypeAlias(child, packageName));

        break;

      case ReflectionKind.Interface:
        options.interfaces.push(child.name);

        break;

      case ReflectionKind.Enum:
        options.enumerations.push(child.name);

        break;

      default:
        console.log(`parseNamespace: Unhandled child kind: ${child.kindString}(${child.kind})`);
    }

  return options;
}

export interface NamespaceParseOptions {
  name: string;

  interfaces: string[];

  enumerations: string[];

  typeAliases: ParseWithNameOptions[];
}
