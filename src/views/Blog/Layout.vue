<template>
  <div id="blog">
    <div id="wrapper">
      <div id="sidebar-wrapper">
          <h4>Guepedia Help</h4>
        <ul class="sidebar-nav">
          <li class="sidebar-brand"><a href="/">Home</a></li>
          <li><a href="/about">Tentang Guepedia</a></li>
          <li><a href="/jadi-penulis">Cara Jadi Penulis</a></li>
          <li><a href="/jadi-reseller">Cara Jadi Reseller</a></li>
          <li><a href="/terbit#term-condition">Syarat dan Ketentuan</a></li>
          <li><a href="/terbit">Terbit Naskah</a></li>
          <li><a href="/cara-order">Cara Beli Buku</a></li>
          <li><a href="/privacy">Kebijakan Privasi</a></li>
        </ul>
      </div>
      <div id="page-content-wrapper">
        <div class="page-content">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <router-view/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterBar></FooterBar>
  </div>
</template>

<script>
import FooterBar from "@/components/Footer.vue";

export default {
  created() {},
  components: {
    FooterBar,
  },
};
</script>

<style scoped>
#wrapper {
  padding-left: 250px;
  transition: all 0.4s ease 0s;
}

#sidebar-wrapper {
  margin-left: -200px;
  margin-top: 40px;
  left: 250px;
  width: 250px;
  position: fixed;
  height: 100%;
  overflow-y: auto;
  z-index: 1000;
  transition: all 0.4s ease 0s;
}

#page-content-wrapper {
  width: 100%;
}

.sidebar-nav {
  position: relative;
  top: 0;
  width: 250px;
  list-style: none;
  margin: 0;
  padding: 0;
}
#sidebar-wrapper h4{
    color: yellowgreen !important;
}
.sidebar-nav li{
    font-size: 0.9em;
    line-height: 30px;
}

@media (max-width: 767px) {
  #wrapper {
    padding-left: 0;
  }
  #sidebar-wrapper {
    left: 0;
  }
  #wrapper.active {
    position: relative;
    left: 250px;
  }
  #wrapper.active #sidebar-wrapper {
    left: 250px;
    width: 250px;
    transition: all 0.4s ease 0s;
  }
}
</style>
