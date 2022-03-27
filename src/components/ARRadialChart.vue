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
  name: "ARRadialChart",

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
    percentage: function () {
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

.container .chart-container {
  padding: 0;
}

.container .chart-container .back {
  opacity: 0;
  stroke: #e2e2e2;
  stroke-width: 4;
}

.container .chart-container .front {
  opacity: 0;
  stroke-linecap: round;
  stroke-dasharray: 0, 1000000;
  transform: rotate(-90deg);
  transform-origin: center;
  stroke-width: 4;
}

.container .chart-container .text {
  opacity: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  fill: #000;
  font-size: 8px;
}

.info {
  opacity: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  text-align: center;
  font-size: 5px;
  line-height: 5px;
}

</style>