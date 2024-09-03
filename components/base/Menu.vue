<template>
  <el-menu :collapse="collapse || menu.collapsed">
    <el-menu-item>
      <el-icon>
        <Search />
      </el-icon>
      <template #title>
        <el-input
          v-model="search"
          placeholder="Pesquisar"
          size="default"
          clearable
        />
      </template>
    </el-menu-item>
    <el-menu-item
      v-for="item in filtered"
      :index="item.title"
      @click="onClickMenu(item)"
    >
      <el-icon>
        <component :is="item.icon" />
      </el-icon>

      <template #title>
        <span>
          {{ item.title }}
        </span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import {
  Location,
  User,
  Suitcase,
  SuitcaseLine,
  Money,
  OfficeBuilding,
  Search,
  Memo,
  Document,
  CopyDocument,
  House
} from '@element-plus/icons-vue'

const props = defineProps(['collapse'])

const menu = useMenu()

const menus = shallowRef([
  {
    icon: House,
    title: 'Minha Folha Online',
    to: '/',
    permissions: ['analytics:read'],
  },
  {
    icon: User,
    title: 'Pessoas',
    to: '/people',
    permissions: ['employee:read'],
  },
  {
    icon: User,
    title: 'Funcionários',
    to: '/employees',
    permissions: ['employee:read'],
  },
  {
    icon: Suitcase,
    title: 'Cargos',
    to: '/employees/roles',
    permissions: ['employee-roles:read'],
  },
  {
    icon: SuitcaseLine,
    title: 'Funções',
    to: '/functions',
    permissions: ['functions:read'],
  },
  {
    icon: Location,
    title: 'Locais de trabalho',
    to: '/workplaces',
    permissions: ['workspaces:read'],
  },
  {
    icon: Money,
    title: 'Bancos',
    to: '/banks',
    permissions: ['banks:read'],
  },
  {
    icon: OfficeBuilding,
    title: 'Cidades',
    to: '/cities',
    permissions: ['cities:read'],
  },
  {
    icon: User,
    title: 'Usuários',
    to: '/users',
    permissions: ['users:read'],
  },
  {
    icon: Memo,
    title: 'Tipo Folha',
    to: '/payrolls/types',
    permissions: ['payroll:type:read'],
  },
  {
    icon: Document,
    title: 'Folha de Pagamento',
    to: '/payrolls',
    permissions: ['payroll:read'],
  },
  {
    icon: CopyDocument,
    title: 'Eventos',
    to: '/events',
    permissions: ['event:read'],
  },
  {
    icon: CopyDocument,
    title: 'Sobre',
    to: '/about',
    permissions: ['event:read'],
  },
])

const search = ref('')
const filtered = computed(() => {
  if (!search.value) {
    return menus.value;
  }
  return menus.value.filter(menu => menu.title.toLowerCase().includes(search.value.toLowerCase()));
});

const route = useRoute()
const router = useRouter()
function onClickMenu(item: any) {
  router.push(item.to)
}

// mounted() {
//   this.checkPermissions();
// }

// checkPermissions() {
//   let vm = this;
//   if (authStore.isAdmin) {
//     this.checkAdmin()
//     return;
//   }

//   if (vm.$store.state.acl.length == 0) {
//     this.menuItems = [];
//     return;
//   }

//   this.menuItems = this.menuItems.filter(function (menu) {
//     if (menu.permissions.length == 0) {
//       return true
//     }

//     return !menu.permissions.every(function (permission) {
//       return vm.$store.state.acl.every(function (element) {
//         return !(permission === element)
//       });
//     })
//   })
// }

// checkAdmin() {
//   if (this.$store.state.profile.admin) {
//     this.menuItems.push({
//       icon: "mdi-account-group",
//       title: "Usuários",
//       to: "/users",
//     });
//   }
// }
</script>

<style scoped lang="scss">
.el-menu {
  //height: 100%;
}
.el-menu-item {
  font-weight: 500;

  &.is-active {
    background-color: #409eff1a;
    border-radius: 8px;
    font-weight: 600;
  }
}

.el-menu:not(.el-menu--collapse) > .el-menu-item {
  margin-right: 16px;
}
</style>
