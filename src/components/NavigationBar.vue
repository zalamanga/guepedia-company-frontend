<template>
  <div class="navigation-bar fixed-top">
    <div class="top-nav">
      <div class="container-fluid d-flex py-2 px-5">
        <div class="me-auto">
          <a
            href="https://play.google.com/store/apps/details?id=com.wGuepedia_12045959&hl=in&gl=US"
            target="_blank"
            >Download Aplikasi Guepedia</a
          >
        </div>
        <div class="top-menu ms-auto">
          <!-- <a
            href="/artikel"
            class="me-4"
            target="_blank"
            rel="noopener noreferrer"
            >Artikel</a
          > -->

          <a href="/terbit" class="me-4" rel="noopener noreferrer">
            <span v-if="now <= date">Terbit Gratis</span>
            <span v-else>Cara Terbit</span>
          </a>
          <a
            href="/cara-order"
            class="me-4"
            target="_blank"
            rel="noopener noreferrer"
            >Cara Beli Buku</a
          >
          <a
            href="/jadi-penulis"
            class="me-4"
            target="_blank"
            rel="noopener noreferrer"
            >Cara Jadi Penulis</a
          >
        
          <a
            href="/ghost-writing"
            class="me-4"
            target="_blank"
            rel="noopener noreferrer"
            >Ghost Writer</a
          >

          <a
            href="https://blog.guepedia.com"
            class="me-4"
            target="_blank"
            rel="noopener noreferrer"
            >Blog</a
          >

          
          <a href="https://reseller.guepedia.com" target="_blank" rel="noopener noreferrer"
            >Cara Jadi Reseller</a
          >
        </div>
      </div>
    </div>

    <div class="main-nav">
      <div class="container-fluid d-flex px-5 py-2">
        <div class="image-brand">
          <b-link to="/">
            <img src="@/assets/image/logo.png" />
          </b-link>
        </div>

        <div class="category-btn ms-4">
          <div class="dropdown">
            <button
              type="button"
              class="btn btn-light btn-sm"
              @click="showCategory = !showCategory"
            >
              Kategori
            </button>
          </div>
        </div>

        <form @submit.prevent="applyKeyword" class="mx-5 search-form w-100">
          <div class="input-group input-group-sm">
            <input
              type="text"
              class="form-control"
              placeholder="Cari Judul Buku Atau Nama Penulis"
              aria-label="Cari Judul Buku Atau Nama Penulis"
              aria-describedby="button-addon2"
              v-model="keyword"
            />
            <button
              class="btn btn-secondary"
              type="submit"
              id="button-addon2"
              @click="applyKeyword"
            >
              <b-icon icon="search"></b-icon>
            </button>
          </div>
        </form>

        <div class="action-btn">
          <b-link to="/cart">
            <div class="btn-sm wrapper">
              <i class="bi bi-cart3"></i>
              <span class="badge notif-badge" v-if="totalQty">{{
                totalQty
              }}</span>
            </div>
          </b-link>

          <div class="cart-dropdown shadow p-3 mt-3">
            <div class="cart-header">
              <div class="menu-title">Keranjang Belanja ({{ totalQty }})</div>
            </div>

            <hr />

            <div class="cart-product">
              <div
                class="cart-item"
                v-for="item in cart"
                :key="item.id_file_naskah"
              >
                <div class="row align-items-center">
                  <div class="col-md-2 col-lg-2">
                    <img
                      :src="item.file_cover | cover"
                      class="card-img-top product-image"
                    />
                  </div>
                  <div class="col-md-6 col-lg-6">
                    <div class="cart-product-title">{{ item.judul }}</div>
                    <div class="cart-product-qty">{{ item.qty }} Barang</div>
                  </div>
                  <div class="col-md-4 col-lg-4">
                    <div class="cart-product-price text-right">
                      {{ (item.harga * item.qty) | currency }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div v-if="Auth" class="mx-2">
          <b-link to="/notification">
            <div class="btn-sm wrapper">
              <i class="bi bi-bell"></i>
              <span class="badge notif-badge">{{ totalQty }}</span>
            </div>
          </b-link>
        </div> -->

        <div class="login-btn ms-3">
          <a href="/login" v-if="!Auth"
            ><button type="button" class="btn btn-sm">Login</button></a
          >

          <b-link to="/dashboard" v-else>
            <div class="btn-sm d-flex align-items-center">
              <b-avatar
                :text="name | initial"
                class="me-2"
                v-if="avatar == 'null'"
                size="sm"
              ></b-avatar>
              <b-avatar
                v-else
                variant="info"
                :src="
                  'https://www.guepedia.com/uploads/photo_profile/' + avatar
                "
                class="me-2"
                size="sm"
              ></b-avatar>
              <span class="me-3">{{ name }}</span>
            </div>
          </b-link>
        </div>
      </div>
    </div>

    <div class="category-menu px-5 py-3 bg-white" v-if="showCategory">
      <div class="row">
        <div
          class="col-12 col-md-3 py-1"
          v-for="item in categories"
          :key="item.id_kategori"
          @click="showCategory = !showCategory"
        >
          <router-link
            :to="{
              name: 'OurProduct',
              query: { cat: item.id_kategori_naskah },
            }"
            >{{ item.nama_kategori }}</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      avatar: localStorage.getItem("avatar"),
      name: localStorage.getItem("name"),

      categories: [],
      showCategory: false,
      keyword: "",

      date: "",
      now: new Date(),
    };
  },

  methods: {
    ...mapActions(["saveCart"]),
    applyKeyword() {
      var cat = this.$route.query.cat;
      var keyword = this.keyword;
      this.$router.push({
        name: "OurProduct",
        query: { cat: cat, keyword: keyword },
      });
    },
    getCategory() {
  this.loading = true;
  axios
    .get("getCategory", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((response) => {
      this.categories = response.data.data.data.sort((a, b) => {
        if (a.nama_kategori === "Kategori lain-lain") return 1;
        if (b.nama_kategori === "Kategori lain-lain") return -1;
        return a.nama_kategori.localeCompare(b.nama_kategori);
      });
    })
    .catch((error) => console.log(error))
    .finally(() => (this.loading = false));
},

    getData() {
      axios
        .get("getTerbitGratis", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.date = new Date(response.data.data.data.value);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapGetters(["cart"]),
    totalQty() {
      return this.cart.reduce((a, b) => a + b.qty, 0);
    },
    Auth() {
      if (localStorage.getItem("access_token")) {
        return true;
      }
    },
  },
  mounted() {
    this.getCategory();
    this.getData();
  },
  watch: {
    cart: {
      handler(cart) {
        console.log(cart);
      },
      deep: true,
    },
  },
};
</script>

<style>
.notif-badge {
  font-size: 0.6em;
  background: red !important;
}
.wrapper {
  position: relative;
}
.wrapper i {
  font-size: 1.3em;
}
.wrapper span {
  position: absolute;
  top: -2px;
  right: -2px;
}

.category-menu a:hover {
  color: yellowgreen !important;
}
</style>
