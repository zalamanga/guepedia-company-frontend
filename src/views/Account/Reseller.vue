<template>
  <div class="book-detail">
    <div class="row">
      <div class="d-none d-md-block col-md-4 col-lg-4">
        <Term />
      </div>

      <div class="col-12 col-sm-12 col-md-8 col-lg-8">
        <registration />
      </div>
    </div>
  </div>
</template>

<script>
import Term from "@/components/AccountPage/Reseller/Term.vue";
import Registration from "@/components/AccountPage/Reseller/Registration.vue";

export default {
  name: 'Upload',
  components: {
    Term,
    Registration
  },
  metaInfo() {
    return {
      title: 'Gabung Jadi Reseller',
      meta: [
        { name: 'description', content: 'Penerbit buku online gratis, anti ribet, dan cepat, puluhan ribu naskah sudah terbit disini, sekarang giliran naskahmu.' },
        { property: 'og:type', content: "website" },
        { property: 'og:url', content: "https://www.guepedia.com/" },
        { property: 'og:title', content: 'Penerbit buku online gratis Indonesia  | Guepedia.com' },
        { property: 'og:description', content: 'Penerbit buku online gratis, anti ribet, dan cepat, puluhan ribu naskah sudah terbit disini, sekarang giliran naskahmu.' },
      ]
    }
  },
}
</script>