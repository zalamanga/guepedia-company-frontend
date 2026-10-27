<template>
  <div class="bg-white shadow p-3">
    <div class="text-center fw-bold mb-3">Atur ulang kata sandi anda?</div>
    <form @submit.prevent="requestOTP">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" v-model="email" />
      </div>

      <div class="login-btn text-end mb-3">
        <button type="submit" class="btn btn-sm">Request Reset Password</button>
      </div>
    </form>

    <v-otp-input style="align-items: center; justify-content:center" ref="otpInput" input-classes="form-control otp-input"
      separator="-" :num-inputs="4" :should-auto-focus="true" :is-input-num="true" :disabled="checkOTP | OTPconfirmed"
      @on-complete="confirmOTP" />

    <div class="new-password-form mt-3" v-if="OTPconfirmed">
      <form @submit.prevent="resetPassword">
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Password Baru</label>
              <input type="password" class="form-control" v-model="password" />
            </div>
          </div>

          <div class="col-md-6">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Ulangi Password Baru</label>
              <input type="password" class="form-control" v-model="password_confirmation" />
            </div>
          </div>
        </div>

        <div class="login-btn text-end mb-3">
          <button type="submit" class="btn btn-sm">Simpan Password Baru</button>
        </div>
      </form>
    </div>

    <div class="side-menu-item text-center mt-3">
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
      email: '',
      checkOTP: false,
      OTPconfirmed: false,
      password_confirmation: '',
      password: '',
      otpvalue: ''
    };
  },

  metaInfo() {
    return {
      title: 'Lupa Password',
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
    confirmOTP(value) {
      this.checkOTP = true
      this.otpvalue = value
      return new Promise((resolve, reject) => {
        axios
          .post("verifyOTP", {
            email: this.email,
            otp: value

          })
          .then((response) => {
            console.log(response);

            this.openNotification(
              6000,
              "top-right",
              "success",
              'Request Success',
              response.data.message
            );

            this.OTPconfirmed = true
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              'Request Failed',
              error.response.data.message
            );
            reject(error);
            this.checkOTP = false;
          });
      });
    },
    requestOTP() {
      this.OTPconfirmed = false;
      return new Promise((resolve, reject) => {
        axios
          .post("requestOTP", {
            email: this.email,
          })
          .then((response) => {
            console.log(response);

            this.openNotification(
              6000,
              "top-right",
              "success",
              'Request Success',
              response.data.message
            );
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

    resetPassword() {
      return new Promise((resolve, reject) => {
        axios
          .post("resetPassword", {
            email: this.email,
            otp: this.otpvalue,
            password: this.password,
            password_confirmation: this.password_confirmation,
          })
          .then((response) => {
            console.log(response);

            this.openNotification(
              6000,
              "top-right",
              "success",
              'Request Success',
              response.data.message
            );

            this.$router.push('/login')
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
    }
  }
};
</script>

<style>
input.otp-input {
  font-size: 2em;
  text-align: center;
  width: 60px;
}
</style>