<template>
  <div class="navigation-bar fixed-top">
    <div class="main-nav p-2">
      <div class="d-flex justify-content-evenly">
        <div class="category-btn">
          <div class="dropdown">
            <button type="button" class="btn btn-light btn-sm" @click="showCategory = !showCategory">
              Kategori
            </button>
          </div>
        </div>

        <div class="input-group input-group-sm search-form mx-3">
          <input type="text" class="form-control" placeholder="Cari Judul Atau Nama Penulis"
            aria-label="Cari Judul Atau Nama Penulis" aria-describedby="button-addon2" v-model="keyword" />
          <button class="btn btn-secondary" type="submit" id="button-addon2" @click="applyKeyword">
            <b-icon icon="search"></b-icon>
          </button>
        </div>

        <div class="category-btn">
          <div class="dropdown">
            <button type="button" class="btn btn-light btn-sm" @click="showMenu = !showMenu">
              <i class="bi bi-list" v-if="!showMenu"></i>
              <i class="bi bi-x" v-else></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="category-menu cat-mb px-3 py-3 bg-white" v-if="showCategory">
      <div class="row">
        <div class="col-12 col-md-3 py-1" v-for="item in categories" :key="item.id_kategori"
          @click="showCategory = !showCategory">
          <router-link :to="{
            name: 'OurProduct',
            query: { cat: item.id_kategori_naskah },
          }">{{ item.nama_kategori }}</router-link>
        </div>
      </div>
    </div>

    <div class="category-menu cat-mb px-3 py-3 bg-white" v-if="showMenu">
      <div class="text-center">
        <b-link to="/">
          <img src="@/assets/image/logo.png" style="width: 80px; height: auto;" />
        </b-link>
      </div>

      <hr />

      <div class="d-flex">
        <div class="action-btn ms-auto">
          <b-link to="/cart">
            <div class="btn-sm wrapper">
              <i class="bi bi-cart3"></i>
              <span class="badge notif-badge" v-if="totalQty">{{
              totalQty
              }}</span>
            </div>
          </b-link>
        </div>

        <div class="login-btn ms-3 me-auto">
          <a href="/login" v-if="!Auth"><button type="button" class="btn btn-sm">Login</button></a>

          <b-link to="/dashboard" v-else>
            <div class="btn-sm d-flex align-items-center">
              <b-avatar :text="name | initial" class="me-2" v-if="avatar == 'null'" size="sm"></b-avatar>
              <b-avatar v-else variant="info" :src="
                'https://www.guepedia.com/uploads/photo_profile/' + avatar
              " class="me-2" size="sm"></b-avatar>
              <span class="me-3">{{ name }}</span>
            </div>
          </b-link>
        </div>
      </div>

      <!-- Main Menu Items -->
      <div class="menu-item row mt-3">
        <div class="col-12 py-1" @click="showMenu = !showMenu">
          <router-link :to="{ name: 'Index' }" class="main-menu-link">
            <i class="bi bi-house me-2"></i><strong>Home</strong>
          </router-link>
        </div>
        
        <div class="col-12 py-1" @click="showMenu = !showMenu">
          <router-link :to="{ name: 'Terbit' }" class="main-menu-link">
            <i class="bi bi-book me-2"></i>
            <span v-if="now <= date"><strong>Terbit Gratis</strong></span>
            <span v-else><strong>Cara Terbit</strong></span>
          </router-link>
        </div>
        
        <div class="col-12 py-1" @click="showMenu = !showMenu">
          <router-link :to="{ name: 'CaraOrder' }" class="main-menu-link">
            <i class="bi bi-cart me-2"></i><strong>Cara Beli Buku</strong>
          </router-link>
        </div>
        
        <div class="col-12 py-1" @click="showMenu = !showMenu">
          <router-link :to="{ name: 'JadiPenulis' }" class="main-menu-link">
            <i class="bi bi-pen me-2"></i><strong>Cara Jadi Penulis</strong>
          </router-link>
        </div>
        
        <div class="col-12 py-1" @click="showMenu = !showMenu">
          <router-link :to="{ name: 'GhostWriting' }" class="main-menu-link">
            <i class="bi bi-person-lines-fill me-2"></i><strong>Ghost Writer</strong>
          </router-link>
        </div>

            <div class="col-12 py-1">
          <a href="https://blog.guepedia.com" target="_blank" rel="noopener noreferrer" class="main-menu-link">
            <i class="bi bi-people me-2"></i><strong>Blog</strong>
          </a>
        </div>
        
        <div class="col-12 py-1">
          <a href="https://reseller.guepedia.com" target="_blank" rel="noopener noreferrer" class="main-menu-link">
            <i class="bi bi-people me-2"></i><strong>Cara Jadi Reseller</strong>
          </a>
        </div>

        <!-- Divider -->
        <div class="col-12">
          <hr class="my-3">
        </div>

        <!-- Menu Penulis Section -->
        <div class="penulis-menu mt-2" v-if="Auth">
          <strong class="menu-section-title">
            <i class="bi bi-person-workspace me-2"></i>Menu Penulis
          </strong>
          <ul class="menu-list">
            <li>
              <router-link :to="{ name: 'Dashboard' }" @click="showMenu = !showMenu">
                <i class="bi bi-speedometer2 me-2"></i>Dashboard
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Upload' }" @click="showMenu = !showMenu">
                <i class="bi bi-cloud-upload me-2"></i>Upload Naskah
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Project' }" @click="showMenu = !showMenu">
                <i class="bi bi-file-earmark-text me-2"></i>Naskah Saya
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'ReviewBuku' }" @click="showMenu = !showMenu">
                <i class="bi bi-star me-2"></i>Review Buku
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Haki' }" @click="showMenu = !showMenu">
                <i class="bi bi-shield-check me-2"></i>Daftar Hak Cipta
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Sales' }" @click="showMenu = !showMenu">
                <i class="bi bi-graph-up me-2"></i>Laporan Penjualan
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Royalty' }" @click="showMenu = !showMenu">
                <i class="bi bi-coin me-2"></i>Bagi Hasil
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Data Transaksi Section -->
        <div class="penulis-menu mt-3" v-if="Auth">
          <strong class="menu-section-title">
            <i class="bi bi-receipt me-2"></i>Data Transaksi
          </strong>
          <ul class="menu-list">
            <li>
              <router-link :to="{ name: 'Transaction' }" @click="showMenu = !showMenu">
                <i class="bi bi-credit-card me-2"></i>Transaksi Saya
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Account' }" @click="showMenu = !showMenu">
                <i class="bi bi-gear me-2"></i>Pengaturan Profil
              </router-link>
            </li>
          </ul>
        </div>


        <!-- Social Media -->
        <div class="penulis-menu mt-3">
          <strong class="menu-section-title">
            <i class="bi bi-share me-2"></i>Ikuti Kami
          </strong>
          <ul class="menu-list social-links">
            <li class="d-inline-block me-3">
              <a href="https://instagram.com/guepedia" target="_blank" class="social-link">
                <i class="bi bi-instagram"></i>
              </a>
            </li>
            <li class="d-inline-block me-3">
              <a href="https://facebook.com/guepedia" target="_blank" class="social-link">
                <i class="bi bi-facebook"></i>
              </a>
            </li>
            <li class="d-inline-block me-3">
              <a href="https://twitter.com/guepedia" target="_blank" class="social-link">
                <i class="bi bi-twitter"></i>
              </a>
            </li>
            <li class="d-inline-block">
              <a href="https://youtube.com/guepedia" target="_blank" class="social-link">
                <i class="bi bi-youtube"></i>
              </a>
            </li>
          </ul>
        </div>

        <!-- Logout Button -->
        <div class="side-menu-item logout my-3 text-center" v-if="Auth">
          <button class="btn btn-danger logout-btn w-100" @click="logout">
            <i class="bi bi-power"></i><span class="ms-3">LOGOUT</span>
          </button>
        </div>

        <!-- App Info -->
        <div class="app-info text-center mt-3 mb-2">
          <small class="text-muted">
            Guepedia v2.0<br>
            © 2024 All Rights Reserved
          </small>
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
      showMenu: false,
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
      this.showMenu = false; // Close menu after search
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

    logout() {
      const token = localStorage.getItem('access_token');
      const AuthStr = 'Bearer ' + token;
      axios.post('logout', { api_token: AuthStr }, {
        headers: {
          "Access-Control-Allow-Headers": "*",
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': AuthStr
        }
      }).then(response => {
        localStorage.clear();
        this.$router.go();
      }).catch(error => console.log(error));
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
      return !!localStorage.getItem("access_token");
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
    $route() {
      this.showMenu = false;
      this.showCategory = false;
    },
  },
};
</script>

<style scoped>
.cat-mb {
  min-height: calc(100vh - 50px);
  max-height: calc(100vh - 50px);
  overflow-y: scroll;
}

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

.menu-list {
  padding-left: 1rem;
}

.penulis-menu li {
  list-style: none;
  line-height: 2.2em;
}

/* Enhanced Styling */
.main-menu-link {
  display: block;
  color: #333;
  text-decoration: none;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;
}

.main-menu-link:hover {
  color: #007bff;
  text-decoration: none;
  padding-left: 10px;
}

.menu-section-title {
  color: #495057;
  font-size: 0.9em;
  display: block;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid #e9ecef;
}

.help-link {
  color: #6c757d;
  text-decoration: none;
  transition: color 0.3s ease;
}

.help-link:hover {
  color: #007bff;
  text-decoration: none;
}

.social-links li {
  list-style: none;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background: #f8f9fa;
  border-radius: 50%;
  color: #6c757d;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #007bff;
  color: white;
  text-decoration: none;
  transform: translateY(-2px);
}

.logout-btn {
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: #dc3545;
  border-color: #dc3545;
  transform: scale(1.02);
}

.app-info {
  border-top: 1px solid #eee;
  padding-top: 15px;
}

/* Smooth scrolling */
.cat-mb {
  scroll-behavior: smooth;
}

/* Better spacing */
.penulis-menu {
  margin-top: 20px;
}

.penulis-menu:first-of-type {
  margin-top: 10px;
}
</style>