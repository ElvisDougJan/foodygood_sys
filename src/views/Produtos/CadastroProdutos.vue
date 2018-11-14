<template>
  <v-container>
    <v-card>
      <v-toolbar color="amber lighten-1">
        <v-card-text class="headline">
          <span style="color:white">CADASTRO DE PRODUTOS</span>
        </v-card-text>
      </v-toolbar>
      <v-card class="pa-3">
        <v-card class="px-5">
          <v-layout row wrap>
            <v-flex md5>
              <v-text-field label="Preco" id="id" type="number" v-model="produto.preco"></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md5>
              <v-text-field label="Estoque" id="id" type="number" v-model="produto.estoque"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md5>
              <v-autocomplete label="Tipo" id="id" v-model="produto.tipo" :items="tipos"></v-autocomplete>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md5>
              <v-autocomplete label="Unidade" id="id" v-model="produto.unidade" :items="unidades"></v-autocomplete>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md12>
              <v-textarea label="Descricao" id="id" v-model="produto.descricao"></v-textarea>
            </v-flex>
          </v-layout>
        </v-card>
        <v-layout row wrap justify-end>
          <v-btn color="success mt-3" @click="salvarProduto()">Salvar</v-btn>
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
        preco: '',
        tipo: '',
        estoque: '',
        unidade: '',
        descricao: ''
      },
      unidades: ['Kilo', 'Unidade', 'Gramas', 'Litro', 'Mililitros'],
      tipos: ['Prato principal', 'Sobremesa', 'Bebida']
    }),
    methods: {
      salvarProduto() {
        axios.post('http://localhost:3000/salva-produto', this.produto).then(res => console.log(res.data))
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
