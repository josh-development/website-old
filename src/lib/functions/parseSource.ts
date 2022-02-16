export function parseSource(options: SourceOptions): SourceData {
  const { repository, filePath, line } = options;

  return {
    filePath,
    line,
    url: `https://github.com/josh-development/${repository}/blob/main/${filePath}#L${line}`
  };
}

export interface SourceOptions {
  repository: string;

  filePath: string;

  line: number;
}

export interface SourceData {
  filePath: string;

  line: number;

  url: string;
}
