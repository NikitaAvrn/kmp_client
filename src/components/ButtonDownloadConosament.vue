<template>
  <a href="#" class="black-text" @click.prevent="downloadConosament">
    <i class="material-icons" v-show="!loading">download</i>
    <i class="material-icons spinner" v-show="loading">cached</i>
  </a>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['document'],
  computed: {
    ...mapGetters(['LINK']),
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    ...mapActions(['getConosamentDownload']),
    async downloadConosament() {
      this.loading = true
      await this.getConosamentDownload(this.document)
      setTimeout(() => {
        let fileLink = document.createElement('a')
        fileLink.href = this.LINK
        fileLink.target = '_blink'
        fileLink.setAttribute('download', this.document)
        document.body.appendChild(fileLink)
        fileLink.click()
        this.loading = false
      }, 10000)
    },
  },
}
</script>

<style></style>
