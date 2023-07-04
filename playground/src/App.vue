<script setup lang="ts">
import { TiktokenModel } from 'js-tiktoken';
import { computed, ref } from 'vue';
import { textTokens } from '../../src/index'
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
const tokens = computed(() => (textTokens(text.value, model.value)).toLocaleString('en'))
</script>

<template>
  <main font-sans p="x-4 y-10" text-gray-200>
    <div max-w-220 m="x-auto y-10" flex="~ col gap-4">
      <OptionsGroup :options="models" v-model="model" />
      <textarea 
        placeholder="Text to calculate"
        v-model="text"
        border="~ base rounded" bg-secondary px4 py2 h-100 outline-none op-85 />
      <p text-center>
        <strong text-xl text-emerald>{{ text.length }}</strong> <span op-75>chars</span> 
        <span mx-2 op75>→ </span>
        <strong text-xl text-emerald>{{ tokens }}</strong> <span op-75>tokens</span>
      </p>
    </div>
  </main>
</template>
