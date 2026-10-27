<template>
  <div id="how-order" class="about container">
    <div class="how-order-title mt-5 bg-white">
      <h3>Cara Jadi Reseller</h3>
      <hr class="price-line" />
    </div>

    <div class="how-to-steps">
      <p>
        Kamu bisa jadi bagian dari Guepedia, dapatkan berbagai keuntungan dengan
        menjadi reseller, salah satunya kamu akan mendapatkan harga khusus serta
        berbagai materi digital marketing khusus reseller Guepedia.
        <strong>Bagaimana caranya?</strong>
      </p>
      <ol class="custom-counter">
        <li>
          Pastikan kamu sudah <strong>memiliki akun Guepedia</strong>, kemudian
          masuk ke akunmu.
          <img :src="getImageUrl('2.jpg')" alt="How To Order" class="w-100" />
        </li>
        <li>
          Jika kamu belum pernah mendaftar sebagai reseller, kamu akan menemukan
          tombol "<strong>Bergabung Menjadi Reseller</strong>" pada bagian atas
          menu, atau kamu bisa menekan tombol halaman reseller pada bagian
          bawah.
          <img :src="getImageUrl('reseller2.jpg')" alt="How To Order" class="w-100" />
        </li>
        <li>
          Pada halaman ini, silahkan isi informasi mengenai akun resellermu,
          seperti nama toko, nomor telepon, dan alamat lengkap kamu.
          <img :src="getImageUrl('reseller3.jpg')" alt="How To Order" class="w-100" />
        </li>
        <li>
          Setelah berhasil mendaftar, kamu diwajibkan mentransfer deposit. Saldo
          deposit ini nantinya
          <strong>dapat kamu gunakan untuk belanja</strong> di website Guepedia.
          Kemudian upload bukti transfernya. Setelah berhasil mengirimkan bukti
          transfer, admin akan memeriksa informasi reseller yang telah kamu
          berikan.
          <img :src="getImageUrl('reseller4.jpg')" alt="How To Order" class="w-100" />
        </li>
        <li>
          Setelah admin memverifikasi pendaftaran kamu, kamu akan melihat saldo
          royalti kamu pada halaman yang sama. Dengan ini kamu sudah
          <strong>resmi menjadi reseller Guepedia</strong>.
          <img :src="getImageUrl('reseller5.jpg')" alt="How To Order" class="w-100" />
        </li>
        <li>
          Setiap transaksi yang kamu lakukan, akan otomatis terpasang
          <strong>diskon reseller</strong> sebesar 15%. Namun, diskon ini tidak
          dapat digabungkan dengan promo dan diskon yang lainnya.
          <img :src="getImageUrl('reseller6.jpg')" alt="How To Order" class="w-100" />
        </li>
        <li>
          Tagihan kamu akan otomatis dikurangi dengan saldo royalti kamu.
        </li>
      </ol>
      <p class="text-center">
        <strong>Mudah bukan? Sekarang saatnya kamu bergabung menjadi bagian dari Guepedia dan dapatkan berbagai
          keuntungannya.</strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#bbb",
      },
    };
  },
  metaInfo() {
    return {
      title: 'Penghasilan Tanpa Modal Dengan Menjadi Reseller',
      meta: [
        { name: 'description', content: 'Penerbit buku online gratis, anti ribet, dan cepat, puluhan ribu naskah sudah terbit disini, sekarang giliran naskahmu.' },
        { property: 'og:type', content: "website" },
        { property: 'og:url', content: "https://www.guepedia.com/" },
        { property: 'og:title', content: 'Penerbit buku online gratis Indonesia  | Guepedia.com' },
        { property: 'og:description', content: 'Penerbit buku online gratis, anti ribet, dan cepat, puluhan ribu naskah sudah terbit disini, sekarang giliran naskahmu.' },
      ]
    }
  },
  methods: {
    getImageUrl(imageId) {
      return `https://assets.guepedia.com/how-to-become-writer/${imageId}`;
    },
  },
};
</script>

<style scoped>
.custom-counter {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.custom-counter li {
  margin-bottom: 8px;
  counter-increment: a 1;
  line-height: 1.71;
  padding-left: 36px;
  position: relative;
  list-style-type: none;
  font-size: 1em;
}

.custom-counter li::before {
  content: counter(a);
  margin-right: 20px;
  font-size: 0.857143rem;
  background-color: yellowgreen;
  color: var(--N0, #ffffff);
  border-radius: 100%;
  position: absolute;
  left: 0px;
  width: 24px;
  height: 24px;
  text-align: center;
  font-weight: bold;
  line-height: 24px;
}
</style>
