<template>
  <div id="statistics" class="mt-3">
    <div class="row">
      <div class="col-lg col-md-6 col-sm-6 mb-4">
        <router-link :to="{ name: 'DataReseller', params: {status: 'Baru'} }">
          <div class="stats-small stats-small--1 card card-small bg-info">
            <div class="py-3 d-flex">
              <div class="d-flex flex-column m-auto">
                <div class="stats-small__data text-center">
                  <span class="stats-small__label text-uppercase text-dark"
                    >Pendaftar Baru</span
                  >
                  <h6 class="stats-small__value count my-3 text-light">{{data.baru}}</h6>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-lg col-md-6 col-sm-6 mb-4">
        <router-link :to="{ name: 'DataReseller', params: {status: 'Terbayar'} }">
          <div class="stats-small stats-small--1 card card-small bg-primary">
            <div class="py-3 d-flex">
              <div class="d-flex flex-column m-auto">
                <div class="stats-small__data text-center">
                  <span class="stats-small__label text-uppercase text-light"
                    >Terbayar</span
                  >
                  <h6 class="stats-small__value count my-3 text-light">{{data.terbayar}}</h6>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-lg col-md-4 col-sm-6 mb-4">
        <router-link :to="{ name: 'DataReseller', params: {status: 'Aktif'} }">
          <div class="stats-small stats-small--1 card card-small bg-danger">
            <div class="py-3 d-flex">
              <div class="d-flex flex-column m-auto">
                <div class="stats-small__data text-center">
                  <span class="stats-small__label text-uppercase text-light"
                    >Reseller Aktif</span
                  >
                  <h6 class="stats-small__value count my-3 text-light">{{data.aktif}}</h6>
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
import axios from "axios";
export default {
  data() {
    return {
      data: [],
    };
  },
  methods: {
    getData() {
      this.loading = true;
      axios
        .get("resellerStat", {
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
  mounted() {
    this.getData()
  },
  watch: {
    $route() {
      this.getData();
    },
  },
};
</script>
