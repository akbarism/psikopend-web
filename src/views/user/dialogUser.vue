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
            <add-user
              :inventory="inventory"
              v-if="type == 'c_user'"
              @success="closeAndFetch"
            />
            <delete-item
              :inventory="inventory"
              v-if="type == 'd_user'"
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
import AddUser from "./addUser.vue";
export default {
  components: { AddUser, DeleteItem },
  name: "dialogUP",
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
