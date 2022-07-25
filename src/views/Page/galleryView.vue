<template>
  <div>
    <Navbar />
    <div class="half_jumbotron d-flex align-center justify-center">
      <div>
        <p class="text-center white--text" style="line-height: normal">
          <span style="font-weight: 600; font-size: 56px">Galeri</span>
        </p>
        <p class="text-center white--text" style="width: 100%">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
    <div class="px_100 py-5">
      <div v-if="dataSet && !loading">
        <div v-if="dataSet.length">
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              v-for="item in dataSet"
              :key="item.id"
            >
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-card>
                    <v-overlay :absolute="true" :value="hover">
                      <v-btn
                        color="purple"
                        dark
                        class="text-capitalize"
                        @click="viewDetail(item)"
                      >
                        View Detail
                      </v-btn>
                    </v-overlay>
                    <img
                      :src="item.foto"
                      width="100%"
                      class="objectfit"
                      height="250px"
                      alt=""
                    />
                  </v-card>
                </template>
              </v-hover>
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
      <ViewGaleri
        :d_vimage="d_vimage"
        @close="d_vimage = false"
        :gallery="vimage"
      />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/base/Navbar.vue";
import Footer from "@/components/base/Footer.vue";
import ViewGaleri from "../Gallery/viewGaleri.vue";
export default {
  name: "GalleryView",
  components: { Navbar, Footer, ViewGaleri },
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
        path: `pagelist?filter[kategori_id]=12&page[number]=${this.page}&page[size]=${this.limit}`,
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
