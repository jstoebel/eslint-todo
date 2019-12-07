export interface IFile {
  filePath: string
  messages: IMessage[]
}

export interface IMessage {
  ruleId: string
  severity: number,
  message: string
  line: number,
  column: number,
  nodeType: string
  endLine: number,
  endColumn: number
}

export interface IErrorReport {
  count: number,
  files: string[]
}

export interface IFullReport {
  [ruleId: string]: IErrorReport
}