/** Injectable fs + home so tests never touch the real home directory. */
export interface CliFs {
  readonly readUtf8: (filePath: string) => string;
  readonly writeUtf8: (filePath: string, contents: string) => void;
  readonly exists: (filePath: string) => boolean;
  readonly mkdirp: (dirPath: string) => void;
  readonly rename: (from: string, to: string) => void;
  readonly realpath: (filePath: string) => string;
}

export interface CliHome {
  readonly homedir: () => string;
}

export type CliIo = CliFs & CliHome;
