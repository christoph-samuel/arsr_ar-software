<template>
  <div class='container'>
    <svg width='100%' height='100%' class='chart-container'>
      <circle cx='50%' cy='50%' r='40%' class='back' ref='back' fill='none'/>
      <circle cx='50%' cy='50%' r='40%' class='front' ref='front' fill='none'/>
      <g class='text'>
        <text x='50%' y='50%' alignment-baseline="central" text-anchor="middle" id='percentage'>
          {{ Math.round(percentage) }}%
        </text>
      </g>
    </svg>
    <p class="info">{{ info }}</p>
  </div>
</template>

<script>
export default {
  name: "RadialChart",

  props: {
    percentage: {
      type: Number,
      required: true
    },
    info: {
      type: String,
      default: "Unknown"
    },
    color: {
      type: String,
      default: '#000'
    }
  },

  data: () => {
    return {
      radiusInterval: 0
    }
  },

  watch: {
    percentage: function() {
      this.buildChart()
    }
  },

  mounted() {
    this.buildChart()
  },

  methods: {
    buildChart() {
      this.$refs.front.style.stroke = this.color

      // TODO: Use of Built-in function instead of setInterval for variable changes
      let percentage = Math.round(this.percentage)
      let radius = 0
      this.radiusInterval = setInterval(() => {
        try {
          if (this.$refs.front.r.baseVal.value !== radius) {
            radius = this.$refs.front.r.baseVal.value
            this.$refs.front.style.strokeDasharray = 2 * Math.PI * radius * (percentage / 100) + ', 1000000'
          }
        } catch (e) {
          console.log(e.message)
        }
      }, 250)
    }
  },

  beforeDestroy() {
    try {
      clearInterval(this.radiusInterval)
    } catch (e) {
      console.log(e.message)
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
}

.container .chart-container .back {
  opacity: 0;
  stroke: #e2e2e2;
  stroke-width: 10;
}

.container .chart-container .front {
  opacity: 0;
  stroke-width: 10;
  stroke-linecap: round;
  stroke-dasharray: 0, 1000000;
  transform: rotate(-90deg);
  transform-origin: center;
}

.container .chart-container .text {
  opacity: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 25px;
  fill: #000;
}

@keyframes show {
  to {
    opacity: 1;
  }
}

@keyframes fill {
  to {
    stroke-dasharray: 0, 1000000;
  }
}

@keyframes display {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.back, .text, .info {
  animation: show .5s forwards 1.4s;
}

.front {
  animation: show .5s forwards 1.4s, fill 2s reverse 1.4s;
}

.text {
  transform: translateY(30%);
  animation: display 2s forwards 2s;
}

.info {
  opacity: 0;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 300;
  text-align: center;
}

@media screen and (max-width: 992px) {
  .container .chart-container {
    padding: 5px;
  }

  .container .chart-container .front {
    stroke-width: 7;
  }

  .container .chart-container .back {
    stroke-width: 7;
  }

  .container .chart-container .text {
    font-size: 20px;
  }
}

@media screen and (orientation: portrait) and (max-width: 768px), screen and (orientation: landscape) and (max-height: 650px) {
  .container .chart-container {
    padding: 0;
  }

  .container .chart-container .back {
    stroke-width: 5;
  }

  .container .chart-container .front {
    stroke-width: 5;
  }

  .container .chart-container .text {
    font-size: 15px;
  }

  .info {
    font-size: 10px;
    line-height: 10px;
  }
}

@media screen and (orientation: landscape) and (max-height: 650px) {
  .container .chart-container {
    width: 50%;
    height: 50%;
  }
}
</style>