<template>
  <div class="chart-area mt-5">
    <div class="chart-title">
      <h4 class="fw-bold">Daftar Naskah <span style="text-transform: capitalize">{{$route.params.status}}</span> Saya</h4>
      <hr class="price-line" />

      <div class="table-area p-3 shadow">
        <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th scope="col">Tanggal Upload</th>
              <th scope="col">Judul</th>
              <th scope="col">Status</th>
              <th scope="col">Harga</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in datas" :key="data.id_file_naskah">
              <td>{{ data.tanggal_upload }}</td>
              <td>{{ data.judul }}</td>
              <td>{{ data.status }}</td>
              <td>{{ data.harga | currency }}</td>
              <td>
                <button class="btn btn-sm btn-warning" v-if="data.status == 'Publish'" @click="showReviewModal(data.judul, data.id_file_naskah)">Review Buku</button>
                <!-- <router-link :to="{name: 'Page', params:{id: data.id_file_naskah}}" class="btn btn-sm btn-success text-light ms-2" v-if="data.status == 'Publish'">Daftar HAKI</router-link> -->
                <!-- <router-link :to="{name: 'Page', params:{id: data.id_file_naskah}}" class="btn btn-sm btn-info text-dark ms-2" v-if="data.status == 'Publish'">Promo</router-link> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <b-modal ref="reviewModal" hide-footer scrollable hide-header hide-header-close centered size="lg">
      <h5>Pendaftaran Review Buku {{review.judul}}</h5>
      <hr class="price-line"/>

      <div class="review-form">
        <form @submit.prevent="postReview">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="nama">Arti Judul Naskah</label>
                <textarea class="form-control" rows="3" v-model="review.title" placeholder="Ceritakan maksud dari judul naskah ini" required></textarea>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="nama">Ceritakan Tentang Buku Ini</label>
                <textarea class="form-control" rows="3" v-model="review.about" placeholder="Ceritakan secara singkat tentang isi dari buku ini" required></textarea>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="nama">Kesimpulan Buku Ini</label>
                <textarea class="form-control" rows="3" v-model="review.conclusion" placeholder="Gambaran isi keseluruhan dari buku ini" required></textarea>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="nama">Tentang Kamu Sebagai Penulis</label>
                <textarea class="form-control" rows="3" v-model="review.profile" placeholder="Ceritakan profile kamu secara singkat" required></textarea>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label for="nama">Cerita Dibalik Penulisan Buku Ini</label>
                <textarea class="form-control" rows="3" v-model="review.story" placeholder="Ceritakan suka dan duka selama kamu menulis naskah ini" required></textarea>
              </div>
            </div>
          </div>

          <div class="text-end mt-4">
            <button type="submit" class="btn btn-success">Kirim Review</button>
          </div>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    datas: [],

    review: {
      id: '',
      judul: '',
      title: '',
      about: '',
      conclusion: '',
      profile: '',
      story: ''
    }
  }),
  methods: {
    showReviewModal(judul, id){
      this.$refs['reviewModal'].show();

      this.review.id = id;
      this.review.judul = judul;
      console.log(id)
    },

    postReview() {
      this.loading = true;

      var formData = new FormData();
      formData.append('id', this.review.id);
      formData.append('title', this.review.title);
      formData.append('about', this.review.about);
      formData.append('conclusion', this.review.conclusion);
      formData.append('profile', this.review.profile);
      formData.append('story', this.review.story);

      return new Promise((resolve, reject) => {
        axios
          .post("postReview", formData, {
            headers: {
              "Access-Control-Allow-Headers": "*",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log(response);

            this.$router.push({ name: "Project"})
            this.openNotification(
              6000,
              "top-right",
              "success",
              "Success",
              response.data.message
            );

            this.loading = false;
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              "Failed",
              error.response.data.message
            );
            reject(error);
            this.loading = false;
          });
      });
    },

    getData() {
      this.loading = true;
      var status= this.$route.params.status

      if (status) {
        var url = "myNaskah/"+status
      } else {
        var url = "myNaskah"
      }

      axios
        .get(url, {
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
  watch:{
    $route (){
      this.getData();
    }
  } 
};
</script>

<style>
table{
  font-size: 0.9em;
}
</style>