import { JSONOutput } from 'typedoc';
import { ReflectionKind } from '../../lib/types/ReflectionKind';
import { parseType } from './parseType';

export function parseTypeParameter(reflection: JSONOutput.TypeParameterReflection): string {
  if (reflection.kind !== ReflectionKind.TypeParameter) throw new Error('The "kind" property of "typeParameter" was not a type-parameter.');

  const { name, type, default: defaultValue } = reflection;

  return `${name}${type === undefined ? '' : ` extends ${parseType(type)}`}${defaultValue === undefined ? '' : ` = ${parseType(defaultValue)}`}`;
}
