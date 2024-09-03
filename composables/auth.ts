function parseJwt(token: string) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

const config = useRuntimeConfig()

export const useAuth = definePiniaStore('auth', {
  state: () => ({
    token: useLocalStorage('sirius/auth/token', ''),
    profile: useLocalStorage('sirius/auth/profile', ''),
    acl: useLocalStorage('sirius/auth/acl', ''),
  }),
  actions: {
    async login(login: string, password: string) {
      const { access_token } = await $fetch('/auth/login', {
        baseURL: config.public.apiUrl as string ?? 'https://api.minhafolha.online/api',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          login: login,
          password: password,
        },
      })

      const decodedToken = parseJwt(access_token)
      this.token = access_token
      this.profile = decodedToken.profile
      this.acl = decodedToken.acl
    },
    async logout() {
      await useCustomFetch('/auth/logout', {
        method: 'POST',
      });

      this.token = ''
    },
  },
  getters: {
    isLoggedIn(): boolean {
      return this.token !== ''
    },
    isAdmin(): boolean {
        return JSON.parse(this.profile).admin
    }
  },
})
