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

  describe('.isWorseThan', () => {
    test('returns true when any error ID has a larger count', async () => {
      const report1 = new Report();
      report1.add_message_group('some-error', {
        count: 1,
        files: ['some-file.js']
      })

      const report2 = new Report();
      report2.add_message_group('some-error', {
        count: 2,
        files: ['some-file.js']
      });

      expect(report2.isWorseThan(report1)).toBeTruthy();
    })

    test('returns true when new report has a brand new errorId', async () => {
      const report1 = new Report();
      report1.add_message_group('some-error', {
        count: 1,
        files: ['some-file.js']
      })

      const report2 = new Report();
      report2.add_message_group('some-other-error', {
        count: 1,
        files: ['some-file.js']
      });

      expect(report2.isWorseThan(report1)).toBeTruthy();
    })

    test('returns true when any error ID errors in any new file', async () => {
      const report1 = new Report();
      report1.add_message_group('some-error', {
        count: 1,
        files: ['some-file.js']
      })

      const report2 = new Report();
      report2.add_message_group('some-error', {
        count: 1,
        files: ['some-other-file.js']
      });

      expect(report2.isWorseThan(report1)).toBeTruthy();
    })
  })
});