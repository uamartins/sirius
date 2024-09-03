<template>
  <el-card class="card">
    <template #header>
      <div class="card-header">
        <el-row :gutter="20" justify="space-between">
          <el-col :span="8">
            <el-input
              placeholder="Pesquise"
              v-model="search"
              :prefixIcon="Search"
              v-if="searchable"
            />
          </el-col>
          <el-col :span="16">
            <el-row :gutter="20" justify="end" class="mr-0">
              <slot name="actions">
                <el-button type="primary" :icon="Plus" @click="onNew">
                  Novo
                </el-button>
              </slot>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </template>
    <el-table
      :class="`${editable ? 'clickable-rows' : ''}`"
      :data="result?.data ?? []"
      v-loading="loading || deleting"
      style="width: 100%"
      stripe
      highlight-current-row
      @row-dblclick="handleEditCurrentRow"
    >
      <slot name="columns">
        <el-table-column prop="uuid" label="ID" minWidth="300" />
        <el-table-column label="DATA" minWidth="150">
          <template #default="scope">
            <TextDateTime :value="scope.row.createdAt" />
          </template>
        </el-table-column>
      </slot>
      <el-table-column align="right" fixed="right" minWidth="170">
        <template #default="scope">
          <el-button
            @click="handleEditCurrentRow(scope.row)"
            type="primary"
            plain
            :icon="readonly ? View : editIcon"
          />
          <el-button
            v-if="!readonly"
            @click="confirmDelete(scope.row)"
            type="danger"
            plain
            :icon="Delete"
          />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-row justify="end">
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="itemsPerPage"
          :loading="loading"
          @size-change="handleSizeChange"
          @current-change="handleCurrentPageChange"
          :page-sizes="[5, 10, 50, 100]"
          layout="total, sizes, prev, pager, next"
          :total="result?.total ?? 0"
        />
      </el-row>
    </template>

    <BaseConfirmDialog v-model="showConfirmDelete" @confirm="deleteEntity">
      <template #content>
        Você tem certeza que deseja excluir o registro?
      </template>
    </BaseConfirmDialog>
  </el-card>
</template>

<script setup lang="ts">
import { Entity, emptyEntity, Resource, emptyResultSet } from '#types'
import { Edit, Plus, Delete, Search, View } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const notifier = useNotifier()

interface Props {
  editable?: boolean
  searchable?: boolean
  defaultOnNew?: boolean
  editIcon?: any
  readonly?: boolean
  refresh?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  editable: true,
  searchable: true,
  defaultOnNew: true,
  editIcon: Edit,
  readonly: false,
  refresh: false,
})

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

watch(() => props.refresh, () => {
  if (props.refresh) {
    refresh()
  }
})

const emit = defineEmits(['action:new'])

function onNew() {
  emit('action:new')

  if (props.defaultOnNew) {
    const path = resource.path.replace('/', '-')
    router.push({
      name: `${path}-uuid`,
      params: {
        uuid: 'new',
      },
    })
  }
}

function handleEditCurrentRow(value: Entity) {
  if (props.editable) {
    loading.value = true

    const path = resource.path.replace('/', '-')
    router.push({
      name: `${path}-uuid`,
      params: {
        uuid: value.uuid,
      },
    })
  }
}

function handleSizeChange(val: number) {
  itemsPerPage.value = val
}

function handleCurrentPageChange(val: number) {
  page.value = val
}

const { pending: loading, data: result, refresh } = resource.list({
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
  if (index !== undefined && index > -1) {
    result.value?.data.splice(index, 1)
  }

  notifier.success('Registro removido com sucesso')

  deleting.value = false
}
</script>
<style lang="scss">
.clickable-rows tbody tr td {
  cursor: pointer;
}
</style>
