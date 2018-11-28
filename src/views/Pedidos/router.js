const Pedidos = () => import('./Index.vue')
const CadastroPedidos = () => import('./CadastroPedidos.vue')
const ListaPedidos = () => import('./ListaPedidos.vue')

export default {
  path: '/pedidos',
  component: Pedidos,
  children: [
    {
      path: 'cadastro',
      component: CadastroPedidos,
      name: 'CadastroPedidos'
    },
    {
      path: 'lista',
      component: ListaPedidos,
      name: 'ListaPedidos'
    }
  ]
}
