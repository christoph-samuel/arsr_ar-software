<template>
  <div class="display-cover container">
    <video ref="video" id="glass" autoplay></video>
  </div>
</template>

<script>
export default {
  name: "AR-Scene",

  data: () => {
    return {
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
          // facingMode: {
          //   exact: "environment"
          // }
        }
      }
    }
  },

  methods: {
    async getCameraSelection() {
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
      this.$refs.video.srcObject = stream;
      const video2 = this.$refs.video.cloneNode(true)
      video2.srcObject = stream
      const div = document.querySelector('div>div')
      div.appendChild(video2)
    }
  },

  mounted() {
    console.log(this.$refs.video)
    this.getCameraSelection()
  }
}
</script>

<style scoped>
div {
  display: flex;
}

video {
  width: 50%;
}

.container {
  width: 100%;
  overflow: hidden;
  display: block;
  height: 100%;
}

#glass {
  margin-left: -10px;
}
</style>