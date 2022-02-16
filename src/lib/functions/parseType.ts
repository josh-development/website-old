import { JSONOutput } from 'typedoc';
import { NamedTupleMemberType } from 'typedoc/dist/lib/serialization/schema';
import { ReflectionKind } from '../types/ReflectionKind';
import { parseTypeLiteral } from './parseTypeLiteral';

export function parseType(
  type:
    | (
        | JSONOutput.ArrayType
        | JSONOutput.ConditionalType
        | JSONOutput.IndexedAccessType
        | JSONOutput.InferredType
        | JSONOutput.IntersectionType
        | JSONOutput.IntrinsicType
        | JSONOutput.LiteralType
        | JSONOutput.OptionalType
        | JSONOutput.PredicateType
        | JSONOutput.QueryType
        | JSONOutput.ReferenceType
        | JSONOutput.ReflectionType
        | JSONOutput.RestType
        | JSONOutput.TupleType
        | JSONOutput.TypeOperatorType
        | JSONOutput.UnionType
        | JSONOutput.UnknownType
        | JSONOutput.MappedType
        | JSONOutput.TemplateLiteralType
        | NamedTupleMemberType
      )
    | JSONOutput.SomeType
): string {
  switch (type.type) {
    case 'intrinsic': {
      const { name } = type;

      return name;
    }

    case 'reference': {
      const { name, typeArguments } = type;

      return `${name}${typeArguments?.length > 0 ? `<${typeArguments.map(parseType).join(', ')}>` : ''}`;
    }

    case 'array': {
      const { elementType } = type;

      return `${parseType(elementType)}[]`;
    }

    case 'tuple': {
      const { elements } = type;

      return `[${elements.map(parseType).join(', ')}]`;
    }

    case 'typeOperator': {
      const { operator, target } = type;

      return `${operator} ${parseType(target)}`;
    }

    case 'union': {
      const { types } = type;

      return types.map(parseType).join(' | ');
    }

    case 'literal': {
      const { value } = type;

      switch (typeof value) {
        case 'string':

        case 'boolean':

        case 'number':
          return JSON.stringify(value);

        case 'object':
          return `${value?.negative ? '-' : ''}${value}`;

        default:
          console.log(`parseType(): Unhandled literal type: ${value}(${typeof value})`);

          return `parseType(${value}, 'literal')`;
      }
    }

    case 'indexedAccess': {
      const { objectType, indexType } = type;

      return `${parseType(objectType)}[${parseType(indexType)}]`;
    }

    case 'reflection': {
      const { declaration } = type;

      switch (declaration.kind) {
        case ReflectionKind.TypeLiteral:
          return parseTypeLiteral(declaration).codeblock;

        default:
          console.log(`parseType(): Unhandled reflection kind: ${declaration.kindString}(${declaration.kind})`);

          break;
      }
    }

    default:
      console.log(`parseType(): Unhandled type: ${type.type}`, type);

      return `parseType(${type.type}, 'type.type')`;
  }
}
