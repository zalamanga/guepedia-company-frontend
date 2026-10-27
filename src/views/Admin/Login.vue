<template>
  <div id="admin-auth" class="d-flex">
    <div class="form-area p-3 bg-white rounded shadow-lg mx-auto my-auto">
      <div class="auth-title">
        <div class="store-logo text-center mb-3">
          <img
            id="main-logo"
            class="d-inline-block align-top mr-1"
            style="max-width: 150px"
            src="https://www.guepedia.com/assets/img/logo-toko.png"
            alt="Guepedia Logo"
          />
        </div>
        <h3>Selamat Datang</h3>
        <h5>Silahkan Masuk</h5>
        <hr class="price-line" />
      </div>

      <div class="auth-form">
        <form @submit.prevent="Login">
          <div class="mb-2">
            <label for="exampleInputEmail1" class="form-label"
              >Email / Nama</label
            >
            <input
              type="text"
              class="form-control"
              aria-describedby="emailHelp"
              v-model="form.email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Password</label
            >
            <input
              type="password"
              class="form-control"
              v-model="form.password"
              required
            />
          </div>

          <div class="action-btn mt-3 text-center">
            <button type="submit" class="btn main-btn" :disabled="loading">
              <span v-if="!loading">Masuk Sekarang Juga</span>
              <div class="spinner-border text-light" role="status" v-else>
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },

  methods: {
    Login() {
      this.loading = false;

      return new Promise((resolve, reject) => {
        axios
          .post("admin/login", {
            email: this.form.email,
            password: this.form.password,
          })
          .then((response) => {
            console.log(response);

            localStorage.setItem(
              "admin_access_token",
              response.data.data.access_token
            );
            localStorage.setItem("admin_id", response.data.data.data.id_admin);
            localStorage.setItem("admin_name", response.data.data.data.nama_admin);
            localStorage.setItem("level", response.data.data.data.level);

            this.$router.push({name: 'AdminDashboard'});
            this.loading = false;
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              "Autentikasi Gagal",
              error.response.data.message
            );
            reject(error);
            this.loading = false;
          });
      });
    },
  },
};
</script>

<style>
#admin-auth {
  height: 100vh;
}
.form-area {
  width: 400px;
}
</style>
