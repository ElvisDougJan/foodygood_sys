<template>
  <v-container>
    <v-card>
      <v-toolbar color="amber lighten-1">
        <v-card-text class="headline">
          <span v-if="$route.params.id" style="color:white">EDITAR PRODUTO</span>
          <span v-else style="color:white">CADASTRO DE PRODUTO</span>
        </v-card-text>
      </v-toolbar>
      <v-card class="pa-3">
        <v-card class="px-5">
          <v-layout row wrap>
            <v-flex md5 xs12>
              <v-text-field label="Preco" id="id" type="number" v-model="produto.Preco"></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md5 xs12>
              <v-text-field label="Estoque" id="id" type="number" v-model="produto.Estoque"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md5 xs12>
              <v-autocomplete label="Tipo" id="id" v-model="produto.Tipo" :items="tipos"></v-autocomplete>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md5 xs12>
              <v-autocomplete label="Unidade" id="id" v-model="produto.Unidade" :items="unidades"></v-autocomplete>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md12 xs12>
              <v-textarea label="Descricao" id="id" v-model="produto.Descricao"></v-textarea>
            </v-flex>
          </v-layout>
        </v-card>
        <v-layout row wrap justify-space-between>
          <v-btn color="warning" class="mt-3" @click="$router.push({ name: 'ListaProdutos' })">Voltar</v-btn>
          <v-btn v-if="$route.params.id" color="success" class="mt-3" @click="atualizarProduto()">Salvar</v-btn>
          <v-btn v-else color="success" class="mt-3" @click="salvarProduto()">Salvar</v-btn>
        </v-layout>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      produto: {
        Preco: '',
        Estoque: '',
        Unidade: '',
        Tipo: '',
        Descricao: ''
      },
      unidades: ['Kilo', 'Unidade', 'Gramas', 'Litro', 'Mililitros'],
      tipos: ['Prato principal', 'Sobremesa', 'Bebida']
    }),
    methods: {
      salvarProduto() {
        axios.post(`${process.env.ROOT_API}salva-produto`, this.produto).then(res => console.log(res.data))
      },

      async consultaProduto() {
        if (this.$route.params.id) {
          await axios.get(`${process.env.ROOT_API}produto/${this.$route.params.id}`)
            .then(res => this.produto = res.data)
            .catch(err => console.error(`ERRO AO CONSULTAR PRODUTOS: ${err}`))
        }
      },

      async atualizarProduto() {
        await axios.put(`${process.env.ROOT_API}atualiza-produto/${this.$route.params.id}`, this.produto)
          .then(res => console.log(res.data))
          .catch(err => console.error(`ERRO AO ATUALIZAR USUÁRIO: ${err}`))
      }

    },
    mounted() {
      this.consultaProduto()
    }
  }

</script>

<style>
  .line2 {
    border: 0;
    height: 1px;
    background: #333;
    background-image: linear-gradient(to right, #ccc, #333, #ccc);
  }
</style>
