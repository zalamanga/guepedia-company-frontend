<template>
  <div class="index">
    <carousel/>
    <best-seller/>
    <counter/>
    <new-publish/>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '@/components/Index/Carousel.vue'
import BestSeller from '@/components/Index/BestSeller.vue'
import NewPublish from '../components/Index/NewPublish.vue'
import Counter from '../components/Index/Counter.vue'

export default {
  name: 'Index',
  components: {
    Carousel,
    BestSeller,
    NewPublish,
    Counter
  },
  metaInfo() {
    return {
      meta: [
        { name: 'description', content: 'Penerbit buku online gratis, anti ribet, dan cepat, puluhan ribu naskah sudah terbit disini, sekarang giliran naskahmu.'},
        { property: 'og:type', content: "website" },
        { property: 'og:url', content: "https://www.guepedia.com/"},
        { property: 'og:title', content: 'Penerbit buku online gratis Indonesia  | Guepedia.com' },
        { property: 'og:description', content: 'Penerbit buku online gratis, anti ribet, dan cepat, puluhan ribu naskah sudah terbit disini, sekarang giliran naskahmu.' },
      ]
    }
  },
}
</script>