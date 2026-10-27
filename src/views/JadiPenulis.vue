<template>
  <div id="how-order" class="about container">
    <div class="how-order-title mt-5 bg-white">
      <h3>Cara Jadi Penulis</h3>
      <hr class="price-line" />
    </div>

    <div class="how-to-steps">
      <p>
        Langkahmu menjadi penulis terkenal semakin dekat, bergabung jadi penulis Guepedia, kamu akan dapat banyak
        keuntungan.
      </p>
      <ol class="custom-counter">
        <li>
          Tekan tombol login untuk masuk ke akun kamu.
          <img :src="getImageUrl('1.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Isi form login dengan akun yang sudah terdaftar, atau jika kamu belum memiliki akun, tekan tombol
          "<strong>Daftar Sekarang</strong>" untuk registrasi.
          <img :src="getImageUrl('2.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Masukkan semua informasi yang dibutuhkan untuk melakukan registrasi, setalah kamu berhasil melakukan registrasi,
          kamu akan menerima email verifikasi, silahkan klik tombol verifikasi untuk mengaktifkan akunmu agar dapat
          digunakan.
          <img :src="getImageUrl('3.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Setelah berhasil LOGIN kamu akan diarahkan ke halaman dashboard penulis. Di halaman ini kamu dapat melihat
          grafik penjualan naskahmu per 30 hari terakhir.
          <img :src="getImageUrl('4.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Pada bagian menu, kamu bisa menekan tombol "<strong>Upload Naskah</strong>" untuk mulai mengirimkan naskahmu,
          kemudian kamu dapat mengisi form sesuai dengan naskahmu, terdapat pula ketentuan umum naskah Guepedia.
          <img :src="getImageUrl('5.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Setelah berhasil upload naskah, kamu akan diarahkan ke halaman <strong>Naskah Saya</strong>, disini kamu bisa
          melihat status semua naskahmu.
          <img :src="getImageUrl('6.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Di halaman laporan penjualan, kamu bisa melihat semua penjualan dari naskahmu.
          <img :src="getImageUrl('7.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Untuk melakukan penarikan bagi hasil, bisa dilakukan di halaman <strong>Bagi Hasil</strong>, kemudian klik
          tombol "<strong>Ajukan Penarikan Royalti</strong>".
          <img :src="getImageUrl('8.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Masukkan nominal penarikan, pastikan saldo bagi hasil kamu mencukupi. Selain bank BCA akan dikenakan biaya admin
          sebesar Rp. 6,500. Minimal penarikan royalti adalah Rp. 20,000. Untuk mengatur rekening pengiriman bagi hasil,
          kamu dapat mengakses halaman <strong>Pengaturan Profil</strong>.
          <img :src="getImageUrl('8b.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Setelah berhasil melakukan penarikan, kamu bisa melihat status penarikanmu pada halaman ini juga, bagi hasil
          akan di transfer ke rekening kamu setiap tanggal 10.
          <img :src="getImageUrl('9.jpg')" alt="How To Order" class="w-100">
        </li>
      </ol>
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
        blankColor: '#bbb',
      }
    }
  },
  metaInfo() {
    return {
      title: 'Penerbit Buku Gratis, Cuma Disini, Yuk Gabung Jadi Penulis !',
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
      return `https://assets.guepedia.com/how-to-become-writer/${imageId}`
    }
  }
}
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
  color: var(--N0, #FFFFFF);
  border-radius: 100%;
  position: absolute;
  left: 0px;
  width: 24px;
  height: 24px;
  text-align: center;
  font-weight: bold;
  line-height: 24px;
}</style>
