import { JSONOutput } from 'typedoc';
import { ReflectionKind } from '../types/ReflectionKind';
import { parseParameter } from './parseParameter';
import { parseSignature } from './parseSignature';
import { parseType } from './parseType';

export function parseClass(reflection: JSONOutput.DeclarationReflection, repository: string): ClassParseOptions {
  console.log('DeclarationReflection.Class:', reflection);

  if (reflection.kind !== ReflectionKind.Class) throw new Error('The "kind" property of "reflection" was not a class.');

  const { name, comment, children } = reflection;
  const options: ClassParseOptions = {
    name,

    displayName: name,

    tags: [],

    examples: [],

    properties: [],

    methods: []
  };

  if (comment !== undefined) {
    if (comment.shortText !== undefined) options.description = comment.shortText;

    if (comment.tags !== undefined) {
      options.examples = comment.tags
        .filter((tag) => tag.tag === 'example')
        .map((tag) => tag.text.replace(/\n```javascript/, '').replace(/```\n/, ''));

      options.tags = comment.tags.filter((tag) => tag.tag !== 'example');
    }
  }

  for (const child of children)
    switch (child.kind) {
      case ReflectionKind.Constructor: {
        const { signatures } = child;

        if (signatures !== undefined) {
          const [signature] = signatures;
          const { parameters } = signature;

          options.constructor_ = `new ${name}(${parameters.map(parseParameter).join(', ')})`;
        }

        break;
      }

      case ReflectionKind.Property:

      case ReflectionKind.Accessor: {
        const { name, flags, comment, type, defaultValue } = child;
        const { isOptional, isPublic, isProtected, isPrivate, isAbstract, isReadonly, isStatic } = flags;

        const propertyOptions: ClassPropertyParseOptions = {
          name,

          displayName: `.${name}${isOptional ? '?' : ''}`,

          tags: [],

          codeblock: isPublic ? 'public ' : isProtected ? 'protected ' : isPrivate ? 'private ' : ''
        };

        if (comment !== undefined) {
          if (comment.shortText !== undefined) propertyOptions.description = comment.shortText;

          if (comment.tags !== undefined) {
            propertyOptions.tags = comment.tags;
          }
        }

        propertyOptions.codeblock += isAbstract ? 'abstract ' : isStatic ? 'static ' : '';
        propertyOptions.codeblock += isReadonly ? 'readonly ' : '';
        propertyOptions.codeblock += name;
        propertyOptions.codeblock += isOptional ? '?' : '';
        propertyOptions.codeblock += ': ';
        propertyOptions.codeblock += parseType(type);

        if (defaultValue !== undefined) propertyOptions.codeblock += ` = ${defaultValue}`;

        options.properties.push(propertyOptions);

        break;
      }

      case ReflectionKind.Method: {
        const { name, comment, signatures, flags } = child;

        const methodOptions: ClassMethodParseOptions = {
          name,

          displayName: `.${name}()`,

          tags: [],

          codeblock: '',

          examples: []
        };

        if (comment !== undefined) {
          if (comment.shortText !== undefined) methodOptions.description = comment.shortText;

          if (comment.tags !== undefined) {
            methodOptions.examples = comment.tags
              .filter((tag) => tag.tag === 'example')
              .map((tag) => tag.text.replace(/\n```javascript/, '').replace(/```\n/, ''));

            methodOptions.tags = comment.tags.filter((tag) => tag.tag !== 'example');
          }
        }

        if (signatures !== undefined) methodOptions.codeblock = signatures.map((signature) => parseSignature(signature, flags)).join('\n\n');

        options.methods.push(methodOptions);

        console.log(methodOptions);

        break;
      }

      default:
        console.log(`parseClass(): Unhandled reflection kind: ${child.kindString}(${child.kind})`);

        break;
    }

  return options;
}

export interface ClassParseOptions {
  name: string;

  displayName: string;

  description?: string;

  tags: JSONOutput.CommentTag[];

  constructor_?: string;

  examples: string[];

  properties: ClassPropertyParseOptions[];

  methods: ClassMethodParseOptions[];
}

export interface ClassPropertyParseOptions {
  name: string;

  displayName: string;

  description?: string;

  tags: JSONOutput.CommentTag[];

  codeblock: string;
}

export interface ClassMethodParseOptions {
  name: string;

  displayName: string;

  description?: string;

  tags: JSONOutput.CommentTag[];

  codeblock: string;

  examples: string[];
}
