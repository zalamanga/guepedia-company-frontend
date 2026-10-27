<template>
  <div class="account-page">
    <DaftarHAKI />
  </div>
</template>

<script>
// @ is an alias to /src
import DaftarHAKI from "@/components/AccountPage/Project/DaftarHAKI.vue";

export default {
  name: "HAKI",
  components: {
    DaftarHAKI
  },
  metaInfo() {
    return {
      title: 'Daftarkan Hak Cipta Naskah Kamu',
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
