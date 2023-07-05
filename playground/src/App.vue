<script setup lang="ts">
import { TiktokenModel } from 'js-tiktoken';
import { computed, ref } from 'vue';
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
const text = ref('')
const model = ref(models[0].value)
const textTokenLength = computed(() => (textTokens(text.value, model.value)).toLocaleString('en'))
const messageTokenLength = computed(() => (messageTokens({role: 'user', content: text.value}, model.value)).toLocaleString('en'))
</script>

<template>
  <main font-sans p="x-4 y-10" text-gray-200>
    <div max-w-220 m="x-auto y-10" flex="~ col gap-4">
      <OptionsGroup :options="models" v-model="model" />
      <textarea 
        placeholder="Text to calculate"
        v-model="text"
        border="~ base rounded" bg-secondary px4 py2 h-100 outline-none op-85 focus:border-emerald-5 transition-all />
      <p text-center>
        <strong text-xl text-emerald-5>{{ text.length }}</strong> <span op-75>characters</span> 
        <span mx-2 op75>→ </span>
        <strong text-xl text-emerald-5>{{ textTokenLength }}</strong> <span op-75>text tokens</span>
        <span mx-2 op75>→ </span>
        <strong text-xl text-emerald-5>{{ messageTokenLength }}</strong> <span op-75>message tokens</span>
      </p>
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
