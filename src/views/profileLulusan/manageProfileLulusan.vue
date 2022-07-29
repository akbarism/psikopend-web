<template>
  <div class="px-3">
    <h3 class="mb-5">Profile Lulusan</h3>
    <div class="d-flex justify-center">
      <div style="width: 70%" v-if="dataSet">
        <div class="mb-3">
          <div
            v-if="!picture"
            class="temp_cover d-flex justify-center align-center"
            @click="$refs.file.click()"
          >
            <v-icon>mdi-plus</v-icon> Pilih Cover
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
        <div class="pb-3">
          <v-text-field
            label="Judul Artikel"
            v-model="form.judul"
            outlined
            background-color="white"
            dense
            hide-details
          ></v-text-field>
        </div>
        <v-card flat>
          <vue-editor
            id="editor"
            class="white"
            :useCustomImageHandler="true"
            @image-added="handleImageAdded"
            placeholder="Isi Artikel"
            v-model="form.konten"
          ></vue-editor>
          <v-overlay
            :absolute="true"
            color="white"
            opacity="1"
            :value="loading"
          >
            <v-progress-circular
              indeterminate
              class="mr-2"
              color="#006341"
            ></v-progress-circular>
            <b class="color_default">Loading...</b>
          </v-overlay>
        </v-card>
      </div>
    </div>
    <v-row>
      <v-col cols="12"> </v-col>
      <v-col cols="9"> </v-col>
    </v-row>
    <div class="py-3">
      <v-divider></v-divider>
    </div>
    <div class="pa-3">
      <v-btn
        color="blue"
        class="text-capitalize"
        depressed
        dark
        @click="postData"
        v-if="!loading"
        >Post</v-btn
      >
      <v-btn color="blue" class="text-capitalize" v-if="loading" depressed dark
        >Loading...</v-btn
      >
    </div>
    <div class="pa-2"></div>
  </div>
</template>

<script>
export default {
  name: "profileLulusan",
  data() {
    return {
      d_show: false,
      d_type: null,
      d_width: "500px",
      d_title: "",
      inventory: null,
      content: "",
      loading: false,
      picture: null,
      alert: false,
      form: {
        judul: "",
        konten: "",
        featured_image: null,
        status_id: 2,
        kategori_id: "15",
      },

      dataSet: [],
      selectedCategory: [],
      listStatus: [
        {
          txt: "Terbitkan",
          val: 2,
        },
        {
          txt: "Jadikan Draft",
          val: 1,
        },
      ],
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      let data = {
        path: `page?filter[id]=2`,
      };
      try {
        let res = await this.$store.dispatch("getData", data);
        if (res.data.data.length) {
          this.dataSet = res.data.data[0];
          this.picture = this.dataSet.foto;
          this.form = {
            id: this.dataSet.id,
            judul: this.dataSet.judul,
            konten: this.dataSet.konten,
            featured_image: null,
            status_id: 2,
            kategori_id: "23",
          };
          this.loading = false;
        }
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },

    async handleImageAdded(file, Editor, cursorLocation) {
      this.loading = true;
      let body = new FormData();
      body.append("files[]", file);
      let data = {
        body: body,
        path: `media/images`,
      };
      try {
        let res = await this.$store.dispatch("postData", data);
        Editor.insertEmbed(cursorLocation, "image", res.data[0]);
        this.loading = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },
    uploadImage(e) {
      const file = e.target.files[0];
      if (file.size > 250000) {
        this.$toast.error("Foto tidak boleh lebih dari 2mb!");
        this.alert = true;
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
      let body = new URLSearchParams();
      for (let key in this.form) {
        if (this.form[key]) {
          body.append(key, this.form[key]);
        }
      }
      const data = {
        body: body,
        path: "page",
      };
      let method = this.dataSet ? "putData" : "postData";
      try {
        const res = await this.$store.dispatch(method, data);
        if (res) {
          this.fetchData();
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
  width: 100%;
  height: 300px;
  border: 1px dashed #000;
  cursor: pointer;
  background: #fff;
}
.cover_pic {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
</style>
