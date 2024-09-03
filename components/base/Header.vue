<template>
  <el-menu mode="horizontal" :ellipsis="false" class="menu--header">
    <el-menu-item @click="mainMenu.toggleMenu()">
      <el-icon size="30">
        <Expand v-if="mainMenu.collapsed" />
        <Fold v-else />
      </el-icon>
      <el-text tag="b">{{ mainMenu.titlePage }}</el-text>
    </el-menu-item>

    <div class="flex-grow" />
    <el-popover width="300" :show-arrow="false" transition="el-zoom-in-bottom">
      <template #reference>
        <el-menu-item>
          <el-icon size="large">
            <Help />
          </el-icon>
        </el-menu-item>
      </template>
      <template #default>
        <h4>Suporte</h4>
      </template>
    </el-popover>
    <el-popover width="300" :show-arrow="false" transition="el-zoom-in-bottom">
      <template #reference>
        <el-menu-item>
          <el-icon size="large">
            <Notification />
          </el-icon>
        </el-menu-item>
      </template>
      <template #default>
        <h4>Central de Notificações</h4>
      </template>
    </el-popover>
    <el-menu-item @click="toggleDark()">
      <el-icon>
        <Moon v-if="isDark" />
        <Sunny v-else />
      </el-icon>
    </el-menu-item>
    <el-popover width="300" :show-arrow="false" transition="el-zoom-in-bottom">
      <template #reference>
        <el-menu-item>
          <el-avatar :icon="UserFilled" size="large" shape="square" />
        </el-menu-item>
      </template>
      <template #default>
        <div class="avatar">
          <el-avatar :icon="UserFilled" size="large" shape="square" />
          <div class="user-details">
            <el-text tag="strong" class="name">{{ profile.name }}</el-text>
            <el-text tag="span" class="email">{{ profile.email }}</el-text>
          </div>
        </div>
        <el-divider />
        <el-menu class="menu--profile">
          <el-menu-item @click="gotoProfile"> Meus Dados </el-menu-item>
          <el-menu-item> Configurações </el-menu-item>
          <el-divider />
          <el-menu-item @click="doLogout"> Sair </el-menu-item>
        </el-menu>
      </template>
    </el-popover>
  </el-menu>
</template>

<script setup lang="ts">
import {
  UserFilled,
  Moon,
  Sunny,
  Notification,
  Expand,
  Fold,
  Help,
} from '@element-plus/icons-vue'

const mainMenu = useMenu()

const auth = useAuth()

const profile = computed(() => {
  return JSON.parse(auth.profile)
})

function doLogout() {
  auth.logout()
}
const router = useRouter()
function gotoProfile() {
  router.push('/profile')
}
</script>

<style scoped lang="scss">

.menu--profile {
  border-right: none;
}

.menu--header {
  border-bottom: none;
  .el-menu-item:hover {
    background-color: transparent;
  }
}

.avatar {
  display: flex;
  align-items: center;
  .user-details {
    margin-left: 10px;
    .name {
      display: block;
      font-weight: bold;
    }
    .email {
      display: block;
      font-size: 12px;
    }
  }
}
</style>
