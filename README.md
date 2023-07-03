<h1 align="center">gpt-token</h1>
<p align="center">
<a href="https://www.npmjs.com/package/gpt-token">
  <img src="https://img.shields.io/npm/v/gpt-token?style=flat&colorA=18181B&colorB=F0DB4F" />
</a>

<a href="https://www.npmjs.com/package/gpt-token">
  <img src="https://img.shields.io/npm/types/gpt-token?style=flat&colorA=18181B&colorB=F0DB4F" />
</a>

<a href="https://bundlephobia.com/package/gpt-token">
  <img src="https://img.shields.io/bundlephobia/minzip/gpt-token?style=flat&colorA=18181B&colorB=F0DB4F" />
</a>

<a href="https://github.com/kricsleo/gpt-token/blob/master/LICENSE">
  <img src="https://img.shields.io/github/license/kricsleo/gpt-token.svg?style=flat&colorA=18181B&colorB=F0DB4F" />
</a>

</p>

Calculate the number of text tokens in GPT.

## Usage

```bash
npm i gpt-token
```

```ts
import { calcTextTokens, calcMessageTokens } from 'gpt-token'

// => 
console.log(calcTextTokens('A quick brown fox jumps over the lazy dog'))

console.log(calcMessageTokens([
  {
    role: 'user',
    content: 'A quick brown fox jumps over the lazy dog'
  }
]))
```

## Thanks ❤️

- [gpt-tokens](https://github.com/Cainier/gpt-tokens/tree/main)
- [openai-cookbook](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb)

## License

[MIT](./LICENSE) License © [Krcisleo](https://github.com/krcisleo)
