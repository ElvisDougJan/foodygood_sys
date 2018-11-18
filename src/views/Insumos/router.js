const Insumos = () => import('./Index.vue')
const CadastroInsumos = () => import('./CadastroInsumos.vue')
const ListaInsumos = () => import('./ListaInsumos.vue')

export default {
  path: '/insumos',
  component: Insumos,
  children: [
    {
      path: 'listar',
      component: ListaInsumos,
      name: 'ListaInsumos'
    },
    {
      path: 'cadastrar/:id',
      component: CadastroInsumos,
      name: 'CadastroInsumos'
    }
  ]
}
