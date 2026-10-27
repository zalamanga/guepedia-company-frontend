<template>
  <div id="app">
    <NavigationBar class="d-none d-md-block"></NavigationBar>
    <mobile-navigation-bar class="d-block d-md-none" />

    <div class="content-area mb-3">
      <div class="container-fluid">
        <router-view />
      </div>
    </div>

    <div class="text-center">
      <Adsense data-ad-client="ca-pub-3076489163946110" data-ad-slot="6109811926"></Adsense>
    </div>

    <footer-bar />

    <a href="https://api.whatsapp.com/send?phone=6281287602508" data-bs-toggle="tooltip" data-bs-placement="left" title="Hubungi Admin" class="float" target="_blank">
      <i class="bi bi-whatsapp"></i>
    </a>

    <!-- Popup Modal -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-content">
        <span class="close-btn" @click="showPopup = false">&times;</span>
        <img src="@/assets/image/banner-naskah-maksa.jpg" class="img-popup" alt="Popup Ramadhan Guepedia">
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";
import MobileNavigationBar from "@/components/MobileNavigationBar";
import FooterBar from "../components/Footer.vue";
export default {
  components: {
    NavigationBar,
    MobileNavigationBar,
    FooterBar,
  },
  data() {
    return {
      showPopup: true,
    };
  },
};
</script>

<style>
.content-area {
  margin-top: 4em;
}

.float {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 10px;
  right: 20px;
  background-color: #25d366;
  color: #FFF;
  border-radius: 50px;
  text-align: center;
  font-size: 40px;
  box-shadow: 2px 2px 3px #999;
  z-index: 100;
}

.float i {
  color: #FFF;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999
}


/* 
.popup-content {
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
}

.img-popup {
  max-width: 50%;
  max-height: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
} */

/* new code pop up */

.popup-content {
  background: white;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  max-width: 90vw;
  max-height: 80vh;
  overflow: auto;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  z-index: 10000
}

.img-popup {
  width: 100%;
  height: auto;
  max-height: 60vh; /* agar tetap terlihat full tapi tidak terlalu panjang */
  border-radius: 10px;
  object-fit: contain;
}

/* close new code */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: red;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

@media (min-width: 768px) {
  .content-area {
    margin-top: 6.5em;
  }
}

</style>