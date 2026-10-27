<template>
  <div class="about container">
    <section id="headline">
      <div class="row align-items-center">
        <div class="col-md-6 col-lg-6 col-sm-12 col-12">
          <div class="headline fw-bold">
            Menulis Buku Kini Dapat
            <span class="green-text">Menghasilkan Uang</span> Dengan
            <span class="green-text">Mudah</span>
          </div>
          <div class="subheadline mt-3">
            Di Guepedia naskahmu akan dibaca oleh ribuan orang dari seluruh
            Indonesia, dan dapat menjadi penghasilan untukmu
          </div>

          <div class="login-btn mt-3">
            <button type="button" class="btn btn-sm">
              Kirim Naskahmu Sekarang
            </button>
          </div>
        </div>
        <div class="col-md-6 col-lg-6 col-sm-12 col-12">
          <img src="@/assets/vector/undraw_Selecting_team_re_ndkb 1.svg" class="w-100" />
        </div>
      </div>
    </section>

    <section id="about-us">
      <div class="row align-items-center">
        <div class="col-md-4 col-lg-4 col-sm-12 col-12">
          <img src="@/assets/vector/undraw_team_work_k80m 1.svg" class="w-100" />
        </div>
        <div class="col-md-6 col-lg-6 col-sm-12 col-12">
          <div class="blog-title fw-bold">Tentang Kami</div>
          <hr class="price-line" />
          <p>Guepedia.com adalah perusahaan yang bergerak di bidang penerbit online atau On Publishing. Guepedia.com
            merupakan tempat yang tepat untuk mempertemukan penulis dengan pembaca guna menyediakan apa yang mereka
            butuhkan, yaitu sebagai penulis yang membutuhkan wadah menerbitkan buku dengan cara yang lebih mudah dan
            ekonomis, sedangkan pembaca membutuhkan buku-buku berkualitas dan mudah terjangkau. Di sinilah kami berperan
            untuk menjembatani kebutuhan penulis dan pembaca.</p>
        </div>
      </div>
    </section>

    <section id="counter" class="p-3 mb-5">
      <div class="row align-items-center">

        <div class="col-md-4 col-lg-4 col-sm-12 col-12">
          <div class="counter-item text-center">
            <div class="counter-icon">
              <b-button variant="light" size="lg" pill>
                <p class="h1"><b-icon icon="book-half"></b-icon></p>
              </b-button>
            </div>
            <div class="counter-number mt-1 fw-bold">{{ data.naskah }}</div>
            <div class="counter-title fw-bold">Naskah Terbit</div>
          </div>
        </div>

        <div class="col-md-4 col-lg-4 col-sm-12 col-12">
          <div class="counter-item text-center">
            <div class="counter-icon">
              <b-button variant="light" size="lg" pill>
                <p class="h1"><b-icon icon="journal-medical"></b-icon></p>
              </b-button>
            </div>
            <div class="counter-number mt-1 fw-bold">{{ data.buku_terjual }}</div>
            <div class="counter-title fw-bold">Buku Terjual</div>
          </div>
        </div>

        <div class="col-md-4 col-lg-4 col-sm-12 col-12">
          <div class="counter-item text-center">
            <div class="counter-icon">
              <b-button variant="light" size="lg" pill>
                <p class="h1"><b-icon icon="award-fill"></b-icon></p>
              </b-button>
            </div>
            <div class="counter-number mt-1 fw-bold">{{ data.penulis }}</div>
            <div class="counter-title fw-bold">Akun Penulis</div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default ({
  data() {
    return {
      data: []
    }
  },

  metaInfo() {
    return {
      title: 'Apa itu Guepedia',
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
    getData() {
      axios.get('counter')
        .then(res => {
          this.data = res.data.data.data
        })
    }
  },

  mounted() {
    this.getData()
  }
})
</script>