<template>
<!--  <div>-->
    <a-scene embedded arjs="debugUIEnabled: false;">
      <a-marker preset='pattern' type='pattern'
                url='https://raw.githubusercontent.com/christoph-samuel/arsr_ar-software/main/marker/pattern-green.patt'>
        <a-plane position="0 0 -1" rotation="-90 0 0" width="1" height="1" color="green">
          <a-entity text="value: Custom Marker GREEN" baseline="center" width="2"></a-entity>
        </a-plane>
      </a-marker>

      <a-marker preset='pattern' type='pattern'
                url='https://raw.githubusercontent.com/christoph-samuel/arsr_ar-software/main/marker/pattern-red.patt'>
        <a-plane position="0 0 -1" rotation="-90 0 0" width="1" height="1" color="red">
          <a-entity text="value: Custom Marker RED" baseline="center" width="2"></a-entity>
        </a-plane>
      </a-marker>

      <a-marker preset='pattern' type='pattern'
                url='https://raw.githubusercontent.com/christoph-samuel/arsr_ar-software/main/marker/pattern-blue.patt'>
        <a-plane position="0 0 -1" rotation="-90 0 0" width="1" height="1" color="blue">
          <a-entity text="value: Custom Marker BLUE" baseline="center" width="2"></a-entity>
        </a-plane>
      </a-marker>

      <a-marker preset="hiro">
        <a-plane rotation="-90 0 0" width="1" height="1" color="white"></a-plane>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
<!--  </div>-->
</template>

<script>
export default {
  name: 'Scene',
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
