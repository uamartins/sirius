<template>
  <el-dialog v-model="value" title="? Responda" class="dialog">
    <BaseForm @submit="submit" @cancel="cancel" :title="title">
            <el-form label-position="top" >
              <slot></slot>
            </el-form>
          </BaseForm>
    <template #footer>
      <el-button type="primary" plain @click="cancel"> Cancelar </el-button>
      <el-button type="danger" plain @click="confirm"> Confirmar </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
const props = defineProps(['modelValue'])
const emit = defineEmits(['submit', 'cancel', 'update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

function cancel() {
  emit('cancel')
  emit('update:modelValue', false)
}

function submit() {
  emit('submit')
  emit('update:modelValue', false)
}
</script>
<style>
.dialog.el-dialog {
  width: 40%;
}

@media screen and (max-width: 768px) {
  .dialog.el-dialog {
    width: 90%;
  }
}
</style>
