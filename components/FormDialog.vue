<template>
  <v-row justify="center">
    <v-dialog
      @keydown.esc="cancel"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      persistent
      width="1024"
    >
      <v-card :loading="loading">
        <v-card-text>
          
          <Form @submit="submit" @cancel="cancel" :title="title">
            <el-form label-position="top" >
              <slot></slot>
            </el-form>
          </Form>
          
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup lang="ts">
import { Entity } from '#types'

interface Props {
  modelValue: boolean
  title?: string
  loading: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits(['submit', 'cancel', 'update:modelValue'])

function cancel() {
  emit('cancel')
  emit('update:modelValue', false)
}

function submit(entity: Entity) {
  emit('submit', entity)
  emit('update:modelValue', false)
}
</script>
