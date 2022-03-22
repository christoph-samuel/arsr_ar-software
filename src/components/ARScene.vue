<template>
  <div id="background">
    <div id="reader"></div>
    <div class="display-cover" id="container1">
      <video ref="video1" id="glass1" autoplay></video>
      <ARSkillSet :AR="true" id="skillSet1" ref="skillSet" v-if="showSkill && skillSet.skills !== null && this.skillNumber === 0"
                :skill-set="skillSet" @close="closeUI" @navigate="navigate"/>
      <ARSkill id="skill1" ref="skill" v-else-if="showSkill && skillSet.skills !== null && this.skillNumber !== 0"
             :skill="skillSet.skills[this.skillNumber-1]" :skill-number="this.skillNumber"
             :skills-total="this.skillsTotal" @close="closeUI" @navigate="navigate" @achieve="achieve"/>

      <Message id="message1" v-if="message" :message="message" :color="messageColor" @close="closeMessage"/>
    </div>
    <div class="display-cover" id="container2">
      <video ref="video2" id="glass2" autoplay></video>
      <ARSkillSet :AR="true" id="skillSet2" ref="skillSet" v-if="showSkill && skillSet.skills !== null && this.skillNumber === 0"
                :skill-set="skillSet" @close="closeUI" @navigate="navigate"/>
      <ARSkill id="skill2" ref="skill" v-else-if="showSkill && skillSet.skills !== null && this.skillNumber !== 0"
             :skill="skillSet.skills[this.skillNumber-1]" :skill-number="this.skillNumber"
             :skills-total="this.skillsTotal" @close="closeUI" @navigate="navigate" @achieve="achieve"/>

      <Message id="message2" v-if="message" :message="message" :color="messageColor" @close="closeMessage"/>
    </div>
  </div>
</template>

<script>
import ARSkillSet from '@/components/ARSkillSet'
import ARSkill from '@/components/ARSkill'
import Message from '@/components/Message'
import {Html5Qrcode} from 'html5-qrcode'
import {SkillDisplay} from "@/services/SkillDisplay";

export default {
  name: "AR-Scene",

  components: {
    ARSkillSet,
    ARSkill,
    Message
  },

  data: () => {
    return {
      skillSet: {},
      skillSetID: null,
      skillNumber: 0,
      skillsTotal: 0,
      showSkill: false,
      input: "",
      message: null,
      messageColor: null,
      constraints: {
        video: {
          width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
          },
          height: {
            min: 720,
            ideal: 1080,
            max: 1440
          },
          facingMode: "environment"
        }
      }
    }
  },

  methods: {
    async getCameraSelection() {
      this.$refs.video1.setAttribute('autoplay', '')
      this.$refs.video1.setAttribute('muted', '')
      this.$refs.video1.setAttribute('playsinlines', '')
      //const devices = await navigator.mediaDevices.enumerateDevices();
      //const videoDevice = devices.filter(device => device.kind === 'videoinput')[0];

      if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
        this.startStream(this.constraints);
      }
    },

    async startStream(constraints) {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.handleStream(stream);
    },

    handleStream(stream) {
      this.$refs.video1.srcObject = stream;
      this.$refs.video2.srcObject = stream
    },

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

      const html5QrCode = new Html5Qrcode("reader")

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

      html5QrCode.start({facingMode: "environment"}, config, qrCodeSuccessCallback)
    },

    async speech2text() {
      try {
        let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList

        let commands = ['Next', 'Following', 'Back', 'Previous', 'Close'];
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
        console.log('Ready to receive a command.')

        let newThis = this

        recognition.onresult = function (event) {
          newThis.input = event.results[event.results.length - 1][0].transcript

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
            } else if (newThis.input.match(/Verify Self Assessment\.*/i)) {
              newThis.achieve('Self Assessment', newThis.skillSet.skills[newThis.skillNumber - 1].uid)
            } else if (newThis.input.match(/Verify Educational Verification\.*/i)) {
              newThis.achieve('Educational Verification', newThis.skillSet.skills[newThis.skillNumber - 1].uid)
            } else if (newThis.input.match(/Verify Practical Expertise\.*/i)) {
              newThis.achieve('Practical Expertise', newThis.skillSet.skills[newThis.skillNumber - 1].uid)
            } else if (newThis.input.match(/Verify Certification\.*/i)) {
              newThis.achieve('Certification', newThis.skillSet.skills[newThis.skillNumber - 1].uid)
            }
          }
        }

        recognition.onspeechend = function () {
          // this.message = ""
          console.log("Restarting Speech2Text")
          newThis.speech2text()
        }

        recognition.onerror = function () {
          console.log('Error occurred in recognition')
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
    },

    achieve(verification, skillNumber) {
      this.message = null
      this.message = "Request for Verification of '" + verification + "' from Skill " + skillNumber + " sent to SkillDisplay!"
      this.messageColor = "#28a745"
    },

    closeMessage() {
      this.message = null
    }
  },

  mounted() {
    this.speech2text()
    this.getCameraSelection()
    this.qrCode()

    //   let observer = new MutationObserver((mutations) => {
    //     mutations.forEach(() => {
    //       document.querySelector('#reader video').style.cssText = document.getElementById('arjs-video').style.cssText
    //     })
    //   })
    //
    //   document.arrive("#arjs-video", () => {
    //     observer.observe(document.getElementById('arjs-video'), {attributes: true, attributeFilter: ['style']})
    // }
  }
}
</script>

<style scoped>
#background {
  background-color: black;
}

div {
  display: flex;
}

video {
  width: 100%;
}

#container1 {
  position: absolute;
  left: 0;
  width: 50%;
  overflow: hidden;
  display: block;
  height: 100%;
}

#container2 {
  position: absolute;
  left: 50%;
  width: 50%;
  overflow: hidden;
  display: block;
  height: 100%;
}

#glass1{
  margin-left: 8%;
}

#glass2{
  margin-left: -8%;
}

#reader {
  height: 100% !important;
  width: 100% !important;
  visibility: hidden;
}

#skillSet1, #skill1 {
  width: 75%;
  position: absolute;
  top: 5%;
  left: 24%;
}

#skillSet2, #skill2 {
  width: 75%;
  position: absolute;
  top: 5%;
  left: 1%;
}
</style>