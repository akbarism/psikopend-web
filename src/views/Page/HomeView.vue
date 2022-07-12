<template>
  <div>
    <v-app-bar color="#EDF1F0" flat style="height: 8vh">
      <div class="d-flex justify-end" style="width: 100%">
        <v-btn icon color="red" @click="logout"
          ><v-icon>mdi-power</v-icon></v-btn
        >
      </div></v-app-bar
    >
    <SidebarDesktopVue />
    <div class="side_active">
      <router-view class="bg_default padding_main child_h"></router-view>
    </div>
  </div>
</template>

<script>
import SidebarDesktopVue from "@/components/base/SidebarDesktop.vue";
import Cookies from "js-cookie";
export default {
  name: "Home",

  components: { SidebarDesktopVue },
  methods: {
    logout() {
      Cookies.remove("token");

      this.$router.go();
    },
  },
};
</script>
