<template>
  <div class="row">
    <div class="col s12 center">
      <div class="preloader-wrapper active">
        <div class="spinner-layer" :class="color">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    color() {
      const r = Math.round(Math.random() * 3)
      const colors = ['red', 'green', 'blue', 'yellow']
      return 'spinner-' + colors[r] + '-only'
    },
  },
}
</script>
