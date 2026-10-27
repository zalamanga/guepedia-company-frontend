<template>
  <div class="account-page">
    <project-stat />
    <my-project />
  </div>
</template>

<script>
// @ is an alias to /src
import ProjectStat from "@/components/AccountPage/Project/ProjectStat.vue";
import MyProject from "@/components/AccountPage/Project/MyProject.vue";

export default {
  name: "Home",
  components: {
    ProjectStat,
    MyProject
  },
  metaInfo() {
    return {
      title: 'Naskah Saya',
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
