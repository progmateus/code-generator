export default class Util {
  // mateus => [0] => m
  // first=  m, rest = ateus
  static #transform({ str: [first, ...rest], upperCase = true }) {
    if (!first) return "";

    const firsetLetter = upperCase
      ? first.toLocaleUpperCase()
      : first.toLocaleLowerCase();

    return [firsetLetter, ...rest].join("");
  }

  static upperCaseFirstLetter(str) {
    return Util.#transform({ str });
  }

  static lowerCaseFirstLetter(str) {
    return Util.#transform({ str, upperCase: false });
  }
}
