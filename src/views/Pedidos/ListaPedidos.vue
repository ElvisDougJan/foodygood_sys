<template>
    <v-container grid-list-xs fluid>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-flex class="text-xs-left" xs6 lg6>
            <v-text-field v-model="search" append-icon="search" label="Pesquisar" single-line hide-details></v-text-field>
          </v-flex>
        </v-card-title>
        <v-data-table rows-per-page-text="Usuários por página" :headers="headers" :search="search" :items="pedidos"
          no-data-text="Não há conteúdo há ser exibido.">
          <template class="align-content-start" slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.numero_pedido }}</td>
            <td class="text-xs-right">{{ props.item.valor_total }}</td>
            <td class="text-xs-right">{{ props.item.forma_pagamento }}</td>
            <td class="text-xs-right">{{ props.item.mesas.numero }}</td>
            <td class="text-xs-right">{{ props.item.funcionario }}</td>
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
        <v-layout row wrap justify-space-between>
          <v-btn color="warning" :to="{ name: 'CadastroPedidos' }"">Voltar</v-btn>
          <v-btn color="success" class="mb-3 mr-3" @click="$router.push({name: 'CadastroPedidos'})">Novo produto</v-btn>
        </v-layout>
      </v-card>
    </v-container>
  </template>

  <script>
    import axios from 'axios'

    export default {
      data() {
        return {
          search: '',
          headers: [
            { text: "Numero do Pedido", value: "numero_pedido" },
            { text: "Valor Total", value: "valor_total" },
            { text: "Forma de pagamento", value: "forma_pagamento" },
            { text: "Mesas", value: "mesas.numero" },
            { text: "Funcionário", value: "funcionario" },
            { text: "Ações" }
          ],
          pedido: {
            numero_pedido: '',
            valor_total: '',
            forma_pagamento: '',
            mesas: {
              numero: 0
            },
            funcionario: ''
          },
          pedidos: []
        }
      },
      methods: {
        async consultaPedidos() {
          await axios.get(`${process.env.ROOT_API}pedidos`)
            .then(res => this.pedidos = res.data)
            .catch(err => console.error(`ERRO AO CONSULTAR PEDIDOS: ${err}`))
        },
        excluirProdutos(id) {
          axios.delete(`${process.env.ROOT_API}deleta-pedido/${id}`)
            .then(res => this.consultaPedidos())
            .catch(err => console.error(`ERRO AO EXCLUIR PEDIDO: ${err}`))
        }
      },
      async mounted() {
        await this.consultaPedidos()
      }
    }
  </script>
