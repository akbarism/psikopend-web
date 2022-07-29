<template>
  <div class="pa-3">
    <div class="d-flex justify-space-between">
      <h3>List Dosen Pengampu</h3>
      <div class="d-flex">
        <v-btn
          class="text-capitalize mr-3"
          depressed
          dark
          color="blue"
          @click="d_create = true"
          >Add Data</v-btn
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
          <template v-slot:[`item.featured_image`]="{ item }">
            <div v-if="item.foto">
              <v-avatar>
                <img :src="item.foto" alt="Avatar" />
              </v-avatar>
            </div>
          </template>

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
                    @click="updateItem(item)"
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
      <create-unggulan
        :d_create="d_create"
        @refetch="fetchData"
        @close="d_create = false"
        :width="d_width"
        :inventory="inventory"
        :type="d_type"
        :title="d_title"
      />
      <update-unggulan
        :d_update="d_update"
        @refetch="fetchData"
        @close="d_update = false"
        :width="d_width"
        :inventory="inventory"
        :type="d_type"
        :title="d_title"
      />
      <dialog-user
        :d_show="d_show"
        @close="d_show = false"
        @refetch="fetchData"
        :width="d_width"
        :inventory="inventory"
        :type="d_type"
        :title="d_title"
      />
      <viewImage
        :d_vimage="d_vimage"
        @close="d_vimage = false"
        :image="vimage"
      />
    </div>
  </div>
</template>

<script>
import DialogUser from "../user/dialogUser.vue";
import CreateUnggulan from "./createDosen.vue";
import UpdateUnggulan from "./updateDosen.vue";

export default {
  name: "manageUnggulan",
  components: {
    CreateUnggulan,
    DialogUser,
    UpdateUnggulan,
  },
  data() {
    return {
      id: 11,
      vimage: "",
      d_vimage: false,
      d_create: false,
      d_create: false,
      d_update: false,
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
          text: "",
          sortable: false,
          value: "featured_image",
        },
        {
          text: "NAMA DOSEN",
          align: "start",
          sortable: false,
          value: "judul",
        },
        {
          text: "Jabatan",
          sortable: false,
          value: "jabatan",
        },

        { text: "ACTION", sortable: false, value: "actions", cols: "action" },
      ],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    viewImage(foto) {
      this.vimage = foto;
      this.d_vimage = true;
    },
    updateUser(item) {
      this.$router.push(`/update-article/${item.id}`);
    },
    async fetchData() {
      this.loading = true;
      let data = {
        path: `pagelist?filter[kategori_id]=${this.id}&page[number]=${this.page}&page[size]=${this.limit}`,
      };
      try {
        let res = await this.$store.dispatch("getData", data);
        if (res.data.data.length) {
          this.dataSet = res.data.data;
          this.dataSet.forEach((el) => {
            let parsed = JSON.parse(el.konten);
            el["jabatan"] = parsed.jabatan ? parsed.jabatan : "";
            el["history"] = parsed.history.length ? parsed.history : [];
          });
        }
        this.loading = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },

    updateItem(item) {
      this.inventory = {
        id: item.id,
        judul: item.judul,
        konten: {
          jabatan: item.jabatan,
          history: item.history,
        },
        featured_image: null,
        picture: item.foto,
        status_id: 2,
        kategori_id: this.id,
      };
      this.d_update = true;
    },

    deleteItem(item) {
      this.d_type = "d_user";
      this.d_title = "";
      this.d_width = "300px";
      this.inventory = {
        path: `pagelist?id=${item.id}`,
        method: "deleteData",
      };
      this.d_show = true;
    },
  },
};
</script>

<style></style>
