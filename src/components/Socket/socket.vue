<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Group {{ mess }}</h3>
        <hr>
      </div>
      <div class="card-body">
        <div v-for="(msg, index) in messages" :key="index" class="messages">
          <p><span class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}</p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="gorm-group">
          <label for="user">User:</label>
          <input v-model="user" type="text" class="form-control">
        </div>
        <div class="gorm-group pb-3">
          <label for="message">Message:</label>
          <input v-model="message" type="text" class="form-control">
        </div>
        <button type="submit" class="btn btn-success">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data() {
    return {
      user: '',
      message: '',
      messages: [],
      socket: io('localhost:3000'),
      mess: ''
    }
  },
  mounted() {
    this.socket.on('MESSAGE', (data) => {
      console.log('socket data =', data)
      this.messages = [...this.messages, data]
      this.mess = this.messages[0].message
      // you can also do this.messages.push(data)
    })
  },
  methods: {
    sendMessage(e) {
      e.preventDefault()
      this.socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message
      })
      this.message = ''
    }
  }
}
</script>
