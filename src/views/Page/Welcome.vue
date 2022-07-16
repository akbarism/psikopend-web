<template>
  <div>
    <Navbar />
    <div class="jumbotron d-flex align-center justify-center">
      <div>
        <!-- <img src="../assets/img/logo-upi.png" height="150px" alt="" /> -->
        <p class="text-center white--text" style="line-height: normal">
          <span style="font-weight: 400; font-size: 48px">
            Selamat Datang di</span
          >
          <br />
          <span style="font-weight: 600; font-size: 56px"
            >Psikologi Pendidikan UPI</span
          >
        </p>
        <p class="text-center white--text" style="width: 100%">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
    <div style="height: 100px"></div>
    <div class="px_100" v-if="dataSlide">
      <!-- <title-line title="UNGGULAN" /> -->
      <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(item, i) in dataSlide" :key="i">
          <v-sheet height="100%" class="rounded-lg">
            <div
              class="img_unggulan"
              :style="`background: url(${item.foto});  background-size: cover;
    
            `"
            >
              <div class="layer_cation">
                <p class="title_slide mb-3 white--text">
                  {{ item.judul }}
                </p>
              </div>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="px_100" v-else>
      <v-skeleton-loader
        class="sk_slide rounded-lg"
        min-height="50vh"
        type="image"
      ></v-skeleton-loader>
    </div>
    <div class="px_100 d-flex quotation" v-if="!getingAbout && dataAbout">
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
    <div class="px_100 d-flex quotation" v-else>
      <v-skeleton-loader
        class="sk_slide rounded-lg"
        type="avatar"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="sk_slide rounded-lg"
        type="article"
      ></v-skeleton-loader>
    </div>
    <div class="d-flex justify-end pa-3">
      <v-btn color="purple" class="text-capitalize" to="/profile" text
        >Tentang Kami
        <v-icon class="ml-2">mdi-chevron-right</v-icon>
      </v-btn>
    </div>
    <div style="height: 50px"></div>
    <div class="px_100">
      <p style="font-size: 32px; font-weight: 700">Kegiatan Terbaru</p>
      <div class="d-flex align-center">
        <div style="width: 95%" class="d-flex">
          <img
            src="../../assets/img/kegiatan_dummy.png"
            height="350px"
            alt=""
          />
          <div class="pa-3 d-flex align-end">
            <div>
              <p class="mb-0" style="font-weight: 700; font-size: 22px">
                Gerakan Cipta Cinta Lingkungan
              </p>
              <p style="font-family: Lato; font-size: 14px; font-weight: 400">
                Minggu, 27 April 2022, Taman Hutan Raya Dago Bandung
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                sodales dui sit amet nisl tempus, et pretium nisl eleifend.
                Suspendisse eu vulputate ante. Maecenas ullamcorper leo in elit
                porttitor vestibulum.
              </p>
            </div>
          </div>
        </div>
        <div style="width: 5%">
          <v-icon size="100" @click="toPage('all-article')"
            >mdi-chevron-right</v-icon
          >
        </div>
      </div>
      <div style="height: 50px"></div>
      <p style="font-size: 32px; font-weight: 700">Berita & Artikel</p>
      <div class="d-flex" v-if="dataArticle">
        <div style="width: 95%" class="d-flex">
          <v-row>
            <v-col cols="4" v-for="(item, i) in dataArticle" :key="i">
              <img :src="item.foto" class="img_news" alt="" />
              <p
                class="mb-1"
                style="
                  font-family: Lato;
                  font-size: 20px;
                  font-weight: 700;
                  height: 60px;
                "
              >
                {{ item.judul }}
              </p>
              <p style="font-family: Lato; font-size: 16px; font-weight: 400">
                {{ $date(item.created_at).format("dddd, D MMM YYYY") }} |
                {{ item.updated_by.name }}
              </p>
            </v-col>
          </v-row>
        </div>
        <div style="width: 5%">
          <v-icon
            size="100"
            @click="toPage('all-article')"
            style="margin-top: 50px"
            >mdi-chevron-right</v-icon
          >
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import TitleLine from "@/components/base/TitleLine.vue";
import Navbar from "@/components/base/Navbar.vue";
import Footer from "@/components/base/Footer.vue";
export default {
  components: { TitleLine, Navbar, Footer },
  name: "welcome",
  data() {
    return {
      getingAbout: false,
      dataAbout: null,

      getingEvt: false,
      dataEvt: null,

      getingArticle: false,
      dataArticle: null,

      getingSlide: false,
      dataSlide: null,
    };
  },
  methods: {
    toPage(path) {
      this.$router.push(path);
    },
    async getSlide() {
      this.getingSlide = true;
      let data = {
        path: `pagelist?filter[kategori_id]=8`,
      };
      try {
        let res = await this.$store.dispatch("getData", data);
        let exist = res.data.data;
        if (exist.length) {
          this.dataSlide = exist;
        }
        this.getAbout();
        this.getingSlide = false;
      } catch (err) {
        console.log(err);
        this.getingSlide = false;
      }
    },
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
        this.getArticle();
        this.getingAbout = false;
      } catch (err) {
        console.log(err);
        this.getingAbout = false;
      }
    },

    async getArticle() {
      this.getingArticle = true;
      let data = {
        path: `artikel?page[size]=3`,
      };
      try {
        let res = await this.$store.dispatch("getData", data);
        let exist = res.data.data;
        if (exist.length) {
          this.dataArticle = exist;
        }
        this.getingArticle = false;
      } catch (err) {
        console.log(err);
        this.getingArticle = false;
      }
    },
    async getEvt() {
      this.getingEvt = true;
      let data = {
        path: `page?filter[id]=1`,
      };
      try {
        let res = await this.$store.dispatch("getData", data);
        let exist = res.data.data;
        if (exist.length) {
          this.dataEvt = exist;
        }
        this.getingEvt = false;
      } catch (err) {
        console.log(err);
        this.getingEvt = false;
      }
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getSlide();

    window.addEventListener("scroll", () => {
      let navigate = document.getElementById("nav");
      navigate.classList.toggle("scrolled", window.scrollY > 0);
    });
  },
};
</script>

<style>
.more_ {
  font-size: 45px;
}
.layer_cation {
  padding: 25px 50px;
  width: 100%;
  height: 150px;
  background: rgba(0, 0, 0, 0.705);
}
.img_unggulan {
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  height: 50vh;
  object-fit: cover;
  background-repeat: no-repeat;
  width: 100% !important;
  border-radius: 9px;
}

.item_gallery {
  width: 100%;
}

.img_article {
  width: 300px;
  height: 300px;
  object-fit: cover;
}

.img_evt {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.txt_evt {
  flex: 1;
}

.box_date {
  display: flex;
  justify-content: center;
  background: purple;
  color: white;
  width: 50px;
  height: max-content;
  margin-right: 20px;
  padding: 5px 0;
}

.box_evt {
  box-sizing: border-box;
}

.img_visi {
  width: 300px;
  height: 300px;
  object-fit: cover;
}

.text_misi {
  padding: 80px;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.2;
  position: absolute;
  width: 100%;
}
.title_slide {
  font-family: fell, Georgia, Cambria, "Times New Roman", Times, serif;
  font-size: 32px;
}
.sk_slide {
  width: 100%;
}

.v-skeleton-loader__image {
  height: 100%;
}
</style>
