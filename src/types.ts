export interface IFile {
  filePath: string
  messages: {
    ruleId: string
    severity: number,
    message: string
    line: number,
    column: number,
    nodeType: string
    endLine: number,
    endColumn: number
  }[]
}