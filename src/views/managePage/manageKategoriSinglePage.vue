<template>
  <div class="pa-3">
    <div class="d-flex justify-space-between">
      <h3>List Category Page</h3>
      <v-btn
        class="text-capitalize"
        depressed
        dark
        color="blue"
        @click="createData"
        >Add Category</v-btn
      >
    </div>
    <div class="d-flex justify-center" style="width: 100%">
      <v-card class="pa-3 mt-3" outlined width="60%">
        <v-skeleton-loader
          type="table-tbody"
          v-if="loading"
        ></v-skeleton-loader>
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
    </div>
    <div class="pa-3">
      <dialog-user
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
import DialogUser from "../user/dialogUser.vue";
export default {
  name: "manageKategori",
  components: {
    DialogUser,
  },
  data() {
    return {
      d_show: false,
      d_type: null,
      d_width: "500px",
      d_title: "",
      loading: false,
      inventory: null,
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
          text: "Nama",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "ACTION", sortable: false, value: "actions", cols: "action" },
      ],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      let data = {
        path: `kategori?page[number]=${this.page}&page[size]=${this.limit}&filter[name]=${this.find}`,
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
    createData() {
      this.d_type = "c_user";
      this.d_title = "Create Category";
      this.d_width = "500px";

      this.inventory = {
        path: "kategori",
        method: "postData",
        field: [
          {
            name: "Nama Kategori",
            key: "name",
            type: "text",
          },
          {
            name: "Deskripsi",
            key: "desc",
            type: "text",
          },
        ],
        body: {
          name: "",
          desc: "",
        },
      };
      this.d_show = true;
    },
    updateUser(item) {
      this.d_type = "c_user";
      this.d_title = "Update Category";
      this.d_width = "500px";
      this.inventory = {
        path: "kategori",
        method: "putData",
        field: [
          {
            name: "Nama Kategori",
            key: "name",
            type: "text",
          },
          {
            name: "Deskripsi",
            key: "desc",
            type: "text",
          },
        ],
        body: {
          id: item.id,
          desc: item.desc,
          name: item.name,
        },
      };
      this.d_show = true;
    },
    deleteItem(item) {
      this.d_type = "d_user";
      this.d_title = "";
      this.d_width = "300px";
      this.inventory = {
        path: `kategori?id=${item.id}`,
        method: "deleteData",
      };
      this.d_show = true;
    },
  },
};
</script>

<style></style>
