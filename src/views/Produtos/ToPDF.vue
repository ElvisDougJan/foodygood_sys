<template>
  <div>
    <div id="teste">
      <h1>TESTE</h1>
    </div>
    <input type="submit" value="button" @click="exportarPDF">TESTE
  </div>
  <!-- <v-data-table
    rows-per-page-text="Usuários por página"
    :headers="headers"
    :search="search"
    :items="produtos"
    no-data-text="Não há conteúdo há ser exibido."
  >
    <template class="align-content-start" slot="items" slot-scope="props">
      <td class="text-xs-right">{{ props.item.Descricao }}</td>
      <td class="text-xs-right">{{ props.item.Estoque }}</td>
      <td class="text-xs-right">{{ props.item.Unidade }}</td>
      <td class="text-xs-right">{{ props.item.Preco }}</td>
      <td class="text-xs-right">{{ props.item.Tipo }}</td>
      <td class="justify-center layout px-0">
        <v-tooltip top>
          <v-btn
            slot="activator"
            fab
            small
            flat
            :to="{ name: 'CadastroProdutos', params: { id: props.item._id } }"
          >
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
    <v-alert
      slot="no-results"
      :value="true"
      color="error"
      outline
      icon="warning"
    >Sua busca por "{{ search }}" não obteve resultados.</v-alert>
  </v-data-table>-->
</template>

<script>
import * as html2canvas from "@/utils/html2canvas.min.js";
import * as jsPdf from "jspdf";

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
      html2canvas(document.getElementById("teste"), {
        onrendered: function(canvas) {
          let img = canvas.toDataURL("image/png");
          let doc = new jspdf();
          doc.addImage(img, "JPEG", 20, 20);
          doc.save("teste.pdf");
        }
      });
      let doc = new jspdf();
      doc.save("listaProdutos.pdf");
    }
  },
  async mounted() {
    await this.consultaProdutos();
  }
};
</script>

