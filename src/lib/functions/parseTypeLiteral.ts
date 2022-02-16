import { JSONOutput } from 'typedoc';
import { ParseOptions } from '../../lib/types/ParseOptions';
import { ReflectionKind } from '../../lib/types/ReflectionKind';
import { parseCallSignature } from './parseCallSignature';

export function parseTypeLiteral(reflection: JSONOutput.DeclarationReflection, options: ParseOptions = { codeblock: '' }): ParseOptions {
  const { kind, signatures, comment } = reflection;

  if (kind !== ReflectionKind.TypeLiteral) throw new Error('The "kind" property of "reflection" was not a type-literal.');
  if (comment !== undefined) options.description ??= comment.shortText;
  if (signatures !== undefined) {
    const [signature] = signatures;

    switch (signature.kind) {
      case ReflectionKind.CallSignature:
        options.codeblock += parseCallSignature(signature);

        break;

      default:
        options.codeblock = `parseTypeLiteral(${signature.kind}, 'signature.kind')`;
    }
  }

  return options;
}
