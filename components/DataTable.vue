<template>
  <section>
    <v-card variant="outlined">
      <v-card-text class="d-flex flex-wrap gap-4">
        <v-card-title class="text-overline">
          {{ title }}
        </v-card-title>
        <v-text-field
          append-inner-icon="mdi-magnify"
          hide-details
          label="Pesquise"
          variant="outlined"
          density="compact"
          v-model="search"
          v-show="searchable"
          @click:append-inner="toSearch"
          @keyup.enter="toSearch"
        />
        <div class="flex-grow-1"></div>
        <v-btn
          class="text-overline text-none"
          rounded
          prepend-icon="mdi-plus"
          @click="emit('new')"
        >
          Novo
        </v-btn>
      </v-card-text>
      <v-data-table-server
        :loading="pending || deleting"
        :headers="headers"
        :items="result?.data ?? []"
        :items-per-page="result?.per_page"
        :page="result?.current_page"
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
              @click="emit('edit', item.raw)"
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
      @confirm="emit('delete', selectedEntity)"
    >
      <template #content>
        Você tem certeza que deseja excluir o registro?
      </template>
    </ConfirmDialog>
  </section>
</template>

<script setup lang="ts">
import {
  Entity,
  ResultSetInterface,
  emptyEntity,
  emptyResultSet,
} from '#types'

interface Props {
  headers: any[]
  result: ResultSetInterface<Entity>
  searchable?: boolean
  deleting?: boolean
  pending?: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  searchable: true,
  deleting: false,
  pending: false,
  result: () => emptyResultSet,
})

const emit = defineEmits(['new', 'edit', 'delete', 'search', 'loadItems'])

const customHeaders = computed(() => {
  return props.headers.filter((header: { custom: any }) => header?.custom)
})

const pageOptions = [
  { value: 5, title: '5' },
  { value: 10, title: '10' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
]

function updateTableOptions(options: any) {
  emit('loadItems', options)
}

let selectedEntity: Entity = emptyEntity
const showConfirmDelete = ref(false)
function confirmDelete(entity: Entity) {
  showConfirmDelete.value = true
  selectedEntity = entity
}

const search = ref('')
function toSearch() {
  emit('search', search)
}
</script>

<style lang="scss">
</style>
