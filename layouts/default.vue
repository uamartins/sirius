<template>
  <el-config-provider :locale="ptBr" size="large">
      <Login v-if="!auth.isLoggedIn"/>
    <el-container style="height: 100vh" v-else>
      <el-scrollbar class="scroll-base-menu">
        <BaseMenu />
      </el-scrollbar>
      <el-container>
        <el-header class="main-header">
          <BaseHeader />
        </el-header>
        <el-scrollbar>
          <el-main class="main-container">
            <NuxtPage />
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
import ptBr from 'element-plus/dist/locale/pt-br.mjs'

const auth = useAuth()
</script>

<style lang="scss" scoped>
.scroll-base-menu:deep(.el-scrollbar__view) {
    height: 100%;
}

.main-container {
}

.main-header {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
