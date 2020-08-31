<template>
    <div class="comment">
        <h2>{{ comment.title }}</h2>
        <p>sent by {{ comment.sentBy }}, {{ date }}</p>
        <p>{{ comment.content }}</p>
    </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Comment',
  props: {
    comment: Object
  },
  computed: {
    date () {
      const dateSent = new Date(this.comment.timeSent)
      const fromNow = moment(dateSent).fromNow()
      return fromNow
    }
  }
}
</script>

<style scoped>
.comment {
  margin-top: 0.5rem;
  background: #fff;
  padding: 0.5rem;
  border-radius: 12px;
  border: 1px solid #888;
}

.comment p:first-of-type {
  color: #565656;
}
</style>
