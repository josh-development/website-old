import { JSONOutput } from 'typedoc';
import { ReflectionKind } from '../../lib/types/ReflectionKind';
import { parseCallSignature } from './parseCallSignature';
import { parseSource, SourceData } from './parseSource';
import { parseType } from './parseType';

export function parseClass(reflection: JSONOutput.DeclarationReflection, packageName: string): ClassParseOptions {
  console.log(reflection);

  if (reflection.kind !== ReflectionKind.Class) throw new Error('The "kind" property of "reflection" was not a class.');

  const { name, flags, comment, sources, typeParameter: typeParameters, children } = reflection;
  const options: ClassParseOptions = {
    name: `${name}${typeParameters?.length > 0 ? `<${typeParameters.map((typeParameter) => typeParameter.name).join(', ')}>` : ''}`,

    nameWithoutTypeParameters: name,

    examples: [],

    properties: [],

    methods: [],

    isAbstract: flags.isAbstract ?? false
  };

  if (comment !== undefined) {
    options.description = comment.shortText;

    if (comment.tags !== undefined) {
      options.examples = comment.tags
        .filter((tag) => tag.tag === 'example')
        .map((tag) =>
          tag.text
            .replace(/\n```javascript\n/, '')
            .replace(/\n```typescript\n/, '')
            .replace(/```\n/, '')
        );
    }
  }
  if (sources !== undefined) {
    const [source] = sources;

    options.source = parseSource({
      repository: packageName,
      filePath: source.fileName.replace(new RegExp(`projects/${packageName}/`), ''),
      line: source.line
    });
  }

  for (const child of children)
    switch (child.kind) {
      case ReflectionKind.Constructor:
        options.constructor_ = { parameters: [], codeblock: '' };

        const { signatures } = child;

        if (signatures !== undefined) {
          const [signature] = signatures;

          if (signature.parameters !== undefined) {
            const { parameters } = signature;

            for (const parameter of parameters) {
              const { name, type, flags } = parameter;

              options.constructor_.parameters.push({
                name: `${name}?`,
                type: parseType(type),
                isOptional: flags.isOptional ?? false
              });

              options.constructor_.codeblock = `new ${options.name}(${parameters.map((parameter) => parameter.name).join(', ')})`;
            }
          }
        }

        break;

      case ReflectionKind.Property:

      case ReflectionKind.Accessor: {
        const { name, type, defaultValue, flags, comment } = child;
        const { isAbstract, isStatic, isPublic, isProtected, isPrivate, isOptional } = flags;

        options.properties.push({
          name,

          description: comment?.shortText,

          codeblock: `${isPublic ? 'public ' : isProtected ? 'protected ' : isPrivate ? 'private ' : ''}${isAbstract ? 'abstract ' : ''}${
            isStatic ? 'static ' : ''
          }${name}${
            type.type === 'intrinsic' && defaultValue !== undefined
              ? ` = ${defaultValue}`
              : `${isOptional ? '?' : ''}: ${parseType(type)}${defaultValue === undefined ? '' : ` = ${defaultValue}`}`
          }`
        });

        break;
      }

      case ReflectionKind.Method: {
        const { name, flags, comment, signatures } = child;
        const { isAbstract, isStatic, isPublic, isProtected, isPrivate } = flags;

        options.methods.push({
          name,

          description: comment?.shortText,

          codeblock: signatures
            .map(
              (signature) =>
                `${isPublic ? 'public ' : isProtected ? 'protected ' : isPrivate ? 'private ' : ''}${isAbstract ? 'abstract ' : ''}${
                  isStatic ? 'static ' : ''
                }${name}${parseCallSignature(signature, true)}`
            )
            .join('\n')
        });

        break;
      }

      default:
        console.log(`parseClass: Unhandled child kind: ${child.kindString}(${child.kind})`);

        break;
    }

  return options;
}

export interface ClassParseOptions {
  name: string;

  nameWithoutTypeParameters: string;

  description?: string;

  source?: SourceData;

  examples: string[];

  constructor_?: ClassConstructorOptions;

  properties: ClassPropertyOptions[];

  methods: ClassMethodOptions[];

  isAbstract: boolean;
}

export interface ClassConstructorOptions {
  parameters: ClassConstructorParameterOptions[];

  codeblock: string;
}

export interface ClassConstructorParameterOptions {
  name: string;

  isOptional: boolean;

  type: string;

  defaultValue?: string;
}

export interface ClassPropertyOptions {
  name: string;

  description?: string;

  codeblock: string;
}

export interface ClassMethodOptions {
  name: string;

  description?: string;

  codeblock: string;
}

export interface ClassMethodParameterOptions {
  name: string;

  isOptional: boolean;

  type: string;

  defaultValue?: string;
}
