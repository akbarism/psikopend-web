<template>
  <div class="px-3">
    <h3 class="mb-5">Create Article</h3>
    <v-overlay :absolute="true" color="white" opacity="1" :value="loading">
      <v-progress-circular
        indeterminate
        class="mr-2"
        color="#006341"
      ></v-progress-circular>
      <b class="color_default">Loading...</b>
    </v-overlay>
    <v-row v-if="!loading">
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
        <div class="py-3">
          <v-row>
            <v-col cols="3">
              <div class="pa-3 d-flex justify-end">
                <p class="font-weight-bold" style="font-size: 15px">
                  Tambah deskripsi pendek
                </p>
              </div>
            </v-col>
            <v-col cols="9">
              <v-textarea
                placeholder="Deskripsi pendek"
                v-model="form.deskripsi_pendek"
                outlined
                background-color="white"
                dense
                hide-details
                rows="2"
              ></v-textarea>
            </v-col>
            <v-col cols="3">
              <div class="pa-3 d-flex justify-end">
                <p class="font-weight-bold" style="font-size: 15px">Status</p>
              </div>
            </v-col>
            <v-col cols="9">
              <v-select
                :items="listStatus"
                v-model="form.status_id"
                item-text="txt"
                item-value="val"
                outlined
                background-color="white"
                dense
                hide-details
              ></v-select>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
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
  </div>
</template>

<script>
export default {
  name: "createArticle",
  data() {
    return {
      dataSet: [],
      tab: null,
      content: "",
      loading: false,
      picture: null,
      form: {
        judul: "",
        konten: "",
        deskripsi_pendek: "",
        featured_image: null,
        status_id: "2",
        kategori_id: [1],
      },
      listStatus: [
        {
          txt: "Terbitkan",
          val: "2",
        },
        {
          txt: "Jadikan Draft",
          val: "1",
        },
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
        path: `artikel?filter[id]=${this.$route.params.id}`,
      };
      try {
        let res = await this.$store.dispatch("getData", data);
        console.log(res);
        let v = res.data.data[0];
        this.form = {
          id: v.id,
          judul: v.judul,
          konten: v.konten,
          deskripsi_pendek: v.deskripsi_pendek,
          featured_image: null,
          status_id: v.status_id,
          kategori_id: [1],
        };
        this.loading = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },
    handleImageAdded: function (file, Editor, cursorLocation) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("image", file);

      axios({
        url: "https://fakeapi.yoursite.com/images",
        method: "POST",
        data: formData,
      })
        .then((result) => {
          const url = result.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    uploadImage(e) {
      const file = e.target.files[0];

      const fr = new FileReader();
      fr.onload = (f) => {
        this.picture = f.target.result;
      };
      fr.readAsDataURL(file);
      this.form.featured_image = file;
    },
    async postData() {
      this.loading = true;
      this.form.kategori_id = JSON.stringify(this.form.kategori_id);
      let body = new URLSearchParams();
      for (let key in this.form) {
        if (this.form[key]) {
          body.append(key, this.form[key]);
        }
      }
      const data = {
        body: body,
        path: "artikel",
      };
      try {
        const res = await this.$store.dispatch("putData", data);
        console.log(res);
        this.$router.push("/article-management");

        this.loading = false;
      } catch (err) {
        console.log(err);
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
