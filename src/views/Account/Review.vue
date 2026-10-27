<template>
  <div class="account-page">
    <review />
  </div>
</template>

<script>
// @ is an alias to /src
import Review from "@/components/AccountPage/Review/Review.vue";

export default {
  components: {
    Review,
  },
  metaInfo() {
    return {
      title: 'Program Review Buku',
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
