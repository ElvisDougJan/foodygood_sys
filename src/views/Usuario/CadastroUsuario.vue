<template>
  <v-container>
    <v-card>
      <v-toolbar color="amber lighten-1">
        <v-card-text class="headline">
          <span v-if="$route.params.id" style="color:white">EDITAR USUÁRIO</span>
          <span v-else style="color:white">CADASTRO DE USUÁRIO</span>
        </v-card-text>
      </v-toolbar>
      <v-card class="pa-3">
        <v-card class="px-5">
          <v-layout row wrap>
            <v-flex md5 xs12>
              <v-text-field name="name" label="Nome" id="id" v-model="usuario.nome"></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md5 xs12>
              <v-select :items="funcoes" item-text="descricao" item-value="_id" label="Funções" v-model="usuario.funcoes"></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md5 xs12>
              <v-text-field name="name" label="CPF" id="id" v-model="usuario.cpf_cnpj"></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md5 xs12>
              <v-text-field name="name" label="Telefone" id="id" v-model="usuario.telefone"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card>
        <v-card class="mt-4 px-5">
          <v-layout row wrap>
            <v-text-field name="name" label="CEP" id="id" v-model="usuario.endereco.cep"></v-text-field>
          </v-layout>
          <v-layout row wrap>
            <v-flex md6 xs12>
              <v-text-field name="name" label="Rua" id="id" v-model="usuario.endereco.rua"></v-text-field>
            </v-flex>
            <v-flex md1>
            </v-flex>
            <v-flex md2 xs12>
              <v-text-field name="name" label="Numero" id="id" v-model="usuario.endereco.numero"></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md2 xs12>
              <v-text-field name="name" label="Complemento" id="id" v-model="usuario.endereco.complemento"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md6 xs12>
              <v-text-field name="name" label="Cidade" id="id" v-model="usuario.endereco.cidade"></v-text-field>
            </v-flex>
            <v-flex md1>
            </v-flex>
            <v-flex md5 xs12>
              <v-text-field name="name" label="Estado" id="id" v-model="usuario.endereco.estado"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card>
        <v-card class="mt-3 px-5">
          <v-layout row wrap>
            <v-flex md6 xs12>
              <v-text-field name="name" label="Username" id="id" v-model="usuario.username"></v-text-field>
            </v-flex>
            <v-flex md1>
            </v-flex>
            <v-flex md5 xs12>
              <v-text-field name="name" label="Senha" id="id" v-model="usuario.senha"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card>
        <v-layout row wrap justify-space-between>
          <v-btn color="warning" class="mt-3" @click="$router.push({ name: 'ListaUsuarios' })">Voltar</v-btn>
          <v-btn v-if="$route.params.id" color="success" class="mt-3" @click="atualizarUsuario()">Salvar</v-btn>
          <v-btn v-else color="success" class="mt-3" @click="salvarUsuario()">Salvar</v-btn>
        </v-layout>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      funcoes: [],
      usuario: {
        nome: '',
        funcoes: '',
        cpf_cnpj: '',
        telefone: '',
        username: '',
        endereco: {
          rua: '',
          numero: '',
          complemento: '',
          cidade: '',
          estado: '',
        },
        username: '',
        senha: ''
      }
    }),
    methods: {
      salvarUsuario() {
        axios.post('http://localhost:3000/salva-usuario', this.usuario)
          .then(res => console.log(res.data))
      },

      atualizarUsuario() {
        axios.put(`${process.env.ROOT_API}atualiza-usuario/${this.$route.params.id}`, this.usuario)
          .then(res => console.log(res.data))
          .catch(err => console.error(`ERRO AO ATUALIZAR USUÁRIO: ${err}`))
      },

      consultaUsuarios() {
        if (this.$route.params.id) {
          axios.get(`${process.env.ROOT_API}usuario/${this.$route.params.id}`)
            .then(res => this.usuario = res.data)
            .catch(err => console.warn(err))
        }
      },
      consultaFuncoes() {
        axios.get(`${process.env.ROOT_API}funcoes`)
          .then(res => this.funcoes = res.data)
          .catch(err => console.error(err))
      }
    },
    created() {
      this.consultaUsuarios()
      this.consultaFuncoes()
      console.log(this.funcoes)
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
