<template>
  <v-row justify="start">
    <v-dialog
      v-model="d_vimage"
      max-width="800px"
      persistent
      scrollable
      @keydown.esc="$emit('close')"
    >
      <v-card class="rounded_max hide_overflow" flat>
        <v-toolbar dense flat>
          <v-spacer></v-spacer>
          <v-btn fab x- small depressed @click="$emit('close')"
            ><v-icon small>mdi-close</v-icon></v-btn
          >
        </v-toolbar>
        <v-card-text class="px-2 pb-0" v-if="image">
          <v-container style="height: max-content">
            <img :src="image" class="v_image" alt="" />
          </v-container>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "viewImage",
  props: ["d_vimage", "image"],
  methods: {
    closeAndFetch() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.v_image {
  width: 100%;
}
</style>
