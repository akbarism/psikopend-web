<template>
  <div class="pa-3">
    <div class="d-flex justify-space-between">
      <h3>List Article</h3>
      <div class="d-flex">
        <v-btn
          class="text-capitalize mr-3"
          depressed
          dark
          color="blue"
          to="/create-article"
          >Add Article</v-btn
        >
        <v-btn
          class="text-capitalize"
          depressed
          dark
          color="blue"
          to="/category-article-management"
          >Manage Category</v-btn
        >
      </div>
    </div>
    <v-card class="pa-3 mt-3" outlined>
      <v-skeleton-loader type="table-tbody" v-if="loading"></v-skeleton-loader>
      <div v-if="dataSet && !loading">
        <v-data-table
          :headers="headers"
          :items="dataSet"
          :page.sync="page"
          :items-per-page="limit"
          class="elevation-0 color_txt"
          hide-default-footer
          :single-select="false"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    x-small
                    depressed
                    color="blue"
                    dark
                    class="text-capitalize"
                    v-bind="attrs"
                    v-on="on"
                    @click="updateUser(item)"
                  >
                    <v-icon small dark>mdi-pencil </v-icon>
                  </v-btn>
                </template>
                <span>Edit Data</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    x-small
                    depressed
                    color="red"
                    dark
                    class="ml-2 text-capitalize"
                    v-bind="attrs"
                    v-on="on"
                    @click="deleteItem(item)"
                  >
                    <v-icon dark> mdi-delete </v-icon>
                  </v-btn>
                </template>
                <span>Delete Data</span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <div class="pa-3">
      <DialogArticle
        :d_show="d_show"
        @refetch="fetchData"
        @close="d_show = false"
        :width="d_width"
        :inventory="inventory"
        :type="d_type"
        :title="d_title"
      />
    </div>
  </div>
</template>

<script>
import DialogArticle from "./dialogArticle.vue";

export default {
  name: "manageArticle",
  components: {
    DialogArticle,
  },
  data() {
    return {
      d_show: false,
      d_type: null,
      d_width: "500px",
      d_title: "",
      inventory: null,
      loading: false,
      page: 1,
      limit: 10,
      find: "",
      dataSet: [],
      headers: [
        {
          text: "ID",
          align: "start",
          value: "id",
        },
        {
          text: "JUDUL",
          align: "start",
          sortable: false,
          value: "judul",
        },
        {
          text: "DESKRIPSI PENDEK",
          sortable: false,
          value: "deskripsi_pendek",
        },
        {
          text: "COVER",
          sortable: false,
          value: "featured_image",
        },
        { text: "ACTION", sortable: false, value: "actions", cols: "action" },
      ],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    updateUser(item) {
      this.$router.push(`/update-article/${item.id}`);
    },
    async fetchData() {
      this.loading = true;
      let data = {
        path: `artikel?page[number]=${this.page}&page[size]=${this.limit}&filter[judul]=${this.find}`,
      };
      try {
        let res = await this.$store.dispatch("getData", data);
        console.log(res);
        this.dataSet = res.data.data;
        this.loading = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },

    deleteItem(item) {
      this.d_type = "delete";
      this.d_title = "";
      this.d_width = "300px";
      this.inventory = {
        path: `artikel?id=${item.id}`,
        method: "deleteData",
      };
      this.d_show = true;
    },
  },
};
</script>

<style></style>
