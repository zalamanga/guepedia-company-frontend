<template>
  <div class="account-page">
    <div id="simulation" class="mb-5">
      <h4 class="fw-bold">Simulasi Bagi Hasil Penulis</h4>
      <hr class="price-line" />

      
      <b-alert variant="warning" show>
        <strong>Perhatian:</strong> Penarikan yang diajukan setelah tanggal 10 akan diproses di bulan berikutnya.
      </b-alert>

      <div id="simulation-tabs">
        <b-tabs content-class="mt-3">
          <b-tab title="Diskon Penulis 15%" active>
            <div class="m-3">
              <p><strong>Harga Jual: </strong>Rp. 100,000</p>
              <p><strong>Diskon Penulis (15%): </strong>Rp. 100,000 * 15% = Rp. 15,000</p>
              <p><strong>Bagi Hasil Penulis: </strong>(Harga Jual - Diskon Penulis) * 15%</p>
              <p><strong>Nominal Bagi Hasil: </strong>(Rp. 100,000 - Rp. 15,000) * 15% = <strong>Rp. 12,759</strong></p>
            </div>
          </b-tab>
          <b-tab title="Diskon Penulis 35%">
            <p><strong>Penulis tidak mendapatkan bagi hasil jika menggunakan diskon 35%. Diskon ini hanya berlaku untuk penulis.</strong></p>
          </b-tab>
        </b-tabs>
      </div>
    </div>

    <royalty />
  </div>
</template>

<script>
// @ is an alias to /src
import Royalty from "@/components/AccountPage/Royalty/RoyaltyTable.vue";

export default {
  name: "Home",
  components: {
    Royalty
  },
  metaInfo() {
    return {
      title: 'Bagi Hasil Penulis',
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

<style>
/* Tambahan opsional untuk alert atau tampilan lainnya */
.price-line {
  border-top: 2px solid #ccc;
}
</style>
