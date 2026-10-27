<template>
  <div id="statistics" class="mt-3">
    <div class="row">

      <div class="col-lg-4 col-md-6 col-sm-6 mb-4">
        <div class="stats-small stats-small--1 card card-small">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Buku Terjual<br><strong>{{data.month}}</strong></span>
                <h6 class="stats-small__value count my-3">{{data.sales_qty.this_month}}</h6>
              </div>
              <div class="stats-small__data" v-if="data.sales_qty.this_month > data.sales_qty.last_month">
                <span class="stats-small__percentage stats-small__percentage--increase">
                  {{data.sales_qty.last_month}}
                </span>
              </div>

              <div class="stats-small__data" v-else>
                <span class="stats-small__percentage stats-small__percentage--decrease">
                  {{data.sales_qty.last_month}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-md-6 col-sm-6 mb-4">
        <div class="stats-small stats-small--1 card card-small">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Jumlah Transaksi<br><strong>{{data.month}}</strong></span>
                <h6 class="stats-small__value count my-3">{{data.transaction.this_month}}</h6>
              </div>
              <div class="stats-small__data">
                <div class="stats-small__data" v-if="data.transaction.this_month > data.transaction.last_month">
                  <span class="stats-small__percentage stats-small__percentage--increase">
                    {{data.transaction.last_month}}
                  </span>
                </div>

                <div class="stats-small__data" v-else>
                  <span class="stats-small__percentage stats-small__percentage--decrease">
                    {{data.transaction.last_month}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-md-6 col-sm-6 mb-4">
        <div class="stats-small stats-small--1 card card-small">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Pendapatan<br><strong>{{data.month}}</strong></span>
                <h6 class="stats-small__value count my-3">{{data.income.this_month | currency}}</h6>
              </div>
              <div class="stats-small__data">
                <div class="stats-small__data" v-if="data.income.this_month > data.income.last_month">
                  <span class="stats-small__percentage stats-small__percentage--increase">
                    {{data.income.last_month | currency}}
                  </span>
                </div>

                <div class="stats-small__data" v-else>
                  <span class="stats-small__percentage stats-small__percentage--decrease">
                    {{data.income.last_month | currency}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg col-md-6 col-sm-6 mb-4">
        <div class="stats-small stats-small--1 card card-small">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Bagi Hasil</span>
                <h6 class="stats-small__value count my-3">{{data.royalty | currency}}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg col-md-6 col-sm-6 mb-4">
        <div class="stats-small stats-small--1 card card-small">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase">Naskah Terpublish</span>
                <h6 class="stats-small__value count my-3">{{data.naskah}}</h6>
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
        .get("adminStat", {
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

<style>
.big-val {
  font-size: 1.4rem !important;
}
</style>