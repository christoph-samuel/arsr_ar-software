<template>
  <div class='container'>
    <svg width='60%' height='60%' class='chart-container' ref="chart-container" @click="achieve">
      <circle cx='50%' cy='50%' r='40%' class='back' ref='back' fill='none'/>
      <svg v-if="achieved===2" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="-6 -6 36 36"
           fill="#b2b2b2" class="check">
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path
            d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z"/>
      </svg>
      <svg v-if="achieved===1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"
           viewBox="-6 -6 36 36" height="100%" width="100%" fill="#b2b2b2" class="loading">
        <g>
          <rect fill="none" height="24" width="24"/>
          <rect fill="none" height="24" width="24"/>
        </g>
        <g>
          <path
              d="M8,2C6.9,2,6,2.9,6,4l0.01,3.18c0,0.53,0.21,1.03,0.58,1.41L10,12l-3.41,3.43c-0.37,0.37-0.58,0.88-0.58,1.41L6,20 c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2v-3.16c0-0.53-0.21-1.04-0.58-1.41L14,12l3.41-3.4C17.79,8.22,18,7.71,18,7.18V4 c0-1.1-0.9-2-2-2H8z M16,16.91V19c0,0.55-0.45,1-1,1H9c-0.55,0-1-0.45-1-1v-2.09c0-0.27,0.11-0.52,0.29-0.71L12,12.5l3.71,3.71 C15.89,16.39,16,16.65,16,16.91z"/>
        </g>
      </svg>
      <svg v-if="achieved===0" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="-6 -6 36 36"
           :fill="color" class="done">
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path
            d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z"/>
      </svg>
    </svg>
    <p class="info">{{ info }}</p>
  </div>
</template>

<script>
export default {
  name: "ARVerificationCheckbox",

  props: {
    color: {
      type: String,
      default: '#000'
    },
    achieved: {
      type: Number,
      required: true
    },
    info: {
      type: String,
      default: "Unknown"
    },
  },

  watch: {
    achieved: function (val) {
      if (val === 2) {
        this.$refs["chart-container"].style.cursor = "pointer"
        this.$refs["chart-container"].style.filter = "drop-shadow(2px 5px 5px rgba(0, 0, 0, 0.4))"
      } else {
        this.$refs["chart-container"].style.cursor = "inherit"
        this.$refs["chart-container"].style.filter = "drop-shadow(0 0 0 rgba(0, 0, 0, 0))"
      }
    }
  },

  mounted() {
    this.$refs.back.style.stroke = this.color

    if (this.achieved !== 2) {
      this.$refs["chart-container"].style.cursor = "inherit"
      this.$refs["chart-container"].style.filter = "drop-shadow(0 0 0 rgba(0, 0, 0, 0))"
    }
  },

  methods: {
    achieve() {
      if (this.achieved === 2) {
        this.$emit('achieve')
        this.$refs["chart-container"].style.cursor = "inherit"
        this.$refs["chart-container"].style.filter = "drop-shadow(0 0 0 rgba(0, 0, 0, 0))"
      }

      if (this.info === "Self Assessment") {
        this.achieved = 0
      } else {
        this.achieved = 1
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container .chart-container {
  aspect-ratio: 1 / 1;
  padding: 10px;
  cursor: pointer;
  filter: drop-shadow(2px 5px 5px rgba(0, 0, 0, 0.4));
  transition: .5s;
}

@keyframes show {
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}

.done {
  clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
  animation: show 1.5s forwards;
}

.container .chart-container {
  padding: 0;
}

.container .chart-container .back {
  stroke-width: 4;
}

.info {
  font-family: 'Inter', sans-serif;
  text-align: center;
  font-size: 8px;
  line-height: 8px;
}
</style>