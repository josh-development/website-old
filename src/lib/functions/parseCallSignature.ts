import { JSONOutput } from 'typedoc';
import { ReflectionKind } from '../../lib/types/ReflectionKind';
import { parseType } from './parseType';

export function parseCallSignature(signature: JSONOutput.SignatureReflection, isFunction?: boolean): string {
  const { kind, parameters, type } = signature;

  if (kind !== ReflectionKind.CallSignature) throw new Error('The "kind" property of "reflection" was not a call-signature.');

  let codeblock = '';

  if (parameters === undefined) codeblock += '() => ';
  else
    codeblock += `(${parameters
      .map((parameter) => {
        const { defaultValue, name, type } = parameter;
        let codeblock = name;

        if (type !== undefined)
          switch (type.type) {
            case 'reference':

            case 'intrinsic':
              codeblock += `: ${type.name}`;

              break;

            case 'union':
              codeblock += `: ${type.types.map((type) => parseType(type)).join(' | ')}`;

              break;

            default:
              console.log(`parseCallSignature: Unhandled type: ${type.type}`);
              codeblock += `parseCallSignature(${type.type}, 'type.type')`;
          }
        if (defaultValue !== undefined) codeblock += `= ${defaultValue}`;

        return codeblock;
      })
      .join(', ')})${isFunction ? ': ' : ' => '}`;

  if (type === undefined) codeblock += 'unknown;';
  else {
    switch (type.type) {
      case 'reference':
        const { name, typeArguments } = type;

        codeblock += name;

        if (typeArguments !== undefined) codeblock += `<${typeArguments.map((typeArgument) => parseType(typeArgument)).join(', ')}>`;

        break;

      default:
        console.log(`parseCallSignature: Unhandled type: ${type.type}`);
        codeblock = `parseCallSignature(${type.type}, 'signature.type')`;
    }

    codeblock += ';';
  }

  return codeblock;
}
