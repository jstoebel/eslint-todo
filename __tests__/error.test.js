import {
  Report
} from '../src/report'

const message1 = {
  ruleId: 'no-unused-vars',
  severity: 2,
  message: "'addOne' is defined but never used.",
  line: 1,
  column: 10,
  nodeType: 'Identifier',
  endLine: 1,
  endColumn: 16
}

const message2 = {
  ruleId: 'use-isnan',
  severity: 2,
  message: 'Use the isNaN function to compare with NaN.',
  line: 2,
  column: 9,
  nodeType: 'BinaryExpression',
  messageId: 'comparisonWithNaN',
  endLine: 2,
  endColumn: 17
}


describe('Report', () => {
  test('creates a new error from input', () => {
    const report = new Report();
    report.addMessage(message1, '/path/to/file')

    
  })

  test('adds to an existing error from input', () => [

  ])
})