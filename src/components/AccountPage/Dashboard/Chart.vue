<template>
  <div class="chart-area">
    <div class="chart-title">
      <h4 class="fw-bold">Grafik Penjualan Naskah Anda</h4>
      <hr class="price-line" />

      <div>
        <apexchart
          ref="salesChart"
          height="400"
          width="100%"
          type="bar"
          :options="options"
          :series="series"
        >
        </apexchart>
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
