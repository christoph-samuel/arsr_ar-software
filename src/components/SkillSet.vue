<template>
  <div>
    <div id="skillSetContainer">
      <img id="logoARSR" src="/img/logo_transparent_schwarz.png" alt="Logo ARSR">
      <img id="X" src="/img/X.svg" alt="X" @click="close()">
      <p id="title">{{ skillSet.name }}</p>
      <p id="description" v-html="skillSet.description"/>
      <p id="skillCount">Skills in SkillSet: {{ skillSet.skillCount }}</p>
      <div id="charts">
        <radial-chart :percentage="80" info="Self Assessment" color="#32BE8C"/>
        <radial-chart :percentage="50" info="Educational Verification" color="#4A89C4"/>
        <radial-chart :percentage="33" info="Practical Verification" color="#F7BF5D"/>
        <radial-chart :percentage="98" info="Certification" color="#E04C5D"/>
      </div>
      <div id="navigation">
        <img id="navPrev" src="/img/NavigationButton.svg" alt="Previous" @click="navigate(-1)"/>
        <p id="page">( Fortschritt )</p>
        <img id="navNext" src="/img/NavigationButton.svg" alt="Next" @click="navigate(1)"/>
      </div>
    </div>
  </div>
</template>

<script>
import RadialChart from '@/components/RadialChart'

export default {
  name: "SkillSet",

  components: {
    RadialChart
  },

  props: {
    skillSet: Object
  },

  methods: {
    close() {
      this.$emit('close')
    },

    navigate(direction) {
      this.$emit('navigate', direction)
    }
  }
}
</script>

<style>
#skillSetContainer {
  display: inline-block;
  width: 60vw;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 10px;
  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px) brightness(100%);
}

#logoARSR, #X {
  display: block;
  height: 30px;
  margin-bottom: 30px;
}

#X {
  position: fixed;
  top: 30px;
  right: 30px;
  transition: .3s;
  cursor: pointer;
}

#X:hover, #navPrev:hover {
  transform: scale(1.1);
}
#navNext:hover {
  transform: scale(1.1) rotate(180deg);
}

#title {
  font-family: 'Montserrat', sans-serif;
  font-size: 35px;
  font-weight: 700;
  line-height: 35px;
  margin-bottom: 10px;
}

#description {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 200;
  margin-bottom: 10px;
}

#skillCount {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 20px;
}

#charts {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

#navigation img {
  display: block;
  height: 60px;
  transition: .3s;
  cursor: pointer;
}

#page {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 500;
}

#navNext {
  transform: rotate(180deg);
}
</style>