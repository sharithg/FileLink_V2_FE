export default class StringSanitizer {
  inputString: string;

  constructor(input: string) {
    this.inputString = input;
  }

  trimSpaces() {
    return this.inputString.trim();
  }

  isEmptyOrSpaces() {
    return this.inputString === null || this.inputString.match(/^ *$/) !== null;
  }

  hasSpecialChars() {
    return /[~`!#$%\^&*+=\-\[\]\\';,/{}()|\\":<>\?@]/g.test(this.inputString); // eslint-disable-line no-useless-escape
  }

  getString() {
    return this.inputString;
  }
}
