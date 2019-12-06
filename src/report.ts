/**
 * addMessage(messageObj, filePath)
 *    -> creates a new error object or adds to an existing one. 
 */

import { IMessage } from 'types'

export default class Report {

    messages: {
      [key: string]: MessageType
    };

    constructor() {
        this.messages = {}
    }

    addMessage(message: IMessage, filePath: string) {

      const {ruleId} = message
      const messageType = this.messages[ruleId] || new MessageType(ruleId)

      messageType.addInstance(filePath)
    }
}

/**
 * represents a message type in aggregate
 */
class MessageType {

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
}