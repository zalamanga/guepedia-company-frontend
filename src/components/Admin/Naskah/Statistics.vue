<template>
  <div id="statistics" class="mt-3">
    <div class="row">
      <div class="col-lg col-md-6 col-sm-6 mb-4">
        <router-link :to="{ name: 'Naskah'}">
        <div class="stats-small stats-small--1 card card-small bg-primary">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase text-light">Semua</span>
                <h6 class="stats-small__value count my-3 text-light">--</h6>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>
      <div class="col-lg col-md-6 col-sm-6 mb-4">
        <router-link :to="{ name: 'Naskah', params: { status: 'Dalam Antrian' } }">
        <div class="stats-small stats-small--1 card card-small bg-success">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase text-light">Antrian</span>
                <h6 class="stats-small__value count my-3 text-light">{{data.antrian}}</h6>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>
      <div class="col-lg col-md-4 col-sm-6 mb-4">
        <router-link :to="{ name: 'Naskah', params: { status: 'Proses' } }">
        <div class="stats-small stats-small--1 card card-small bg-warning">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase text-light">Proses</span>
                <h6 class="stats-small__value count my-3">{{data.proses}}</h6>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>

      <div class="col-lg col-md-4 col-sm-6 mb-4">
        <router-link :to="{ name: 'Naskah', params: { status: 'Di Revisi' } }">
        <div class="stats-small stats-small--1 card card-small bg-secondary">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase text-light">Revisi</span>
                <h6 class="stats-small__value count my-3 text-light">{{data.revisi}}</h6>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>

      <div class="col-lg col-md-4 col-sm-6 mb-4">
        <router-link :to="{ name: 'Naskah', params: { status: 'Publish' } }">
        <div class="stats-small stats-small--1 card card-small bg-info">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase text-light">Publish</span>
                <h6 class="stats-small__value count my-3">{{data.publish}}</h6>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>

      <div class="col-lg col-md-4 col-sm-6 mb-4">
        <router-link :to="{ name: 'Naskah', params: { status: 'Di tolak' } }">
        <div class="stats-small stats-small--1 card card-small bg-danger">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase text-light">Tolak</span>
                <h6 class="stats-small__value count my-3 text-light">{{data.tolak}}</h6>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>

      <div class="col-lg col-md-4 col-sm-6 mb-4">
        <router-link :to="{ name: 'Naskah', params: { status: 'Pending' } }">
        <div class="stats-small stats-small--1 card card-small bg-dark">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase text-light">Pending</span>
                <h6 class="stats-small__value count my-3 text-light">{{data.pending}}</h6>
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>

      <div class="col-lg col-md-4 col-sm-6 mb-4">
        <router-link :to="{ name: 'Naskah', params: { status: 'Konfirmasi Bayar' } }">
        <div class="stats-small stats-small--1 card card-small bg-info">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase text-light">Bayar</span>
                <h6 class="stats-small__value count my-3 text-light">{{data.bayar}}</h6>
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
        .get("naskahStat", {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer "+localStorage.getItem('admin_access_token')
          },
        })
        .then((response) => {
          this.data = response.data.data.data;
          // console.log(response);
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