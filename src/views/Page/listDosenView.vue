<template>
  <div>
    <Navbar />
    <div class="half_jumbotron d-flex align-center justify-center">
      <div>
        <p class="text-center white--text" style="line-height: normal">
          <span style="font-weight: 600; font-size: 56px"
            >Data Dosen Tetap Program Studi Psikologi Pendidikan</span
          >
        </p>
      </div>
    </div>

    <div class="py-5 px_100" v-if="!loading">
      <div v-if="dataSet.length">
        <v-row>
          <v-col cols="12" v-for="(item, i) in dataSet" :key="`data-${i}`">
            <v-card class="pa-3">
              <v-row>
                <v-col cols="5">
                  <img :src="item.foto" class="img_dosen mb-2" alt="" />
                </v-col>
                <v-col cols="7">
                  <h3>{{ item.judul }}</h3>
                  <p class="mb-2">
                    Jabatan Akademik : <b> {{ item.jabatan }} </b>
                  </p>
                  <v-divider class="mb-2"></v-divider>
                  <h3 class="mb-2">Riwayat Pendidikan/Pekerjaan</h3>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Pendidikan/Perusahaan</th>
                          <th class="text-left">Bidang Keahlian</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(history, j) in item.history"
                          :key="`history-${j}`"
                        >
                          <td>
                            {{ history.category }}
                            {{ history.category !== "PT" ? "di" : "" }}
                            {{ history.value }}
                          </td>
                          <td>{{ history.keahlian }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                  <!-- <v-expansion-panels focusable>
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        ></v-expansion-panel-header
                      >
                      <v-expansion-panel-content class="pa-1">
                        <v-row>
                          <v-col cols="6">Pendidikan/Perusahaan</v-col>
                          <v-col cols="6">Bidang Keahlian</v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels> -->
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="py-5 px_100" v-else>
      <v-row>
        <v-col cols="12" v-for="i in 3" :key="`skeleton-${i}`">
          <v-card style="overflow: hidden">
            <v-skeleton-loader type="card"></v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/base/Navbar.vue";

export default {
  name: "listDosen",
  data() {
    return { loading: false, page: 1, limit: 10, find: "", dataSet: [] };
  },
  components: { Navbar },
  methods: {
    async fetchData() {
      this.loading = true;
      let data = {
        path: `pagelist?filter[kategori_id]=11&page[number]=${this.page}&page[size]=${this.limit}`,
      };
      try {
        let res = await this.$store.dispatch("getData", data);
        if (res.data.data.length) {
          this.dataSet = res.data.data;
          this.dataSet.forEach((el) => {
            let parsed = JSON.parse(el.konten);
            el["jabatan"] = parsed.jabatan ? parsed.jabatan : "";
            el["history"] = parsed.history.length ? parsed.history : [];
          });
        }
        this.loading = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchData();
    window.scrollTo(0, 0);
  },
};
</script>

<style>
.img_dosen {
  height: 250px;
  width: 100%;
  object-fit: cover;
}
</style>
