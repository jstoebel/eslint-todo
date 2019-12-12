import Report from '../src/report';

describe('Report', () => {

  describe('from eslint output', () => {

    const message1 = {
      ruleId: 'no-unused-vars',
      severity: 2,
      message: "'addOne' is defined but never used.",
      line: 1,
      column: 10,
      nodeType: 'Identifier',
      endLine: 1,
      endColumn: 16
    };

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
    };

    test('creates a new error from input', () => {
      const report = new Report();
      report.addMessage(message1, '/path/to/file');

      const result = report.output();

      expect(result).toEqual({
        'no-unused-vars': {
          count: 1,
          files: ['/path/to/file']
        }
      });
    });

    test('adds to an existing error from input', () => {
      const report = new Report();
      report.addMessage(message1, '/path/to/file');
      report.addMessage(message1, '/path/to/another/file');
      const result = report.output();

      expect(result).toEqual({
        'no-unused-vars': {
          count: 2,
          files: ['/path/to/file', '/path/to/another/file']
        }
      });
    });
  })

  describe('from todo', () => {
    test('creates a new error group from input', () => {
      const report = new Report();
      report.add_message_group('no-unused-vars', {
        'count': 2,
        'files': ['fullOfProblems.js', 'fullOfProblems2.js']
      });

      expect(report.output()).toEqual({
        'no-unused-vars': {
          'count': 2,
          'files': ['fullOfProblems.js', 'fullOfProblems2.js']
        }
      })
    })
  })
});