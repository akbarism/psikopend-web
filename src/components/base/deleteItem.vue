<template>
  <div class="d-flex flex-column align-center">
    <h2 class="mb-5">Delete?</h2>
    <div>
      <v-btn depressed class="text-capitalize mr-3 pa-6">Cancel</v-btn>
      <v-btn
        depressed
        dark
        color="red"
        @click="deleteItem"
        class="text-capitalize pa-6"
        >Delete</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "deleteItem",
  props: ["inventory"],

  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async deleteItem() {
      this.loading = true;
      const data = {
        body: this.inventory.body,
        path: this.inventory.path,
      };
      try {
        const res = await this.$store.dispatch(this.inventory.method, data);
        console.log(res);
        this.$emit("success");
        this.loading = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
