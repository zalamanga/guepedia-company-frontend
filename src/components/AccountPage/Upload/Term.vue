<template>
  <div class="term-area p-3 bg-white shadow">
    <div class="term-title">
      <h4 class="fw-bold">Ketentuan Naskah</h4>
      <hr class="price-line" />
      <div class="term-list" style="font-size:0.9em">
        <p>Pastikan didalam file naskah anda terdapat :</p>
        <ol>
          <li>Kata Pengantar.</li>
          <li>Daftar Isi.</li>
          <li>Tentang Penulis.</li>
          <li>
            Sinopsis sebanyak 150 - 250 kata harus menggambarkan keseluruhan isi
            naskah secara jelas, bukan hanya penggalan dari isi naskah atau
            sekadar kata-kata yang tidak menceritakan isi naskah.
          </li>
        </ol>
      </div>

      <div class="login-btn mt-3 d-grid gap-2">
        <a href="https://assets.guepedia.com/template/templateguepedia.zip" class="btn btn-sm btn-primary text-light">Download Template Naskah</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data: () => ({
    datas: {
      date: [],
      total: [],
    },
    options: {
      chart: {
        id: "vuechart-example",
      },
      // colors: ['#9acd32'],
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Jumlah",
        data: [],
      },
    ],
    noData: {
      text: "Loading...",
    },
  }),

  methods: {
    getData() {
      this.loading = true;
      axios
        .get("chartData", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.stats = response.data.data.data;

          // this.date = [];
          // let total = [];
          this.stats.forEach((value, index) => {
            this.datas.date.push(value["tanggal_transaksi"]);
            this.datas.total.push(value["total"]);
          });

          this.options.xaxis.categories = this.datas.date;
          this.series[0].data = this.datas.total;
          console.log(this.options.xaxis.categories);
          this.updateSeriesLine();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    updateSeriesLine() {
      this.$refs.salesChart.updateSeries(
        [
          {
            data: this.series[0].data,
          },
        ],
        false,
        true
      );

      this.$refs.salesChart.updateOptions({
        xaxis: {
          categories: this.datas.date,
        },
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
