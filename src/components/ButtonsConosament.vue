<template>
  <div class="btns-conosament">
    <button-print-conosament :document="document" />
    <button-download-conosament :document="document" />
  </div>
</template>

<script>
import ButtonDownloadConosament from './ButtonDownloadConosament.vue'
import ButtonPrintConosament from './ButtonPrintConosament.vue'

export default {
  components: { ButtonDownloadConosament, ButtonPrintConosament },
  props: ['document'],
}
</script>

<style scoped>
.btns-conosament {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}
</style>
