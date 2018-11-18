const Index = () => import('./Index.vue')
const ListaUsuarios = () => import('./ListaUsuarios')
const CadastroUsuario = () => import('./CadastroUsuario.vue')

export default {
  path: '/usuarios',
  component: Index,
  children: [
    {
      path: 'listar',
      name: 'ListaUsuarios',
      component: ListaUsuarios
    },
    {
      path: 'cadastrar/:id',
      name: 'CadastroUsuario',
      component: CadastroUsuario
    }
  ]
}
