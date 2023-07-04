<script setup lang="ts">
defineProps<{
  options: Array<{label: string; value: string | number}>
}>()

const value = defineModel<string | number>('modelValue', {
  type: [String, Number],
})
</script>

<template>
  <fieldset flex="~ inline" border="~ base rounded" of-hidden text-sm>
    <label
      v-for="item, idx of options" :key="item.value"
      relative hover:bg-secondary px-2 py-1
      :class="{'border-l border-base': idx, 'bg-active': item.value === value }"
    >
      <div :class="{'op35': item.value === value }" text-center>{{ item.label }}</div>
      <input v-model="value" type="radio" :value="item.value" absolute inset-0 op-0.1 />
    </label>
  </fieldset>
</template>