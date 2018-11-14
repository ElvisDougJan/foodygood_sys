import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Home.vue'
import CadastroUsuario from '@/views/Usuario/router'
import CadastroInsumos from '@/views/Insumos/router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'Home',
      component: Home,
      children: [
        CadastroUsuario,
        CadastroInsumos
      ]
    }
  ]
})
