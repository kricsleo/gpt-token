<script setup lang="ts">
import { textTokens } from '../../src/index'

const text = 'A quick brown fox jumps over the lazy dog'
const model = 'gpt-3.5-turbo-0301'
</script>

<template>
  <div font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <main>
      token size of '{{ text }}' in model '{{ model }}': {{ textTokens(text, model) }}
    </main>
  </div>
</template>
