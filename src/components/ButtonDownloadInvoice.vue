<template>
  <a href="#" class="black-text" @click.prevent="downloadInvoice">
    <i class="material-icons" v-show="!loading">download</i>
    <i class="material-icons spinner" v-show="loading">cached</i>
  </a>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['invoice'],
  computed: {
    ...mapGetters(['LINK']),
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    ...mapActions(['getInvoiceDownload']),
    async downloadInvoice() {
      this.loading = true
      //this.$refs.downloadTimer.start(10000)
      await this.getInvoiceDownload(this.invoice.request)
      setTimeout(() => {
        let fileLink = document.createElement('a')
        fileLink.href = this.LINK
        fileLink.target = '_blink'
        fileLink.setAttribute('download', this.invoice.number)
        document.body.appendChild(fileLink)
        fileLink.click()
        this.loading = false
      }, 10000)
    },
  },
}
</script>

<style></style>
