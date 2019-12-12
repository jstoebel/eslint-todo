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
     * 
     * @param groupName name of the eror group
     * @param data object containing the error count and files effected
     */
    add_message_group(ruleId: string, data: {count: number, files: string[]}) {
      const messageGroup = new MessageGroup(ruleId, {
        errorCount: data.count,
        files: data.files
      })

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
  constructor(ruleId: string, data: {errorCount?: number, files?: string[]} = {} ) {


    const defaultValues = {
      errorCount: 0,
      files: [] as string[]
    };

    const initValues = Object.assign({}, defaultValues, data)

    this.ruleId = ruleId;
    this.errorCount = initValues.errorCount;
    this.files = initValues.files;
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