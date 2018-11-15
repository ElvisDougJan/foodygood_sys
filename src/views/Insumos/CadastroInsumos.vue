<template>
  <v-container>
    <v-card>
      <v-toolbar color="amber lighten-1">
        <v-card-text class="headline">
          <span style="color:white">CADASTRO DE INSUMO</span>
        </v-card-text>
      </v-toolbar>
      <v-card class="pa-3">
        <v-card class="px-5">
          <v-layout row wrap>
            <v-flex md2 xs12>
              <v-text-field name="name" label="Estoque" type="number" id="id" v-model="insumo.estoque"></v-text-field>
            </v-flex>
            <v-flex md1>
            </v-flex>
            <v-flex md2 xs12>
              <v-text-field name="name" label="Unidade" id="id" v-model="insumo.unidade"></v-text-field>
            </v-flex>
            <v-flex md1>
            </v-flex>
            <v-flex md6 xs12>
              <v-text-field name="name" label="Preco" type="textarea" id="id" v-model="insumo.preco"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md12 xs12>
              <v-textarea name="name" label="Descricao" id="id" v-model="insumo.descricao"></v-textarea>
            </v-flex>
          </v-layout>
        </v-card>
        <v-layout row wrap justify-end>
          <v-btn color="success mt-3" @click="salvarInsumo()">Salvar</v-btn>
        </v-layout>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      insumo: {
        estoque: '',
        unidade: '',
        preco: '',
        descricao: ''
      }
    }),
    methods: {
      salvarInsumo() {
        axios.post('http://localhost:3000/salva-insumo', this.insumo).then(res => console.log(res.data))
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
