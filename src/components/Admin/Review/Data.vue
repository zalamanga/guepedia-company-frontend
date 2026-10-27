<template>
  <div id="order" class="mt-3">

    <div class="d-flex mb-3">
      <h3 class="page-title me-auto">Data Review</h3>

      <form @submit.prevent="getData">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Cari Judul Buku" v-model="search">
        <button class="btn btn-warning text-dark" type="submit"><b-icon icon="search"></b-icon></button>
      </div>
      </form>
    </div>

    <div class="text-center mb-3 d-flex" v-if="loading">
        <b-spinner variant="info" class="ms-auto"></b-spinner>
        <b-spinner variant="info" class="me-auto" type="grow"></b-spinner>
    </div>

    <div class="row" v-else>
      <div
        class="col-lg-12 col-sm-12 mb-4"
        v-for="d in data" :key="d.id_review"
      >
        <div class="card card-small card-post card-post--aside card-post--1" v-if="d.naskah != null">
          <div class="row">
            <div class="col-md-3">
              <div class="card-post__image" v-if="d.naskah.file_cover">
                <b-img-lazy
                  v-bind="mainProps"
                  :src="'https://www.guepedia.com/uploads/file_cover/' + d.naskah.file_cover"
                  class="w-100"
                  v-if="d.naskah.file_cover"
                ></b-img-lazy>

                <img v-else src="@/assets/image/no-image.png" class="w-100" />
                <a class="card-post__category badge badge-pill badge-info">{{ d.status }}</a>
              </div>
            </div>

            <div class="col-md-9">
              <div class="pt-3">
                <h5 class="card-title">
                  <div class="text-fiord-blue"
                    >{{ d.naskah.judul }} - 
                    <span v-if="d.user.nama_pena">{{ d.user.nama_pena }}</span>
                    <span v-else>{{ d.user.nama_lengkap }}</span>
                  </div>
                </h5>
                <p v-if="d.link">{{d.link}}</p>
              </div>

              <div class="action-btn mb-3">
                <button v-if="d.status != 'Belum Dibayar' || d.status == 'Tolak'" class="btn btn-warning me-3" type="button" 
                @click="showBukti(d.bukti_transfer)">
                  <span class="text-uppercase page-subtitle fw-bold"
                    >Lihat Bukti Transfer</span
                  >
                </button>
                <button class="btn btn-info me-3" type="button"
                @click="showDetail(d.naskah.judul, d.naskah.file_cover, d.arti_judul, d.about, d.kesimpulan, d.penulis, d.cerita)">
                  <span class="text-uppercase page-subtitle fw-bold"
                    >Detail Untuk Review</span
                  >
                </button>

                <button class="btn btn-success" type="button" v-if="d.status == 'Proses'"
                @click="reviewSelesai(d.id_review)">
                  <span class="text-uppercase page-subtitle fw-bold"
                    >Tandai Sebagai Selesai</span
                  >
                </button>
              </div>

              <div class="action-btn" v-if="d.status == 'Belum Dibayar' || d.status == 'Menunggu Konfirmasi'">
                <button class="btn btn-danger me-3" type="button" @click="reviewAction(d.id_review, 'tolak')">
                  <span class="text-uppercase page-subtitle fw-bold"
                    >Tolak Review</span
                  >
                </button>
                <button class="btn btn-success" type="button" @click="reviewAction(d.id_review, 'terima')">
                  <span class="text-uppercase page-subtitle fw-bold"
                    >Terima Review</span
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center" v-if="!loading">
      <pagination
        :data="page"
        @pagination-change-page="getData"
        :limit="5"
        align="center"
      ></pagination>
    </div>

    <b-modal ref="buktiTransferModal" hide-header hide-footer hide-header-close centered>
      <div class="text-center">
        <img :src="'https://www.guepedia.com/uploads/bukti_bayar_review/'+item.bukti_transfer" class="w-100" />
      </div>
    </b-modal>

    <b-modal ref="detailModal" hide-header hide-footer hide-header-close centered scrollable size="xl">
      <div class="text-center"><h3>{{item.judul}}</h3></div>
      <div class="row">
        <div class="col-md-4">
          <img :src="'https://www.guepedia.com/uploads/file_cover/'+item.cover" class="w-100" />
        </div>

        <div class="col-md-8">
          <div class="detail-item mb-3">
            <div class="detail-title"><strong>Arti Judul</strong></div>
            <hr class="price-line"/>
            <div class="detail-content">{{item.arti_judul}}</div>
          </div>

          <div class="detail-item mb-3">
            <div class="detail-title"><strong>Tentang Buku Ini</strong></div>
            <hr class="price-line"/>
            <div class="detail-content">{{item.about}}</div>
          </div>

          <div class="detail-item mb-3">
            <div class="detail-title"><strong>Kesimpulan Buku Ini</strong></div>
            <hr class="price-line"/>
            <div class="detail-content">{{item.kesimpulan}}</div>
          </div>

          <div class="detail-item mb-3">
            <div class="detail-title"><strong>Tentang Penulis</strong></div>
            <hr class="price-line"/>
            <div class="detail-content">{{item.penulis}}</div>
          </div>

          <div class="detail-item mb-3" v-if="item.cerita">
            <div class="detail-title"><strong>Cerita Dibalik Buku</strong></div>
            <hr class="price-line"/>
            <div class="detail-content">{{item.cerita}}</div>
          </div>
        </div>
      </div>
    </b-modal>

    <b-modal ref="reviewSelesaiModal" hide-header hide-footer hide-header-close centered>
      <form @submit.prevent="reviewAction(item.id, 'selesai')">
        <label for="royaltyAmount" class="form-label"
          >Link Video</label
        >
        <textarea class="form-control" rows="5" v-model="item.link" placeholder="Link Video Review"></textarea>

        <button class="btn btn-sm btn-success mt-3" type="submit">Tandai Sebagai Selesai</button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [],
      page: [],

      search: "",

      loading: false,

      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#bbb",
        width: "100%",
      },

      item: {
        id: '',
        link: '',

        
        bukti_transfer: '',
        cover: '',
        judul: '',
        arti_judul: '',
        about: '',
        kesimpulan: '',
        penulis: '',
        cerita: '',
      },

      form:{
        id: "",
        alasan: ""
      }
    };
  },
  methods: {

    reviewSelesai(id){
      this.item.id = id
      this.$refs['reviewSelesaiModal'].show()
    },
    showBukti(img){
      this.item.bukti_transfer = img;
      this.$refs['buktiTransferModal'].show()
    },

    showDetail(judul, file_cover, arti_judul, about, kesimpulan, penulis, cerita){
      this.item.judul = judul
      this.item.cover = file_cover
      this.item.arti_judul = arti_judul
      this.item.about = about
      this.item.kesimpulan = kesimpulan
      this.item.penulis = penulis
      this.item.cerita = cerita

      this.$refs['detailModal'].show()
    },
    
    reviewAction(id, action) {
      this.loading = true;
      var formData = new FormData();
      formData.append("id", id);
      formData.append("status", action);

      formData.append("link", this.item.link);

      return new Promise((resolve, reject) => {
        axios
          .post("reviewAction", formData, {
            headers: {
              "Access-Control-Allow-Headers": "*",
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization:
                "Bearer " + localStorage.getItem("admin_access_token"),
            },
          })
          .then((response) => {
            this.openNotification(
              6000,
              "top-right",
              "success",
              "Success",
              response.data.message
            );
            this.getData();
          })
          .catch((error) => {
            this.openNotification(
              6000,
              "top-right",
              "danger",
              "Failed",
              error.response.data.message
            );
            this.loading = false;
          });
      });
    },

    getData(page = 1) {
      this.loading = true;

      var status = this.$route.params.status;
      if (status) {
        var url = "reviewData/" + status + "?page=" + page;
      } else {
        var url = "reviewData" + "?page=" + page;
      }

      axios
        .post(url, {
          keyword: this.search,
        }, {
          headers: {
            "Content-Type": "application/json",
            'Accept': "application/json",
            'Authorization':
              "Bearer " + localStorage.getItem("admin_access_token"),
          },
        })
        .then((response) => {
          this.data = response.data.data.data.data;
          this.page = response.data.data.data;
          console.log(this.data);
          this.loading = false;
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    
  },
  mounted() {
    this.getData();
  },
  watch: {
    $route() {
      this.getData();
    },
  },
};
</script>
