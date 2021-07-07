<template>
  <div>
    <loading v-if="!REQUEST_PROCCESSING" />
    <div v-else>
      <div class="row">
        <div class="col s12 m6"
          v-for="document in REQUEST_PROCCESSING.cargoes"
          :key="document.document"
        >
          <card-document-request :document="document" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../app/Loading.vue'
import { mapGetters } from 'vuex'
import CardDocumentRequest from '../CardDocumentRequest.vue'

export default {
  components: { Loading, CardDocumentRequest },
  computed: {
    ...mapGetters(['REQUEST_PROCCESSING'])
  }
}
</script>

<style>

</style>