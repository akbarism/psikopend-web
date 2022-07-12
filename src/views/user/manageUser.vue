<template>
  <div class="pa-3">
    <div class="d-flex justify-space-between">
      <h3>List User</h3>
      <v-btn
        class="text-capitalize"
        depressed
        dark
        color="blue"
        @click="createUser"
        >Add User</v-btn
      >
    </div>
    <v-card class="pa-3 mt-3" outlined>
      <v-skeleton-loader type="table-tbody" v-if="loading"></v-skeleton-loader>
      <div v-if="dataSet.length && !loading">
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
import DialogUser from "./dialogUser.vue";
export default {
  name: "manageUser",
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
          text: "NAMA LENGKAP",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "EMAIL",
          sortable: false,
          value: "email",
        },
        {
          text: "USERNAME",
          sortable: false,
          value: "username",
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
        path: `user?page[number]=${this.page}&page[size]=${this.limit}&filter[nama]=${this.find}`,
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
    createUser() {
      this.d_type = "c_user";
      this.d_title = "Create User";
      this.inventory = {
        path: "user",
        method: "postData",
        field: [
          {
            name: "Username",
            key: "username",
            type: "text",
          },
          {
            name: "Password",
            key: "password",
            type: "text",
          },
          {
            name: "Email",
            key: "email",
            type: "text",
          },
          {
            name: "Nama Lengkap",
            key: "nama",
            type: "text",
          },
          {
            name: "No Telp.",
            key: "no_telp",
            type: "text",
          },
          {
            name: "Angkatan",
            key: "angkatan",
            type: "text",
          },
        ],
        body: {
          username: "",
          password: "",
          email: "",
          nama: "",
          no_telp: "",
          angkatan: "",
        },
      };
      this.d_show = true;
    },
    updateUser(item) {
      this.d_type = "c_user";
      this.d_title = "Update User";
      this.field.splice(0, 2);
      this.inventory = {
        path: "user",
        method: "putData",
        field: [
          {
            name: "Email",
            key: "email",
            type: "text",
          },
          {
            name: "Nama Lengkap",
            key: "nama",
            type: "text",
          },
          {
            name: "No Telp.",
            key: "no_telp",
            type: "text",
          },
          {
            name: "Angkatan",
            key: "angkatan",
            type: "text",
          },
        ],
        body: {
          user_id: item.id,
          // username: item.username,
          email: item.email,
          nama: item.profile?.nama,
          no_telp: item.profile?.no_telp,
          angkatan: item.profile?.angkatan,
        },
      };
      this.d_show = true;
    },
    deleteItem(item) {
      this.d_type = "d_user";
      this.d_title = "";
      this.d_width = "300px";
      this.inventory = {
        path: `user?user_id=${item.id}`,
        method: "deleteData",
      };
      this.d_show = true;
    },
  },
};
</script>

<style></style>
