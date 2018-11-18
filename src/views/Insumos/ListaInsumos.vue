<template>
  <v-container grid-list-xs fluid>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-flex class="text-xs-left" xs6 lg6>
          <v-text-field v-model="search" append-icon="search" label="Pesquisar" single-line hide-details></v-text-field>
        </v-flex>
      </v-card-title>
      <v-data-table rows-per-page-text="Usuários por página" :headers="headers" :search="search" :items="insumos"
        no-data-text="Não há conteúdo há ser exibido.">
        <template class="align-content-start" slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.Descricao }}</td>
          <td class="text-xs-right">{{ props.item.Estoque }}</td>
          <td class="text-xs-right">{{ props.item.Unidade }}</td>
          <td class="text-xs-right">{{ props.item.Preco }}</td>
          <td class="justify-center layout px-0">
            <v-tooltip top>
              <v-btn slot="activator" fab small flat :to="{ name: 'CadastroInsumos', params: { id: props.item._id } }">
                <v-icon color="green">
                  save
                </v-icon>
              </v-btn>
              <span>Editar insumo</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn slot="activator" fab small flat @click="excluirInsumo(props.item._id)">
                <v-icon color="red">
                  delete
                </v-icon>
              </v-btn>
              <span>Excluir insumo</span>
            </v-tooltip>
          </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" outline icon="warning">
          Sua busca por "{{ search }}" não obteve resultados.
        </v-alert>
      </v-data-table>
      <v-layout row wrap justify-end>
        <v-btn color="success" class="mb-3 mr-3" @click="$router.push({name: 'CadastroInsumos'})">Novo insumo</v-btn>
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
          { text: "Descrição", value: "Descricao" },
          { text: "Estoque", value: "Estoque" },
          { text: "Unidade", value: "Unidade" },
          { text: "Preço", value: "Preco" },
          { text: "Ações" }
        ],
        insumo: {
          Descricao: '',
          Estoque: '',
          Unidade: '',
          Preco: ''
        },
        insumos: []
      }
    },
    methods: {
      async consultaInsumos() {
        await axios.get(`${process.env.ROOT_API}insumos`)
          .then(res => this.insumos = res.data)
          .catch(err => console.warn(err))
      },
      excluirInsumo(id) {
        axios.delete(`${process.env.ROOT_API}deleta-insumo/${id}`)
          .then(res => this.consultaInsumos())
          .catch(err => console.error(`ERRO AO EXCLUIR INSUMO: ${err}`))
      }
    },
    async mounted() {
      await this.consultaInsumos()
      console.log(this.insumos)
    }
  }
</script>
