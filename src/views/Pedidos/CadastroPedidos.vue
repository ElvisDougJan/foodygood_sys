<template>
  <v-container>
    <v-card>
      <v-toolbar color="amber lighten-1">
        <v-card-text class="headline">
          <span style="color:white">CADASTRO DE PEDIDOS</span>
        </v-card-text>
      </v-toolbar>
      <v-card class="pa-3">
        <v-layout row wrap class="justify-center">
          <v-card v-for="(item, index) in mesas" :key="index" width="150" height="280" class="ma-2">
            <v-card-title class="justify-center titulo-card">
              MESA Nº
            </v-card-title>
            <v-layout row wrap>
              <v-card-text class="numero-mesa">
                <button style="font-size: 80px;" @click="adicionaPedido()">{{item}}</button>
              </v-card-text>
            </v-layout>
            <v-layout row wrap>
              <v-card-text>
                <b>Quantidade de pedidos:</b> 15
              </v-card-text>
            </v-layout>
          </v-card>
        </v-layout>
        <v-layout row wrap justify-space-between>
          <v-btn color="success mt-3" :to="{ name: 'ListaPedidos' }">Visualizar pedidos em modo lista</v-btn>
          <v-btn color="success mt-3" @click="adicionarMesa()">Adicionar mesa</v-btn>
        </v-layout>
      </v-card>
    </v-card>
    <v-dialog v-model="dialog" scrollable persistent :overlay="false" width="800px" height="800px" transition="dialog-transition">
      <v-card>
        <v-toolbar color="principal">
          <v-layout row wrap class="justify-center">
            <v-card-title primary-title class="headline">
              <span style="color: white">NOVO PEDIDO</span>
            </v-card-title>
          </v-layout>
        </v-toolbar>
        <v-card flat class="px-5">
          <v-layout row wrap>
            <v-flex md5 xs12>
              <v-text-field name="name" label="Numero do pedido" type="number" id="id"></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md5 xs12>
              <v-text-field name="name" label="Valor total" type="number" id="id"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md5 xs12>
              <v-text-field name="name" label="CPF" type="number" id="id"></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md5 xs12>
              <v-text-field name="name" label="Funcionario responsável" id="id"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card>
        <v-layout row wrap justify-space-between>
          <v-btn color="error" @click="fecharDialog()">Voltar</v-btn>
          <v-btn color="success" @click="salvarPedido()">Salvar pedido</v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      mesas: [],
      dialog: false
    }),
    methods: {
      adicionaPedido() {
        console.log('Clicou')
        this.dialog = true
      },

      fecharDialog() {
        this.dialog = false
      },

      adicionarMesa() {
        this.mesas.push(this.mesas.length + 1)
      },

      async consultaMesas() {
        await axios.get(`${process.env.ROOT_API}mesas`)
          .then(res => res.data.forEach(mesa => this.mesas.push(mesa.numero)))
          .catch(err => console.error(`ERRO AO CONSULTAR MESAS: ${err}`))
      }
    },
    mounted() {
      this.consultaMesas()
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

  .titulo-card {
    background-color: #FFCA28;
  }

  .numero-mesa {
    background-color: rgb(64, 202, 10);
    color: #FFF;
    display: flex;
    justify-content: center;
  }

  .numero-mesa:hover {
    background-color: #FFCA28;
    color: #000;
    display: flex;
    justify-content: center;
  }

  button:focus,
  button:active {
    outline: none;
  }
</style>
