<template>
  <v-container grid-list-xs fluid>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-flex class="text-xs-left" xs6 lg6>
          <v-text-field v-model="search" append-icon="search" label="Pesquisar" single-line hide-details></v-text-field>
        </v-flex>
      </v-card-title>
      <v-data-table rows-per-page-text="Usuários por página" :headers="headers" :search="search" :items="usuarios"
        no-data-text="Não há conteúdo há ser exibido.">
        <template class="align-content-start" slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.nome }}</td>
          <td class="text-xs-right">{{ props.item.cpf_cnpj }}</td>
          <td class="text-xs-right">{{ props.item.telefone }}</td>
          <td class="text-xs-right">{{ props.item.tipo }}</td>
          <td class="justify-center layout px-0">
            <v-tooltip top>
              <v-btn slot="activator" fab small flat :to="{ name: 'CadastroUsuario', params: { id: props.item._id } }">
                <v-icon color="green">
                  save
                </v-icon>
              </v-btn>
              <span>Editar usuário</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn slot="activator" fab small flat>
                <v-icon color="red">
                  delete
                </v-icon>
              </v-btn>
              <span>Editar usuário</span>
            </v-tooltip>
          </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" outline icon="warning">
          Sua busca por "{{ search }}" não obteve resultados.
        </v-alert>
      </v-data-table>
      <v-layout row wrap justify-end>
        <v-btn color="success" class="mb-3 mr-3" @click="$router.push({name: 'CadastroUsuario'})">Novo usuário</v-btn>
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
          { text: "Nome", value: "nome" },
          { text: "Documento", value: "cpf_cnpj" },
          { text: "Telefone", value: "telefone" },
          { text: "Tipo", value: "tipo" },
          { text: "Ações" }
        ],
        usuario: {
          nome: '',
          cpf_cnpj: '',
          telefone: '',
          tipo: ''
        },
        usuarios: []
      }
    },
    methods: {
      async consultaUsuarios() {
        await axios.get(`${process.env.ROOT_API}usuarios`)
          .then(res => this.usuarios = res.data)
          .catch(err => console.warn(err))
      },
      teste(id) {
        alert(id)
      }
    },
    async mounted() {
      await this.consultaUsuarios()
    }
  }
</script>
