<template>
  <div class="chart-area">
    <div class="chart-title">
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
      bersih: [],
      royalti: [],
    },
    stats: [],
    options: {
      dataLabels: {
        enabled: false,
      },
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Total Penjualan",
        type: 'column',
        data: [],
      },
      {
        name: "Bersih",
        type: 'column',
        data: [],
      },
      {
        name: "Royalti",
        type: 'column',
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
        .get("salesChart", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("admin_access_token"),
          },
        })
        .then((response) => {
          this.stats = response.data.data.data;

          // this.date = [];
          // let total = [];
          this.stats.forEach((value, index) => {
            this.datas.date.push(value["tanggal_transaksi"]);
            this.datas.total.push(value["total"]);
            this.datas.bersih.push(value["bersih"]);
            this.datas.royalti.push(value["royalti"]);
          });

          this.options.xaxis.categories = this.datas.date;
          this.series[0].data = this.datas.total;
          this.series[1].data = this.datas.bersih;
          this.series[2].data = this.datas.royalti;
          console.log(this.options.xaxis.categories);
          this.updateSeriesLine();

          console.log(this.stats);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    updateSeriesLine() {
      this.$refs.salesChart.updateSeries(
        [
          {
            data: this.series[0].data.reverse(),
          },
          {
            data: this.series[1].data.reverse(),
          },
          {
            data: this.series[2].data.reverse(),
          },
        ],
        false,
        true
      );

      this.$refs.salesChart.updateOptions({
        xaxis: {
          categories: this.datas.date.reverse(),
        },
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
