<template>
  <div>
    <nav id="nav">
      <div class="logo">
        <img src="../../assets/img/logo_nav.png" height="50px" alt="" />
      </div>
      <div class="menu-nav d-flex">
        <div class="menu_item" @click="redirectTo('/')">Home</div>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <div class="menu_item" v-bind="attrs" v-on="on">
              <p class="mb-0">Profile</p>
            </div>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in profile"
              link
              @click="redirectTo(item.path)"
              :key="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <div class="menu_item" v-bind="attrs" v-on="on">
              <p class="mb-0">Akademik</p>
            </div>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in akademik" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div class="menu_item" @click="redirectTo('/all-article')">
          Berita & Artikel
        </div>
        <div class="menu_item">Kegiatan Mahasiswa</div>
        <div class="menu_item" @click="redirectTo('/gallery')">Galeri</div>
        <div class="menu_item">Alumni</div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  mounted() {
    window.addEventListener("scroll", () => {
      let navigate = document.getElementById("nav");
      navigate.classList.toggle("scrolled", window.scrollY > 0);
    });
  },
  data() {
    return {
      profile: [
        { title: "Tentang Kami", path: "/profile" },
        { title: "Profile Lulusan", path: "/lulusan" },
        { title: "Dosen Pengampu", path: "/sambutan" },
        { title: "Testimoni", path: "/sambutan" },
      ],
      akademik: [
        { title: "Kurikulum", path: "/sambutan" },
        { title: "Mata Kuliah", path: "/sambutan" },
        { title: "Rencana Pembelajaran", path: "/sambutan" },
        { title: "Jadwal Kuliah", path: "/sambutan" },
        { title: "Pelaksanaan SPS", path: "/sambutan" },
        { title: "Evaluasi PMB", path: "/sambutan" },
      ],
      showMenu: false,
    };
  },
  methods: {
    redirectTo(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    },
    show(e) {
      e.preventDefault();
      console.log(e);
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
  },
};
</script>

<style scoped>
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
  background: #9705dc;
  /* color: black; */
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
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.3) 100%
  );
}
</style>
