<template>
  <div class="terbit mb-5">
    <div class="container">
      <div class="terbit-header">
        <div class="row align-items-center">
          <div class="col-md-7">
            <div class="terbit-header-title">
              <span class="terbit-gratis-label" v-if="now <= date">
                Terbit Gratis Sampai Tanggal
                {{ date | moment("DD MMMM YYYY") }}</span
              >
              <h1 class="mt-3">
                Cita-citamu Menjadi
                <span style="color: yellowgreen">Penulis Terkenal</span> Semakin
                Dekat Terwujud
              </h1>
              <p class="mt-3">
                Karena antusias dari para penulis yang ingin menerbitkan bukunya
                sangat tinggi, maka Guepedia membuka
                <span v-if="now <= date"
                  >kembali
                  <b
                    >Promo TERBIT GRATIS Sampai Tanggal
                    {{ date | moment("DD MMMM YYYY") }}</b
                  >
                </span>
                <span v-else>program penerbitan naskah </span>
                Harap dibaca dan dipelajari tahap dan syaratnya yaa..
              </p>

              <div class="login-btn mt-3">
                <a href="/upload">
                  <button type="button" class="btn btn-sm">
                    Kirim Naskahmu Sekarang
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-5">
            <img
              src="@/assets/vector/undraw_superhero_kguv.png"
              alt="terbit-head"
              class="w-100"
            />
          </div>
        </div>
      </div>

      <div class="terbit-terms mt-3" id="term-condition">
        <div class="row">
          <div class="col-md-4">
            <img
              src="@/assets/vector/undraw_Sync_files_re_ws4c.png"
              alt="terbit-head"
              class="w-100"
            />
          </div>
          <div class="col-md-8">
            <div class="terbit-terms-title">
              <h3>Syarat dan Ketentuan Naskah</h3>
              <hr class="price-line" />
              <div class="term-item">
                <span><strong>Pengaturan Naskah</strong></span>
                <ol>
                  <li>
                    Minimal 100 halaman A4, maksimal 300 halaman. naskah harus
                    dalam bentuk file word.
                  </li>
                  <li>
                    Jika naskah melebihi 300 halaman, maka naskah akan dipecah
                    menjadi 2 atau 3 jilid
                  </li>
                  <li>Font Bookman Old Style, 10 pt.</li>
                  <li>Spasi 1.5</li>
                  <li>Margin 2 cm.</li>
                  <li>
                    Jika mempunyai cover buatan sendiri, pastikan resolusi
                    gambar minimal 300 pixel
                    <strong
                      >dengan format psd, bukan jpg/jpeg/png/rar, dsb.</strong
                    ><br />
                    Jika tidak, maka Guepedia akan membuatkan covernya.
                  </li>
                </ol>
              </div>

              <div class="term-item mt-3">
                <span><strong>Ketentuan Isi Naskah</strong></span>
                <ol>
                  <li>
                    Tidak mengandung SARA, Pornografi, LGBT, plagiat, dan
                    hal-hal yang menimbulkan kontroversi publik.
                  </li>
                  <li>Daftar Pustaka jika buku non fiksi.</li>
                  <li>
                    Didalam naskah harus tercantum
                    <strong
                      >Kata Pengantar, Daftar Isi Tanpa Nomor Halaman, Tentang
                      Penulis dan Sinopsis</strong
                    >.
                  </li>
                  <li>
                    Sinopsis harus menggambarkan keseluruhan isi naskah secara
                    jelas, bukan hanya penggalan dari isi naskah atau sekadar
                    kata-kata yang tidak menceritakan isi naskah.
                  </li>
                </ol>
                <strong style="color: red">
                  Naskah yang tidak memenuhi ketentuan diatas tidak akan
                  diterbitkan.
                </strong>
              </div>

              <div class="login-btn mt-3">
                <a href="/upload">
                  <button type="button" class="btn btn-sm">
                    Kirim Naskahmu Sekarang
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="terbit-free mt-3 text-center p-4" v-if="now <= date">
        <h3>Apa saja yang <strong>GRATIS</strong> di Guepedia</h3>
        <div class="mt-4">
          <div class="free-item d-flex px-5">
            <div class="bg-white shadow px-4 py-2 rounded-pill">
              Layout dan Editing Naskah
            </div>
            <div class="bg-white shadow px-4 py-2 rounded-pill">Cover Buku</div>
            <div class="bg-white shadow px-4 py-2 rounded-pill">ISBN</div>
            <div class="bg-white shadow px-4 py-2 rounded-pill">Promosi</div>
            <div class="bg-white shadow px-4 py-2 rounded-pill">
              Royalti 15%
            </div>
          </div>
          <div class="free-text rounded-pill mt-3">
            Guepedia tidak memberikan buku gratis kepada penulis. Penulis
            tinggal duduk santai, tiap bulan dapat Bagi Hasil 15% dari hasil
            penjualan bukunya, asyik kan...
          </div>
        </div>
      </div>

      <div class="terbit-free mt-3 p-4" v-else>
        <div class="row">
          <div class="col-md-8">
            <h3>Ketentuan Penerbitan</h3>
            <div class="term-item mt-4">
              <ol>
                <li>Untuk mendapatkan ISBN, berbayar Rp.450.000/naskah</li>
                <li>ISBN dikeluarkan oleh perpusnas, kami tidak dapat memastikan berapa lama no ISBN naskah Anda keluar, karena sepenuh ada di pihak perpusnas, sampai saat ini tidak ada kepastian untuk waktunya</li>
                <li>Silahkan lengkapi data untuk kami ajukan naskah Anda mendapatkan ISBN, dengan hubungi WA +081287602508 atau email kami: <a href="mailto:admin@guepedia.com">admin@guepedia.com</a> </li>
                <li>Silahkan lengkapi data untuk kami ajukan naskah Anda mendapatkan ISBN, dengan hubungi WA +081287602508 atau email kami: <a href="mailto:admin@guepedia.com">admin@guepedia.com</a> </li>
              </ol>
            </div>
          </div>

          <div class="col-md-4">
            <h3>Pengen Terbit Gratis?</h3>
            <div class="term-item mt-4">
              <p>
                Buat kamu yang masih pengen nerbitin naskah GRATIS, tenang aja!
                Guepedia punya solusi Kamu masih bisa daftarin naskah kamu
                dengan tipe identifikasi QR Code dari QRCBN.com, caranya mudah
                banget. Tinggal pilih Tipe Identifikasi QR Code saat kamu upload
                Naskah ke Guepedia. Layanan ini bisa digunakan untuk segala
                jenis dan kategori buku GRATIS. info tentang QRCBN silahkan
                kunjungi website Klik Ke
                <a href="https://www.qrcbn.com"><strong>Website QRCBN</strong></a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="terbit-note mt-3">
        <h3>Catatan</h3>
        <hr class="price-line" />

        <div class="term-item">
          <ol>
            <li>
              Karena ini program gratis dan semuanya sudah gratis, penulis bisa
              membeli bukunya dengan diskon khusus penulis Guepedia.
            </li>
            <li>Naskah yang masuk akan diseleksi terlebih dahulu.</li>
            <li>
              Semua genre naskah diterima, termasuk puisi, cerpen, sajak, buku
              agama, parenting, buku pengetahuan, fiksi populer, bisnis dan
              ekonomi, ilmiah populer, pendidikan, pengembangan diri, gaya
              hidup, ilmu sosial, dan lain-lainnya.
            </li>
            <li>
              Guepedia berhak untuk menolak naskah yang akan diterbitkan dengan
              atau tanpa alasan penolakannya, biasanya kita terima kok..kita
              hargai semua jenis naskah.
            </li>
            <li>
              Penulis boleh mengirim / menerbitkan lebih dari satu naskah, tidak
              dibatasi
            </li>
            <li>
              Naskah yang sudah pernah diterbitkan di penerbit lain, tidak bisa
              kami terbitkan, kecuali disertai surat pencabutan naskah dari
              penerbit sebelumnya.
            </li>
            <li>
              Naskah yang sudah pernah diposting/upload di sosmed, aplikasi
              menulis, seperti wattpad, dll. masih dapat dikirim dan diterbitkan
              di Guepedia.
            </li>
            <li>
              Guepedia berhak mencabut naskah yang sudah diterbitkan, membekukan akun dan royalti penulis jika di
              kemudian hari ditemukan pelanggaran yang tidak sesuai dengan
              ketentuan guepedia, misal: plagiat, SARA, melanggar hukum, dll.
            </li>
            <li>
              Naskah diterima atau tidak akan kami kabari maksimal 10 hari
              kerja.
            </li>
            <li>
              Hak cipta naskah tetap menjadi milik penulis seutuhnya, namun Hak
              Terbit naskah ada di Guepedia
            </li>
            <li>
              Untuk dapat melihat status naskah akan kami kabari via email dan
              dapat dilihat di akun penulis
              <a href="https://www.guepedia.com/projects"
                >https://www.guepedia.com/projects</a
              >
            </li>
            <li>
              Naskah akan dicetak dengan cover berwarna dan isi hitam putih
            </li>
          </ol>
        </div>

        <div class="free-text rounded-pill mt-3 text-center py-2">
          <h6 class="mb-0">
            Butuh bantuan? Hubungi admin melalui email di
            <a
              href="mailto:admin@guepedia.com"
              target="_blank"
              rel="noopener noreferrer"
              >admin@guepedia.com</a
            >
            atau Whatsapp di
            <a href="https://wa.me/6281287602508">081287602508</a>
          </h6>
        </div>

        <div class="login-btn mt-3 text-center">
          <a href="/upload">
            <button type="button" class="btn btn-sm">
              Kirim Naskahmu Sekarang
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.terbit-gratis-label {
  background-color: #000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8em;
}
.term-item span {
  font-weight: bold;
}
.term-item li, .term-item p {
  font-size: 0.85em;
}
.terbit-free {
  background: #e9e6e6;
}
.free-item {
  flex-wrap: wrap;
  justify-items: center;
  justify-content: space-between;
}
.free-item div {
  margin-bottom: 10px;
  font-weight: bolder;
}
.free-text {
  font-size: 0.9em;
  background: yellowgreen;
  color: #fff;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      date: "",
      now: new Date(),
    };
  },
  metaInfo() {
    return {
      title: 'Tata Cara Terbit',
      meta: [
        { name: 'description', content: 'Penerbit buku online gratis, anti ribet, dan cepat, puluhan ribu naskah sudah terbit disini, sekarang giliran naskahmu.'},
        { property: 'og:type', content: "website" },
        { property: 'og:url', content: "https://www.guepedia.com/"},
        { property: 'og:title', content: 'Penerbit buku online gratis Indonesia  | Guepedia.com' },
        { property: 'og:description', content: 'Penerbit buku online gratis, anti ribet, dan cepat, puluhan ribu naskah sudah terbit disini, sekarang giliran naskahmu.' },
      ]
    }
  },
  methods: {
    getData() {
      axios
        .get("getTerbitGratis")
        .then((response) => {
          this.date = new Date(response.data.data.data.value);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.getData();
  },
};
</script>
