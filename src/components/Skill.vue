<template>
  <div>
    <div v-show="skill !== {} && !showResource" id="skillContainer">
      <img id="logoARSR" src="/img/logo_transparent_schwarz.png" alt="Logo ARSR">
      <img class="X" src="/img/X.svg" alt="X" @click="close()">
      <div id="titleContainer">
        <p id="title">{{ skill.title }}</p>
        <img id="resourceButton" src="/img/Resource.svg" alt="Resource" @click="toggleResource"/>
      </div>
      <p id="description" v-html="skill.description"/>
      <p id="goals" v-html="skill.goals"/>
      <div id="verification">
        <verification-checkbox color="#32BE8C" :achieved="skill.progress.self"
                               @achieve="achieve('Self Assessment', 'self')"
                               info="Self Assessment"/>
<!--        <verification-checkbox color="#4A89C4" :achieved="skill.progress.education"-->
<!--                               @achieve="achieve('Educational Verification', 'education')"-->
<!--                               info="Educational Verification"/>-->
        <verification-checkbox color="#F7BF5D" :achieved="skill.progress.business"
                               @achieve="achieve('Practical Expertise', 'business')" info="Practical Expertise"/>
<!--        <verification-checkbox color="#E04C5D" :achieved="skill.progress.certificate"-->
<!--                               @achieve="achieve('Certification', 'certificate')" info="Certification"/>-->
      </div>
      <div id="navigation">
        <img id="navPrev" src="/img/NavigationButton.svg" alt="Previous" @click="navigate(-1)"/>
        <p id="page">Skill ( {{ this.skillNumber }}/{{ this.skillsTotal }} )</p>
        <div id="navigationRight">
          <img id="navNext" src="/img/NavigationButton.svg" alt="Next" @click="navigate(1)"/>
        </div>
      </div>
    </div>

    <div v-show="showResource" id="resourceContainer">
      <youtube-vue v-if="skill.links.video" ref="ytVideo" :key="skill.links.video" :videoid="skill.links.video"
                   :autoplay="0" width="90%" height="100%" @ended="ytVideoOnEnded"></youtube-vue>
      <iframe v-else-if="skill.links.pdf"
              :src="skill.links.pdf" :key="skill.links.pdf"
              title="Resource"
              allowfullscreen></iframe>
      <p v-else>Nothing to show!</p>
      <img class="X" src="/img/X.svg" alt="X" @click="toggleResource">
    </div>
  </div>
</template>

<script>
import VerificationCheckbox from '@/components/VerificationCheckbox'
import {SkillDisplay} from '@/services/SkillDisplay'
import {YoutubeVue} from 'youtube-vue'

export default {
  name: "Skill",

  components: {
    VerificationCheckbox,
    YoutubeVue
  },

  props: {
    skillUID: Number,
    skillNumber: Number,
    skillsTotal: Number,
    showResource: {
      type: Boolean,
      required: true
    }
  },

  data: () => {
    return {
      skill: {}
    }
  },

  watch: {
    skillUID: function (val) {
      this.loadSkill(val)
    },
    showResource: function (newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$refs.ytVideo.player.playVideo()
        }, 1000)
      }
    }
  },

  mounted() {
    this.loadSkill(this.skillUID)
  },

  methods: {
    loadSkill(skillUID) {
      let sd = new SkillDisplay()
      sd.getSkill(skillUID)
          .then(response => {
            this.skill = response
            if (this.skill.links[0].url.match(/https:\/\/www\.youtube\.com\/watch\?v=.*$/i)) {
              this.skill.links = {"video": this.skill.links[0].url.replace(/https:\/\/www\.youtube\.com\/watch\?v=(.*)$/i, "$1")}
            } else if (this.skill.links[0].url.match(/.+\.pdf\/?$/i)) {
              this.skill.links = {"pdf": this.skill.links[0].url}
            }
          }).catch(error => {
        console.log(error)
      })
    },

    close() {
      this.$emit('close')
    },

    navigate(direction) {
      this.$emit('navigate', direction)
    },

    achieve(verification, level) {
      this.$emit('achieve', verification, level, this.skillUID)
    },

    toggleResource() {
      this.showResource = !this.showResource
      if (!this.showResource) this.$refs.ytVideo.player.pauseVideo()
      this.$emit('toggleResource', this.showResource)
    },

    ytVideoOnEnded() {
      this.$refs.ytVideo.player.playVideo();
    }
  }
}
</script>

<style scoped>
#skillContainer, #resourceContainer {
  display: inline-block;
  max-height: 100%;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 10px;
  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px) brightness(100%);
}

#titleContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

#resourceContainer {
  width: 100%;
  height: 50vh;
}

#logoARSR, .X {
  display: block;
  height: 30px;
  margin-bottom: 30px;
}

.X {
  position: absolute;
  top: 30px;
  right: 30px;
  transition: .3s;
  cursor: pointer;
  filter: drop-shadow(2px 5px 5px rgba(0, 0, 0, 0.4));
}

.X:hover, #navPrev:hover, #resourceButton:hover {
  transform: scale(1.1);
}

#navNext:hover {
  transform: scale(1.1) rotate(180deg);
}

#title {
  height: max-content;
  font-family: 'Montserrat', sans-serif;
  font-size: 35px;
  font-weight: 700;
  line-height: 35px;
}

#description {
  height: max-content;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 200;
  margin-bottom: 10px;
}

#goals {
  height: max-content;
  max-height: 40vh;
  overflow-y: auto;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
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

#navigationRight {
  display: flex;
  flex-direction: row;
  align-items: center;
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

#resourceButton {
  display: block;
  height: 45px !important;
  margin-left: 20px;
  transition: .3s;
  cursor: pointer;
  filter: drop-shadow(2px 5px 5px rgba(0, 0, 0, 0.4));
}

#resourceContainer iframe {
  width: 90% !important;
  height: 100% !important;
  zoom: 1.2;
}

@media screen and (orientation: portrait) and (max-width: 768px), screen and (orientation: landscape) and (max-height: 650px) {
  #skillContainer, #resourceContainer {
    padding: 20px;
  }

  #titleContainer {
    margin-bottom: 5px;
  }

  #resourceContainer {
    height: 65vh;
  }

  #logoARSR, .X {
    display: block;
    height: 20px;
    margin-bottom: 15px;
  }

  .X {
    top: 20px;
    right: 20px;
  }

  #title {
    font-size: 25px;
    line-height: 25px;
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

  #resourceButton {
    height: 30px !important;
  }

  #page {
    font-size: 15px;
  }
}

@media screen and (orientation: landscape) and (max-height: 650px) {
  #skillContainer, #resourceContainer {
    padding: 15px;
  }

  #resourceContainer {
    height: 80vh;
  }

  #logoARSR, .X {
    height: 15px;
    margin-bottom: 10px;
  }

  .X {
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

  #resourceContainer > iframe {
    width: 95% !important;
  }
}
</style>