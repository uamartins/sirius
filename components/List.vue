<template>
  <section>
    <v-card variant="outlined">
      <v-card-text class="d-flex flex-wrap gap-4">
        <v-text-field
          append-inner-icon="mdi-magnify"
          hide-details
          label="Pesquise"
          variant="outlined"
          density="compact"
          v-model="search"
          v-if="searchable"
        />
        <div class="flex-grow-1"></div>
        <v-btn 
          class="text-overline text-none" 
          rounded 
          prepend-icon="mdi-plus" 
          :to="`/${resource.path}/new`"
        > Novo </v-btn>
      </v-card-text>
      <v-data-table-server
        :loading="pending || deleting"
        loading-text="Aguarde... Carregando dados"
        :headers="headers"
        :items="result?.data ?? []"
        :items-per-page="itemsPerPage"
        :page="page"
        :items-length="result?.total ?? 0"
        :search="search"
        :items-per-page-options="pageOptions"
        @update:options="updateTableOptions"
      >
        <template 
          v-for="column in customHeaders" 
          :key="column.key" 
          v-slot:[`item.${column.key}`]="{ item }"
        >
          <slot :name="`item.${column.key}`" v-bind="item.raw">
            {{ item.raw[column.key] }}
          </slot>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-row justify="end" class="flex-nowrap">
            <v-btn
              class="px-2"
              density="compact"
              variant="text"
              icon
              :to="`/${resource.path}/${item.raw.uuid}`"
            >
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              class="px-2"
              density="compact"
              variant="text"
              icon
              danger
              @click="confirmDelete(item.raw)"
            >
              <v-icon small color="error">mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-table-server>
    </v-card>
    <ConfirmDialog 
      v-model="showConfirmDelete"
      @confirm="deleteEntity"
    >
      <template #content>
        Você tem certeza que deseja excluir o registro?
      </template>
    </ConfirmDialog>
  </section>
</template>

<script setup lang="ts">
import { Entity, emptyEntity, Resource, emptyResultSet } from '#types'

const router = useRouter()
const route = useRoute()
const notifier = useNotifier()

interface Props {
  headers: any[]
  searchable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  searchable: true
})

const customHeaders = computed(() => {
  return props.headers.filter((header: { custom: any; }) => header?.custom )
})

const pageOptions = [
  { value: 5, title: '5' },
  { value: 10, title: '10' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
]
const search = ref('')
const itemsPerPage = ref(5)
const page = ref(1)

if (route.query.q) {
  search.value = route.query.q as string
}

const resource = inject('resource') as Resource<Entity>

watch(search, () => {
  result.value = emptyResultSet
  
  router.replace({
    name: resource.path,
    query: {
      q: search.value,
    },
  })
})

function updateTableOptions(options: { page: number; itemsPerPage: number; }) {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
}

const { pending, data: result } = resource.list({
  lazy: true,
  query: { q: search, page: page, per_page: itemsPerPage },
})

result.value = emptyResultSet

let selectedEntity: Entity = emptyEntity
const showConfirmDelete = ref(false)
function confirmDelete(entity: Entity) {
  showConfirmDelete.value = true
  selectedEntity = entity
}

const deleting = ref(false)
async function deleteEntity() {
  deleting.value = true

  await resource.delete(selectedEntity.uuid)
  
  const index = result.value?.data.indexOf(selectedEntity)
  if ((index !== undefined) && (index > -1)) {
    result.value?.data.splice(index, 1);
  }

  notifier.success('Registro removido com sucesso')

  deleting.value = false
}
</script>
