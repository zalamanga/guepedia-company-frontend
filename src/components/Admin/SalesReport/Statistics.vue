<template>
  <div id="statistics" class="mt-3">
    <div class="row">
      <div class="col-lg col-md-6 col-sm-6 mb-4">
        <router-link :to="{ name: 'SalesReport' }">
          <div class="stats-small stats-small--1 card card-small bg-info">
            <div class="py-3 d-flex">
              <div class="d-flex flex-column m-auto">
                <div class="stats-small__data text-center">
                  <span class="stats-small__label text-uppercase text-dark"
                    >Semua Order</span
                  >
                  <h6 class="stats-small__value count my-3 text-light">--</h6>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-lg col-md-6 col-sm-6 mb-4">
        <router-link
          :to="{ name: 'SalesReport', params: { status: 'Terima' } }"
        >
          <div class="stats-small stats-small--1 card card-small bg-primary">
            <div class="py-3 d-flex">
              <div class="d-flex flex-column m-auto">
                <div class="stats-small__data text-center">
                  <span class="stats-small__label text-uppercase text-light"
                    >Terima</span
                  >
                  <h6 class="stats-small__value count my-3 text-light">{{data.terima}}</h6>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-lg col-md-4 col-sm-6 mb-4">
        <router-link
          :to="{ name: 'SalesReport', params: { status: 'Proses' } }"
        >
          <div class="stats-small stats-small--1 card card-small bg-danger">
            <div class="py-3 d-flex">
              <div class="d-flex flex-column m-auto">
                <div class="stats-small__data text-center">
                  <span class="stats-small__label text-uppercase text-light"
                    >Proses</span
                  >
                  <h6 class="stats-small__value count my-3">{{data.proses}}</h6>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-lg col-md-4 col-sm-6 mb-4">
        <router-link
          :to="{ name: 'SalesReport', params: { status: 'Siap Cetak' } }"
        >
          <div class="stats-small stats-small--1 card card-small bg-secondary">
            <div class="py-3 d-flex">
              <div class="d-flex flex-column m-auto">
                <div class="stats-small__data text-center">
                  <span class="stats-small__label text-uppercase text-light"
                    >Siap Cetak</span
                  >
                  <h6 class="stats-small__value count my-3 text-light">{{data.siap_cetak}}</h6>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-lg col-md-4 col-sm-6 mb-4">
        <router-link :to="{ name: 'SalesReport', params: { status: 'Cetak' } }">
          <div class="stats-small stats-small--1 card card-small bg-warning">
            <div class="py-3 d-flex">
              <div class="d-flex flex-column m-auto">
                <div class="stats-small__data text-center">
                  <span class="stats-small__label text-uppercase text-dark"
                    >Cetak</span
                  >
                  <h6 class="stats-small__value count my-3">{{data.cetak}}</h6>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-lg col-md-4 col-sm-6 mb-4">
        <router-link
          :to="{ name: 'SalesReport', params: { status: 'Proses Kirim' } }"
        >
          <div class="stats-small stats-small--1 card card-small bg-dark">
            <div class="py-3 d-flex">
              <div class="d-flex flex-column m-auto">
                <div class="stats-small__data text-center">
                  <span class="stats-small__label text-uppercase text-light"
                    >Proses Kirim</span
                  >
                  <h6 class="stats-small__value count my-3 text-light">{{data.proses_kirim}}</h6>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-lg col-md-4 col-sm-6 mb-4">
        <router-link
          :to="{ name: 'SalesReport', params: { status: 'Retur' } }"
        >
          <div class="stats-small stats-small--1 card card-small bg-danger">
            <div class="py-3 d-flex">
              <div class="d-flex flex-column m-auto">
                <div class="stats-small__data text-center">
                  <span class="stats-small__label text-uppercase text-light">
                    Retur
                  </span>
                  <h6 class="stats-small__value count my-3 text-light">{{data.retur}}</h6>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-lg col-md-4 col-sm-6 mb-4">
        <router-link :to="{ name: 'SalesReport', params: { status: 'Kirim' } }">
          <div class="stats-small stats-small--1 card card-small bg-success">
            <div class="py-3 d-flex">
              <div class="d-flex flex-column m-auto">
                <div class="stats-small__data text-center">
                  <span class="stats-small__label text-uppercase text-light"
                    >Terkirim</span
                  >
                  <h6 class="stats-small__value count my-3 text-light">{{data.kirim}}</h6>
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
        .get("salesStat", {
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
};
</script>
