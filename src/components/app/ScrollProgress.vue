<template>
  <div class="progress progress-scroll" v-show="show_progress">
    <div class="determinate" :style="'width: ' + progress + '%'"></div>
  </div>
</template>

<script>
export default {
  computed: {
    show_progress() {
      return this.scrollY > 0
    },
    progress() {
      return (
        (this.scrollY /
          (Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
          ) -
            window.innerHeight)) *
        100
      )
    },
  },
  data: () => ({
    scrollY: 0,
  }),
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll(e) {
      this.scrollY = window.scrollY
    },
  },
}
</script>

<style></style>
