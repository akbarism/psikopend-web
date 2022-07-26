<template>
  <div>
    <Navbar />
    <div class="half_jumbotron d-flex align-center justify-center">
      <div>
        <p class="text-center white--text" style="line-height: normal">
          <span style="font-weight: 600; font-size: 56px">Tentang Kami</span>
        </p>
        <p class="text-center white--text" style="width: 100%">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
    <div v-if="dataAbout">
      <div class="py-3 px_100">
        <p style="font-size: 32px; font-weight: 700">
          Sambutan Ketua Program Prodi
        </p>
        <div class="d-flex quotation">
          <div class="relative_bg">
            <img :src="dataAbout.image" class="larger_ava" alt="" />
            <div class="circle_quote">
              <v-icon color="black">mdi-format-quote-close</v-icon>
            </div>
          </div>
          <div>
            <p v-html="dataAbout.sambutan"></p>
            <p class="text-right mt-5">{{ dataAbout.name }}</p>
          </div>
        </div>
      </div>
      <div class="py-2">
        <v-divider> </v-divider>
      </div>
      <div class="py-3 px_100">
        <p style="font-size: 32px; font-weight: 700">Sejarah Pendirian</p>
        <div class="d-flex">
          <p v-html="dataAbout.sejarah"></p>
        </div>
      </div>
      <div class="py-2">
        <v-divider> </v-divider>
      </div>
      <div class="py-3 px_100">
        <p class="text-center" style="font-size: 32px; font-weight: 700">
          Visi
        </p>
        <p class="text-center">
          {{ dataAbout.visi }}
        </p>
        <p class="text-center" style="font-size: 32px; font-weight: 700">
          Misi
        </p>

        <div
          v-for="(item, i) in dataAbout.misi"
          :key="`misi${i}`"
          class="mb-2 d-flex align-start"
        >
          <v-icon class="mr-3" color="purple"
            >mdi-check-decagram-outline</v-icon
          >
          <p>{{ item.val }}</p>
        </div>
      </div>
      <div class="py-2">
        <v-divider> </v-divider>
        <div class="pa-3" v-if="dataTesti">
          <p class="text-center" style="font-size: 32px; font-weight: 700">
            Kata Mereka
          </p>
          <swiper :slides-per-view="2" :navigation="true" loop>
            <swiper-slide
              v-for="(item, i) in dataTesti"
              :key="`testi-${i}`"
              class="test pa-2"
              style="height: 100% !important"
            >
              <v-card class="pa-3">
                <div>
                  <div class="d-flex align-start" style="height: 88px">
                    <v-icon size="x-large" class="mr-3" color="blue"
                      >mdi-comment-quote</v-icon
                    >
                    <p class="flexy" v-snip="3">{{ item.konten }}</p>
                  </div>
                  <div class="d-flex justify-end align-center">
                    <img :src="item.foto" height="70px" class="mr-3" alt="" />
                    <p>{{ item.judul }}</p>
                  </div>
                </div>
              </v-card>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/base/Navbar.vue";
import Footer from "@/components/base/Footer.vue";
import { Navigation, Pagination } from "swiper";
import { SwiperCore, Swiper, SwiperSlide } from "swiper-vue2";

// Import Swiper styles
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination]);

export default {
  name: "TentangKami",
  components: { Navbar, Footer, Swiper, SwiperSlide },
  data() {
    return {
      getingAbout: false,
      dataAbout: null,
      getingTesti: false,
      dataTesti: null,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getAbout();
  },
  methods: {
    async getAbout() {
      this.getingAbout = true;
      let data = {
        path: `page?filter[id]=1`,
      };
      try {
        let res = await this.$store.dispatch("getData", data);
        let exist = res.data.data;
        if (exist.length) {
          this.dataAbout = JSON.parse(exist[0].konten);
        }
        this.getTesti();
        this.getingAbout = false;
      } catch (err) {
        console.log(err);
        this.getingAbout = false;
      }
    },
    async getTesti() {
      this.getingTesti = true;
      let data = {
        path: `pagelist?filter[kategori_id]=9&page[number]=1&page[size]=100`,
      };
      try {
        let res = await this.$store.dispatch("getData", data);
        console.log(res);
        this.dataTesti = res.data.data;
        this.getingTesti = false;
      } catch (err) {
        console.log(err);
        this.getingTesti = false;
      }
    },
  },
};
</script>

<style></style>
