export const useMenu = definePiniaStore('menu', {
  state: () => ({
    collapse: useLocalStorage('sirius/menu/collapse', false),
    title: useLocalStorage('sirius/menu/title', 'Minha Folha Online'),
  }),
  actions: {
    toggleMenu() {
      this.collapse = !this.collapse
    },
    setTitle(title: string) {
      this.title = title
    } 
  },
  getters: {
    collapsed: (state) => state.collapse,
    titlePage: (state) => state.title,
  },
})
