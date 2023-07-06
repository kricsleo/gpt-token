import { encodingForModel, TiktokenModel } from 'js-tiktoken'

export interface Message {
  name?: string
  role: 'system' | 'user' | 'assistant'
  content: string
}

export * from 'js-tiktoken'

export function textTokens(text: string, model: TiktokenModel) {
  const encoder = encodingForModel(model)
  return encoder.encode(text).length
}

// https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb
export function messageTokens(message: Message | Message[], model: TiktokenModel) {
  let tokensPerMessage: number
  let tokensPerName: number
  const primeTokens = 3
  if ([
    'gpt-3.5-turbo-0613',
    'gpt-3.5-turbo-16k-0613',
    'gpt-4-0314',
    'gpt-4-32k-0314',
    'gpt-4-0613',
    'gpt-4-32k-0613',
  ].includes(model)) {
    tokensPerMessage = 3
    tokensPerName = 1
  } else if('gpt-3.5-turbo-0301' === model) {
    tokensPerMessage = 4
    tokensPerName = -1
  } else if(model.includes('gpt-3.5-turbo')) {
    console.warn('Warning: gpt-3.5-turbo may update over time. Returning num tokens assuming gpt-3.5-turbo-0613.')
    return messageTokens(message, 'gpt-3.5-turbo-0613')
  } else if(model.includes('gpt-4')) {
    console.warn('Warning: gpt-4 may update over time. Returning num tokens assuming gpt-4-0613.')
    return messageTokens(message, 'gpt-4-0613')
  } else {
    throw new Error(`Unsupported model: ${model}`)
  }
  const encoder = encodingForModel(model)
  const messages = Array.isArray(message) ? message : [message]
  const tokens = messages.reduce((acc, msg) => {
    acc += tokensPerMessage
    for (const [key, value] of Object.entries(msg)) {
      acc += encoder.encode(value).length
      if (key === 'name') { 
        acc += tokensPerName 
      }
    }
    return acc
  }, 0)
  return tokens + primeTokens
}