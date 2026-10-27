<template>
  <div class="account-page">
    <chart />
    <sales />
  </div>
</template>

<script>
// @ is an alias to /src
import Chart from "@/components/AccountPage/Dashboard/Chart.vue";
import Sales from "@/components/AccountPage/SalesReport/SalesTable.vue";

export default {
  name: "Home",
  components: {
    Chart,
    Sales
  },
  metaInfo() {
    return {
      title: 'Laporan Penjualan',
      meta: [
        { name: 'description', content: 'Penerbit buku online gratis, anti ribet, dan cepat, puluhan ribu naskah sudah terbit disini, sekarang giliran naskahmu.' },
        { property: 'og:type', content: "website" },
        { property: 'og:url', content: "https://www.guepedia.com/" },
        { property: 'og:title', content: 'Penerbit buku online gratis Indonesia  | Guepedia.com' },
        { property: 'og:description', content: 'Penerbit buku online gratis, anti ribet, dan cepat, puluhan ribu naskah sudah terbit disini, sekarang giliran naskahmu.' },
      ]
    }
  },
};
</script>
