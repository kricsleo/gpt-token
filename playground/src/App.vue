<script setup lang="ts">
import { TiktokenModel, encodingForModel } from 'js-tiktoken';
import { computed, ref, watch } from 'vue';
import { textTokens, messageTokens } from '../../src/index'
import OptionsGroup from './components/OptionsGroup.vue';

const models: Array<{label: string, value: TiktokenModel }> = [
  { label: 'gpt-3.5-turbo-0301', value: 'gpt-3.5-turbo-0301' },
  { label: 'gpt-3.5-turbo-0613', value: 'gpt-3.5-turbo-0613' },
  { label: 'gpt-3.5-turbo-16k-0613', value: 'gpt-3.5-turbo-16k-0613' },
  { label: 'gpt-4-0314', value: 'gpt-4-0314' },
  { label: 'gpt-4-32k-0314', value: 'gpt-4-32k-0314' },
  { label: 'gpt-4-0613', value: 'gpt-4-0613' },
  { label: 'gpt-4-32k-0613', value: 'gpt-4-32k-0613' },
]
const colors = ['rgb(39 181 234 / 50%)', 'rgb(52 245 81 / 50%)', 'rgb(254 234 57 / 50%)', 'rgb(252 102 102 / 50%)', 'rgb(236 26 26 / 50%)']
const text = ref('<script setup lang="ts">')
const model = ref(models[0].value)
watch([text, model], () => {
  console.log({t : text.value})
})
const textLength = computed(() => text.value.length.toLocaleString('en'))
const textTokenLength = computed(() => (textTokens(text.value, model.value)).toLocaleString('en'))
const decodedTexts = computed(() => {
  const encoder = encodingForModel(model.value)
  const tokens = encoder.encode(text.value)
  return tokens.map(t => encoder.decode([t]))
})
const messageTokenLength = computed(() => (messageTokens({role: 'user', content: text.value}, model.value)).toLocaleString('en'))
</script>

<template>
  <main font-sans p="x-4 y-8" text-gray-200>
    <div max-w-220 mx-auto flex="~ col gap-4">
      <OptionsGroup :options="models" v-model="model" />
      <textarea 
        placeholder="Text to calculate"
        v-model="text"
        border="~ base rounded" bg-secondary px4 py2 h-100 outline-none op-85 focus:border-emerald-5 transition-all />
      <p text-center>
        <strong text-xl text-emerald-5>{{ textLength }}</strong> <span op-75>characters</span> 
        <span mx-2 op75>→ </span>
        <strong text-xl text-emerald-5>{{ textTokenLength }}</strong> <span op-75>text tokens</span>
        <span mx-2 op75>→ </span>
        <strong text-xl text-emerald-5>{{ messageTokenLength }}</strong> <span op-75>message tokens</span>
      </p>
      <div ws-pre-wrap border="~ base rounded" bg-secondary px4 py2 op-85 h-100 of-auto>
        <span 
          v-for="decodedText, idx in decodedTexts" 
          :key="idx" 
          :style="{backgroundColor: colors[idx % colors.length]}">{{ decodedText }}</span>
      </div>
      <div mt-20>
        <a op75 hover:op100 href="https://platform.openai.com/tokenizer" target="_blank">→ The official tokenizer</a>
      </div>
      <div my4 h-1px border="t base" w-10 />
      <footer flex="~ gap-3">
        <a href="https://github.com/kricsleo/gpt-token" target="_blank" text-lg op50 hover:op100>
          <div i-carbon:logo-github />
        </a>
        <p>
          <span op50>Made by</span> 
          <a href="https://github.com/kricsleo" op50 hover:op100> Kricsleo</a>
        </p>
      </footer>
    </div>
  </main>
</template>
