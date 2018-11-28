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
                <button style="font-size: 80px;" @click="visualizarPedidosMesa(item._id, item.numero)">{{ item.numero
                  }}</button>
              </v-card-text>
            </v-layout>
            <v-layout row wrap>
              <v-card-text>
                <b>Quantidade de pedidos:</b> {{ item.numero }}
              </v-card-text>
            </v-layout>
          </v-card>
        </v-layout>
        <v-layout row wrap justify-space-between>
          <v-btn class="mt-3" :to="{ name: 'ListaPedidos' }">Visualizar pedidos em modo lista</v-btn>
          <v-btn color="success" class="mt-3" @click="dialogNovaMesa = true">Adicionar mesa</v-btn>
        </v-layout>
      </v-card>
    </v-card>
    <v-dialog v-model="dialog" scrollable persistent :overlay="false" width="800px" height="800px" transition="dialog-transition">
      <v-card>
        <v-toolbar color="principal">
          <v-layout row wrap class="justify-center">
            <v-card-title primary-title class="headline">
              <span style="color: white">NOVO PEDIDO DA MESA {{ numeroMesaEscolhida }}</span>
            </v-card-title>
          </v-layout>
        </v-toolbar>
        <v-card flat class="px-5">
          <v-layout row wrap>
            <v-flex md5 xs12>
              <v-text-field label="Numero do pedido" type="number" v-model="pedido.numero_pedido"></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md5 xs12>
              <v-text-field label="Valor total" type="number" v-model="pedido.valor_total"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md12 xs12>
              <v-select :items="['Cartão de crédito', 'Cartão de débito', 'Dinheiro']" v-model="pedido.forma_pagamento"
                label="Forma de pagamento"></v-select>
            </v-flex>
            <!-- <v-spacer></v-spacer> -->
            <!-- <v-flex md5 xs12>
              <v-text-field label="Funcionario responsável" v-model="pedido.usuarios"></v-text-field>
            </v-flex> -->
          </v-layout>
        </v-card>
        <v-layout row wrap justify-space-between>
          <v-btn color="error" @click="fecharDialog()">Voltar</v-btn>
          <v-btn color="success" @click="salvarPedido()">Salvar pedido</v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogNovaMesa" scrollable persistent :overlay="false" width="410px" transition="dialog-transition">
      <v-card>
        <v-layout row wrap justify-center>
          <v-card-title primary-title>
            <v-layout row wrap justify-center>
              <span style="font-size: 18px">{{ mensagemDialogMesa }}</span>
              <v-text-field v-if="numeroNovaMesa" v-model="mesa.numero" label="Nº nova mesa"></v-text-field>
            </v-layout>
          </v-card-title>
        </v-layout>
        <v-card-actions>
          <v-layout row wrap justify-space-between>
            <v-btn color="warning" @click="fecharDialogMesa()">{{ botaoEsquerdoDialogMesa }}</v-btn>
            <v-btn color="success" @click="novoNumeroMesa()">{{ botaoDireitoDialogMesa }}</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogListaPedidos" scrollable persistent width="900px" transition="dialog-transition">
      <v-card>
        <v-toolbar color="amber lighten-1">
          <v-layout row wrap justify-center>
            <span style="font-size: 18px">Lista de pedidos da mesa {{ numeroMesaEscolhida }}</span>
            <v-text-field v-if="numeroNovaMesa" v-model="mesa.numero" label="Nº nova mesa"></v-text-field>
          </v-layout>
        </v-toolbar>
        <v-card-actions>
          <v-data-table rows-per-page-text="Usuários por página" :headers="headers" :search="search" :items="listaPedidosDaMesa"
            no-data-text="Não há conteúdo há ser exibido.">
            <template class="align-content-start" slot="items" slot-scope="props">
              <td class="text-xs-right">{{ props.item.numero_pedido }}</td>
              <td class="text-xs-right">{{ props.item.valor_total }}</td>
              <td class="text-xs-right">{{ props.item.forma_pagamento }}</td>
              <td class="text-xs-right">{{ props.item.mesas.numero }}</td>
              <!-- <td class="text-xs-right">{{ props.item.usuarios.nome }}</td> -->
              <td class="justify-center layout px-0">
                <v-tooltip top>
                  <v-btn slot="activator" fab small flat :to="{ name: 'CadastroPedidos', params: { id: props.item._id } }">
                    <v-icon color="green">
                      save
                    </v-icon>
                  </v-btn>
                  <span>Editar produto</span>
                </v-tooltip>
                <v-tooltip top>
                  <v-btn slot="activator" fab small flat @click="excluirPedidos(props.item._id)">
                    <v-icon color="red">
                      delete
                    </v-icon>
                  </v-btn>
                  <span>Excluir produto</span>
                </v-tooltip>
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" outline icon="warning">
              Sua busca por "{{ search }}" não obteve resultados.
            </v-alert>
          </v-data-table>
        </v-card-actions>
        <v-layout row wrap justify-space-between>
          <v-btn color="warning" @click="fecharDialogListaPedido()">{{ botaoEsquerdoDialogMesa }}</v-btn>
          <v-btn color="success" @click="dialogListaPedidos = false, adicionaPedido()">{{ botaoDireitoDialogMesa }}</v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" color="black" bootom right :timeout="5000">
      <span style="color: #FFEE58">Pedido adicionado!</span>
      <v-btn color="white" flat @click="snackbar = false">
        OK
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      snackbar: false,
      search: '',
      mesas: [],
      dialog: false,
      dialogNovaMesa: false,
      botaoEsquerdoDialogMesa: 'Não',
      botaoDireitoDialogMesa: 'Sim',
      numeroNovaMesa: false,
      mensagemDialogMesa: 'CONFIRMA A ADIÇÃO DE UMA NOVA MESA?',
      mesa: {
        numero: '',
        pedidos: ''
      },
      pedido: {
        numero_pedido: '',
        valor_total: '',
        forma_pagamento: '',
        usuarios: '',
        mesas: ''
      },
      numeroMesaEscolhida: 0,
      dialogListaPedidos: false,
      listaPedidosDaMesa: [],
      listaPedidos: [],
      headers: [
        { text: "Numero do Pedido", value: "numero_pedido" },
        { text: "Valor Total", value: "valor_total" },
        { text: "Forma de pagamento", value: "forma_pagamento" },
        { text: "Mesas", value: "mesas.numero" },
        // { text: "Funcionário", value: "funcionario" },
        { text: "Ações" }
      ],
      idMesaEscolhida: ''
    }),
    methods: {
      async visualizarPedidosMesa(id, numeroMesa) {
        await this.ConsultaPedidos()

        this.listaPedidosDaMesa = []
        this.listaPedidos.find(pedido => {
          pedido.mesas.numero === numeroMesa
            ? this.listaPedidosDaMesa.push(pedido)
            : null
        })
        this.dialogListaPedidos = true
        this.botaoDireitoDialogMesa = 'Novo pedido'
        this.botaoEsquerdoDialogMesa = 'Voltar'
        this.numeroMesaEscolhida = numeroMesa
        this.idMesaEscolhida = id
      },

      adicionaPedido() {
        this.dialog = true
        this.pedido.mesas = this.idMesaEscolhida
        // this.pedido.mesas = id
        // this.numeroMesaEscolhida = numeroMesa
      },

      fecharDialog() {
        this.pedido = {
          numero_pedido: '',
          valor_total: '',
          forma_pagamento: '',
          usuarios: '',
          mesas: ''
        }
        this.dialog = false
      },

      adicionarMesa() {
        this.mesas.push(this.mesas.length + 1)
      },

      novoNumeroMesa() {
        this.numeroNovaMesa = true
        this.mensagemDialogMesa = 'QUAL O NÚMERO DA NOVA MESA?'
        this.botaoEsquerdoDialogMesa = 'Cancelar'
        this.botaoDireitoDialogMesa = 'Salvar'
      },

      fecharDialogMesa() {
        this.dialogNovaMesa = false
        this.numeroNovaMesa = false
        this.mensagemDialogMesa = 'CONFIRMA A ADIÇÃO DE UMA NOVA MESA?'
        this.botaoEsquerdoDialogMesa = 'Não'
        this.botaoDireitoDialogMesa = 'Sim'
      },

      fecharDialogListaPedido() {
        this.dialogListaPedidos = false
      },

      async consultaMesas() {
        await axios.get(`${process.env.ROOT_API}mesas`)
          .then(res => res.data.forEach(mesa => this.mesas.push(mesa)))
          .catch(err => console.error(`ERRO AO CONSULTAR MESAS: ${err}`))
      },

      async ConsultaPedidos() {
        await axios.get(`${process.env.ROOT_API}pedidos`)
          .then(res => this.listaPedidos = res.data)
          .catch(err => console.error(`ERRO AO CONSULTAR OS PEDIDOS: ${err}`))
      },

      async verificaPedidosMesa() {
        this.mesas.forEach(mesa => {
          this.listaPedidos.find(pedido => {
            pedido.mesas.numero === mesa.numero
              ? this.listaPedidosDaMesa.push(pedido)
              : null
          })
        })
      },

      async salvarPedido() {
        await axios.post(`${process.env.ROOT_API}salva-pedido`, this.pedido)
          .then(async res => {
            this.dialog = false
            this.snackbar = true
            let mesas = {
              numero: this.numeroMesaEscolhida,
              pedidos: {
                numero_pedido: this.pedido.numero_pedido,
                valor_total: this.pedido.valor_total,
                forma_pagamento: this.pedido.forma_pagamento,
                usuarios: this.pedido.usuarios
              }
            }
            await axios.put(`${process.env.ROOT_API}atualiza-mesa/${this.pedido.mesas}`, mesas)
              .then(res => console.log(res.data))
              .catch(err => console.error(`ERRO AO SALVAR MESA DO PEDIDO: ${err}`))

          })
          .catch(err => console.error(`EROO AO SALVAR PEDIDO: ${err}`))
      }
    },
    async mounted() {
      await this.consultaMesas()
      await this.ConsultaPedidos()
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
