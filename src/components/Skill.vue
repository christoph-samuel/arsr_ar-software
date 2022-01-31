<template>
  <div>
    <div id="skillContainer">
      <img id="logoARSR" src="/img/logo_transparent_schwarz.png" alt="Logo ARSR">
      <img id="X" src="/img/X.svg" alt="X" @click="close()">
      <p id="title">{{ skill.title }}</p>
      <p id="description" v-html="skill.description"/>
      <p id="goals" v-html="skill.goals"/>
      <div id="verification">
        <verification-checkbox color="#32BE8C" :achieved="skill.progress.self===0"/>
        <verification-checkbox color="#4A89C4" :achieved="skill.progress.education===0"/>
        <verification-checkbox color="#F7BF5D" :achieved="skill.progress.business===0"/>
        <verification-checkbox color="#E04C5D" :achieved="skill.progress.certificate===0"/>
      </div>
      <div id="navigation">
        <img id="navPrev" src="/img/NavigationButton.svg" alt="Previous" @click="navigate(-1)"/>
        <p id="page">( {{ this.skillNumber }}/{{ this.skillsTotal }} )</p>
        <img id="navNext" src="/img/NavigationButton.svg" alt="Next" @click="navigate(1)"/>
      </div>
    </div>
  </div>
</template>

<script>
import VerificationCheckbox from '@/components/VerificationCheckbox'

export default {
  name: "Skill",

  components: {
    VerificationCheckbox
  },

  beforeUpdate() {
    // console.log("Skill ", this.skillNumber, ": ", this.skill.title)
    // console.log("First:", this.skill.progress.self)
    // console.log("Second:", this.skill.progress.education)
    // console.log("Third:", this.skill.progress.business)
    // console.log("Fourth:", this.skill.progress.certificate)
  },

  props: {
    skill: Object,
    skillNumber: Number,
    skillsTotal: Number
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
#skillContainer {
  display: inline-block;
  max-height: 100%;
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
  position: absolute;
  top: 30px;
  right: 30px;
  transition: .3s;
  cursor: pointer;
  filter: drop-shadow(2px 5px 5px rgba(0, 0, 0, 0.2));
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

/* TODO: set max-height when .skillContainer is to big for Website height */
#goals {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 20px;
}

#verification {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-evenly;
  margin-bottom: 30px;
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
  filter: drop-shadow(2px 5px 5px rgba(0, 0, 0, 0.2));
}

#page {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 500;
  white-space: nowrap;
}

#navNext {
  transform: rotate(180deg);
  filter: drop-shadow(-2px -5px 5px rgba(0, 0, 0, 0.2)) !important;
}

@media screen and (orientation: portrait) and (max-width: 768px), screen and (orientation: landscape) and (max-height: 650px) {
  #skillContainer {
    padding: 20px;
  }

  #logoARSR, #X {
    display: block;
    height: 20px;
    margin-bottom: 15px;
  }

  #X {
    top: 20px;
    right: 20px;
  }

  #title {
    font-size: 25px;
    line-height: 25px;
    margin-bottom: 5px;
  }

  #description {
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 5px;
  }

  /* TODO: set max-height when .skillContainer is too big for Website height */
  #goals {
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 10px;
  }

  #verification {
    margin-bottom: 15px;
  }

  #navigation img {
    height: 40px;
  }

  #page {
    font-size: 15px;
  }
}

@media screen and (orientation: landscape) and (max-height: 650px) {
  #skillContainer {
    padding: 15px;
  }

  #logoARSR, #X {
    height: 15px;
    margin-bottom: 10px;
  }

  #X {
    height: 20px;
    top: 15px;
    right: 15px;
  }

  #title {
    font-size: 20px;
    line-height: 20px;
  }

  #description {
    font-size: 12px;
    line-height: 12px;
  }

  #goals {
    font-size: 12px;
    line-height: 12px;
    margin-bottom: 5px;
  }

  #verification {
    margin-bottom: 10px;
  }

  #page {
    font-size: 12px;
  }
}
</style>