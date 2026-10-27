<template>
  <div class="book-detail">
      <book-info></book-info>
  </div>
</template>

<script>
import BookAction from '../components/BookDetail/BookAction.vue'
import BookInfo from '../components/BookDetail/BookInfo.vue'

export default {
  name: 'Index',
  components: {
    BookInfo,
    BookAction
  }
}
</script>