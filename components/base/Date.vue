<template>
  <el-date-picker
    v-model="value"
    type="date"
    format="DD/MM/YYYY"
    value-format="YYYY-MM-DD"
    style="width: 100%"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed<Date>({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>
