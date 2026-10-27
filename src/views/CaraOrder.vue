<template>
  <div id="how-order" class="about container">
    <div class="how-order-title mt-5 bg-white">
      <h3>Cara Membeli Buku</h3>
      <hr class="price-line" />
    </div>

    <div class="how-to-steps">
      <p>
        Mau beli Buku di Guepedia, tapi bingung gimana caranya ? ikuti langkah
        ini ya...
      </p>
      <ol class="custom-counter">
        <li>
          Pertama, cari buku yang kamu inginkan, kamu bisa mencarinya berdasarkan kategori dengan mengklik tombol kategori
          dan kamu juga bisa mencari judul buku atau nama penulisnya di kolom pencarian.
          <img :src="getImageUrl('1.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Pada halaman detail buku, kamu bisa mengklik tombol "<strong>TAMBAH KE KERANJANG</strong>" untuk menambahkan
          buku ke keranjang keranjang belanja anda.
          <img :src="getImageUrl('3.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Kamu bisa mengklik tombol "<strong>Keranjang</strong>" untuk melihat buku apa saja yang sudah kamu masukkan
          kedalamnya.
          <img :src="getImageUrl('4.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Pada halaman keranjang belanja ini, kamu dapat merubah quantity masing - masing buku yang ingin kamu beli.
          Kemudian jika kamu siap untuk melakukan pesanan, silahkan klik tombol "<strong>Checkout</strong>" untuk
          melanjutkan ke halaman checkout.
          <img :src="getImageUrl('5.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Jika kamu belum LOGIN kamu akan diarahkan ke halaman LOGIN, kamu bisa mengisi email dan password kamu untuk
          dapat melanjutkan proses selanjutnya, atau jika kamu belum memiliki akun, kamu bisa melakukan registrasi dengan
          mengklik tombol "Daftar Sekarang".
          <img :src="getImageUrl('6.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Dihalaman checkout kamu akan diminta memasukkan detail pengiriman dan jasa pengiriman yang ingin kamu gunakan,
          serta kamu juga dapat menggunakan Kode Promo atau Kupon untuk mendapatkan potongan harga atau gratis ongkir.
          <img :src="getImageUrl('7.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Untuk memilih jasa pengiriman kamu bisa menekan tombol "<strong>Pilih</strong>" pada salah satu jasa pengiriman
          yang tersedia.
          <img :src="getImageUrl('8.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Untuk mendapatkan potongan harga, kamu bisa memilih kupon yang kamu miliki atau kamu juga bisa memasukkan kode
          promo yang tersedia. Guepedia akan memberikan promo-promo menarik buat kamu, jadi tungguin promo Guepedia ya.
          <img :src="getImageUrl('9.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Setelah semua terisi dengan benar, kamu dapat melihat detail transaksi kamu, kemudian kamu bisa memilih metode
          pembayaran apa yang ingin kamu gunakan.
          <img :src="getImageUrl('10.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Dengan mengklik tombol "<strong>Proses Pesanan</strong>", pesanan kamu akan diterima oleh tim Guepedia, dan kamu
          akan diarahkan ke halaman <strong>Daftar Transaksi Saya</strong>.
          <img :src="getImageUrl('11.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Dihalaman <strong>Daftar Transaksi Saya</strong> ini, kamu bisa mengupload bukti pembayaran kamu dengan mengklik
          tombol "<strong>Upload Bukti Transfer</strong>", untuk dapat memproses pesanan kamu.
          <img :src="getImageUrl('12.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Kamu akan diminta mengisi form pembayaran untuk membantu admin Guepedia mempercepat memverifikasi pesananmu,
          kemudian klik tombol "<strong>Kirim Bukti Transfer</strong>".
          <img :src="getImageUrl('13.jpg')" alt="How To Order" class="w-100">
        </li>
        <li>
          Pesananmu akan diverifikasi oleh tim Guepedia dan kamu juga bisa mendownload invoice pesananmu dengan mengklik
          tombol "<strong>Download Invoice</strong>".
          <img :src="getImageUrl('14.jpg')" alt="How To Order" class="w-100">
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
      title: 'Cara Belanja',
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
      return `https://assets.guepedia.com/how-to-order/${imageId}`
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
