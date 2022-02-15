<template>
  <div>
    <div id="messageContainer">
      <p id="messageText">{{ message }}</p>
      <img id="X" src="/img/X.svg" alt="X" @click="close">
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",

  props: {
    message: String,
    color: String
  },

  data: () => {
    return {
      timeout: null
    }
  },

  watch: {
    message: function () {
      try {
        clearTimeout(this.timeout)
      } catch (e) {
        console.log(e.message)
      }
      this.timeout = setTimeout(() => {
        this.close()
      }, 3000)
    }
  },

  mounted() {
    this.timeout = setTimeout(() => {
      this.close()
    }, 3000)
  },

  methods: {
    close() {
      try {
        clearTimeout(this.timeout)
      } catch (e) {
        console.log(e.message)
      }
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
#messageContainer {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px;
  background-color: #28a745;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px) brightness(100%);
}

#messageText {
  max-width: 75%;
  align-self: center;
}

#X {
  display: block;
  height: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: .3s;
  cursor: pointer;
  filter: drop-shadow(2px 5px 5px rgba(0, 0, 0, 0.2));
}

#X:hover {
  transform: scale(1.1);
}
</style>