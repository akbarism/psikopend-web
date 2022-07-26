<template>
  <div>
    <div class="px_100 py-5">
      <p style="font-size: 32px; font-weight: 700">Sertifikat Akreditasi</p>
      <div v-if="dataSet && !loading">
        <div v-if="dataSet.length">
          <v-row>
            <v-col cols="3" v-for="item in dataSet" :key="item.id">
              <v-card class="pa-3">
                <p class="text-center font-weight-bold">
                  {{ item.judul }}
                </p>
                <p class="text-center font-weight-bold">
                  {{ item.konten }}
                </p>
                <img
                  :src="item.foto"
                  width="100%"
                  class="objectfit"
                  height="250px"
                  alt=""
                />
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div v-else class="d-flex flex-column justify-center align-center">
          <img src="../../assets/img/empty.png" alt="" />
          <h3 class="tezt-center">No Data</h3>
        </div>
      </div>
      <v-row v-else>
        <v-col cols="1" md="4" lg="4" v-for="i in 3" :key="`skeleton-${i}`">
          <v-card style="overflow: hidden">
            <v-skeleton-loader type="card"></v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div style="height: 100px">
      <viewGaleri
        :d_vimage="d_vimage"
        @close="d_vimage = false"
        :gallery="vimage"
      />
    </div>
  </div>
</template>

<script>
import viewGaleri from "../Gallery/viewGaleri.vue";
export default {
  name: "componentSertifikasi",
  components: {
    viewGaleri,
  },
  data() {
    return {
      loading: false,
      dataSet: null,
      page: 1,
      limit: 10,
      vimage: null,
      d_vimage: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      let data = {
        path: `pagelist?filter[kategori_id]=10&page[number]=${this.page}&page[size]=${this.limit}`,
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
    viewDetail(data) {
      this.vimage = data;
      this.d_vimage = true;
    },
  },
};
</script>

<style></style>
