import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Home.vue'
import ListaUsuarios from '@/views/Usuario/router'
import CadastroInsumos from '@/views/Insumos/router'
import CadastroProdutos from '@/views/Produtos/router'
import CadastroPedidos from '@/views/Pedidos/router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        ListaUsuarios,
        CadastroInsumos,
        CadastroProdutos,
        CadastroPedidos,
      ]
    }
  ]
})
