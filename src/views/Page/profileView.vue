<template>
  <div style="height: 200vh">
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
      <p class="text-center" style="font-size: 32px; font-weight: 700">Visi</p>
      <p class="text-center">
        {{ dataAbout.visi }}
      </p>
      <p class="text-center" style="font-size: 32px; font-weight: 700">Misi</p>

      <div
        v-for="(item, i) in dataAbout.misi"
        :key="`misi${i}`"
        class="mb-2 d-flex align-start"
      >
        <v-icon class="mr-3" color="purple">mdi-check-decagram-outline</v-icon>
        <p>{{ item.val }}</p>
      </div>
    </div>
    <div class="py-2">
      <v-divider> </v-divider>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/base/Navbar.vue";
import Footer from "@/components/base/Footer.vue";

export default {
  name: "TentangKami",
  components: { Navbar, Footer },
  data() {
    return {
      getingAbout: false,
      dataAbout: null,
      misi: [
        "Menyelenggarakan pendidikan magister pendidikan dalam bidang Psikologi Pendidikan untuk menghasilkan lulusan yang memiliki keunggulan dalam pengetahuan dan penerapan psikologi pendidikan dalam pendidikan, menginternalisasi nilai-nilai lokal dan nasional, serta kompetitif di tingkat nasional dan internasional, khususnya di kawasan ASEAN.",
        "Menyediakan pendidikan dan konsultasi tentang model/media pembelajaran, teknik asesmen yang efektif, dan intervensi dasar yang kontemporer dan inovatif untuk pendidikan.",
        "Melaksanakan penelitian dan publikasi ilmiah untuk pengembangan keilmuan dan penerapan psikologi pendidikan yang efektif dalam pendidikan.",
        "Melaksanakan pengabdian kepada masyarakat dalam praksis psikologi pendidikan yang berkontribusi bagi kemaslahatan manusia dengan berbagai latar dan periode usia.",
        "Mengembangkan kolaborasi dan jejaring dengan berbagai pihak (dalam dan luar negeri) dalam rangka meningkatkan kinerja pendidikan, penelitian, publikasi ilmiah, dan pengabdian kepada masyarakat (PkM)",
      ],
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
        this.getingAbout = false;
      } catch (err) {
        console.log(err);
        this.getingAbout = false;
      }
    },
  },
};
</script>

<style></style>
