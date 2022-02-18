<template>
  <div>
    <div class="messageContainer">
      <p class="messageText">{{ message }}</p>
      <img class="X" src="/img/X-White.svg" alt="X" @click="close">
      <div class="bar" ref="bar"></div>
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
      }, 10000)

      this.$refs.bar.classList.remove('bar')
      setTimeout(() => {
        this.$refs.bar.classList.add('bar')
      }, 1)
    }
  },

  mounted() {
    this.timeout = setTimeout(() => {
      this.close()
    }, 10000)
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
.messageContainer {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 30px;
  background-color: #6EC1E4;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px) brightness(100%);
}

.messageText {
  color: white;
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  max-width: 80%;
  align-self: center;
}

.X {
  display: block;
  height: 20px;
  position: absolute;
  top: 15px;
  right: 15px;
  transition: .3s;
  cursor: pointer;
  filter: drop-shadow(2px 5px 5px rgba(0, 0, 0, 0.2));
}

.X:hover {
  transform: scale(1.1);
}

@keyframes bar {
  to {
    clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%)
  }
}

.bar {
  position: absolute;
  bottom: 5px;
  left: 5px;
  right: 5px;
  height: 10px;
  background-color: white;
  border-radius: 10px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  animation: bar 10s forwards linear;
}

@media screen and (orientation: portrait) and (max-width: 768px), screen and (orientation: landscape) and (max-height: 650px) {
  .messageContainer {
    padding: 20px
  }

  .messageText {
    font-size: 15px;
  }
}

@media screen and (orientation: landscape) and (max-height: 650px) {
  .messageContainer {
    padding: 15px;
  }

  .messageText {
    font-size: 12px;
  }

  .X {
    height: 15px;
  }
}
</style>