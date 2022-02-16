import { JSONOutput } from 'typedoc';
import { ReflectionKind } from '../types/ReflectionKind';

export class APIData {
  public displayName: string;

  public reflection: JSONOutput.DeclarationReflection;

  public constructor(displayName: string, reflection: JSONOutput.DeclarationReflection) {
    this.displayName = displayName;
    this.reflection = reflection;
  }

  public get namespaces(): JSONOutput.DeclarationReflection[] {
    return this.reflection.children.filter((child) => child.kind === ReflectionKind.Namespace);
  }

  public get classes(): JSONOutput.DeclarationReflection[] {
    return this.reflection.children.filter((child) => child.kind === ReflectionKind.Class);
  }

  public get enumerations(): JSONOutput.DeclarationReflection[] {
    return this.reflection.children.filter((child) => child.kind === ReflectionKind.Enum);
  }

  public get functions(): JSONOutput.DeclarationReflection[] {
    return this.reflection.children.filter((child) => child.kind === ReflectionKind.Function);
  }

  public get interfaces(): JSONOutput.DeclarationReflection[] {
    return this.reflection.children.filter((child) => child.kind === ReflectionKind.Interface);
  }

  public get typeAliases(): JSONOutput.DeclarationReflection[] {
    return this.reflection.children.filter((child) => child.kind === ReflectionKind.TypeAlias);
  }
}
