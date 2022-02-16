import { JSONOutput } from 'typedoc';
import { ReflectionKind } from '../types/ReflectionKind';
import { parseParameter } from './parseParameter';
import { parseType } from './parseType';
import { parseTypeParameter } from './parseTypeParameter';

export function parseSignature(reflection: JSONOutput.SignatureReflection, flags: JSONOutput.ReflectionFlags): string {
  if (reflection.kind !== ReflectionKind.CallSignature) throw new Error('The "kind" property of "reflection" was not a signature reflection.');

  const { name, typeParameter: typeParameters, parameters, type } = reflection;
  const { isPublic, isProtected, isPrivate, isAbstract, isStatic } = flags;

  let codeblock = isPublic ? 'public ' : isProtected ? 'protected ' : isPrivate ? 'private ' : '';

  codeblock += isAbstract ? 'abstract ' : isStatic ? 'static ' : '';
  codeblock += name;

  if (typeParameters !== undefined) {
    if (`${codeblock}<${typeParameters.map(parseTypeParameter).join(', ')}>`.length > 80)
      codeblock += `<${typeParameters.map(parseTypeParameter).join(', ')}>`;
    else codeblock += `<\n  ${typeParameters.map(parseTypeParameter).join(',\n  ')}\n>`;
  }

  if (parameters === undefined) codeblock += '()';
  else if (`${codeblock}(${parameters.map(parseParameter).join(', ')}): ${type === undefined ? 'unknown' : parseType(type)}`.length > 80)
    codeblock += `(\n  ${parameters.map(parseParameter).join(',\n  ')})\n`;
  else codeblock += `(${parameters.map(parseParameter).join(', ')})`;

  codeblock += ': ';
  codeblock += type === undefined ? 'unknown' : parseType(type);

  return codeblock;
}
