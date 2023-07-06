import { TiktokenModel, encodingForModel } from '../../src/index'

export { textTokens, messageTokens } from '../../src/index'

export function textToTokenText(text: string, model: TiktokenModel) {
  const encoder = encodingForModel(model)
  const tokens = encoder.encode(text)
  return tokens.map(t => encoder.decode([t]))
}
