<template>
  <v-row justify="start">
    <v-dialog
      v-model="d_show"
      :max-width="width"
      persistent
      scrollable
      @keydown.esc="$emit('close')"
    >
      <v-card class="rounded_max hide_overflow" flat>
        <v-toolbar dense flat>
          <h3>{{ title }}</h3>
          <v-spacer></v-spacer>
          <v-btn fab x- small depressed @click="$emit('close')"
            ><v-icon small>mdi-close</v-icon></v-btn
          >
        </v-toolbar>
        <v-card-text class="px-2 pb-0">
          <v-container style="height: max-content">
            <select-category
              :inventory="inventory"
              v-if="type == 'category'"
              @success="closeAndFetch"
            />
            <delete-item
              :inventory="inventory"
              v-if="type == 'delete'"
              @success="closeAndFetch"
            />
          </v-container>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import DeleteItem from "@/components/base/deleteItem.vue";
import SelectCategory from "./selectCategory.vue";
export default {
  components: { DeleteItem, SelectCategory },
  name: "dialogComponent",
  props: ["d_show", "type", "title", "inventory", "width"],
  methods: {
    closeAndFetch() {
      this.$emit("refetch");
      this.$emit("close");
    },
  },
};
</script>

<style></style>
