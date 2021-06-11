<template>
  <div>
    <div class="page-title">
      <h3>{{ $route.name }}</h3>
    </div>
    <loading v-if="loading" />
    <div v-else>
      <div class="row" v-for="(block, index) in req" :key="index">
        <div class="col s12 m4" v-for="request in block" :key="request.number">
          <card-request :request="request" />
        </div>
      </div>
    </div>

    <div class="fixed-action-btn">
      <router-link to="/request">
        <a class="btn-floating btn-large waves-effect waves-light blue darken-3">
          <i class="large material-icons">add</i>
        </a>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CardRequest from '../components/CardRequest.vue'
import utils from '@/utils/card.utils'
import Loading from '../components/app/Loading.vue'

export default {
  components: { CardRequest, Loading },
  computed: {
    ...mapGetters(['HISTORY_LIST']),
    req() {
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
