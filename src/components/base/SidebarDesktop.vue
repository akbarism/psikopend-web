<template>
  <v-navigation-drawer
    app
    :permanent="drawer"
    v-model="expander"
    class="sidebar_desktop"
    style="padding: 10px; background-color: #edf1f0"
    floating
  >
    <v-card outlined min-height="100%">
      <div class="rounded_side pb-3">
        <v-card color="purple" flat class="pa-3 pb-3 d-flex align-center">
          <img
            src="../../assets/img/logo_nav.png"
            height="50px"
            class="mr-2"
            alt=""
          />
          <!-- <h2 class="purple--text">Psikopend</h2> -->
        </v-card>
        <SidebarVue />
      </div>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import SidebarVue from "./Sidebar.vue";
export default {
  name: "desktopSidebar",

  components: { SidebarVue },
  computed: {
    ...mapState({
      drawer: (state) => state.drawer,
    }),
    expander: {
      get: function () {
        return this.drawer;
      },
      set: function (val) {
        if (val) {
          console.log(
            `%cWarning!!!`,
            "color:red;font-size:50px;font-weight: 900;text-shadow: 2px 2px #000;",
          );
          console.log(
            "%cUsing this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS.Do not enter or paste code that you do not understand.",
            "font-size:17px",
          );
        }
      },
    },
  },
  data() {
    return {
      step: 1,
      anu: "",
    };
  },
};
</script>

<style scoped>
.v-list-item__icon {
  min-width: 10px !important;
  margin-left: 0 !important;
}
.v-list-item--link::before {
  background: none !important;
}
.custom_padding {
  padding-left: 50px !important;
}
.custom_padding_sub {
  padding-left: 10px !important;
}
.active_item_sidebar {
  background: #e6f4ec;
  border-radius: 10px;
  color: #6fbc92 !important;
}
.sub_dir {
  height: 100%;
  /* background: #e6f4ec; */
  /* padding: 5px;
  border-radius: 10px; */
}
.dir_item {
  padding: 5px;
  border-radius: 10px;
  background: #f6f6f6;
  cursor: pointer;
  height: 100%;
}
.dir_active {
  padding: 5px;
  border-radius: 10px;
  background: #e6f4ec;
  cursor: pointer;
  height: 100%;
}
.sidebar_desktop {
  width: 256px !important;
  overflow-y: auto !important;
}
</style>
