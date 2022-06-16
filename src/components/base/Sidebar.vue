<template>
  <v-list dense>
    <v-list-item-group color="purple">
      <v-list-item v-for="(item, i) in menu" :key="i" :to="item.path">
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <b>{{ item.name }}</b>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({}),
  },
  name: "superadminSidebar",

  data() {
    return {
      menu: [
        {
          name: "Overview",
          path: "/overview",
          icon: "mdi-view-dashboard-outline",
        },
        {
          name: "User Management",
          path: "/user-management",
          icon: "mdi-account-cog-outline",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    redirectTo(path) {
      this.$router.push(path);
    },
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
  color: #006341 !important;
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
  height: 73px;
}
.dir_active {
  padding: 5px;
  border-radius: 10px;
  background: #e6f4ec;
  cursor: pointer;
  height: 73px;
}
</style>
