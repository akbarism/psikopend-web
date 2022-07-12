<template>
  <div class="px-3">
    <v-card class="pa-3 mb-3">
      <h3 class="mb-3">Sambutan ketua program prodi</h3>
      <div class="d-flex">
        <div class="mr-5">
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
          <div class="d-flex flex-column" v-else>
            <img :src="picture" class="cover_pic" alt="" />
            <v-btn
              color="blue"
              class="text-capitalize mt-3"
              @click="picture = null"
              depressed
              dark
              >cancel</v-btn
            >
          </div>
        </div>
        <div class="flexy">
          <vue-editor
            id="editor"
            class="white"
            placeholder="Isi Sambutan"
            :editorToolbar="customToolbar"
            v-model="form.sambutan"
          ></vue-editor>
        </div>
      </div>
    </v-card>
    <v-card class="pa-3 mb-3">
      <h3 class="mb-3">Sejarah Pendirian</h3>
      <vue-editor
        id="editor"
        class="white"
        placeholder="Sejarah Pendirian"
        :editorToolbar="customToolbar"
        v-model="form.sejarah"
      ></vue-editor>
    </v-card>
    <v-card class="pa-3 mb-3">
      <h3 class="mb-3">Visi</h3>
      <v-textarea solo placeholder="Visi" v-model="form.visi"></v-textarea>
    </v-card>
    <v-card class="pa-3 mb-3">
      <h3 class="mb-3">Misi</h3>
      <div
        class="d-flex align-center mb-3"
        v-for="(item, i) in form.misi"
        :key="`misi-${i}`"
      >
        <v-text-field
          class="mr-2"
          v-model="item.val"
          hide-details
          solo
          placeholder="misi"
        ></v-text-field>
        <v-btn icon color="red" @click="manageMisi('del')"
          ><v-icon>mdi-delete</v-icon></v-btn
        >
      </div>
      <v-btn class="my-3" @click="manageMisi('add')">Tambah</v-btn>
    </v-card>
    <div class="py-3">
      <v-btn color="purple" dark block v-if="!loading" @click="saveImg"
        >Simpan</v-btn
      >
      <v-btn color="purple" dark block v-if="loading">Loading...</v-btn>
    </div>
    <div class="pa-3"></div>
  </div>
</template>

<script>
export default {
  name: "manageAbout",
  data() {
    return {
      loading: false,
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        [{ color: [] }],
      ],
      form: {
        sambutan: "",
        sejarah: "",
        visi: "",
        misi: [{ val: "" }],
        image: null,
      },
      picture: null,
      tempImg: null,
      dataSet: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      let data = {
        path: `page?filter[id]=1`,
      };
      try {
        let res = await this.$store.dispatch("getData", data);
        let exist = res.data.data;
        if (exist.length) {
          this.dataSet = exist[0];
          this.form = JSON.parse(exist[0].konten);
          this.picture = this.form.image;
        }
        this.loading = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },
    manageMisi(type, i) {
      if (type == "add") {
        this.form.misi.push({ val: "" });
      } else {
        this.form.misi.splice(i, 1);
      }
    },
    uploadImage(e) {
      const file = e.target.files[0];
      const fr = new FileReader();
      fr.onload = (f) => {
        this.picture = f.target.result;
      };
      fr.readAsDataURL(file);
      this.tempImg = file;
    },
    async saveImg() {
      this.loading = true;
      if (this.tempImg) {
        let body = new FormData();
        body.append("files[]", this.tempImg);
        let data = {
          body: body,
          path: `media/images`,
        };
        try {
          let res = await this.$store.dispatch("postData", data);
          this.form.image = res.data[0];
          this.saveAbout();
        } catch (err) {
          console.log(err);
          this.loading = false;
        }
      } else {
        this.saveAbout();
      }
    },
    async saveAbout() {
      let method = "";
      let body = {
        judul: "About",
        konten: JSON.stringify(this.form),
        status_id: 2,
        kategori_id: 7,
      };
      if (this.dataSet) {
        method = "putData";
        body["id"] = this.dataSet.id;
      } else {
        method = "postData";
      }
      let data = {
        body: body,
        path: `page`,
      };
      try {
        let res = await this.$store.dispatch(method, data);
        console.log(res);
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
  width: 150px;
  height: 150px;
  border: 1px dashed #000;
  cursor: pointer;
  border-radius: 50%;
  background: #fff;
}
.cover_pic {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
