<template>
  <v-app>
    <v-navigation-drawer persistent v-model="drawer" enable-resize-watcher fixed app class="menu-lateral">
      <v-list class="ml-4 mt-3 mr-4">
        <v-list-group class="menu-cadastro">
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>Cadastros</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile class="opcao-selecionada" :to="{name: 'CadastroUsuario'}">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="text-black">Usuário</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="{name: 'CadastroInsumos'}">
            <v-list-tile-action>
              <v-icon>extension</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="text-black">Insumo</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="{name: 'CadastroMesas'}">
            <v-list-tile-action>
              <v-icon>tab</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="text-black">Mesa</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="{name: 'CadastroItens'}">
            <v-list-tile-action>
              <v-icon>receipt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="text-black">Itens</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="{name: CadastroProdutos}">
            <v-list-tile-action>
              <v-icon>local_dining</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="text-black">Produtos</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped" color="black">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn> -->
      <!-- <v-btn icon @click.stop="clipped = !clipped">
          <v-icon>web</v-icon>
        </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
          <v-icon>remove</v-icon>
        </v-btn> -->
      <v-toolbar-title><span style="color:white">Sistema FoodyGood</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
          <v-icon>menu</v-icon>
        </v-btn> -->
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed app>
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app style="background-color: black">
      <span style="color:white">&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'bubble_chart',
          title: 'Inspire'
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Sistema FoodyGood'
      }
    },
    name: 'App'
  }
</script>

<style scoped>
  .v-navigation-drawer .v-list {
    background: transparent !important;
  }
  .menu-lateral {
    background-image: url("/../../static/img/sidebar-img.jpg");
    background-position: absolute;
    background-size: cover;
    background-color: #888 !important;
    background-blend-mode: multiply;
  }
  .menu-cadastro {
    background-color: #FFCA28;
    padding: 10px;
    border-radius: 20px
  }

  .opcao-selecionada {
    background-color: #FFF;
    border-radius: 10px
  }

  .text-black {
    color: black
  }
</style>
