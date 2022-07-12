<template>
  <div style="height: 200vh">
    <Navbar />
    <div class="half_jumbotron d-flex align-end justify-center pa-3">
      <div>
        <p class="text-center white--text" style="line-height: normal">
          <span style="font-weight: 600; font-size: 56px"
            >Berita & Artikel</span
          >
        </p>
        <p class="text-center white--text" style="width: 100%">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div class="temp_search">
          <input
            type="text"
            v-model="find"
            @keyup="fetchData"
            class="input_search"
            placeholder="Cari"
          />
        </div>
      </div>
    </div>
    <div class="py-5 px_100">
      <div v-if="loading">
        <v-row>
          <v-col cols="4" v-for="i in 3" :key="`skeleton-${i}`">
            <v-card style="overflow: hidden">
              <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row>
          <v-col cols="4" v-for="(item, i) in dataSet" :key="`data-${i}`">
            <img :src="item.foto" class="img_news" alt="" />
            <p
              class="mb-1"
              style="font-family: Lato; font-size: 20px; font-weight: 700"
            >
              {{ item.judul }}
            </p>
            <p style="font-family: Lato; font-size: 16px; font-weight: 400">
              {{ $date(item.created_at).format("dddd, DD MMMM YYYY") }} |
              {{ item.updated_by.name }}
            </p>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/base/Navbar.vue";

export default {
  name: "beritaDanartikel",
  components: { Navbar },
  data() {
    return {
      loading: false,
      dataSet: [],
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
        path: `artikel?page[number]=${this.page}&page[size]=${this.limit}&filter[judul]=${this.find}`,
      };
      try {
        let res = await this.$store.dispatch("getData", data);
        this.dataSet = res.data.data;
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
.temp_search {
  width: 100%;
  display: flex;
  justify-content: center;
}
.input_search {
  width: 80%;
  height: 40px;
  border-radius: 8px;
  background: #fff;
  padding: 10px 20px;
  opacity: 0.8;
}
.input_search:focus {
  transition: 0.5s all;
  opacity: 1;
  outline: 2px purple solid;
}
</style>
