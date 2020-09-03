<template>
    <div class="add-comment">
        <h3>Your nickname</h3>
        <input type="text" v-model="author" placeholder="e. g. Blue Panther" />
        <h3>Your comment title</h3>
        <input type="text" v-model="title" placeholder="e. g. My Amazing Comment..." />
        <h3>Share your thoughts...</h3>
        <textarea v-model="content" placeholder="e. g. Loved it!" />
        <div class="submit">
            <button @click="send">send</button>
        </div>
    </div>
</template>

<script>
import API from '@/utils'

export default {
  name: 'AddComment',
  props: {
    articleId: String,
    handleAdd: Function
  },
  data () {
    return {
      author: '',
      title: '',
      content: ''
    }
  },
  methods: {
    send () {
      const comment = {
        sentBy: this.author,
        title: this.title,
        content: this.content,
        timeSent: (new Date()).toISOString()
      }
      this.author = ''
      this.title = ''
      this.content = ''
      this.timeSent = ''
      API.comment(this.articleId, comment)
        .then(res => {
          if (res.status === 201 && this.handleAdd) {
            this.handleAdd(comment)
          }
        })
    }
  }
}
</script>

<style scoped>
input,
textarea {
    width: 100%;
    padding: 0.5rem;
    border-radius: 12px;
    outline: none;
    resize: none;
    border: 1px solid #888;
    font: inherit;
}

.submit {
    text-align: center;
}

.submit button {
    border: none;
    outline: none;
    padding: 8px 16px;
    border-radius: 16px;
    color: #fff;
    background: #2c3e50;
    cursor: pointer;
}
</style>
