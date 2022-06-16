<template>
  <div>
    <v-app-bar color="#EDF1F0" flat style="height: 8vh"></v-app-bar>
    <SidebarDesktopVue />
    <div class="side_active">
      <router-view class="bg_default padding_main child_h"></router-view>
    </div>
  </div>
</template>

<script>
import SidebarDesktopVue from "@/components/base/SidebarDesktop.vue";
export default {
  name: "Home",

  components: { SidebarDesktopVue },
};
</script>
