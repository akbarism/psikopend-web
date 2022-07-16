<template>
  <div>
    <navbar />
    <div style="height: 100px" class="purple"></div>
    <v-row>
      <v-col cols="12" md="8">
        <div style="padding: 50px" v-if="!loading && dataSet">
          <p>{{ $date(dataSet.created_at).format("D MMM") }}</p>
          <v-divider></v-divider>
          <p class="title_article mb-3">
            {{ dataSet.judul }}
          </p>
          <p>
            {{ dataSet.deskripsi_pendek }}
          </p>
          <img :src="dataSet.foto" class="mb-3 image_artikel" alt="" />

          <p v-html="dataSet.konten"></p>
        </div>
      </v-col>
      <v-col>
        <div class="plateu"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Navbar from "@/components/base/Navbar.vue";

export default {
  components: { Navbar },
  name: "viewArticle",
  data() {
    return {
      loading: false,
      dataSet: null,
      page: 1,
      limit: 10,
      find: "",
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
        this.dataSet = res.data.data[0];
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
.image_artikel {
  width: 100%;
}
.title_article {
  font-family: fell, Georgia, Cambria, "Times New Roman", Times, serif;
  font-size: 32px;
}
.plateu {
  height: 100%;
  border-left: 1px rgba(230, 230, 230, 1) solid;
}
</style>
