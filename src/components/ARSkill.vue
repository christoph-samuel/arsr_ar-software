<template>
  <div>
    <div v-show="skill !== {} && !showResource" id="skillContainer">
      <p id="title">{{ skill.title }}</p>
      <p id="description" v-html="skill.description"/>
      <p id="goals" v-html="skill.goals"/>
      <div id="verification">
        <ARVerificationCheckbox color="#32BE8C" :achieved="skill.progress.self"
                                @achieve="achieve('Self Assessment', 'self')"
                                info="Self Assessment"/>
<!--        <ARVerificationCheckbox color="#4A89C4" :achieved="skill.progress.education"-->
<!--                                @achieve="achieve('Educational Verification', 'education')"-->
<!--                                info="Educational Verification"/>-->
        <ARVerificationCheckbox color="#F7BF5D" :achieved="skill.progress.business"
                                @achieve="achieve('Practical Expertise', 'business')" info="Practical Expertise"/>
<!--        <ARVerificationCheckbox color="#E04C5D" :achieved="skill.progress.certificate"-->
<!--                                @achieve="achieve('Certification', 'certificate')" info="Certification"/>-->

      </div>
    </div>
    <div v-show="showResource" id="resourceContainer">
      <youtube-vue v-if="skill.links.video" :ref="'ytVideo' + skillIdentifier" :key="skill.links.video + skillIdentifier" :videoid="skill.links.video"
                   :autoplay="1" width="90%" height="100%" @ended="ytVideoOnEnded"></youtube-vue>
      <iframe v-else-if="skill.links.pdf">
              :src="skill.links.pdf" :key="skill.links.pdf"
              title="Resource"
              allowfullscreen></iframe>
      <p v-else>Nothing to show!</p>
    </div>
  </div>
</template>

<script>
import ARVerificationCheckbox from '@/components/ARVerificationCheckbox'
import {SkillDisplay} from '@/services/SkillDisplay'
import {YoutubeVue} from 'youtube-vue'

export default {
  name: "Skill",

  components: {
    ARVerificationCheckbox,
    YoutubeVue
  },

  props: {
    skillUID: Number,
    skillNumber: Number,
    skillsTotal: Number,
    showResource: {
      type: Boolean,
      required: true
    },
    skillIdentifier: Number
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
          this.$refs["ytVideo" + this.skillIdentifier].player.playVideo()
        //   console.log(document.getElementById(this.skill.links.video + this.skillIdentifier))
        //   document.getElementById(this.skill.links.video + this.skillIdentifier).player.playVideo()
        //   document.getElementById(this.skill.links.video + this.skillIdentifier).player.getPlayerState().then(response => {console.log(response)})
        }, 5000)
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
            }          }).catch(error => {
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
  line-height: 100%;
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
</style>