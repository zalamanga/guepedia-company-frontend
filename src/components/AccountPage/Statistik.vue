<template>
  <div class="statistics">
    <div class="row">
      <div class="col-6 col-md-4 col-lg-4">
        <div class="stat-item shadow p-3">
          <div class="row align-items-center">
            <div class="col-12 col-md-2"><i class="bi bi-journals"></i></div>
            <div class="col-12 col-md-10">
              <div class="stat-description text-end">
                <div class="stat-title">Jumlah Naskah</div>
                <div class="stat-value fw-bold">{{stats.total_naskah}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6 col-md-4 col-lg-4">
        <div class="stat-item shadow p-3">
          <div class="row align-items-center">
            <div class="col-12 col-md-2"><i class="bi bi-cash-coin"></i></div>
            <div class="col-12 col-md-10">
              <div class="stat-description text-end">
                <div class="stat-title">Buku Terjual</div>
                <div class="stat-value fw-bold">{{stats.buku_terjual}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4 col-lg-4">
        <div class="stat-item shadow p-3">
          <div class="row align-items-center">
            <div class="col-12 col-md-2"><i class="bi bi-cash-stack"></i></div>
            <div class="col-12 col-md-10">
              <div class="stat-description text-end">
                <div class="stat-title">Saldo Royalti</div>
                <div class="stat-value fw-bold">{{stats.saldo | currency}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "statistics",
  components: {},
  data() {
    return {
        loading: false,
        stats: []
    };
  },
  methods: {
    getData() {
      this.loading = true;
      axios
        .get("myStat", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.stats = response.data.data.data;
          console.log(response);
        })
        .catch((error) => {
          localStorage.clear();
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
.stat-item {
  border-radius: 20px;
  border-bottom: solid 5px yellowgreen;
}
.stat-item i {
  font-size: 2em;
  color: yellowgreen;
}
.stat-value {
  font-size: 1.2em;
}
</style>
