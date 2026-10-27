<template>
  <div class="side-menu">
    <div class="side-menu card shadow p-3 mb-5">

      <div class="text-center bg-danger text-light side-menu-item">
        <a href="https://reseller.guepedia.com" class="text-light">
          <span>Bergabung Menjadi Reseller</span>
        </a>
      </div>
      <div class="side-menu-item-title my-2">
        <span class="fw-bold">Menu Penulis</span>
      </div>
      <div class="side-menu-item my-1">
        <a href="/dashboard">
          <i class="bi bi-speedometer"></i
          ><span class="ms-3">Dashboard</span>
        </a>
      </div>
      <div class="side-menu-item my-1">
        <a href="/upload">
          <i class="bi bi-upload"></i
          ><span class="ms-3">Upload Naskah</span>
        </a>
      </div>
      <div class="side-menu-item my-1">
        <a href="/projects">
          <i class="bi bi-book"></i
          ><span class="ms-3">Naskah Saya</span>
        </a>
      </div>
      <div class="side-menu-item my-1">
        <a href="/programreview">
          <i class="bi bi-book"></i
          ><span class="ms-3">Review Buku</span>
        </a>
      </div>
      <div class="side-menu-item my-1">
        <a href="/hak-cipta">
          <i class="bi bi-book"></i
          ><span class="ms-3">Daftar Hak Cipta</span>
        </a>
      </div>
      <div class="side-menu-item my-1">
        <a href="/sales">
          <i class="bi bi-journal-check"></i
          ><span class="ms-3">Laporan Penjualan</span>
        </a>
      </div>
      <div class="side-menu-item my-1">
        <a href="/royalty">
          <i class="bi bi-cash-coin"></i
          ><span class="ms-3">Bagi Hasil</span>
        </a>
      </div>
      <hr />
      <div class="side-menu-item-title my-2">
        <span class="fw-bold">Data Transaksi</span>
      </div>
      <div class="side-menu-item my-1">
        <a href="/transaction">
          <i class="bi bi-cash"></i
          ><span class="ms-3">Transaksi Saya</span>
        </a>
      </div>
      <hr />
      <div class="side-menu-item-title my-2">
        <span class="fw-bold">Pengaturan Akun</span>
      </div>
      <div class="side-menu-item my-1">
        <a href="/account">
          <i class="bi bi-gear"></i
          ><span class="ms-3">Pengaturan Profil</span>
        </a>
      </div>
      <div class="side-menu-item logout my-1 mt-3 text-center">
        <button class="btn btn-light logout-btn" @click="logout">
          <i class="bi bi-power"></i><span class="ms-3">LOGOUT</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "side-menu",
  components: {},
  data(){
    return{
      isReseller: [],
      resellerRegistration: []
    }
  },

  methods:{
    logout(){
      const token = localStorage.getItem('access_token')
      const AuthStr = 'Bearer '+ token; 
      axios.post('logout', {api_token: AuthStr}, { headers: {
          "Access-Control-Allow-Headers" : "*",
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
          'Authorization' : AuthStr
          }
      }).then(response => {
          // console.log(response)
          localStorage.clear()
          this.$router.go()
        })
      .catch(error => console.log(error));
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
          this.resellerRegistration = response.data.data.registrationReseller

          console.log(this.resellerRegistration)
        })
      .catch(error => console.log(error));
    }
  },

  mounted(){
    this.getDataReseller()
  }
};
</script>

<style>
.logout span, .logout i{
  color: red !important;
  font-weight: bold;
}
.logout-btn{
  padding: 0;
  margin: 0;
}
</style>