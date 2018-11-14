<template>
  <v-container>
    <v-card>
      <v-toolbar color="amber lighten-1">
        <v-card-text class="headline">
          <span style="color:white">CADASTRO DE MESAS</span>
        </v-card-text>
      </v-toolbar>
      <v-card class="pa-3">
        <v-layout row wrap class="justify-center">
          <v-card v-for="(item, index) in mesas" :key="index" width="150" height="200" class="ma-2">
            <v-card-title class="justify-center titulo-card">
              MESA Nº
            </v-card-title>
            <v-card-text class="numero-mesa">
              <span style="font-size: 80px">{{item}}</span>
            </v-card-text>
          </v-card>
        </v-layout>
        <v-layout row wrap justify-end>
          <v-btn color="success mt-3" @click="">Salvar</v-btn>
        </v-layout>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      mesas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }),
    methods: {}
  }

</script>

<style>
  .line2 {
    border: 0;
    height: 1px;
    background: #333;
    background-image: linear-gradient(to right, #ccc, #333, #ccc);
  }

  .titulo-card {
    background-color: #FFCA28;
  }

  .numero-mesa {
    background-color: rgb(64, 202, 10);
    color: #FFF;
    display: flex;
    justify-content: center
  }
</style>
