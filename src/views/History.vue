<template>
  <div>
    <div class="page-title hide-on-large-only">
      <h3>{{ $route.name }}</h3>
    </div>
    <loading v-if="loading" />
    <div v-else>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">search</i>
          <input id="icon_prefix" type="text" class="validate" />
          <label for="icon_prefix">Поиск по заявкам</label>
        </div>
      </div>
      <div class="row" v-for="(block, index) in req" :key="index">
        <div class="col s12 m4" v-for="request in block" :key="request.number">
          <card-request :request="request" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CardRequest from '../components/CardRequest.vue'
import utils from '@/utils/card.utils'
import Loading from '../components/app/Loading.vue'

export default {
  metaInfo: {
    title: 'История перевозок',
  },
  components: { CardRequest, Loading },
  computed: {
    ...mapGetters(['HISTORY_LIST']),
    req() {
      if (!this.HISTORY_LIST) {
        return []
      }
      return utils.arrayCardTransform(this.HISTORY_LIST, 3)
    },
  },
  data: () => ({
    loading: false,
  }),
  async mounted() {
    this.loading = true
    await this.getHistoryRequests()
    this.loading = false
  },
  methods: {
    ...mapActions(['getHistoryRequests']),
  },
}
</script>
