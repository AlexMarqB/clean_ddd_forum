export class Slug {
  private _value: string

  constructor(value: string) {
    this._value = value
  }

  /**
   * Receives a string and normalize it as a slug
   * Example: "An example title" ==> "an-example-title"
   * @param text {string}
   */

  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD') // Remove qualquer tipo de acentuação da string
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Remove espaços em branco - s == whitespace; g == global
      .replace(/[^\w-]+/g, '') // Remove caracteres especiais
      .replace(/_/g, '-') // Substitui underline por hífen
      .replace(/--+/g, '-') // Remove hífens duplicados
      .replace(/-$/g, '') // Remove hífen no final da string

    return new Slug(slugText)
  }

  get value() {
    return this._value
  }
}
