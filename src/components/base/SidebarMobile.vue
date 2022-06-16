<template>
  <v-navigation-drawer
    color="#EDF1F0"
    app
    dark
    :permanent="drawer"
    v-model="expander"
    class="sidebar_desktop"
    style="padding: 0"
    floating
  >
    <div class="rounded_side py-3">
      <div class="px-3 pb-3 d-flex justify-center"></div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "desktopSidebar",

  components: {},
  computed: {
    ...mapState({
      drawer: (state) => state.drawer,
      role: (state) => state.role,
    }),
    expander: {
      get: function () {
        return this.drawer;
      },
      set: function (val) {
        if (val) {
          console.log(
            `%cWarning!!!`,
            "color:red;font-size:50px;font-weight: 900;text-shadow: 2px 2px #000;"
          );
          console.log(
            "%cUsing this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS.Do not enter or paste code that you do not understand.",
            "font-size:17px"
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
.rounded_side {
  background: #006341;
  border-radius: 0 10px 10px 0;
  min-height: 100vh;
}
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
