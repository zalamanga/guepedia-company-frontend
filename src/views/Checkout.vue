<template>
  <div class="cart container">
    <div class="row">
      <div class="col-12 col-sm-12 col-md-8 col-lg-8">
        <checkout-info></checkout-info>
      </div>

      <div class="col-12 col-sm-12 col-md-4 col-lg-4">
        <checkout-bill />
      </div>
    </div>
  </div>
</template>

<script>
import CheckoutBill from '../components/Checkout/CheckoutBill.vue';
import CheckoutInfo from '../components/Checkout/CheckoutInfo.vue';
export default {
  name: "Cart-Page",
  components: {
    CheckoutInfo,
    CheckoutBill
  },
  metaInfo() {
    return {
      title: 'Chekout',
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
