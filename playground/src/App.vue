<script setup lang="ts">
import { computed } from 'vue';
import { TiktokenModel } from '../../src/index'
import OptionsGroup from './components/OptionsGroup.vue';
import { computedAsync, useLocalStorage } from '@vueuse/core'

const models: Array<{label: string, value: TiktokenModel }> = [
  { label: 'gpt-3.5-turbo-0301', value: 'gpt-3.5-turbo-0301' },
  { label: 'gpt-3.5-turbo-0613', value: 'gpt-3.5-turbo-0613' },
  { label: 'gpt-3.5-turbo-16k-0613', value: 'gpt-3.5-turbo-16k-0613' },
  { label: 'gpt-4-0314', value: 'gpt-4-0314' },
  { label: 'gpt-4-32k-0314', value: 'gpt-4-32k-0314' },
  { label: 'gpt-4-0613', value: 'gpt-4-0613' },
  { label: 'gpt-4-32k-0613', value: 'gpt-4-32k-0613' },
]
const colors = ['#fb7185dd', '#60a5fadd', '#22c55edd', '#f59e0bdd', '#a855f7dd']
const worker = new ComlinkWorker<typeof import('./worker')>(new URL('./worker', import.meta.url))

const text = useLocalStorage('Text to tokenizer', 'A quick brown fox jumps over the lazy dog')
const model = useLocalStorage<TiktokenModel>('model', models[0].value)
const decodedTexts = computedAsync(() => worker.textToTokenText(text.value, model.value), [])
const textLength = computed(() => text.value.length.toLocaleString('en'))
const textTokenLength = computed(() => decodedTexts.value.length.toLocaleString('en'))
const messageTokenLength = computedAsync(async () => (await worker.messageTokens({role: 'user', content: text.value}, model.value)).toLocaleString('en'), '0')
</script>

<template>
  <main font-sans p4 pb20 text-gray-200>
    <div max-w-220 mx-auto flex="~ col gap-4">
      <OptionsGroup :options="models" v-model="model" />
      <textarea 
        placeholder="Text to calculate"
        v-model="text"
        border="~ base rounded" bg-secondary px4 py2 h-100 outline-none 
        op-85 focus:border-emerald-5 transition-all font-mono />
      <p text-center>
        <strong text-xl text-emerald-5>{{ textLength }}</strong> <span op-75>characters</span> 
        <span mx-2 op75>→ </span>
        <strong text-xl text-emerald-5>{{ textTokenLength }}</strong> <span op-75>text tokens</span>
        <span mx-2 op75>→ </span>
        <strong text-xl text-emerald-5>{{ messageTokenLength }}</strong> <span op-75>message tokens</span>
      </p>
      <div font-mono ws-pre-wrap border="~ base rounded" bg-secondary px4 py2 op-85 h-100 of-auto>
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
