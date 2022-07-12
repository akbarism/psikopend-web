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
    <div class="px_100">
      <!-- <title-line title="UNGGULAN" /> -->
      <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(item, i) in images" :key="i">
          <v-sheet height="100%">
            <img :src="item.src" class="img_unggulan" alt="" />
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="px_100 d-flex quotation">
      <div class="relative_bg">
        <img
          src="https://coconuts.co/wp-content/uploads/2016/11/afp_-_suharto.jpg"
          class="larger_ava"
          alt=""
        />
        <div class="circle_quote">
          <v-icon color="black">mdi-format-quote-close</v-icon>
        </div>
      </div>
      <div>
        <p>
          <b
            >"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."</b
          >
        </p>
        <p class="text-right mt-5">Abu Nawas, Pemukiman.</p>
      </div>
    </div>
    <div class="d-flex justify-end pa-3">
      <v-btn color="purple" class="text-capitalize" text
        >Tentang Kami
        <v-icon class="ml-2">mdi-chevron-right</v-icon>
      </v-btn>
    </div>
    <div style="height: 50px"></div>
    <div class="px_100">
      <p style="font-size: 32px; font-weight: 700">Kegiatan Terbaru</p>
      <div class="d-flex align-center">
        <div style="width: 95%" class="d-flex">
          <img src="../../assets/img/kegiatan_dummy.png" height="350px" alt="" />
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
          <v-icon size="100">mdi-chevron-right</v-icon>
        </div>
      </div>
      <div style="height: 50px"></div>
      <p style="font-size: 32px; font-weight: 700">Berita & Artikel</p>
      <div class="d-flex">
        <div style="width: 95%" class="d-flex">
          <v-row>
            <v-col cols="4" v-for="(item, i) in news" :key="i">
              <img :src="item.img" class="img_news" alt="" />
              <p
                class="mb-1"
                style="font-family: Lato; font-size: 20px; font-weight: 700"
              >
                {{ item.title }}
              </p>
              <p style="font-family: Lato; font-size: 16px; font-weight: 400">
                {{ item.time }}
              </p>
            </v-col>
          </v-row>
        </div>
        <div style="width: 5%">
          <v-icon size="100" style="margin-top: 50px">mdi-chevron-right</v-icon>
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
      images: [
        {
          src: "https://dagodreampark.co.id/images/Gambar-Pemandangan-Gunung-dan-Bunga-Sakura.jpg",
        },
        {
          src: "https://media.suara.com/pictures/653x366/2020/07/06/71947-gambar-pemandangan.jpg",
        },
      ],
      news: [
        {
          img: require("../../assets/img/news_1.png"),
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          time: "Sabtu, 14 Mei 2022 | Susan Colline",
        },
        {
          img: require("../../assets/img/news_2.png"),
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          time: "Sabtu, 14 Mei 2022 | Septiansyah Rudolf",
        },
        {
          img: require("../../assets/img/news_3.png"),
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          time: "Sabtu, 14 Mei 2022 | Gesang Lamford",
        },
      ],
    };
  },
  mounted() {
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

.img_unggulan {
  height: 50vh;
  width: 100% !important;
  object-fit: cover;
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
</style>
