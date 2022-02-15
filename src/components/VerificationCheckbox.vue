<template>
  <div class='container'>
    <svg width='80%' height='80%' class='chart-container' ref="chart-container" @click="achieve">
      <circle cx='50%' cy='50%' r='40%' class='back' ref='back' fill='none'/>
      <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="-6 -6 36 36" width="100%"
           fill="#e2e2e2" class="check">
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path
            d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z"/>
      </svg>
      <svg v-if="achieved" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="-6 -6 36 36" width="100%"
           :fill="color" class="done">
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path
            d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z"/>
      </svg>
    </svg>
  </div>
</template>

<script>
export default {
  name: "VerificationCheckbox",

  props: {
    color: {
      type: String,
      default: '#000'
    },
    achieved: {
      type: Boolean,
      required: true
    }
  },

  mounted() {
    this.$refs.back.style.stroke = this.color
  },

  methods: {
    achieve() {
      if (!this.achieved) {
        this.$emit('achieve')
        this.$refs["chart-container"].style.cursor = "inherit"
        this.$refs["chart-container"].style.filter = "drop-shadow(0 0 0 rgba(0, 0, 0, 0))"
      }
      this.achieved = true
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
  filter: drop-shadow(2px 5px 5px rgba(0, 0, 0, 0.2));
}

.container .chart-container .back {
  stroke-width: 10;
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

@media screen and (max-width: 992px) {
  .container .chart-container {
    padding: 5px;
  }

  .container .chart-container .back {
    stroke-width: 7;
  }
}

@media screen and (orientation: portrait) and (max-width: 768px), screen and (orientation: landscape) and (max-height: 650px) {
  .container .chart-container {
    padding: 0;
  }

  .container .chart-container .back {
    stroke-width: 5;
  }
}

@media screen and (orientation: landscape) and (max-height: 650px) {
  .container .chart-container {
    width: 50%;
    height: 50%;
  }
}
</style>