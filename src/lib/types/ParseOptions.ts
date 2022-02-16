export interface ParseOptions {
  codeblock: string;

  description?: string;
}

export interface ParseWithNameOptions extends ParseOptions {
  name: string;
}
