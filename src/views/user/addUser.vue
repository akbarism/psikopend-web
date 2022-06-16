<template>
  <div v-if="inventory">
    <v-row>
      <v-col cols="12" v-for="(item, i) in inventory.field" :key="i">
        <p class="default_txt">{{ item.name }}</p>
        <v-text-field
          dense
          v-model="inventory.body[item.key]"
          placeholder="Type Here"
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="d-flex justify-end py-3">
      <v-btn
        v-if="!loading"
        class="text-capitalize"
        dark
        color="blue"
        @click="postUser"
        depressed
        >Save</v-btn
      >
      <v-btn v-else class="text-capitalize" dark color="blue" depressed
        >Saving...</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "addUser",
  props: ["inventory"],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async postUser() {
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
