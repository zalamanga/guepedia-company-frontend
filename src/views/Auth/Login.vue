<template>
  <div class="bg-white shadow p-3">
    <div class="text-center fw-bold mb-3">Masuk Ke Akun Anda</div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control" aria-describedby="emailHelp" v-model="form.email" />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" v-model="form.password" />
    </div>

    <div class="d-flex mb-3">
      <div class="side-menu-item text-center me-auto">
        <a href="/forgot">
          <span>Lupa Password ?</span>
        </a>
      </div>
      <div class="login-btn">
        <button type="submit" class="btn btn-sm" @click="Login">Masuk</button>
      </div>
    </div>

    <div class="side-menu-item text-center">
      <a href="/register">
        <span>Belum punya akun? Daftar Sekarang</span>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },

  metaInfo() {
    return {
      title: 'Masuk',
      meta: [
        { name: 'description', content: 'Penerbit buku online gratis, anti ribet, dan cepat, puluhan ribu naskah sudah terbit disini, sekarang giliran naskahmu.' },
        { property: 'og:type', content: "website" },
        { property: 'og:url', content: "https://www.guepedia.com/" },
        { property: 'og:title', content: 'Penerbit buku online gratis Indonesia  | Guepedia.com' },
        { property: 'og:description', content: 'Penerbit buku online gratis, anti ribet, dan cepat, puluhan ribu naskah sudah terbit disini, sekarang giliran naskahmu.' },
      ]
    }
  },

  methods: {
    Login() {
      this.loading = false;

      return new Promise((resolve, reject) => {
        axios
          .post("login", {
            email: this.form.email,
            password: this.form.password,
          })
          .then((response) => {
            console.log(response);
            // this.$bvModal.hide("AuthModal");

            localStorage.setItem("access_token", response.data.data.access_token);
            localStorage.setItem("id", response.data.data.data.id_akun_penulis);
            localStorage.setItem("avatar", response.data.data.data.photo);
            localStorage.setItem("name", response.data.data.data.nama_lengkap);
            localStorage.setItem("reseller", JSON.stringify(response.data.data.data.reseller));

            this.$router.go();
            this.loading = false;
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              'Autentikasi Gagal',
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
