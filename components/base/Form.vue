<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <el-page-header @back="goBack" v-if="showPageHeader">
          <template #content>
            <el-text tag="b">{{ title }}</el-text>
          </template>
          <template #extra>
            <slot name="actions">
              <el-button plain type="primary" @click="resetForm(wmFormRef)">
                Cancelar
              </el-button>
              <el-button
                type="primary"
                :loading="loading"
                @click="submitForm(wmFormRef)"
              >
                Salvar
              </el-button>
            </slot>
          </template>
        </el-page-header>
        <div class="buttons" v-else>
          <el-button plain type="primary" @click="resetForm(wmFormRef)">
            Cancelar
          </el-button>
          <el-button
            type="primary"
            :loading="loading"
            @click="submitForm(wmFormRef)"
          >
            Salvar
          </el-button>
        </div>
      </div>
    </template>

    <div class="card-body" v-loading="loading">
      <el-form
        ref="wmFormRef"
        :model="entity"
        label-position="top"
        label-width="120px"
      >
        <slot></slot>
      </el-form>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { Entity, Resource } from '#types'

interface Props {
  showPageHeader: boolean
  readonly?: boolean
  refresh?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showPageHeader: true,
  readonly: false,
  refresh: false,
})

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const uuid = route.params.uuid
const path = route.path.split('/').pop()
const isNew = computed(() => path === 'new')

const entity = inject('entity') as globalThis.Ref<Entity>
const resource = inject('resource') as Resource<Entity>

const emit = defineEmits(['onLoadEntity', 'cancel'])

const title = computed(() => {
  if (props.readonly) {
    return `Visualizando ${useMenu().title}`
  }
  
  if (isNew.value) {
    return `Cadastrando ${useMenu().title}`
  }

  return `Editando ${useMenu().title}`
})

function goBack() {
  router.back()
}

const wmFormRef = ref<FormInstance>()

async function save() {
  loading.value = true
  const { data } = await resource.save(entity.value)

  if (data.value) {
    entity.value = data.value

    if (isNew.value) {
      router.replace({
        name: `${resource.path.replace('/', '-')}-uuid`,
        params: {
          uuid: entity.value.uuid,
        },
      })
    }
  }

  loading.value = false
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submiting!')
      save()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  emit('cancel')

  if (!formEl) return
  formEl.resetFields()
}

async function initialize() {
  if (!isNew.value) {
    loading.value = true
    const { data } = await resource.show(uuid as string)

    if (data.value) {
      entity.value = data.value
      emit('onLoadEntity', entity.value)
    }

    loading.value = false
  }
}

watch(() => props.refresh, () => {
  if (props.refresh) {
    initialize()
  }
})

onMounted(() => {
  initialize()
})
</script>

<style scoped lang="scss">
.card-header {
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
