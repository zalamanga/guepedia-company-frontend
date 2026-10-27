<template>
  <div class="term-area p-3">
    <div class="term-title">
      <h4 class="fw-bold">Registrasi Reseller</h4>
      <hr class="price-line" />

      <!-- Form Start -->
      <form @submit.prevent="registerReseller" v-if="!registrationReseller && !isReseller">
        <div class="form-areas">
          <div class="row">
            <div class="col-12 col-md-6 mb-2">
              <label for="exampleInputEmail1" class="form-label"
                >Nama Toko atau Nama Reseller</label
              >
              <input
                type="text"
                class="form-control"
                v-model="form.name"
                :disabled="registrationReseller"
                required
              />
            </div>
            <div class="col-12 col-md-6 mb-2">
              <label for="exampleInputEmail1" class="form-label"
                >Nomor Telepon</label
              >
              <input
                type="text"
                class="form-control"
                v-model="form.phone"
                :disabled="registrationReseller"
                required
              />
            </div>
            <div class="col-12 col-md-12 col-lg-12 mb-2">
              <label for="exampleInputEmail1" class="form-label"
                >Alamat Lengkap</label
              >
              <textarea
                class="form-control"
                v-model="form.address"
                :disabled="registrationReseller"
                required
              />
            </div>

          </div>
        </div>
        <hr />
        <div class="login-btn mt-3 d-grid gap-2">
          <button type="submit" class="btn btn-sm" :disabled="loading || registrationReseller">
            <span  v-if="loading">Loading ... Mohon untuk tidak merefresh halaman ini</span>
            <span v-else>Daftar Sekarang</span>
          </button>
        </div>
      </form>
      <!-- Form End -->
      
      <div class="confirmation" v-if="registrationReseller && registrationReseller.status == 'Baru'">
        <label for="receipt">Bukti Transfer Deposit</label>
        <input class="form-control" type="file" id="receipt" accept="image/*" v-on:change="confirmReseller()" :disabled="sending">
      </div>

      <div class="resellerInfo mt-4">
          <reseller-stat/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { VueEditor } from "vue2-editor";
import ResellerStat from './ResellerStat.vue';
export default {
  name: "HelloWorld",
  components: {
    VueEditor,
    ResellerStat
  },
  data: () => ({
    form: {
      name:"",
      phone: "",
      address: ""
    },

    confirm: null,
    
    isReseller: [],
    registrationReseller: [],

    loading: false,
    sending: false
  }),

  methods: {
    confirmReseller(){
        this.confirm = document.getElementById("receipt").files[0];

      this.sending = true;
      var formData = new FormData();
      formData.append("confirm", this.confirm);

      return new Promise((resolve, reject) => {
        axios
          .post("confirmReseller", formData, {
            headers: {
              "Access-Control-Allow-Headers": "*",
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          })
          .then((response) => {
            this.openNotification(
              6000,
              "top-right",
              "success",
              "Success",
              response.data.message
            );
            this.getDataReseller();
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              "Failed",
              error.response.data.message
            );
            this.sending = false;
          });
      });
    },
    getDataReseller(){
      const token = localStorage.getItem('access_token')
      const AuthStr = 'Bearer '+ token; 
      axios.get('checkReseller', { headers: {
          "Access-Control-Allow-Headers" : "*",
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
          'Authorization' : AuthStr
          }
      }).then(response => {
          this.isReseller = response.data.data.isReseller
          this.registrationReseller = response.data.data.registrationReseller

          console.log(this.registrationReseller)
          console.log(this.isReseller)
        })
      .catch(error => console.log(error));
    },

    registerReseller() {
      this.loading = true;

      var formData = new FormData();
        formData.append("name", this.form.name);
        formData.append("phone", this.form.phone);
        formData.append("address", this.form.address);

      return new Promise((resolve, reject) => {
        axios
          .post("registerReseller", formData, {
            headers: {
              "Access-Control-Allow-Headers": "*",
              "Content-Type": "application/json",
              Accept: "application/json",
            }
          })
          .then((response) => {
            console.log(response);

            this.openNotification(
              6000,
              "top-right",
              "success",
              "Success",
              response.data.message
            );

            this.getDataReseller()

            this.loading = false;
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              "Failed",
              error.response.data.message
            );
            reject(error);
            this.loading = false;
            this.$Progress.fail()
          });
      });
    },
  },

  mounted() {
    this.getDataReseller();
  },
};
</script>

<style>
.checkbox-label {
  font-size: 0.8em;
}
</style>
