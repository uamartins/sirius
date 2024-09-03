<template>
  <v-card :loading="pending || saving">
    <v-card-actions>
      <v-spacer />
      <v-btn
        class="text-overline text-none"
        rounded="xl"
        elevation="2"
        prepend-icon="mdi-check"
        :disabled="!valid"
        type="submit"
        form="entity-form"
      >
        Salvar
      </v-btn>
      <v-btn 
        class="text-overline text-none"
        rounded="xl" 
        elevation="2"
        prepend-icon="mdi-cancel" 
        :to="`/${resource.path}`"
      > 
        Cancelar
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <v-form v-model="valid" @submit.prevent="save" id="entity-form">
        <v-container grid-list-md>
          <slot></slot>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Resource, Entity } from '#types'

const route = useRoute()
const router = useRouter()

const saving = ref(false)
const pending = ref(false)
const valid = ref(false)
const uuid = route.params.uuid
const isNew = computed(() => uuid === 'new')

const entity = inject('entity') as globalThis.Ref<Entity>
const resource = inject('resource') as Resource<Entity>

async function save() {
  saving.value = true

  if (valid) {
    const { data } = await resource.save(entity.value)

    if (data.value) {
      entity.value = data.value

      useNotifier().success('Registro salvo com sucesso')

      if (isNew.value) {
        router.replace({
          name: `${resource.path.replace('/', '-')}-uuid`,
          params: {
            uuid: entity.value.uuid,
          },
        })
      }
    }

    saving.value = false
  } 

  saving.value = false
}

async function initialize() {
  if (!isNew.value) {
    pending.value = true
    const { data } = await resource.show(uuid)

    if (data.value) {
      entity.value = data.value
    }

    pending.value = false
  }
}

onMounted(() => {
  initialize()
})
</script>
