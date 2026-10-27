<template>
  <div id="statistics" class="mt-3">
    <div class="row">
      <div class="col-lg-2 col-md-2 col-sm-6 mb-4">
        <router-link :to="{ name: 'Store', params: { status: 'pending' } }">
        <div class="stats-small stats-small--1 card card-small">
          <div class="pt-3 pb-1 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Order Masuk</span>
                <h6 class="stats-small__value count mt-2">{{data.pending.toLocaleString()}}</h6>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-6 mb-4">
        <router-link :to="{ name: 'Store', params: { status: 'proses' } }">
        <div class="stats-small stats-small--1 card card-small">
          <div class="pt-3 pb-1 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Order Dibayar</span>
                <h6 class="stats-small__value count mt-2">{{data.proses.toLocaleString()}}</h6>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-6 mb-4">
        <router-link :to="{ name: 'Store', params: { status: 'terima' } }">
        <div class="stats-small stats-small--1 card card-small">
          <div class="pt-3 pb-1 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Order Proses</span>
                <h6 class="stats-small__value count mt-2">{{data.terima.toLocaleString()}}</h6>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>

      <div class="col-lg-2 col-md-2 col-sm-6 mb-4">
        <!-- <router-link :to="{ name: 'Store', params: { status: 'selesai' } }"> -->
        <div class="stats-small stats-small--1 card card-small">
          <div class="pt-3 pb-1 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Order Selesai</span>
                <h6 class="stats-small__value count mt-2">{{data.selesai.toLocaleString()}}</h6>
              </div>
            </div>
          </div>
        </div>
        <!-- </router-link> -->
      </div>

      <div class="col-lg-2 col-md-2 col-sm-6 mb-4">
        <router-link :to="{ name: 'Store', params: { status: 'expired' } }">
        <div class="stats-small stats-small--1 card card-small">
          <div class="pt-3 pb-1 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Order Expired</span>
                <h6 class="stats-small__value count mt-2">{{data.expired.toLocaleString()}}</h6>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>

      <div class="col-lg-2 col-md-2 col-sm-6 mb-4">
        <router-link :to="{ name: 'Store', params: { status: 'tolak' } }">
        <div class="stats-small stats-small--1 card card-small">
          <div class="pt-3 pb-1 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Order Tolak</span>
                <h6 class="stats-small__value count mt-2">{{data.tolak.toLocaleString()}}</h6>
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
        .get("orderStat", {
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
  }
}
</script>