<template>
  <div id="statistics" class="mt-3">
    <div class="row">
      <div class="col-md-3 col-sm-6 mb-4">
        <router-link :to="{ name: 'Review', params: { status: 'Belum Dibayar' } }">
        <div class="stats-small stats-small--1 card card-small">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Review Masuk</span>
                <h6 class="stats-small__value count my-3">{{data.antrian.toLocaleString()}}</h6>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>
      <div class="col-md-3 col-sm-6 mb-4">
        <router-link :to="{ name: 'Review', params: { status: 'Menunggu Konfirmasi' } }">
        <div class="stats-small stats-small--1 card card-small">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Review Dibayar</span>
                <h6 class="stats-small__value count my-3">{{data.bayar.toLocaleString()}}</h6>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>
      <div class="col-md-2 col-sm-6 mb-4">
        <router-link :to="{ name: 'Review', params: { status: 'proses' } }">
        <div class="stats-small stats-small--1 card card-small">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Review Proses</span>
                <h6 class="stats-small__value count my-3">{{data.proses.toLocaleString()}}</h6>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>

      <div class="col-md-2 col-sm-6 mb-4">
        <router-link :to="{ name: 'Review', params: { status: 'Selesai' } }">
        <div class="stats-small stats-small--1 card card-small">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Review Selesai</span>
                <h6 class="stats-small__value count my-3">{{data.selesai.toLocaleString()}}</h6>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>

      <div class="col-md-2 col-sm-6 mb-4">
        <router-link :to="{ name: 'Review', params: { status: 'Tolak' } }">
        <div class="stats-small stats-small--1 card card-small">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Review Ditolak</span>
                <h6 class="stats-small__value count my-3">{{data.tolak.toLocaleString()}}</h6>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  data(){
    return{
      data: []
    }
  },
  methods:{
    getData() {
      this.loading = true;
      axios
        .get("reviewStat", {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer "+localStorage.getItem('admin_access_token')
          },
        })
        .then((response) => {
          this.data = response.data.data.data;
          console.log(response);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
  },
  mounted(){
    this.getData()
  },
  
  watch: {
    $route() {
      this.getData();
    },
  },
}
</script>