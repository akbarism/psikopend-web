<template>
  <div>
    <div class="jumbotron d-flex align-center">
      <v-row no-gutters>
        <v-col cols="7">
          <div style="margin-left: 30px">
            <img src="../../assets/img/logo-upi.png" height="150px" alt="" />
            <h1 class="white--text more_ mb-0">PRODI PSIKOLOGI PENDIDIKAN</h1>
            <h1 class="white--text">
              Sekolah Pascasarjana Universitas Pendidikan Indonesia
            </h1>
          </div>
        </v-col>
        <v-col cols="5">
          <div style="margin-right: 30px">
            <v-card class="pa-3 rounded-lg" height="50vh" width="400px">
              <h1 class="text-center mb-3">Login</h1>
              <form @submit.prevent="login">
                <v-text-field
                  outlined
                  v-model="email"
                  :error-messages="EmailError"
                  label="Email/Username"
                  dense
                  required
                  :append-icon="email ? 'mdi-check-circle' : ''"
                  prepend-inner-icon="mdi-email"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>

                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  outlined
                  dense
                  v-model="password"
                  :error-messages="PasswordError"
                  label="Password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                ></v-text-field>
                <div class="parentBtn">
                  <v-btn
                    block
                    class="btn"
                    type="login"
                    v-if="!loading"
                    color="blue"
                    depressed
                    dark
                  >
                    Login
                  </v-btn>
                  <v-btn
                    block
                    class="btn"
                    depressed
                    v-if="loading"
                    color="blue"
                    dark
                  >
                    Loading..
                  </v-btn>
                </div>
              </form>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "login",
  mixins: [validationMixin],
  validations: {
    email: { required },
    password: { required, minLength: minLength(8) },
  },
  computed: {
    EmailError() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("Username is required!");
      return errors;
    },
    PasswordError() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password minimum 8 characters!");
      !this.$v.password.required && errors.push("Password is required!");
      return errors;
    },
  },
  data() {
    return {
      email: "",
      password: "",
      show: false,
      errAlert: false,
      loading: false,
      loadingLink: false,
      err: null,
      loginSuccess: true,
    };
  },
  mounted() {
    console.log(process.env.VUE_APP_ENV);
  },
  methods: {
    async login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.loading = true;
        let data = {
          body: {
            key: this.email,
            password: this.password,
          },
          path: "auth/login",
        };
        try {
          const res = await this.$store.dispatch("postData", data);
          this.loading = false;
          console.log(res);
          Cookies.set("token", res.token);
          this.$router.go("/overview");
        } catch (err) {
          this.loading = false;
          console.log(err);
        }
      }
    },
  },
};
</script>

<style scoped>
.jumbotron {
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url("../../assets/img/6.jpeg");
  background-position-x: 100%;
  background-size: cover;
}
</style>
