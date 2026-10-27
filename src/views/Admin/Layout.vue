<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Main Sidebar -->
      <aside class="main-sidebar col-12 col-md-3 col-lg-2 px-0">
        <div class="main-navbar">
          <nav
            class="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0"
          >
            <a
              class="navbar-brand w-100 mr-0"
              href="/overview"
              style="line-height: 25px"
            >
              <div class="d-table m-auto">
                <img
                  id="main-logo"
                  class="d-inline-block align-top mr-1"
                  style="max-width: 150px"
                  src="https://www.guepedia.com/assets/img/logo-toko.png"
                  alt="Guepedia Logo"
                />
                <!-- <span class="d-none d-md-inline ml-1">Guepedia</span> -->
              </div>
            </a>
            <a class="toggle-sidebar d-sm-inline d-md-none d-lg-none">
              <i class="material-icons">&#xE5C4;</i>
            </a>
          </nav>
        </div>
        <form
          action="#"
          class="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none"
        >
          <div class="input-group input-group-seamless ml-3">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fas fa-search"></i>
              </div>
            </div>
            <input
              class="navbar-search form-control"
              type="text"
              placeholder="Search for something..."
              aria-label="Search"
            />
          </div>
        </form>
        <div class="nav-wrapper">
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link active" href="/overview">
                <i class="material-icons">edit</i>
                <span>Dashboard</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/store">
                <i class="material-icons">vertical_split</i>
                <span>Penjualan</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/review">
                <i class="material-icons">note_add</i>
                <span>Review Buku</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/naskah">
                <i class="material-icons">view_module</i>
                <span>File Naskah</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/salesreport">
                <i class="material-icons">table_chart</i>
                <span>Daftar Penjualan</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/inputsales">
                <i class="material-icons">table_chart</i>
                <span>Input Penjualan</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/royalti">
                <i class="material-icons">person</i>
                <span>Penarikan</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/user">
                <i class="material-icons">error</i>
                <span>User</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/datareseller">
                <i class="material-icons">error</i>
                <span>Reseller</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/our-team">
                <i class="material-icons">face</i>
                <span>Administrator</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/setting">
                <i class="material-icons">settings</i>
                <span>Pengaturan Toko</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <!-- End Main Sidebar -->
      <main
        class="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3"
      >
        <div class="main-navbar sticky-top bg-white">
          <!-- Main Navbar -->
          <nav
            class="navbar align-items-stretch navbar-light flex-md-nowrap p-0"
          >
            <form
              action="#"
              class="main-navbar__search w-100 d-none d-md-flex d-lg-flex"
            >
              <!-- <div class="input-group input-group-seamless ml-3">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i class="fas fa-search"></i>
                  </div>
                </div>
                <input
                  class="navbar-search form-control"
                  type="text"
                  placeholder="Search for something..."
                  aria-label="Search"
                />
              </div> -->
            </form>
            <ul class="navbar-nav border-left flex-row">
              <li class="nav-item border-right dropdown notifications">
                <a
                  class="nav-link nav-link-icon text-center"
                  role="button"
                  id="dropdownMenuLink"
                  @click="showNotif = !showNotif"
                >
                  <div class="nav-link-icon__wrapper">
                    <i class="material-icons">&#xE7F4;</i>
                    <span class="badge badge-pill badge-danger" v-if="notifications.length > 0">{{notifications.length}}</span>
                  </div>
                </a>
                <div
                  class="dropdown-menu dropdown-menu-small d-block"
                  aria-labelledby="dropdownMenuLink"
                  v-if="showNotif"
                >
                  <a class="dropdown-item" v-for="item in notifications" :key="item.id">
                    <div class="notification__icon-wrapper">
                      <div class="notification__icon">
                        <i class="material-icons">&#xE8D1;</i>
                      </div>
                    </div>
                    <div class="notification__content" v-if="item.type.substr(18) == 'NewOrder'">
                      <router-link :to="{name: 'Store'}">
                      <span class="notification__category">Pesanan Baru</span>
                      <!-- <p :style="!item.read_at ? 'font-weight: bold; color: red' : 'color: black'">Pesanan Baru Dari {{ item.data.order.nama_penerima }}</p> -->
                      <p>Pesanan Baru Dari <b>{{ item.data.order.nama_penerima }}</b></p>
                      </router-link>
                    </div>

                    <div class="notification__content" v-else-if="item.type.substr(18) == 'PaidOrder'">
                      <router-link :to="{name: 'Store', params: {status: 'proses'}}">
                      <span class="notification__category">Pesanan Terbayar</span>
                      <!-- <p :style="!item.read_at ? 'font-weight: bold; color: red' : 'color: black'">Pesanan Baru Dari {{ item.data.order.nama_penerima }}</p> -->
                      <p>Pesanan <b>{{ item.data.order.nama_penerima }}</b> sudah dibayar, silahkan diperiksa.</p>
                      </router-link>
                    </div>
                  </a>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle text-nowrap px-3 mt-3"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  @click="showUserMenu = !showUserMenu"
                >
                  <span class="d-none d-md-inline-block">{{ name }}</span>
                </a>
                <div
                  class="dropdown-menu dropdown-menu-small d-block"
                  v-if="showUserMenu"
                >
                  <a class="dropdown-item" href="user-profile-lite.html">
                    <i class="material-icons">&#xE7FD;</i> Profile</a
                  >
                  <a class="dropdown-item" href="components-blog-posts.html">
                    <i class="material-icons">vertical_split</i> Blog Posts</a
                  >
                  <a class="dropdown-item" href="add-new-post.html">
                    <i class="material-icons">note_add</i> Add New Post</a
                  >
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item text-danger" href="#">
                    <i class="material-icons text-danger">&#xE879;</i> Logout
                  </a>
                </div>
              </li>
            </ul>
            <nav class="nav">
              <a
                href="#"
                class="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center border-left"
                data-toggle="collapse"
                data-target=".header-navbar"
                aria-expanded="false"
                aria-controls="header-navbar"
              >
                <i class="material-icons">&#xE5D2;</i>
              </a>
            </nav>
          </nav>
        </div>
        <!-- / .main-navbar -->
        <div class="main-content-container container-fluid px-4">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {},
  data() {
    return {
      showNotif: false,
      showUserMenu: false,
      name: localStorage.getItem("admin_name"),

      notifications:[]
    };
  },

  methods:{
    getData() {
      this.loading = true;
      axios
        .get("notifications", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("admin_access_token"),
          },
        })
        .then((response) => {
          this.notifications = response.data.data.data;
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
  },

  mounted() {
    this.getData();

    var id = localStorage.getItem("admin_id");
    window.Echo.private("App.Models.Admin." + id).notification(
      (notification) => {

        if(notification.type == 'App\Notifications\NewOrder'){
          var title = 'Pesanan Baru';
          var message = "Pesanan baru dari "+notification.order.nama_penerima
        } else if (notification.type == 'App\Notifications\PaidOrder'){
          var title = 'Pesanan Terbayar';
          var message = "Pesanan "+notification.order.nama_penerima+" Terbayar, silahkan Diperiksa!"
        }

        this.openNotification(
          10000,
          "top-right",
          "success",
          title,
          message
        );

        this.getData();

        console.log(notification.type);
      }
    );
  },

  watch: {
    $route() {
      this.getData();
    },
  },
};
</script>

<style scoped>
@import "../../assets/styles/extras.1.1.0.min.css";
@import "../../assets/styles/shards-dashboards.1.1.0.min.css";
@import url(https://fonts.googleapis.com/icon?family=Material+Icons);
@import url(https://use.fontawesome.com/releases/v5.0.6/css/all.css);
</style>
