<template>
  <v-row justify="start">
    <v-dialog
      v-model="d_create"
      max-width="800px"
      persistent
      scrollable
      @keydown.esc="$emit('close')"
    >
      <v-card class="rounded_max hide_overflow" flat>
        <v-toolbar dense flat>
          <h3>{{ title }}</h3>
          <v-spacer></v-spacer>
          <v-btn fab x- small depressed @click="$emit('close')"
            ><v-icon small>mdi-close</v-icon></v-btn
          >
        </v-toolbar>
        <v-card-text class="px-2 pb-0">
          <v-container style="height: max-content">
            <div class="mb-3">
              <div
                v-if="!picture"
                class="temp_cover d-flex justify-center align-center"
                @click="$refs.file.click()"
              >
                <v-icon>mdi-plus</v-icon> Pilih Foto
                <input
                  type="file"
                  ref="file"
                  @change="uploadImage($event)"
                  accept="image/*"
                  class="input_hide"
                />
              </div>
              <div v-else>
                <img :src="picture" class="cover_pic" alt="" />
                <v-btn
                  color="blue"
                  class="text-capitalize"
                  @click="picture = null"
                  depressed
                  dark
                  >cancel</v-btn
                >
              </div>
            </div>
            <v-text-field
              label="Nama Dosen"
              v-model="form.judul"
              class="mb-3"
              outlined
              background-color="white"
              dense
              hide-details
            ></v-text-field>
            <v-textarea
              label="Deskripsi"
              outlined
              background-color="white"
              dense
              hide-details
              v-model="form.konten"
            ></v-textarea>
            <div class="py-3">
              <v-btn color="purple" dark block v-if="!loading" @click="postData"
                >Simpan</v-btn
              >
              <v-btn color="purple" dark block v-if="loading">Loading...</v-btn>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "dialogComponent",
  props: ["d_create", "type", "title", "inventory", "width"],
  data() {
    return {
      loading: false,
      picture: null,
      alert: false,
      form: {
        judul: "",
        konten: "",
        featured_image: null,
        status_id: 2,
        kategori_id: "11",
      },
    };
  },
  methods: {
    closeAndFetch() {
      this.$emit("refetch");
      this.$emit("close");
    },
    uploadImage(e) {
      const file = e.target.files[0];
      if (file.size > 250000) {
        this.alert = true;
        this.$toast.error("Foto tidak boleh lebih dari 2mb!");
      } else {
        const fr = new FileReader();
        fr.onload = (f) => {
          this.picture = f.target.result;
        };
        fr.readAsDataURL(file);
        this.form.featured_image = file;
      }
    },
    async postData() {
      this.loading = true;
      let body = new FormData();
      for (let key in this.form) {
        if (this.form[key]) {
          body.append(key, this.form[key]);
        }
      }
      const data = {
        body: body,
        path: "pagelist",
      };
      try {
        const res = await this.$store.dispatch("postData", data);
        if (res) {
          this.closeAndFetch();
          this.picture = null;
          this.form.judul = "";
          this.form.konten = "";
          this.form.featured_image = null;
        }
        this.loading = false;
      } catch (err) {
        const e = err.response.data;
        if (e.data) {
          var key = Object.keys(e.data);
          var values = Object.values(e.data);
          for (let i = 0; i < key.length; i++) {
            for (let j = 0; j < values[i].length; j++) {
              this.$toast.error(values[i][j]);
            }
          }
        } else {
          this.$toast.error("Error Server");
        }
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.temp_cover {
  width: 250px;
  height: 250px;
  border: 1px dashed #000;
  cursor: pointer;
  background: #fff;
}
.cover_pic {
  width: 250px;
  height: 250px;
  object-fit: cover;
}
</style>
