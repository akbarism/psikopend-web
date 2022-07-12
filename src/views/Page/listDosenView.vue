<template>
  <div style="height: 200vh">
    <Navbar />
    <div class="jumbotron d-flex align-center justify-center">
      <div>
        <p class="text-center white--text" style="line-height: normal">
          <span style="font-weight: 600; font-size: 56px"
            >Data Dosen Tetap Program Studi Psikologi Pendidikan</span
          >
        </p>
      </div>
    </div>

    <div class="py-3 px_100">
      <p style="font-size: 32px; font-weight: 700">Visi & Misi</p>
      <div class="d-flex quotation">
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
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."</b
            >
          </p>
          <p class="text-right mt-5">Abu Nawas, Pemukiman.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/base/Navbar.vue";

export default {
  name: "listDosen",
  data() {
    return {
      listDosen: [
        {
          name: "Prof. Dr. A. Juntika  Nurihsan, M.Pd",
          jabantan: "Guru Besar",
          pendidikan: [""],
        },
        {
          name: "Prof. Dr. A. Juntika  Nurihsan, M.Pd",
          jabantan: "Guru Besar",
          pendidikan: [""],
        },
        {
          name: "Prof. Dr. A. Juntika  Nurihsan, M.Pd",
          jabantan: "Guru Besar",
          pendidikan: [""],
        },
      ],
    };
  },
  components: { Navbar },
};
</script>

<style></style>
