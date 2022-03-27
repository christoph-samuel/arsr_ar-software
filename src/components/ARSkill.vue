<template>
  <div>
    <div id="skillContainer">
      <p id="title">{{ skill.title }}</p>
      <p id="description" v-html="skill.description"/>
      <p id="goals" v-html="skill.goals"/>
      <div id="verification">
        <verification-checkbox color="#32BE8C" :achieved="skill.progress.self"
                               @achieve="achieve('Self Assessment', 'self')"
                               info="Self Assessment"/>
        <verification-checkbox color="#4A89C4" :achieved="skill.progress.education"
                               @achieve="achieve('Educational Verification', 'education')"
                               info="Educational Verification"/>
        <verification-checkbox color="#F7BF5D" :achieved="skill.progress.business"
                               @achieve="achieve('Practical Expertise', 'business')" info="Practical Expertise"/>
        <verification-checkbox color="#E04C5D" :achieved="skill.progress.certificate"
                               @achieve="achieve('Certification', 'certificate')" info="Certification"/>

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
    },

    achieve(verification) {
      this.$emit('achieve', verification, this.skill.uid)
    }
  }
}
</script>

<style scoped>
#skillContainer {
  display: inline-block;
  max-width: 95%;
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

#title {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  line-height: 35px;
  margin-bottom: 5px;
  animation: text .5s forwards .5s;
}

#description {
  font-family: 'Inter', sans-serif;
  font-size: 7px;
  font-weight: 200;
  line-height: 100%;
  margin-bottom: 5px;
  animation: text .5s forwards .8s;
}

#goals {
  height: max-content;
  max-height: 40vh;
  overflow-y: auto;
  font-family: 'Inter', sans-serif;
  font-size: 7px;
  font-weight: 300;
  margin-bottom: 20px;
}

#verification {
  height: max-content;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-evenly;
  margin-bottom: 30px;
}

#navigation {
  height: max-content;
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
  filter: drop-shadow(2px 5px 5px rgba(0, 0, 0, 0.4));
}

#page {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 500;
  white-space: nowrap;
}

#navNext {
  transform: rotate(180deg);
  filter: drop-shadow(-2px -5px 5px rgba(0, 0, 0, 0.4)) !important;
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
    max-height: 20vh;
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