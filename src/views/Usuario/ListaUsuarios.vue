<template>
  <v-container grid-list-xs fluid>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-flex class="text-xs-left" xs6 lg6>
          <v-text-field v-model="search" append-icon="search" label="Pesquisar" single-line hide-details></v-text-field>
        </v-flex>
      </v-card-title>
      <v-data-table rows-per-page-text="Usuários por página" :headers="headers" :items="usuarios" :search="search"
        no-data-text="Não há conteúdo há ser exibido.">
        <template class="align-content-start" slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.nome }}</td>
          <td class="text-xs-right">{{ props.item.documento }}</td>
          <td class="text-xs-right">{{ props.item.telefone }}</td>
          <td class="text-xs-right">{{ props.item.endereco }}</td>
          <td class="justify-center layout px-0">
            <v-tooltip top>
              <v-icon slot="activator" color="green" :to="{ name: 'CadastroUsuario' }" small class="mr-2 mt-3">
                save
              </v-icon>

              <span>Editar usuário</span>
            </v-tooltip>
            <v-tooltip top>
              <v-icon slot="activator" color="red" small class="mr-2 mt-3">
                delete
              </v-icon>
              <span>Apagar usuário?</span>
            </v-tooltip>
          </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Sua busca por "{{ search }}" não obteve resultados.
        </v-alert>
      </v-data-table>
      <v-layout row wrap justify-end>
        <v-btn color="success" class="mb-3 mr-3" @click="$router.push({ name: 'CadastroUsuario' })">Novo usuário</v-btn>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        headers: [
          { text: "Nome" },
          { text: "Documento" },
          { text: "Telefone" },
          { text: "Endereço" },
          { text: "Opções" }
          // {
          //   text: 'Dessert (100g serving)',
          //   align: 'left',
          //   sortable: false,
          //   value: 'name'
          // },
          // { text: 'Calories', value: 'calories' },
          // { text: 'Fat (g)', value: 'fat' },
          // { text: 'Carbs (g)', value: 'carbs' },
          // { text: 'Protein (g)', value: 'protein' },
          // { text: 'Iron (%)', value: 'iron' }
        ],
        usuarios: [
          {
            nome: 'Elvis',
            documento: '45646464646',
            telefone: '456465465464',
            endereco: 'rua 01'
          },
          {
            nome: 'Elvis',
            documento: '45646464646',
            telefone: '456465465464',
            endereco: 'rua 01'
          },
          {
            nome: 'Elvis',
            documento: '45646464646',
            telefone: '456465465464',
            endereco: 'rua 01'
          },
          {
            nome: 'Elvis',
            documento: '45646464646',
            telefone: '456465465464',
            endereco: 'rua 01'
          },
          {
            nome: 'Elvis',
            documento: '45646464646',
            telefone: '456465465464',
            endereco: 'rua 01'
          },
          {
            nome: 'Elvis',
            documento: '45646464646',
            telefone: '456465465464',
            endereco: 'rua 01'
          },
          {
            nome: 'Elvis',
            documento: '45646464646',
            telefone: '456465465464',
            endereco: 'rua 01'
          }
        ]
      }
    }
  }
</script>
