<template>
  <div id="app">
    <router-view />
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";
import FooterBar from './components/Footer.vue';
export default {
  components: {
    NavigationBar,
    FooterBar
  },
  data() {
    return {

    }
  },
  metaInfo() {
    return {
      title: "Guepedia - Penerbit Buku Online Gratis Indonesia",
      meta: [
        { name: 'description', content: 'Terbitkan buku Anda GRATIS di Guepedia - Penerbit online terpercaya Indonesia. Dapatkan ISBN dan QRCBN secara resmi, distribusi ke marketplace, dan royalti. Daftar sekarang!' },
        { property: 'og:title', content: "Guepedia - Penerbit Buku Online Gratis Indonesia" },
        { property: 'og:site_name', content: 'Guepedia' },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index,follow' }
      ]
    }
  },
  computed: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

a {
  color: #2c3e50 !important;
  text-decoration: none !important;
}
</style>
