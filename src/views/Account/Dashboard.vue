<template>
  <div class="account-page">
    <chart/>
  </div>
</template>

<script>
// @ is an alias to /src
import Chart from '@/components/AccountPage/Dashboard/Chart.vue'

export default {
  name: 'Home',
  components: {
    Chart
  }
}
</script>
