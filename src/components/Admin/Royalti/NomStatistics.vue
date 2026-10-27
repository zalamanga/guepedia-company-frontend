<template>
  <div id="statistics" class="mt-3">
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-6 mb-4">
        <div class="stats-small stats-small--1 card card-small">
          <div class="pt-3 pb-1 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Belum Dibayar</span>
                <h6 class="stats-small__value count mt-2">{{data.total | currency}}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 mb-4">
        <div class="stats-small stats-small--1 card card-small">
          <div class="pt-3 pb-1 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Belum Diproses</span>
                <h6 class="stats-small__value count mt-2">{{data.pending | currency}}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 mb-4">
        <div class="stats-small stats-small--1 card card-small">
          <div class="pt-3 pb-1 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Sudah Dibayar</span>
                <h6 class="stats-small__value count mt-2">{{data.selesai | currency}}</h6>
              </div>
            </div>
          </div>
        </div>
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
        .get("royaltiSum", {
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