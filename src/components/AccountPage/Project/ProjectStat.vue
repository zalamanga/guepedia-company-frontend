<template>
  <div class="project-stat mb-3">
      <div class="row">
          <div class="col-md-2 col-lg-2">
              <router-link :to="{ name: 'Project' }">
              <div class="project-stat-item text-center p-3 shadow btn-info">
                  <div class="project-stat-title">Semua Naskah</div>
                  <div class="project-stat-value fw-bold">{{data.total}}</div>
              </div>
              </router-link>
          </div>

          <div class="col-md-2 col-lg-2">
              <router-link :to="{ name: 'Project', params: { status: 'publish' } }">
              <div class="project-stat-item text-center p-3 shadow btn-success">
                  <div class="project-stat-title">Naskah <br>Terbit</div>
                  <div class="project-stat-value fw-bold">{{data.publish}}</div>
              </div>
              </router-link>
          </div>

          <div class="col-md-2 col-lg-2">
              <router-link :to="{ name: 'Project', params: { status: 'dalam antrian' } }">
              <div class="project-stat-item text-center p-3 shadow btn-warning">
                  <div class="project-stat-title">Naskah Dalam Antrian</div>
                  <div class="project-stat-value fw-bold">{{data.antrian}}</div>
              </div>
              </router-link>
          </div>

          <div class="col-md-2 col-lg-2">
              <router-link :to="{ name: 'Project', params: { status: 'proses' } }">
              <div class="project-stat-item text-center p-3 shadow btn-primary">
                  <div class="project-stat-title">Naskah Proses</div>
                  <div class="project-stat-value fw-bold">{{data.proses}}</div>
              </div>
              </router-link>
          </div>

          <div class="col-md-2 col-lg-2">
              <router-link :to="{ name: 'Project', params: { status: 'revisi' } }">
              <div class="project-stat-item text-center p-3 shadow btn-danger">
                  <div class="project-stat-title">Naskah <br>Revisi</div>
                  <div class="project-stat-value fw-bold">{{data.revisi}}</div>
              </div>
              </router-link>
          </div>

          <div class="col-md-2 col-lg-2">
              <router-link :to="{ name: 'Project', params: { status: 'tolak' } }">
              <div class="project-stat-item text-center p-3 shadow btn-dark">
                  <div class="project-stat-title">Naskah <br>Tolak</div>
                  <div class="project-stat-value fw-bold">{{data.tolak}}</div>
              </div>
              </router-link>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    data: [],
  }),
  methods: {
    getData() {
      
      axios
        .get('naskahStat', {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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
    this.getData();
  },
};
</script>

<style>
.project-stat-item{
    border-radius: 20px;
}
</style>
