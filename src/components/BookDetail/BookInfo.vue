<template>
  <div class="book-info container-fluid">
    <div class="row">
      <div class="col-12 col-sm-12 col-md-9 col-lg-9">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-4 col-lg-4">
            <img :src="data.file_cover | cover" class="card-img-top product-image shadow" />
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-6">
            <div class="product-detail-title mb-2">{{ data.judul }}</div>
            <!-- <div class="product-detail-statistik">
                  <i class="bi bi-eye-fill"></i> Dilihat <strong>1.000 </strong> •
                  Terjual <strong>1.500</strong>
                </div> -->
            <div class="writer">
              <b-avatar v-if="!data.user.photo" :text="dp" class="me-2"></b-avatar>
              <b-avatar v-else variant="info" :src="'https://www.guepedia.com/uploads/photo_profile/' + data.user.photo"
                class="me-2"></b-avatar>

              <span class="me-3" v-if="data.nama_pena">{{ data.nama_pena }}</span>
              <span class="me-3" v-else>{{ data.penulis }}</span>

              <a :href="'https://www.facebook.com/' + data.user.facebook" target="_blank" rel="noopener noreferrer"
                class="me-2" v-if="data.user.facebook"><button class="btn btn-outline-primary">
                  <i class="bi bi-facebook"></i></button></a>
              <a :href="'https://www.instagram.com/' + data.user.instagram" target="_blank" rel="noopener noreferrer"
                v-if="data.user.instagram"><button class="btn btn-outline-danger">
                  <i class="bi bi-instagram"></i></button></a>
            </div>
            <div class="product-detail-price mt-2 mb-3">
              {{ data.harga | currency }}
            </div>
            <hr class="price-line" />
            <div class="product-detail-item">
              <div class="detail-item">
                <span>Berat</span> : <b>{{ data.berat_buku }}</b> Gram
              </div>
              <div class="detail-item">
                <span>Kategori</span> : <b>{{ data.category.nama_kategori }}</b>
              </div>
            </div>
            <div class="action-btn mt-3">
              <button type="button" class="btn main-btn" @click="buyItem(data)">
                Tambah Ke Keranjang
              </button>
            </div>
          </div>
        </div>

        <div class="product-detail-sinopsis my-4">
          <!-- <div class="detail-sub-title mb-3">Sinopsis</div> -->
          <div v-html="data.sinopsis"></div>
        </div>
      </div>

      <div class="col-12 col-sm-12 col-md-3 col-lg-3">
        <book-action :book_weight="data.berat_buku" />
      </div>
    </div>

  </div>
</template>

<script>
import BookAction from './BookAction.vue'
import axios from "axios";
import { mapActions } from "vuex";
export default {
  components: { BookAction },
  data() {
    return {
      loading: false,
      data: [],
      
      metaTitle: '',
      metaDescription: '',
      metaUrl: '',
      metaImage: ''
    };
  },
  metaInfo() {
    return {
      title: this.metaTitle,
      meta: [
        { vmid: 'description', name: 'description', content: this.metaDescription},
        { property: 'og:type', content: "website" },
        { property: 'og:url', content:  this.metaUrl},
        { property: 'og:title', content: this.metaTitle },
        { property: 'og:description', content: this.metaDescription },
        { property: 'og:image', content: this.metaImage },
        { property: 'og:site_name', content: 'Guepedia' },
      ]
    }
  },
  methods: {
    ...mapActions(["addToCart"]),
    buyItem(data) {
      var title = 'Pemberitahuan'
      var text = 'Produk berhasil ditambahkan ke keranjang belanja anda.'

      this.openNotification(3000, 'bottom-center', 'success', title, text)

      this.addToCart(data)
    },
    getData() {
      this.loading = true;
      var id = this.$route.params.id;
      axios
        .get("naskah/detail/" + id, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.data = response.data.data.naskah;

          var start = this.data.sinopsis.indexOf('Sinopsis');
          var end = start + 200;
          var pre = (this.data.sinopsis.slice(start + 21 , end) + '...').replace( /(<([^>]+)>)/ig, '');
          var cat = this.data.judul + ' ' + this.data.category.nama_kategori;

          this.metaTitle = 'Buku ' + cat + ' Karya ' + this.data.nama_pena;
          this.metaDescription = pre;
          this.metaUrl = "https://www.guepedia.com/book/" + this.data.id_file_naskah;
          this.metaImage = "https://assets.guepedia.com/file_cover/"+this.data.file_cover;

        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
  },

  created() {
    this.getData();
  },

  computed: {
    dp() {
      if (this.data.nama_pena) {
        return this.data.nama_pena.split(' ').map(x => x[0]).join('').slice(0, 2)
      } else {
        return this.data.nama_lengkap.split(' ').map(x => x[0]).join('').slice(0, 2)
      }
    }
  }
};
</script>

<style scoped>
/* Fix untuk gambar buku yang terpotong */
.product-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain; /* Menjaga proporsi tanpa memotong */
  object-position: center;
  border-radius: 8px;
  display: block;
  background-color: #f8f9fa;
}

/* Responsive untuk mobile */
@media (max-width: 768px) {
  .product-image {
    max-height: 300px;
  }
}

@media (max-width: 576px) {
  .product-image {
    max-height: 250px;
  }
}

/* Enhanced shadow effect */
.product-image.shadow {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  transition: transform 0.2s ease;
}

.product-image.shadow:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2) !important;
}

/* Existing styles */
.b-avatar {
  background: yellowgreen;
}

.b-avatar span {
  color: #fff;
}
</style>