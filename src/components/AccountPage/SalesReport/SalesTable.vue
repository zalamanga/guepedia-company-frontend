<template>
  <div class="chart-area mb-5">
    <div class="chart-title">
      <h4 class="fw-bold">Daftar Penjualan Naskah Saya</h4>
      <hr class="price-line" />

      <div class="table-area p-3 shadow">
        <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th scope="col">Invoice Number</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Order Date</th>
              <th scope="col">Book Title</th>
              <th scope="col">QTY</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in datas" :key="data.id_data_jumlah_penjualan">
              <td>{{ data.no_invoices }}</td>
              <td>{{ data.order.nama_customer }}</td>
              <td>{{ data.order.tanggal_transaksi }}</td>
              <td>{{ data.judul_buku }}</td>
              <td>{{ data.qty }}</td>
              <td>{{ data.order.status_penjualan }}</td>
            </tr>
          </tbody>
        </table>
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
    getData() {
      this.loading = true;

      axios
        .get('salesData', {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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
table {
  font-size: 0.9em;
}
</style>
