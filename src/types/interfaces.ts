
export interface IExecResult {
  message?: string;
  cmd?: string;
  killed?: boolean;
  code?: number;
  signal?: NodeJS.Signals;
  stdout: string;
  stderr: string;
}


export interface IShow {
  show: string;
  ep: string;
  title: string;

  path: {
    filepath: string;
    parent: string;
    unprocessed: string;
  };
}