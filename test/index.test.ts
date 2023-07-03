import { describe, expect, it } from 'vitest'
import { textTokens, messageTokens } from '../src/index'

describe('gpt-token', () => {
  it('text tokens', () => {
    // validate with https://platform.openai.com/tokenizer
    expect(textTokens('A quick brown fox jumps over the lazy dog', 'gpt-3.5-turbo-0613'))
      .toMatchInlineSnapshot('9')
  })

  it('message tokens', () => {
    expect(messageTokens([
      {
        role: 'user',
        content: 'A quick brown fox jumps over the lazy dog'
      }
    ], 'gpt-3.5-turbo-0613'))
      .toMatchInlineSnapshot('16')
  })
})
