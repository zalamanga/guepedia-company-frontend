<template>
  <div id="statistics" class="mt-3">
    <div class="row">
      <div class="col-lg col-md-6 col-sm-6 mb-4">
        <router-link :to="{ name: 'Royalti', params: { status: 'pending' } }">
        <div class="stats-small stats-small--1 card card-small bg-primary">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase text-light">Pending</span>
                <!-- <h6 class="stats-small__value count my-3">{{data.pending.toLocaleString()}}</h6> -->
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>

      <div class="col-lg col-md-6 col-sm-6 mb-4">
        <router-link :to="{ name: 'Royalti', params: { status: 'Selesai' } }">
        <div class="stats-small stats-small--1 card card-small bg-success">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase text-light">Selesai</span>
                <!-- <h6 class="stats-small__value count my-3">{{data.proses.toLocaleString()}}</h6> -->
              </div>
            </div>
          </div>
        </div>
        </router-link>
      </div>
      <div class="col-lg col-md-4 col-sm-6 mb-4">
        <router-link :to="{ name: 'Royalti', params: { status: 'Dibatalkan' } }">
        <div class="stats-small stats-small--1 card card-small bg-danger">
          <div class="py-3 d-flex">
            <div class="d-flex flex-column m-auto">
              <div class="stats-small__data text-center">
                <span class="stats-small__label text-uppercase text-light">Dibatalkan</span>
                <!-- <h6 class="stats-small__value count my-3">{{data.terima.toLocaleString()}}</h6> -->
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
import axios from 'axios'
export default {
  data(){
    return{
      data: []
    }
  },
  
}
</script>