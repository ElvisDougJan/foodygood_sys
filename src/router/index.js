import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Home.vue'
import ListaUsuarios from '@/views/Usuario/router'
import ListaInsumos from '@/views/Insumos/router'
import ListaProdutos from '@/views/Produtos/router'
import CadastroPedidos from '@/views/Pedidos/router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        ListaUsuarios,
        ListaInsumos,
        ListaProdutos,
        CadastroPedidos,
      ]
    }
  ]
})
