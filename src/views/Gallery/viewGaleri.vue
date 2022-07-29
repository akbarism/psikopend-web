<template>
  <v-row justify="start">
    <v-dialog
      v-model="d_vimage"
      max-width="100vw"
      persistent
      scrollable
      fullscreen
      @keydown.esc="$emit('close')"
    >
      <v-card class="rounded_max hide_overflow px-3" flat v-if="gallery">
        <v-row no-gutters>
          <v-col cols="8">
            <div
              class="black d-flex justify-center align-center"
              style="height: 100%"
            >
              <img :src="gallery.foto" class="v_image" alt="" />
            </div>
          </v-col>
          <v-col cols="4">
            <div class="d-flex justify-end">
              <v-btn fab x- small depressed @click="$emit('close')"
                ><v-icon small>mdi-close</v-icon></v-btn
              >
            </div>
            <v-divider></v-divider>
            <div class="pa-5">
              <h3>
                {{ gallery.judul }}
              </h3>
              <p class="grey--text">
                by {{ gallery.updated_by.name }} at
                {{ $date(gallery.created_at).format("dddd, DD MMM YYYY") }}
              </p>
              <p>{{ gallery.konten }}</p>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "viewImage",
  props: ["d_vimage", "gallery"],
  methods: {
    closeAndFetch() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.v_image {
  max-width: 100%;
  height: 95vh;
  object-fit: cover;
}
</style>
