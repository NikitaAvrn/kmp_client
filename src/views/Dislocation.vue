<template>
  <div>
    <div class="page-title hide-on-large-only">
      <h3>{{ $route.name }}</h3>
    </div>
    <loading v-if="loading"/>
    <div else>
      <ul class="collapsible popout" ref="collapsible">
        <timeline-move 
          v-for="conosament in ACTIVE_CONOSAMENT"
          :key="conosament.conosament"
          :document="conosament"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import TimelineMove from '../components/TimelineMove.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Loading from '../components/app/Loading.vue'

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['ACTIVE_CONOSAMENT'])
  },
  components: {
    TimelineMove,
    Loading
  },
  data: () => ({
    collapsible: null,
    loading: true
  }),
  async mounted() {
    this.loading = true
    this.CLR_ACTIVE_CONOSAMENT()
    await this.getActiveConosament()
    this.loading = false
    this.collapsible = M.Collapsible.init(this.$refs.collapsible, {})
  },
  beforeDestroy() {
    if (this.collapsible && this.collapsible.destroy) {
      this.collapsible.destroy()
    }
  },
  methods: {
    ...mapActions(['getActiveConosament']),
    ...mapMutations(['CLR_ACTIVE_CONOSAMENT'])
  }
}
</script>
