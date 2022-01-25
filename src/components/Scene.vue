<template>
  <div style="width: 100%; height: 100%">
    <div id="reader"></div>
    <a-scene arjs="debugUIEnabled: false;" keyboard-shortcuts>
      <a-assets>
        <a-asset-item id="logoGLTF" src="/3d/logo.glb"></a-asset-item>
        <img id="Content-Paste-Go" src="/img/Content-Paste-Go.png">
      </a-assets>

      <a-marker preset="hiro" @markerFound="markerFound(332)" @markerLost="markerLost()">
        <a-image v-show="skills != null && skills.length !== 0" src="#Content-Paste-Go" position="0 0 0"
                 rotation="-90 0 0" width="0.5" height="0.5"></a-image>
      </a-marker>

      <a-marker preset="kanji" @markerFound="markerFound('logo')" @markerLost="markerLost()">
        <a-gltf-model src="#logoGLTF" scale=".005 .005 .005" position="0 0 0" rotation="0 0 0"
                      animation="property: rotation; dur: 5000; to: 0 0 360; loop: true; easing: linear">
        </a-gltf-model>
      </a-marker>

      <div v-show="showSkill && skills != null && skills.length !== 0" id="skill">
        <div id="skillHeading">
          <img id="logoARSR" src="/img/logo_transparent_schwarz.png" alt="Logo ARSR">
          <p id="skillTitle"></p>
        </div>
        <div id="skillInformation">
          <div id="skillDescriptionDiv">
            <h3 class="skillSubHeadings">Description:</h3>
            <span id="skillDescription"></span>
          </div>
          <div id="skillGoalsDiv">
            <h3 class="skillSubHeadings">Goals:</h3>
            <span id="skillGoals"></span>
          </div>
          <div id="skillResourcesDiv">
            <h3 class="skillSubHeadings">Resources:</h3>
            <span id="skillResources"></span>
          </div>
        </div>
        <div id="skillFooter">
          <md-button class="md-icon-button md-raised" @click="navigate(-1)" :disabled="buttonPrev">
            <md-icon>chevron_left</md-icon>
          </md-button>
          <div v-if="skillsTotal === 0 || skillNumber < 0 || skillNumber+1 > skillsTotal">Nothing to show!</div>
          <div v-else>( {{ skillNumber + 1 }}/{{ skillsTotal }} )</div>
          <md-button class="md-icon-button md-raised" @click="navigate(1)" :disabled="buttonNext">
            <md-icon>chevron_right</md-icon>
          </md-button>
        </div>
      </div>

      <md-card id="error" v-show="error !== null" class="md-accent" md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Error</div>
            <div class="md-subhead">Message:</div>
          </md-card-header>

          <md-card-content>
            {{ error }}
          </md-card-content>

          <md-card-actions id="errorActions">
            <md-button class="md-icon-button" @click="removeError">
              <md-icon>close</md-icon>
            </md-button>
          </md-card-actions>
        </md-ripple>
      </md-card>
    </a-scene>
  </div>
</template>

<script>
import {SkillDisplay} from '@/services/SkillDisplay'
// import {speech2text} from '@/services/Speech2Text'
import {Html5Qrcode} from 'html5-qrcode'
// import {Html5QrcodeScanner} from 'html5-qrcode'

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
      buttonNext: false,
      input: "",
      error: null
    }
  },

  mounted() {
    this.speech2text()
    this.qrCode()

    let observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        document.querySelector('#reader video').style.cssText = document.getElementById('arjs-video').style.cssText
      })
    })

    document.arrive("#arjs-video", () => {
      observer.observe(document.getElementById('arjs-video'), { attributes : true, attributeFilter : ['style'] })
    });
  },

  methods: {
    qrCode() {
      let config = {fps: 5}
      let skillset
      let showSkill = false

      const html5QrCode = new Html5Qrcode("reader")

      const qrCodeSuccessCallback = (decodedText) => {
        showSkill = true

        try {
          skillset = parseInt(isNaN(parseInt(decodedText)) ? decodedText.match(/\d+$/gi) : decodedText)
          this.loadSkills(skillset)
        } catch {
          console.log("SkillSet from QR-Code not readable!")
        }
      }

      const qrCodeFailureCallback = () => {
        if (showSkill) {
          this.showSkill = false
          showSkill = false
        }
      }

      html5QrCode.start({facingMode: "environment"}, config, qrCodeSuccessCallback, qrCodeFailureCallback)
    },

    // async speech2text() {
    //   speech2text().then(response => console.log("Response S2T: ", response))
    // },
    async speech2text() {
      try {
        let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        // var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
        // var SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

        let recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.lang = 'de'
        recognition.interimResults = true
        recognition.maxAlternatives = 0

        recognition.start()
        console.log('Ready to receive a command.')

        let newThis = this

        recognition.onresult = function (event) {
          newThis.input = event.results[event.results.length - 1][0].transcript
          // console.log("Input:", newThis.input)
          // console.log("Results:", event.results)
          // console.log(event.results.length)

          if (event.results[event.results.length - 1].isFinal) {
            if (newThis.input.match(/Weiter\.*/i)) {
              // console.log('Case: ', 'Weiter')
              newThis.navigate(1)
            } else if (newThis.input.match(/Zurück\.*/i)) {
              // console.log('Case: ', 'Zurück')
              newThis.navigate(-1)
            }
          }
          setTimeout(() => {
            try {
              recognition.start()
            } catch {
              console.log("Speech recognition already started!")
            }
          }, 50)
        }

        recognition.onspeechend = function () {
          // this.message = ""
          // console.log("Message:", this.message)
          newThis.speech2text()
        }

        recognition.onerror = function (event) {
          // newThis.message = "Error in speech recognition occured, please reload the page!"
          console.log('Error occurred in recognition: ', event.error)
          newThis.error = event.error
          // newThis.error = "Error in speech recognition occured, please reload the page!"
          newThis.speech2text()
        }
      } catch (e) {
        this.error = e.message
        // this.error = "Spracherkennung wird nicht unterstützt!"
      }
    },

    markerFound(skillSetID) {
      // console.log(skillSetID + "-Marker found")
      this.loadSkills(skillSetID)
    },

    markerLost() {
      this.showSkill = false
      // console.log(skillSetID + "-Marker lost")
    },

    navigate(direction) {
      let newSkillNumber = this.skillNumber + direction

      if (newSkillNumber >= 0 && newSkillNumber < this.skillsTotal) {
        this.skillNumber += direction
        this.buttonPrev = this.skillNumber === 0
        this.buttonNext = this.skillNumber === this.skillsTotal - 1
        this.loadSkills()
      }

      // console.log((direction === 1 ? "Next" : "Prev") + " -> Skill: " + this.skillNumber)
    },

    loadSkills(skillSetID) {
      if (parseInt(skillSetID)) {
        this.showSkill = true
        let sd = new SkillDisplay()
        sd.getSkillSet(skillSetID)
            .then(response => {
              // console.log("Response:", response)
              this.skillsTotal = response.skillCount
              this.skills = response.skills
              // console.log("Skills:", this.skills)
              this.links = response.links

              this.setSkills()
            }).catch(error => {
          console.log(error)
        })
      }
    },

    setSkills() {
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
    },

    removeError() {
      this.error = null
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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


#reader {
  height: 100% !important;
  width: 100% !important;
}


a-scene {
  position: absolute !important;
  top: 0 !important;
  display: flex !important;
  justify-content: center !important;
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
  word-break: break-all;
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

#error {
  width: max-content;
  min-width: 150px;
  position: fixed;
  z-index: 100;
  top: 10px;
  right: 0;
  left: 0;
  margin: 0 auto;
  box-shadow: 0 0 50px -5px rgba(0, 0, 0, 0.8);
}

#errorActions {
  position: absolute;
  top: 0;
  right: 0;
}


@media screen and (orientation: portrait) {
  #arjs-video {
    width: 100% !important;
  }
}

@media screen and (max-width: 800px) {
  #skill {
    width: 90vw;
  }
}

@media screen and (max-height: 750px) {
  #skill {
    width: 90vw;
    height: 60vh;
  }
}

@media screen and (max-width: 600px) {
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

  #error {
    width: 90vw;
  }
}
</style>
