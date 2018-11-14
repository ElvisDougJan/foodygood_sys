<template>
  <v-container>
    <v-card>
      <v-toolbar color="amber lighten-1">
        <v-card-text class="headline">
          <span style="color:white">CADASTRO DE USUÁRIO</span>
        </v-card-text>
      </v-toolbar>
      <v-card class="pa-3">
        <v-card class="px-5">
          <v-layout row wrap>
            <v-flex md5>
              <v-text-field name="name" label="Nome" id="id" v-model="usuario.nome"></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md5>
              <v-text-field name="name" label="Cargo" id="id" v-model="usuario.cargo"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md5>
              <v-text-field name="name" label="CPF" id="id" v-model="usuario.cpf"></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md5>
              <v-text-field name="name" label="Telefone" id="id" v-model="usuario.telefone"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card>
        <v-card class="mt-4 px-5">
          <v-layout row wrap>
            <v-text-field name="name" label="CEP" id="id" v-model="usuario.endereco.cep"></v-text-field>
          </v-layout>
          <v-layout row wrap>
            <v-flex md6>
              <v-text-field name="name" label="Rua" id="id" v-model="usuario.endereco.rua"></v-text-field>
            </v-flex>
            <v-flex md1>
            </v-flex>
            <v-flex md2>
              <v-text-field name="name" label="Numero" id="id" v-model="usuario.endereco.numero"></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md2>
              <v-text-field name="name" label="Complemento" id="id" v-model="usuario.endereco.complemento"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md6>
              <v-text-field name="name" label="Cidade" id="id" v-model="usuario.endereco.cidade"></v-text-field>
            </v-flex>
            <v-flex md1>
            </v-flex>
            <v-flex md5>
              <v-text-field name="name" label="Estado" id="id" v-model="usuario.endereco.estado"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card>
        <v-card class="mt-3 px-5">
          <v-layout row wrap>
            <v-flex md6>
              <v-text-field name="name" label="Username" id="id" v-model="usuario.username"></v-text-field>
            </v-flex>
            <v-flex md1>
            </v-flex>
            <v-flex md5>
              <v-text-field name="name" label="Senha" id="id" v-model="usuario.senha"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card>
        <v-layout row wrap justify-end>
          <v-btn color="success mt-3" @click="salvarUsuario()">Salvar</v-btn>
        </v-layout>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      usuario: {
        nome: '',
        cargo: '',
        cpf: '',
        telefone: '',
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
        axios.post('http://localhost:3000/salva-usuario', this.usuario).then(res => console.log(res.data))
      }
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
