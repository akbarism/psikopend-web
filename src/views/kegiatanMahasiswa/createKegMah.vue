<template>
  <div class="px-3">
    <h3 class="mb-5">Create Article</h3>

    <v-row>
      <v-col cols="3">
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
      </v-col>
      <v-col cols="9">
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
      </v-col>
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
    <div class="pa-2">
      <DialogArticle
        :d_show="d_show"
        @refetch="fetchCategory"
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
  name: "createArticle",
  components: { DialogArticle },
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
        kategori_id: "14",
      },

      listCategory: [],
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
    this.fetchCategory();
  },
  methods: {
    async fetchCategory() {
      this.loading = true;
      let data = {
        path: `kategori/artikel?page[number]=1&page[size]=100`,
      };
      try {
        let res = await this.$store.dispatch("getData", data);
        this.listCategory = res.data.data;
        if (this.listCategory.length) {
          this.listCategory.forEach((el) => {
            el["picked"] = false;
          });
        }
        this.loading = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },
    selectCategory() {
      this.d_type = "category";
      this.d_title = "";
      this.d_width = "500px";
      this.inventory = {
        list: this.listCategory,
        selected: this.selectedCategory,
      };
      this.d_show = true;
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
          this.$router.push("kegmah-management");
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
  height: 200px;
  border: 1px dashed #000;
  cursor: pointer;
  background: #fff;
}
.cover_pic {
  width: 250px;
  height: 200px;
  object-fit: cover;
}
</style>
