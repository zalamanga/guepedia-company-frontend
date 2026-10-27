<template>
  <div class="counter text-center p-5">
    <div class="top-text">
      Langkahmu untuk menjadi penulis profesional semakin dekat
    </div>
    <div class="bot-text">
      <span class="green-text">{{data.naskah}}</span> Naskah Sudah Terbit
    </div>
    <div class="bot-text mb-3">
      <span class="green-text">Bergabung</span> Menjadi Penulis
    </div>
    <div class="signup-btn">
      <a href="/register"><button type="button" class="btn btn-md">BERGABUNG</button></a>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default({
    data(){
      return{
        data: []
      }
    },

    methods: {
      getData(){
        axios.get('counter')
        .then(res => {
          this.data = res.data.data.data
        })
      }
    },

    mounted(){
      this.getData()
    }
  })
</script>