<template>
  <el-container class="login-container">
    <el-card class="login-card">
      <h3 class="login-title">Login</h3>
      <el-form :model="form" ref="formRef" :rules="rules">
        <el-form-item prop="login">
          <BaseInput
            v-model="form.login"
            type="text"
            placeholder="Usuário"
            class="mb-3"
            :prefix-icon="User"
          />
        </el-form-item>

        <el-form-item prop="password">
          <BaseInput
            v-model="form.password"
            placeholder="Senha"
            show-password
            @keyup.enter.native="submit(formRef)"
            class="mb-3"
            :prefix-icon="Lock"
          />
        </el-form-item>

        <a href="#"> Esqueceu a Senha? </a>

        <el-form-item>
          <BaseButton
            v-loading="loading"
            type="primary"
            class="mt-2"
            style="width: 100%"
            @click="submit(formRef)"
          >
            Entrar
          </BaseButton>
        </el-form-item>
      </el-form>
      <div class="mt-2">
        <p>Não tem uma conta? <a href="#">Registre-se</a></p>
      </div>
    </el-card>
  </el-container>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const authStore = useAuth()

const loading = ref(false)

const formRef = ref<FormInstance>()

interface LoginForm {
  login: string
  password: string
}

const form = ref<LoginForm>({
  login: '',
  password: '',
})

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid: boolean, fields) => {
    if (valid) {
      loading.value = true
      authStore.login(form.value.login, form.value.password)
    } else {
      console.log('error submit!', fields)
      loading.value = false
    }
  })
}

const rules = reactive<FormRules<LoginForm>>({
  login: [{ required: true, message: 'Obrigatório', trigger: 'blur' }],
  password: [{ required: true, message: 'Obrigatório', trigger: 'blur' }],
})

</script>

<style scoped lang="scss">
.login-container {
 display: flex;
 justify-content: center;
 align-items: center;
 height: 100vh;
 background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
 transition: all 0.3s ease;
}

.login-card {
  width: 400px;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 10px 30px -5px rgba(73, 93, 207, 0.2);
  background: white;
  transition: all 0.3s ease;
}

.login-title {
  margin-bottom: 2rem;
  color: #484848;
  text-align: center;
  transition: all 0.3s ease;
}
</style>
