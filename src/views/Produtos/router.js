const Produtos = () => import('./Index.vue')
const ListaProdutos = () => import('./ListaProdutos.vue')
const CadastroProdutos = () => import('./CadastroProdutos.vue')

export default {
  path: '/produtos',
  component: Produtos,
  children: [
    {
      path: 'lista',
      component: ListaProdutos,
      name: 'ListaProdutos'
    },
    {
      path: 'cadastro',
      component: CadastroProdutos,
      name: 'CadastroProdutos'
    }
  ]
}
