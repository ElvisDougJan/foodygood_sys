<template>
  <v-container grid-list-xs fluid>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-flex class="text-xs-left" xs6 lg6>
          <v-text-field v-model="search" append-icon="search" label="Pesquisar" single-line hide-details></v-text-field>
        </v-flex>
      </v-card-title>
      <v-data-table rows-per-page-text="Usuários por página" :headers="headers" :search="search" :items="produtos"
        no-data-text="Não há conteúdo há ser exibido.">
        <template class="align-content-start" slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.Descricao }}</td>
          <td class="text-xs-right">{{ props.item.Estoque }}</td>
          <td class="text-xs-right">{{ props.item.Unidade }}</td>
          <td class="text-xs-right">{{ props.item.Preco }}</td>
          <td class="text-xs-right">{{ props.item.Tipo }}</td>
          <td class="justify-center layout px-0">
            <v-tooltip top>
              <v-btn slot="activator" fab small flat :to="{ name: 'CadastroProdutos', params: { id: props.item._id } }">
                <v-icon color="green">save</v-icon>
              </v-btn>
              <span>Editar produto</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn slot="activator" fab small flat @click="excluirProdutos(props.item._id)">
                <v-icon color="red">delete</v-icon>
              </v-btn>
              <span>Excluir produto</span>
            </v-tooltip>
          </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" outline icon="warning">Sua busca por "{{ search }}" não
          obteve resultados.</v-alert>
      </v-data-table>
      <v-layout row wrap justify-space-between>
        <v-btn color="success" class="mb-3 mr-3" @click="exportarPDF">Salvar para PDF</v-btn>
        <v-btn color="success" class="mb-3 mr-3" @click="$router.push({name: 'CadastroProdutos'})">Novo produto</v-btn>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
  import axios from "axios";
  import jsPDF from '@/utils/jsPDF-autotable'
  import autoTable from "@/utils/jsPDF"

  export default {
    data() {
      return {
        search: "",
        headers: [
          { text: "Descrição", value: "Descricao" },
          { text: "Estoque", value: "Estoque" },
          { text: "Unidade", value: "Unidade" },
          { text: "Preço", value: "Preco" },
          { text: "Tipo", value: "Tipo" },
          { text: "Ações" }
        ],
        produto: {
          Descricao: "",
          Estoque: "",
          Unidade: "",
          Tipo: "",
          Preco: ""
        },
        produtos: []
      };
    },
    methods: {
      async consultaProdutos() {
        await axios
          .get(`${process.env.ROOT_API}produtos`)
          .then(res => (this.produtos = res.data))
          .catch(err => console.error(`ERRO AO CONSULTAR PRODUTOS: ${err}`));
      },
      excluirProdutos(id) {
        axios
          .delete(`${process.env.ROOT_API}deleta-produto/${id}`)
          .then(res => this.consultaProdutos())
          .catch(err => console.error(`ERRO AO EXCLUIR PRODUTO: ${err}`));
      },
      exportarPDF() {
        console.log(this.produtos)
        let doc = new jsPDF('portrait', 'pt', 'a4');
        let columns = [{ title: 'Descrição', datakey: 'Descricao' }]
        doc.autoTable(columns, this.produtos)
        doc.save("listaProdutos.pdf");
      }
    },
    async mounted() {
      await this.consultaProdutos();
    }
  };
</script>
