<template>
  <a-scene arjs="debugUIEnabled: false;" keyboard-shortcuts>
    <a-assets>
      <a-asset-item id="logoGLTF" src="/3d/logo.glb"></a-asset-item>
    </a-assets>

    <!--    <a-marker preset='pattern' type='pattern'-->
    <!--              url='https://raw.githubusercontent.com/christoph-samuel/arsr_ar-software/main/plain/marker/pattern-green.patt'-->
    <!--              @markerFound="found('Green')" @markerLost="lost('Green')">-->
    <!--      <a-plane position="0 0 -1" rotation="-90 0 0" width="1" height="1" color="green">-->
    <!--        <a-entity :text="{value: 'Custom Marker GREEN'}" baseline="center" width="2"></a-entity>-->
    <!--      </a-plane>-->
    <!--    </a-marker>-->

    <!--    <a-marker preset='pattern' type='pattern'-->
    <!--              url='https://raw.githubusercontent.com/christoph-samuel/arsr_ar-software/main/plain/marker/pattern-red.patt'-->
    <!--              @markerFound="found('Red')" @markerLost="lost('Red')">-->
    <!--      <a-plane position="0 0 -1" rotation="-90 0 0" width="1" height="1" color="red">-->
    <!--        &lt;!&ndash;        <a-entity :text="{color: white, align: center, value: 'Custom Marker RED'}"></a-entity>&ndash;&gt;-->
    <!--      </a-plane>-->
    <!--    </a-marker>-->

    <!--    <a-marker preset='pattern' type='pattern'-->
    <!--              url='https://raw.githubusercontent.com/christoph-samuel/arsr_ar-software/main/plain/marker/pattern-blue.patt'-->
    <!--              @markerFound="found('Blue')" @markerLost="lost('Blue')">-->
    <!--      <a-plane position="0 0 -1" rotation="-90 0 0" width="1" height="1" color="blue">-->
    <!--        <a-entity :text="{value: 'Custom Marker BLUE'}" baseline="center" width="2"></a-entity>-->
    <!--      </a-plane>-->
    <!--    </a-marker>-->

    <a-marker preset="hiro" @markerFound="found(332)" @markerLost="lost(332)">
      <a-plane v-show="skills != null && skills.length !== 0" position="0 0 -1" rotation="-90 0 0" width="1" height="1"
               color="white">
      </a-plane>
      <!--      <div v-if="showSkill && skills != null && skills.length !== 0" id="skill">-->
      <div v-show="showSkill && skills != null && skills.length !== 0" id="skill">
        <div id="skillHeading">
          <img id="logoARSR" src="/img/logo_transparent_schwarz.png" alt="Logo ARSR">
          <!--          <p id="skillTitle">{{ skills[0].title }}</p>-->
          <p id="skillTitle"></p>
        </div>
        <!--        <div v-show="showSkill && skills != null && skills.length !== 0" id="skillInformation">-->
        <div id="skillInformation">
          <div id="skillDescriptionDiv">
            <h3 class="skillSubHeadings">Description:</h3>
            <span id="skillDescription"></span>
          </div>
          <div id="skillGoalsDiv">
            <h3 class="skillSubHeadings">Goals:</h3>
            <!--            <span id="skillGoals">{{ skills[0].goals }}</span>-->
            <span id="skillGoals"></span>
          </div>
          <div id="skillResourcesDiv">
            <h3 class="skillSubHeadings">Resources:</h3>
            <span id="skillResources"></span>
          </div>
        </div>
        <div id="skillFooter">
          <md-button class="md-icon-button md-raised" @click="clicked('prev')" :disabled="buttonPrev">
            <md-icon>chevron_left</md-icon>
          </md-button>
          <div v-if="skillsTotal === 0 || skillNumber < 0 || skillNumber+1 > skillsTotal">Nothing to show!</div>
          <div v-else>( {{ skillNumber + 1 }}/{{ skillsTotal }} )</div>
          <md-button class="md-icon-button md-raised" @click="clicked('next')" :disabled="buttonNext">
            <md-icon>chevron_right</md-icon>
          </md-button>
        </div>
      </div>
    </a-marker>

    <a-marker preset="kanji" @markerFound="found('logo')" @markerLost="lost('logo')">
      <a-gltf-model src="#logoGLTF" scale=".005 .005 .005" position="0 0 0" rotation="0 0 0"
                    animation="property: rotation; dur: 5000; to: 0 0 360; loop: true; easing: linear">
      </a-gltf-model>
    </a-marker>
    <a-entity camera></a-entity>
  </a-scene>
</template>

<script>
import {SkillDisplay} from '@/services/SkillDisplay'

export default {
  name: 'Scene',

  data: () => {
    return {
      skills: [],
      links: [],
      showSkill: false,
      skillNumber: 0,
      skillsTotal: 0,
      buttonPrev: true,
      buttonNext: false
    }
  },

  methods: {
    found(value) {
      console.log(value + "-Marker found")

      if (parseInt(value)) {
        this.showSkill = true
        let sd = new SkillDisplay()
        sd.getSkillSet(value)
            .then(response => {
              console.log("Reponse:", response)
              this.skillsTotal = response.skillCount
              this.skills = response.skills
              console.log("Skills:", this.skills)
              this.links = response.links

              this.loadSkills()
            }).catch(error => {
          console.log(error)
        })
      }
    },

    lost(value) {
      this.showSkill = false
      console.log(value + "-Marker lost")
    },

    clicked(direction) {
      if (direction === 'prev') {
        if (this.skillNumber - 1 <= 0) {
          this.skillNumber--
          this.loadSkills()
          this.buttonPrev = true
          this.buttonNext = false
        } else {
          this.buttonPrev = false
          this.buttonNext = false
          this.skillNumber--
          this.loadSkills()
        }
      } else if (direction === 'next') {
        if (this.skillNumber + 2 >= this.skillsTotal) {
          this.skillNumber++
          this.loadSkills()
          this.buttonNext = true
          this.buttonPrev = false
        } else {
          this.buttonNext = false
          this.buttonPrev = false
          this.skillNumber++
          this.loadSkills()
        }
      }
      // this.skillNumber += (direction === 'next' && this.buttonNext) ? 1 : (direction === 'prev') ? -1 : 0
      console.log(direction + " -> " + this.skillNumber)
    },

    loadSkills() {
      if (this.skillsTotal !== 0 && this.skillNumber >= 0 && this.skillNumber + 1 <= this.skillsTotal) {
        let skillTitle = document.getElementById('skillTitle')
        let skillDescription = document.getElementById('skillDescription')
        let skillGoals = document.getElementById('skillGoals')
        let skillResources = document.getElementById('skillResources')

        skillTitle.innerHTML = this.skills[this.skillNumber].title
        skillDescription.innerHTML = this.skills[this.skillNumber].description
        skillGoals.innerHTML = this.skills[this.skillNumber].goals
        try {
          skillResources.innerHTML = "<a href='" + this.links[this.skillNumber].url + "' style='color: #00A99D'>" + this.links[this.skillNumber].title + "</a>"
        } catch {
          skillResources.innerHTML = "<span style='color: #00A99D'>/</span>"
        }
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Scrollbar: */
/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 50%;
}

/* Track */
::-webkit-scrollbar-track {
  /*background: #fff;*/
  /*border-radius: 12px;*/
  visibility: hidden;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #000;
  border-radius: 12px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #000;
}


a-scene {
  display: flex;
  justify-content: center;
}

p {
  margin: 0;
}

#skill {
  z-index: 10;
  width: 65vw;
  height: 40vh;
  overflow-y: scroll;
  position: sticky;
  top: 3vh;
  padding: 15px 15px 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.75);
  /*border: 1px solid black;*/
  border-radius: 12px;
  box-shadow: 10px 20px 50px -20px rgba(0, 0, 0, 0.8);
}

#skill > div {
  margin-bottom: 20px;
}

#skillHeading {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#logoARSR {
  display: block;
  width: 100px;
  position: absolute;
  top: 10px;
  left: 20px;
}

#skillTitle {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 25px;
}

#skillInformation {
  display: grid;
  grid-template-columns: 30% 30% 30%;
  justify-content: space-evenly;
}

#skillInformation > div {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  padding: 15px 30px 0 15px;
  background-color: rgb(255, 255, 255);
  /*border: 1px solid black;*/
  border-radius: 12px;
  box-shadow: 10px 20px 50px -20px rgba(0, 0, 0, 0.8);
}

.skillSubHeadings {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 20px;
  text-decoration: underline;
  margin-top: 0;
}

#skillResources {
  word-break: break-word;
}

#skillInformation > div > span {
  position: relative;
  left: 15px;
}

#skillFooter {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  position: sticky;
  bottom: 10px;
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


@media handheld and (orientation: portrait) {
  #skill {
    width: 90vw;
    padding-top: 0;
  }

  #logoARSR {
    display: block;
    width: 100px;
    position: relative;
    top: 0;
    left: 0;
    margin-bottom: 10px;
  }
}

@media (max-width: 800px) {
  #skill {
    width: 90vw;
  }
}

@media (max-width: 600px) {
  #skill {
    padding-top: 0;
  }

  #logoARSR {
    display: block;
    width: 100px;
    position: relative;
    top: 0;
    left: 0;
    margin-bottom: 10px;
  }
}
</style>
