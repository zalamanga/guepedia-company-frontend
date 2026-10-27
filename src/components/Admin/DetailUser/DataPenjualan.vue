<template>
  <div class="chart-area mt-5">
    <div class="chart-title">
      <h4 class="fw-bold">Data Penjualan</h4>
      <hr class="price-line" />

      <div class="table-area p-3 shadow">
        <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th scope="col">No Invoice</th>
              <th scope="col">Nama Pemesan</th>
              <th scope="col">Tanggal Transaksi</th>
              <th scope="col">Status</th>
              <th scope="col">Platform</th>
              <th scope="col">Royalti</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in datas.data" :key="data.id_file_naskah">
              <td>{{ data.order.no_invoices }}</td>
              <td>{{ data.order.nama_customer }}</td>
              <td>{{ data.order.tanggal_transaksi }}</td>
              <td>{{ data.order.status_penjualan }}</td>
              <td>{{ data.order.penjualan }}</td>
              <td>{{ data.royalti | currency }}</td>
              <td>
                <router-link :to="{name: 'DetailNaskah', params:{id: data.id_file_naskah}}" class="btn btn-sm btn-info text-dark ms-2">Lihat</router-link>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="text-center mt-3">
          <pagination
            :data="datas"
            @pagination-change-page="getData"
            :limit="5"
            align="center"
          ></pagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    datas: [],

  }),
  methods: {

    getData(page = 1) {
      this.loading = true;
      var id = this.$route.params.id;

      axios
        .get('userPenjualan/'+id+'?page='+page, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("admin_access_token"),
          },
        })
        .then((response) => {
          this.datas = response.data.data.data;
          console.log(response);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
table{
  font-size: 0.9em;
}
</style>