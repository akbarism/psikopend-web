<template>
    <div>
        <nav id="nav">
            <div class="logo">
                <img src="../assets/img/logo-upi.png" height="50px" alt="" />
            </div>
            <div class="menu-nav d-flex">
                <div class="menu_item">Profile</div>
                <div class="menu_item">Tata Pamong</div>
                <div class="menu_item">Akademik</div>
                <div class="menu_item">Informasi & Agenda</div>
                <div class="menu_item">Lulusan</div>
                <div class="menu_item">Pelayanan</div>
                <div class="menu_item">Kontak</div>
            </div>
        </nav>
        <div class="jumbotron d-flex align-center justify-center">
            <div>
                <img src="../assets/img/logo-upi.png" height="150px" alt="" />
                <h1 class="white--text more_ mb-0">PRODI PSIKOLOGI PENDIDIKAN</h1>
                <h1 class="white--text">
                    Sekolah Pascasarjana Universitas Pendidikan Indonesia
                </h1>
            </div>
        </div>
        <div style="height: 100px"></div>
        <div class="px_100">
            <title-line title="UNGGULAN" />
            <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
                <v-carousel-item v-for="(item, i) in images" :key="i">
                    <v-sheet height="100%">
                        <img :src="item.src" class="img_unggulan" alt="" />
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </div>
        <div class="px_100 d-flex quotation">
            <div class="relative_bg">
                <img src="https://coconuts.co/wp-content/uploads/2016/11/afp_-_suharto.jpg" class="larger_ava" alt="" />
                <div class="circle_quote">
                    <v-icon color="black">mdi-format-quote-close</v-icon>
                </div>
            </div>
            <div>
                <p>
                    <b>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum."</b>
                </p>
                <p class="text-right mt-5">Abu Nawas, Pemukiman.</p>
            </div>
        </div>
        <div style="height: 100px"></div>
        <div class="pink lighten-5 py-3">
            <div class="px_100 d-flex">
                <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sbGVnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt="" class="img_visi" />
                <div class="px_100">
                    <title-line title="VISI" />
                    <h3 class="text-center mt-5">
                        Visi Program Studi Psikologi Pendidikan jenjang magister pada SPs
                        UPI adalah menuju kepeloporan dan keunggulan dalam pengembangan
                        keilmuan dan penerapan Psikologi Pendidikan berbasis riset di
                        tingkat nasional dan Asia Tenggara pada tahun 2020.
                    </h3>
                </div>
            </div>
        </div>
        <div class="orange lighten-5 py-3">
            <div class="px_100">
                <title-line title="MISI" />
                <p class="mt-5 text-justify">
                <ul>
                    <li class="mb-3">
                        Menyelenggarakan pendidikan magister pendidikan dalam bidang
                        Psikologi Pendidikan untuk menghasilkan lulusan yang memiliki
                        keunggulan dalam pengetahuan dan penerapan psikologi
                        pendidikan dalam pendidikan, menginternalisasi nilai-nilai
                        lokal dan nasional, serta kompetitif di tingkat nasional dan
                        internasional, khususnya di kawasan ASEAN.
                    </li>
                    <li class="mb-3">
                        Menyediakan pendidikan dan konsultasi tentang model/media
                        pembelajaran, teknik asesmen yang efektif, dan intervensi
                        dasar yang kontemporer dan inovatif untuk pendidikan.
                    </li>
                    <li class="mb-3">
                        Melaksanakan penelitian dan publikasi ilmiah untuk
                        pengembangan keilmuan dan penerapan psikologi pendidikan yang
                        efektif dalam pendidikan.
                    </li>
                    <li class="mb-3">
                        Melaksanakan pengabdian kepada masyarakat dalam praksis
                        psikologi pendidikan yang berkontribusi bagi kemaslahatan
                        manusia dengan berbagai latar dan periode usia.
                    </li>
                    <li class="mb-3">
                        Mengembangkan kolaborasi dan jejaring dengan berbagai pihak
                        (dalam dan luar negeri) dalam rangka meningkatkan kinerja
                        pendidikan, penelitian, publikasi ilmiah, dan pengabdian
                        kepada masyarakat (PkM)
                    </li>
                </ul>

                </p>

            </div>
        </div>
        <div class="d-flex justify-end pa-3">
            <v-btn color="purple" dark class="text-capitalize" depressed>Tentang Kami
                <v-icon class="ml-2">mdi-arrow-right</v-icon>
            </v-btn>
        </div>
        <div style="height: 50px"></div>
        <div class="px_100">
            <v-row>
                <v-col cols="7">
                    <title-line title="Article" />
                    <v-row>
                        <v-col v-for="item, i in articles" :key="`arti-${i}`" cols="6">
                            <img :src="item.img" alt="img" class="img_article" />
                            <h3>{{ item.title }}</h3>
                            <small class="text-grey">{{ item.time }}</small>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="5">
                    <title-line title="Events" />
                    <div v-for="(item, i) in events" :key="`evt-${i}`">
                        <v-row>
                            <v-col cols="2">
                                <div class="box_date">
                                    <p class="text-center mb-0">
                                        11 <br />
                                        JUL
                                    </p>
                                </div>
                            </v-col>
                            <v-col cols="10">
                            <h3>{{ item.title }}</h3>

                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </div>
        <footer style="height:50vh;background:purple">

        </footer>
    </div>
</template>

<script>
import TitleLine from "@/components/base/TitleLine.vue";
export default {
    components: { TitleLine },
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
            articles: [
                {
                    img: "http://psikopend.sps.upi.edu/wp-content/uploads/2022/03/photo_2022-03-16_17-28-41-160x300.jpg",
                    title: "IG LIVE: LET’S MOVE OUR BODY, MIND, AND SOUL",
                    time: "March 16, 2022",
                },
                {
                    img: "http://psikopend.sps.upi.edu/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-11-at-07.38.47-300x300.jpeg",
                    title:
                        "Bincang Santai (IG Live): KEHAMILAN TIDAK DIINGINKAN (KTD) DAN HARAPAN",
                    time: "March 11, 2022",
                },
                {
                    img: "http://psikopend.sps.upi.edu/wp-content/uploads/2022/02/WhatsApp-Image-2022-02-25-at-21.34.07-212x300.jpeg",
                    title: "✨NEWS WEBINAR KESEHATAN 2022✨ (NATHAN 2.0)",
                    time: "March 1, 2022",
                },
                {
                    img: "http://psikopend.sps.upi.edu/wp-content/uploads/2022/04/isra-miraj-300x300.jpg",
                    title: "Memperingati Isra’ Mi’raj",
                    time: "February 28, 2022",
                },
                {
                    img: "http://psikopend.sps.upi.edu/wp-content/uploads/2022/02/pasca-300x300.jpg",
                    title: "Profil Prog",
                    time: "January 28, 2022",
                },
                {
                    img: "http://psikopend.sps.upi.edu/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-06-at-11.26.34-300x300.jpeg",
                    title: "One Day Webinar",
                    time: "January 6, 2022",
                },
            ],
            events: [
        {
          img: "http://psikopend.sps.upi.edu/wp-content/uploads/2022/04/web-300x300.jpg",
          title: "Tak Kenal Maka Tak Sayang…",
          time: "March 16, 2022",
        },
        {
          img: "http://psikopend.sps.upi.edu/wp-content/uploads/2022/04/WhatsApp-Image-2022-04-25-at-18.55.01-208x300.jpeg",
          title: "WORKSHOP : The Art of Counseling",
          time: "April 24, 2022",
        },
        {
          img: "http://psikopend.sps.upi.edu/wp-content/uploads/2022/04/webinar-300x300.jpg",
          title: "Webinar: “Peran Psikologi Pendidikan dalam Manajemen Kelas”",
          time: "April 22, 2022",
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
.px_100 {
    padding: 0 100px;
}

.jumbotron {
    height: 100vh;
    background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
        url("../assets/img/6.jpeg");
    background-position-x: 100%;
    background-size: cover;
}

.more_ {
    font-size: 45px;
}

nav {
    height: 100px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: white;
    transition: 0.5s all;
    z-index: 99;
}

.scrolled {
    background: #fff;
    color: black;
    transition: 0.5s all;
    -webkit-box-shadow: 0px 0px 21px -7px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 21px -7px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 21px -7px rgba(0, 0, 0, 0.75);
}

.menu_item {
    padding: 10px;
    font-weight: 700;
    transition: 0.5s all;
    cursor: pointer;
}

.menu_item:hover {
    transition: 0.5s all;
    background: linear-gradient(90deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.3) 100%);
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

.larger_ava {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    object-fit: cover;
}

.relative_bg {
    position: relative;
    margin-right: 100px;
}

.quotation {
    margin-top: 50px;
}

.circle_quote {
    position: absolute;
    top: 0;
    left: 150px;
    width: 50px;
    height: 50px;
    background: yellow;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
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