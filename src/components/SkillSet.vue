<template>
  <div>
    <div id="skillSetContainer">
      <p id="title">{{ skillSet.name }}</p>
      <p id="description" v-html="skillSet.description"/>
      <p id="skillCount">Skills in SkillSet: {{ skillSet.skillCount }}</p>
      <div id="charts">
        <radial-chart :percentage="80" info="Self Assessment" color="#32BE8C"/>
        <radial-chart :percentage="50" info="Educational Verification" color="#4A89C4"/>
        <radial-chart :percentage="33" info="Practical Expertise" color="#F7BF5D"/>
        <radial-chart :percentage="98" info="Certification" color="#E04C5D"/>
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

<style scoped>
/*#skillSetContainer {*/
/*  display: inline-block;*/
/*  max-height: 100%;*/
/*  padding: 30px;*/
/*  background-color: rgba(255, 255, 255, 0.8);*/
/*  border: none;*/
/*  border-radius: 10px;*/
/*  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2);*/
/*  backdrop-filter: blur(10px) brightness(100%);*/
/*}*/

/*#logoARSR, #X {*/
/*  display: block;*/
/*  height: 30px;*/
/*  margin-bottom: 30px;*/
/*}*/

/*@keyframes logoARSR {*/
/*  to {*/
/*    transform: scale(1);*/
/*  }*/
/*}*/

/*#logoARSR {*/
/*  transform: scale(0);*/
/*  animation: logoARSR .5s forwards;*/
/*}*/

/*#X {*/
/*  position: absolute;*/
/*  top: 30px;*/
/*  right: 30px;*/
/*  transition: .3s;*/
/*  cursor: pointer;*/
/*  filter: drop-shadow(2px 5px 5px rgba(0, 0, 0, 0.4));*/
/*}*/

/*#X:hover, #navPrev:hover {*/
/*  transform: scale(1.1);*/
/*}*/

/*#navNext:hover {*/
/*  transform: scale(1.1) rotate(180deg);*/
/*}*/

/*@keyframes text {*/
/*  to {*/
/*    opacity: 1;*/
/*  }*/
/*}*/

/*#title {*/
/*  font-family: 'Montserrat', sans-serif;*/
/*  font-size: 35px;*/
/*  font-weight: 700;*/
/*  line-height: 35px;*/
/*  margin-bottom: 10px;*/
/*  opacity: 0;*/
/*  animation: text .5s forwards .5s;*/
/*}*/

/*#description {*/
/*  font-family: 'Inter', sans-serif;*/
/*  font-size: 20px;*/
/*  font-weight: 200;*/
/*  margin-bottom: 10px;*/
/*  opacity: 0;*/
/*  animation: text .5s forwards .8s;*/
/*}*/

/*#skillCount {*/
/*  font-family: 'Inter', sans-serif;*/
/*  font-size: 20px;*/
/*  font-weight: 300;*/
/*  margin-bottom: 20px;*/
/*  opacity: 0;*/
/*  animation: text .5s forwards 1.1s;*/
/*}*/

/*#charts {*/
/*  display: flex;*/
/*  flex-direction: row;*/
/*  align-items: flex-start;*/
/*  justify-content: space-between;*/
/*  margin-bottom: 30px;*/
/*}*/

/*#navigation {*/
/*  display: flex;*/
/*  flex-direction: row;*/
/*  justify-content: space-between;*/
/*  align-items: center;*/
/*  width: 100%;*/
/*}*/

/*#navigation img {*/
/*  display: block;*/
/*  height: 60px;*/
/*  transition: .3s;*/
/*  cursor: pointer;*/
/*  filter: drop-shadow(2px 5px 5px rgba(0, 0, 0, 0.4));*/
/*}*/

/*#page {*/
/*  font-family: 'Inter', sans-serif;*/
/*  font-size: 20px;*/
/*  font-weight: 500;*/
/*  white-space: nowrap;*/
/*}*/

/*#navNext {*/
/*  transform: rotate(180deg);*/
/*  filter: drop-shadow(-2px -5px 5px rgba(0, 0, 0, 0.4)) !important;*/
/*}*/

/*@media screen and (orientation: portrait) and (max-width: 768px), screen and (orientation: landscape) and (max-height: 650px) {*/
/*  #skillSetContainer {*/
/*    padding: 20px*/
/*  }*/

/*  #logoARSR, #X {*/
/*    height: 20px;*/
/*    margin-bottom: 15px;*/
/*  }*/

/*  #X {*/
/*    top: 20px;*/
/*    right: 20px;*/
/*  }*/

/*  #title {*/
/*    font-size: 25px;*/
/*    line-height: 25px;*/
/*    margin-bottom: 5px;*/
/*  }*/

/*  #description {*/
/*    font-size: 15px;*/
/*    line-height: 18px;*/
/*    margin-bottom: 5px;*/
/*  }*/

/*  #skillCount {*/
/*    font-size: 15px;*/
/*    margin-bottom: 10px;*/
/*  }*/

/*  #charts {*/
/*    margin-bottom: 15px;*/
/*  }*/

/*  #navigation img {*/
/*    height: 40px;*/
/*  }*/

/*  #page {*/
/*    font-size: 15px;*/
/*  }*/
/*}*/

/*@media screen and (orientation: landscape) and (max-height: 650px) {*/
/*  #skillSetContainer {*/
/*    padding: 15px;*/
/*  }*/

/*  #logoARSR, #X {*/
/*    height: 15px;*/
/*    margin-bottom: 10px;*/
/*  }*/

/*  #X {*/
/*    height: 20px;*/
/*    top: 15px;*/
/*    right: 15px;*/
/*  }*/

/*  #title {*/
/*    font-size: 20px;*/
/*    line-height: 20px;*/
/*  }*/

/*  #description {*/
/*    font-size: 12px;*/
/*    line-height: 12px;*/
/*  }*/

/*  #skillCount {*/
/*    font-size: 12px;*/
/*    margin-bottom: 5px;*/
/*  }*/

/*  #charts {*/
/*    margin-bottom: 10px;*/
/*  }*/

/*  #page {*/
/*    font-size: 12px;*/
/*  }*/
/*}*/
#skillSetContainer {
  display: inline-block;
  max-width: 100%;
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 10px;
  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px) brightness(100%);
}

@keyframes logoARSR {
  to {
    transform: scale(1);
  }
}

@keyframes text {
  to {
    opacity: 1;
  }
}

#title {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 35px;
  margin-bottom: 5px;
  opacity: 0;
  animation: text .5s forwards .5s;
}

#description {
  font-family: 'Inter', sans-serif;
  font-size: 7px;
  font-weight: 200;
  line-height: 100%;
  margin-bottom: 5px;
  opacity: 0;
  animation: text .5s forwards .8s;
}

#skillCount {
  font-family: 'Inter', sans-serif;
  font-size: 7px;
  font-weight: 300;
  margin-bottom: 5px;
  opacity: 0;
  animation: text .5s forwards 1.1s;
}

#charts {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

#navigation img {
  display: block;
  height: 60px;
  transition: .3s;
  cursor: pointer;
  filter: drop-shadow(2px 5px 5px rgba(0, 0, 0, 0.4));
}
</style>