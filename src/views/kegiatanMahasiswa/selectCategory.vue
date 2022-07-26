<template>
  <div style="min-height: 100px">
    <div v-if="inventory">
      <div v-if="inventory.list.length">
        <h3 class="mb-3">List Category</h3>
        <div class="d-flex flex-wrap">
          <div v-for="(item, i) in inventory.list" :key="i" class="mr-3">
            <v-btn
              depressed
              :dark="item.picked"
              class="text-capitalize"
              @click="item.picked = !item.picekd"
            >
              {{ item.name }} {{ item.picked }}</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["inventory"],
};
</script>

<style></style>
