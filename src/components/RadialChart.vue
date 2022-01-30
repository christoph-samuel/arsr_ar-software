<template>
  <div class='container'>
    <svg width='100%' height='100%' class='chart-container'>
      <circle cx='50%' cy='50%' r='40%' class='back' ref='back' fill='none'/>
      <circle cx='50%' cy='50%' r='40%' class='front' ref='front' fill='none'/>
      <g class='text'>
        <text x='50%' y='50%' alignment-baseline="central" text-anchor="middle" id='percentage'>{{ percentage }}%</text>
      </g>
    </svg>
    <p id="info">{{ info }}</p>
  </div>
  <!--  <div class="container">-->
  <!--    <md-progress-spinner ref="circle" md- md-mode="determinate" :md-value="percentage"></md-progress-spinner>-->
  <!--  </div>-->
</template>

<script>
export default {
  name: "RadialChart",

  props: {
    percentage: {
      type: Number,
      required: true
    },
    info: String,
    color: String
  },

  mounted() {
    this.$refs.front.style.stroke = this.color ? this.color : "#000"

    // TODO: Use of Built-in function instead of setInterval for variable changes
    let radius = 0
    setInterval(() => {
      try {
        if (this.$refs.front.r.baseVal.value !== radius) {
          radius = this.$refs.front.r.baseVal.value
          this.$refs.front.style.strokeDasharray = 2 * Math.PI * radius * (this.percentage / 100) + ', 1000000'
        }
      } catch (e) {
        console.log(e.message)
      }
    }, 250)
  }
}
</script>

<style scoped>
svg {
  aspect-ratio: 1 / 1;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.container .chart-container {
  padding: 10px;
}

.container .chart-container .back {
  stroke: #e2e2e2;
  stroke-width: 10;
}

.container .chart-container .front {
  stroke: #08415c;
  stroke-width: 10;
  stroke-linecap: round;
  stroke-dasharray: 0, 1000000;
  transform: rotate(-90deg);
  transform-origin: center;
}

.container .chart-container .text {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 25px;
  fill: #000;
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

.front {
  /*On top of all other styling elements*/
  animation: fill 2s reverse;
}

.text {
  /*On top of all other styling elements*/
  opacity: 0;
  transform: translateY(30%);
  animation: display 2s forwards;
}

/*.md-progress-spinner-circle {*/
/*  stroke: #f00 !important;*/
/*}*/

#info {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 300;
  text-align: center;
}
</style>