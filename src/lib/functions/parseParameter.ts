import { JSONOutput } from 'typedoc';
import { ReflectionKind } from '../types/ReflectionKind';
import { parseType } from './parseType';

export function parseParameter(reflection: JSONOutput.ParameterReflection): string {
  if (reflection.kind !== ReflectionKind.Parameter) throw new Error('The "kind" property of "reflection" was not a parameter reflection.');

  const { name, type, defaultValue } = reflection;
  let parameter = name;

  if (type !== undefined) parameter += `: ${parseType(type)}`;
  if (defaultValue !== undefined) parameter += ` = ${defaultValue}`;

  return parameter;
}
