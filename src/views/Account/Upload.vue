<template>
  <div class="book-detail">
    <div class="row">
      <div class="d-none d-md-block col-md-4 col-lg-4">
        <Term />
      </div>

      <div class="col-12 col-sm-12 col-md-8 col-lg-8">
        <upload-form />
      </div>
    </div>
  </div>
</template>

<script>
import Term from "@/components/AccountPage/Upload/Term.vue";
import UploadForm from "@/components/AccountPage/Upload/UploadForm.vue";

export default {
  name: 'Upload',
  components: {
    Term,
    UploadForm
  },
  metaInfo() {
    return {
      title: 'Kirim Naskah Anda Sekarang',
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