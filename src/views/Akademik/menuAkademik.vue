<template>
  <div class="pa-3">
    <h3>Akademik Menu</h3>
    <div class="d-flex justify-center mt-8">
      <div style="width: 70%">
        <v-row>
          <v-col cols="4" v-for="(item, i) in listMenu" :key="i">
            <v-card
              :to="item.path"
              class="pa-3 d-flex align-center justify-center"
              height="100px"
            >
              <p class="font-weight-bold mb-0">{{ item.name }}</p>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "akademikMenu",
  data() {
    return {
      listMenu: [
        {
          id: 3,
          name: "Kurikulum",
          path: "/akademik/3/kurikulum",
        },
        {
          id: 4,
          name: "Mata Kuliah",
          path: "/akademik/4/mata-kuliah",
        },
        {
          id: 5,
          name: "Rencana Pemberlajaran",
          path: "/akademik/5/rencana-pembelajaran",
        },
        {
          id: 6,
          name: "Jadwal Kuliah",
          path: "/akademik/6/jadwal-kuliah",
        },
        {
          id: 7,
          name: "Pelaksanaan SPS",
          path: "/akademik/7/pelaksanaan-sps",
        },
        {
          id: 8,
          name: "Evaluasi PMB",
          path: "/akademik/8/evaluasi-pmb",
        },
      ],
    };
  },
};
</script>

<style></style>
