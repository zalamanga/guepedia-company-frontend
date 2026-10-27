<template>
  <div class="account-page">
    <transaction />
  </div>
</template>

<script>
// @ is an alias to /src
import Transaction from "@/components/AccountPage/Transaction/Transaction";

export default {
  name: 'Home',
  components: {
    Transaction
  },
  metaInfo() {
    return {
      title: 'Riwayat Transaksi',
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
