<template>
  <div style="width: 100%; height: 100%">
    <div id="reader"></div>
    <a-scene embedded arjs ref="scene">

      <a-marker preset="kanji">
        <a-gltf-model src="/3d/logo.glb" scale="0.001 0.001 0.001" position="0 0 0" rotation="0 0 0"
                      animation="property: rotation; dur: 5000; to: 0 0 360; loop: true; easing: linear">
        </a-gltf-model>
      </a-marker>

      <SkillSet id="skillSet" ref="skillSet" v-if="showSkill && skillSet.skills !== null && this.skillNumber === 0"
                :skill-set="skillSet" @close="closeUI" @navigate="navigate"/>
      <Skill id="skill" ref="skill" v-else-if="showSkill && skillSet.skills !== null && this.skillNumber !== 0"
             :skillUID="skillSet.skills[this.skillNumber-1].uid" :skill-number="this.skillNumber"
             :skills-total="this.skillsTotal" :show-resource="showResource" @close="closeUI" @navigate="navigate"
             @achieve="achieve" @toggle-resource="toggleResource"/>

      <Message id="message" v-if="message" :message="message" :color="messageColor" @close="closeMessage"/>

      <a-entity camera></a-entity>
    </a-scene>
    <md-button id="AR" :to="{ name: 'ar-scene'}">AR</md-button>

    <p style="display: none">{{hidden}}</p>
  </div>
</template>

<script>
import SkillSet from '@/components/SkillSet'
import Skill from '@/components/Skill'
import Message from '@/components/Message'
import {SkillDisplay} from '@/services/SkillDisplay'
import {Html5Qrcode} from 'html5-qrcode'

export default {
  name: 'Scene',

  components: {
    SkillSet,
    Skill,
    Message
  },

  data: () => {
    return {
      skillSet: {},
      skillSetID: null,
      skillNumber: 0,
      skillsTotal: 0,
      showSkill: false,
      showResource: false,
      input: "",
      message: null,
      messageColor: null,
      hidden: ""
    }
  },

  mounted() {
    this.speech2text()
    this.qrCode()

    let skillSetID = window.location.href.replace(/.*\?skillset=(\d+)/gi, "$1")
    if (skillSetID) {
      this.skillSetID = skillSetID
      this.loadSkills(skillSetID)
    }

    let observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        document.querySelector('#reader video').style.cssText = document.getElementById('arjs-video').style.cssText
      })
    })

    document.arrive("#arjs-video", () => {
      observer.observe(document.getElementById('arjs-video'), {attributes: true, attributeFilter: ['style']})
    });
  },

  watch: {
    skillNumber: function (val) {
      if (val === 0) {
        this.loadSkills(this.skillSetID)
      }
    }
  },

  methods: {
    loadSkills(skillSetID) {
      if (parseInt(skillSetID)) {
        this.showSkill = true
        let sd = new SkillDisplay()
        sd.getSkillSet(skillSetID)
            .then(response => {
              this.skillSet = response
              this.skillNumber = 0
              this.skillsTotal = response.skillCount
            }).catch(error => {
          console.log(error)
        })
      }
    },

    qrCode() {
      let config = {fps: 5}
      let skillSetID

      const qrCodeSuccessCallback = (decodedText) => {
        try {
          skillSetID = parseInt(isNaN(parseInt(decodedText)) ? decodedText.replace(/^https:\/\/my\.skilldisplay\.eu\/skillset\/(\d+)$/gi, "$1") : decodedText)
          if (skillSetID !== this.skillSetID) {
            this.skillSetID = skillSetID
            this.loadSkills(skillSetID)
          }
        } catch {
          console.log("SkillSet from QR-Code not readable!")
        }
      }

      Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
          let cameraId = devices[0].id
          if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i) || navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/BlackBerry/i)) {
             cameraId = devices[1].id
          }
          const html5QrCode = new Html5Qrcode("reader")
          html5QrCode.start({ deviceId: { exact: cameraId} }, config, qrCodeSuccessCallback)
        }
      })
    },

    async speech2text() {
      try {
        let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList

        let commands = [
          'Next',
          'Following',
          'Back',
          'Previous',
          'Close',
          'Verify Self Assessment',
          'Verify Educational Verification',
          'Verify Practical Expertise',
          'Verify Certification',
          'Resource',
          'Overview'
        ];
        let grammar = '#JSGF V1.0; grammar commands; public <command> = ' + commands.join(' | ') + ' ;'

        let speechRecognitionList = new SpeechGrammarList()
        speechRecognitionList.addFromString(grammar, 1);

        let recognition = new SpeechRecognition()
        recognition.grammars = speechRecognitionList;
        recognition.continuous = true
        recognition.lang = 'en'
        recognition.interimResults = true
        recognition.maxAlternatives = 0

        recognition.start()
        // console.log('Ready to receive a command.')

        let newThis = this

        recognition.onresult = function (event) {
          newThis.input = event.results[event.results.length - 1][0].transcript
          newThis.hidden = newThis.input

          if (event.results[event.results.length - 1].isFinal) {
            if (newThis.input.match(/Next\.*/i)) {
              newThis.navigate(1)
            } else if (newThis.input.match(/Following\.*/i)) {
              newThis.navigate(1)
            } else if (newThis.input.match(/Back\.*/i)) {
              newThis.navigate(-1)
            } else if (newThis.input.match(/Previous\.*/i)) {
              newThis.navigate(-1)
            } else if (newThis.input.match(/Close\.*/i)) {
              newThis.closeUI()
            } else if (newThis.input.match(/Verify Self[ -]Assessment\.*/i)) {
              newThis.achieve('Self Assessment', newThis.skillSet.skills[newThis.skillNumber - 1].uid)
            // } else if (newThis.input.match(/Verify Educational Verification\.*/i)) {
            //   newThis.achieve('Educational Verification', newThis.skillSet.skills[newThis.skillNumber - 1].uid)
            } else if (newThis.input.match(/Verify Practical Expertise\.*/i)) {
              newThis.achieve('Practical Expertise', newThis.skillSet.skills[newThis.skillNumber - 1].uid)
            // } else if (newThis.input.match(/Verify Certification\.*/i)) {
            //   newThis.achieve('Certification', newThis.skillSet.skills[newThis.skillNumber - 1].uid)
            } else if (newThis.input.match(/Resource\.*/i)) {
              newThis.showResource = true
            } else if (newThis.input.match(/Overview\.*/i)) {
              newThis.showResource = false
            }
          }
        }

        recognition.onspeechend = function () {
          // this.message = ""
          // console.log("Restarting Speech2Text")
          newThis.speech2text()
        }

        recognition.onerror = function () {
          // console.log('Error occurred in recognition')
          newThis.speech2text()
        }
      } catch (e) {
        console.log(e.message)
        this.error = "Speech Recognition is not supported!"
      }
    },

    closeUI() {
      this.showSkill = false
      this.skillSetID = null
      this.skillSet = {}
    },

    navigate(direction) {
      let newSkillNumber = this.skillNumber + direction

      if (newSkillNumber >= 0 && newSkillNumber <= this.skillsTotal) {
        this.skillNumber += direction
      } else if (newSkillNumber < 0) {
        this.skillNumber = this.skillsTotal
      } else if (newSkillNumber > this.skillsTotal) {
        this.skillNumber = 0
      }

      this.showResource = false
    },

    achieve(verification, level, skillNumber) {
      this.message = null
      this.message = "Request for Verification of '" + verification + "' from Skill " + skillNumber + " sent to SkillDisplay!"
      this.messageColor = "#28a745"

      let sd = new SkillDisplay()
      sd.setVerification(this.skillSetID, skillNumber, level)
          .then(response => {
            console.log("Verification Response:", response.data)
          }).catch(error => {
        console.log("Verification Error:", error)
      })
    },

    closeMessage() {
      this.message = null
    },

    toggleResource(value)  {
      this.showResource = value
    }
  }
}

</script>

<style>
.a-enter-vr{
  display: none;
}

#AR{
  z-index: 1000000;
  background: white;
  border: solid darkgrey 2px;
  border-radius: 10px;
  position: fixed;
  right: 25px;
  bottom: 10px;
  filter: drop-shadow(2px 5px 5px rgba(0, 0, 0, 0.4));
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
  overflow: hidden;
  margin: 0;
}

p {
  margin: 0;
}

.a-canvas.a-grab-cursor, .a-canvas.a-grab-cursor:hover {
  cursor: default !important;
  /*z-index: -1;*/
}

#skillSet, #skill {
  z-index: 10;
  position: fixed;
  top: 40px;
  bottom: 40px;
  width: 60vw;
}

#message {
  width: max-content;
  min-width: 250px;
  max-width: 50vw;
  position: fixed;
  z-index: 100;
  top: 10px;
  margin: 0 auto;
}


@media screen and (orientation: portrait) {
  #arjs-video {
    width: 100% !important;
  }
}

@media screen and (orientation: portrait) and (max-width: 768px) {
  #skillSet, #skill {
    top: 20px;
    bottom: 20px;
    width: 85vw;
  }
}

@media screen and (orientation: landscape) and (max-height: 650px) {
  #skillSet, #skill {
    top: 20px;
    bottom: 20px;
    width: 75vw;
  }
}

@media screen and (max-width: 576px) {
  #error {
    width: 90vw;
  }
}
</style>
