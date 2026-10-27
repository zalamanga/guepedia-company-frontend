<template>
  <div class="footer-area">
    <div class="container-fluid px-5 py-3">
      <div class="row">
        <div class="col-md-3">
          <div class="footer-title mb-3">Bantuan</div>
          <div class="footer-links">
            <div class="footer-link-item mb-2">
              <a href="/cara-order">Cara Membeli Buku</a>
            </div>
            <div class="footer-link-item mb-2">
              <a href="/jadi-penulis">Cara Menjadi Penulis</a>
            </div>
            <div class="footer-link-item mb-2">
              <a href="https://api.whatsapp.com/send?phone=6281287602508" target="_blank">
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="footer-title mb-3">Guepedia</div>
          <div class="footer-links">
            <div class="footer-link-item mb-2">
              <a href="/about">Tentang Guepedia</a>
            </div>
            <div class="footer-link-item mb-2">
              <a href="/privacy">Kebijakan Privasi</a>
            </div>
            <div class="footer-link-item mb-2">
              <a href="/terbit#term-condition">Syarat dan Ketentuan</a>
            </div>
          </div>
        </div>

        <div class="col-md-3">
  <div class="footer-title mb-3">Marketplace Guepedia</div>
  <div class="footer-links mb-3">
    <a href="https://www.tokopedia.com/guepedia" target="_blank">
      <img src="https://assets.guepedia.com/img/tokopedia.png" alt="Tokopedia" style="width: 100px; height: auto; margin-right: 6px;" />
    </a>
    
    <a href="https://www.tokopedia.com/guepedia" target="_blank">
      <img src="https://assets.guepedia.com/img/tiktok2025.png" alt="TikTok Shop" style="width: 45px; height: auto; margin-right: 6px;" />
    </a>
    
    <a href="https://shopee.co.id/guepedia" target="_blank">
      <img src="https://assets.guepedia.com/img/shopee.png" alt="Shopee" style="width: 100px; height: auto;" />
    </a>
    
    <a href="https://shopee.co.id/guepedia" target="_blank">
      <img src="https://assets.guepedia.com/img/lazada2025.png" alt="Shopee" style="width: 100px; height: auto;" />
    </a>
  </div>
</div>

        <div class="col-md-3">
          <div class="footer-title mb-3">Temukan Kami</div>
          <div class="footer-links mb-3">
            <div class="footer-link-item mb-2">
              <a href="https://www.facebook.com/guepediaofficial" target="_blank"><i class="bi bi-facebook"></i> Facebook</a>
            </div>
            <div class="footer-link-item mb-2">
              <a href="https://www.instagram.com/guepedia_penerbitan" target="_blank"><i class="bi bi-instagram"></i> Instagram</a>
            </div>
            <div class="footer-link-item mb-2">
              <a href="https://www.youtube.com/channel/UCBmRDUpmN2DYCghwHhpic5g" target="_blank"><i class="bi bi-youtube"></i> Youtube</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="member text-center p-3">
      <span class="footer-title me-2">Member of Guepedia</span>
      <img
        src="https://old.guepedia.com/assets/img/spasi.png"
        height="30px"
        class="me-2"
      />
      <img
        src="https://old.guepedia.com/assets/img/emedia.png"
        height="20px"
        class="me-2"
      />
      <img
        src="https://old.guepedia.com/assets/img/bukupedia.png"
        height="20px"
        class="me-2"
      />
      <img
        src="https://old.guepedia.com/assets/img/kreatif.png"
        height="20px"
      />
    </div>
    <div class="bot-footer text-center p-1">
      Copyright &copy; {{year}} PT. Guemedia Group
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  },
};
</script>
