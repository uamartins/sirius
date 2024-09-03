<template>
  <el-select
    v-model="value"
    value-key="uuid"
    filterable
    remote
    reserve-keyword
    placeholder="Pesquise"
    :remote-method="apiOptions"
    :loading="loading"
    style="width: 100%"
    :teleported="true"
    default-first-option
  >
    <el-option
      v-if="value.uuid !== '' && options.length === 0"
      v-bind:key="value.uuid"
      :label="value.name"
      :value="value"
    />
    <el-option
      v-for="option in options"
      v-bind:key="option.uuid"
      :label="option.name"
      :value="option"
    />
  </el-select>
</template>

<script setup lang="ts">
import { Entity, Resource } from '#types'

const props = defineProps({
  modelValue: {
    type: Object as PropType<Entity>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const value = computed<Entity>({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const options = ref<Entity[]>([])
const loading = ref(false)
const resource = inject('resource') as Resource<Entity>

async function apiOptions(query: string) {
  if (query === '') return

  options.value = []

  if (loading.value) return

  loading.value = true

  const { data } = await resource.list({
    query: { q: query, page: 1, per_page: 50 },
  })

  if (data.value) {
    options.value = data.value.data
  }

  loading.value = false
}
</script>
