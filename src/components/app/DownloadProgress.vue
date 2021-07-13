<template>
  <div class="progress progress-download" v-show="showProgress">
    <div class="indeterminate"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    showProgress: false,
    timer: null
  }),
  methods: {
    start(timer) {
      this.showProgress = true
      this.timer = setTimeout(() => {
        this.showProgress = false
      }, timer)
    },
    stop() {
      this.showProgress = false
      if (this.timer) {
        clearTimeout(this.timer)
      }
    }
  }
}
</script>

<style></style>
