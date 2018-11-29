const Produtos = () => import('./Index.vue')
const ListaProdutos = () => import('./ListaProdutos.vue')
const CadastroProdutos = () => import('./CadastroProdutos.vue')
const ToPDF = () => import('./ToPDF.vue')

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
    },
    {
      path: 'topdf',
      component: ToPDF,
      name: 'ToPDF'
    }
  ]
}
