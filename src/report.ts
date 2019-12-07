/**
 * addMessage(messageObj, filePath)
 *    -> creates a new error object or adds to an existing one. 
 */

import { IMessage, IErrorReport, IFullReport } from 'types'
import _ from 'lodash'

export default class Report {

    messages: {
      [key: string]: MessageGroup
    };

    constructor() {
        this.messages = {}
    }

    addMessage(message: IMessage, filePath: string): void {

      const {ruleId} = message
      const messageGroup = this.messages[ruleId] || new MessageGroup(ruleId)
      messageGroup.addInstance(filePath)

      this.messages[ruleId] = messageGroup;
    }

    /**
     * return a full todo report as an object
     */
    output(): IFullReport {
      return _.transform(this.messages, (result, value, key) => {
        result[key] = value.output()
      }, {} as IFullReport )

    }
}

/**
 * represents a error type in aggregate
 */
class MessageGroup {

  ruleId: string
  errorCount: number;
  files: string[];

  constructor(ruleId: string) {
    this.ruleId = ruleId
    this.errorCount = 0;
    this.files = []
  }

  /**
   * add an instance of an error (i.e. a single error occuring somewhere in a file)
   * @param file - a path to a file
   */
  addInstance(file: string) {
    this.errorCount += 1;

    // don't store duplicates of the same file
    if (this.files.includes(file)) return;
    this.files.push(file)
  }

  /**
   * report for this individual error type
   */
  output(): IErrorReport {
    return {
      count: this.errorCount,
      files: this.files
    }
  }
}